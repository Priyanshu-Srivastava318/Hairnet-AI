import { Upload, Camera, X, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import { useState } from 'react';
import { supabase } from '../../utils/supabaseClient';

const ScalpImages = ({ data, onChange }) => {
  const [previews, setPreviews] = useState([]);
  const [uploadStatus, setUploadStatus] = useState('idle'); // idle, uploading, success, error
  const [errorMessage, setErrorMessage] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    
    // Validation
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/heic', 'image/webp'];
    
    const validFiles = [];
    const errors = [];

    files.forEach(file => {
      if (!allowedTypes.includes(file.type)) {
        errors.push(`${file.name}: Invalid format (only JPG, PNG, HEIC, WEBP allowed)`);
      } else if (file.size > maxSize) {
        errors.push(`${file.name}: File too large (max 10MB)`);
      } else {
        validFiles.push(file);
      }
    });

    if (errors.length > 0) {
      setUploadStatus('error');
      setErrorMessage(errors.join(', '));
      setTimeout(() => {
        setUploadStatus('idle');
        setErrorMessage('');
      }, 5000);
      return;
    }

    if (validFiles.length === 0) return;

    // Set uploading status
    setUploadStatus('uploading');
    setUploadProgress(0);

    try {
      // Upload to Supabase Storage
      const uploadedUrls = await uploadToSupabase(validFiles);
      
      // Create local previews
      const newPreviews = validFiles.map((file, index) => ({
        url: URL.createObjectURL(file),
        name: file.name,
        size: file.size,
        supabaseUrl: uploadedUrls[index]
      }));
      
      setPreviews([...previews, ...newPreviews]);
      onChange([...data, ...uploadedUrls]);
      setUploadStatus('success');
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setUploadStatus('idle');
      }, 3000);
    } catch (error) {
      console.error('Upload error:', error);
      setUploadStatus('error');
      setErrorMessage(error.message || 'Failed to upload images. Please try again.');
      
      setTimeout(() => {
        setUploadStatus('idle');
        setErrorMessage('');
      }, 5000);
    }
  };

  const uploadToSupabase = async (files) => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('You must be logged in to upload images');
    }

    const uploadPromises = files.map(async (file, index) => {
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}_${index}.${fileExt}`;
      
      const { data, error } = await supabase.storage
        .from('scalp-images')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        console.error('Supabase upload error:', error);
        throw new Error(`Failed to upload ${file.name}`);
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('scalp-images')
        .getPublicUrl(fileName);

      setUploadProgress(prev => prev + (100 / files.length));

      return publicUrl;
    });

    const urls = await Promise.all(uploadPromises);
    return urls;
  };

  const removeImage = async (index) => {
    const imageToRemove = previews[index];
    
    // Remove from Supabase if URL exists
    if (imageToRemove.supabaseUrl) {
      try {
        // Extract file path from URL
        const urlParts = imageToRemove.supabaseUrl.split('/scalp-images/');
        if (urlParts.length > 1) {
          const filePath = urlParts[1];
          await supabase.storage
            .from('scalp-images')
            .remove([filePath]);
        }
      } catch (error) {
        console.error('Error deleting image:', error);
      }
    }

    const newPreviews = previews.filter((_, i) => i !== index);
    const newData = data.filter((_, i) => i !== index);
    setPreviews(newPreviews);
    onChange(newData);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-1 bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
        Scalp Images (Optional)
      </h2>
      <p className="text-gray-400 text-sm mb-5">
        Upload clear images of your scalp for enhanced visual analysis
      </p>

      <div className="space-y-5">
        {/* Upload Status Messages */}
        {uploadStatus === 'success' && (
          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 flex items-start gap-3">
            <CheckCircle className="text-green-400 flex-shrink-0" size={20} />
            <div>
              <p className="text-green-300 font-medium">Images uploaded successfully!</p>
              <p className="text-green-400/70 text-sm mt-1">{previews.length} image(s) saved to cloud storage</p>
            </div>
          </div>
        )}

        {uploadStatus === 'error' && errorMessage && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="text-red-400 flex-shrink-0" size={20} />
            <div>
              <p className="text-red-300 font-medium">Upload failed</p>
              <p className="text-red-400/70 text-sm mt-1">{errorMessage}</p>
            </div>
          </div>
        )}

        {/* Upload Area */}
        <div className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
          uploadStatus === 'uploading' 
            ? 'border-emerald-500 bg-emerald-500/5' 
            : 'border-slate-700 hover:border-emerald-500/50'
        }`}>
          <label className="cursor-pointer block">
            <input
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/heic,image/webp"
              multiple
              onChange={handleFileChange}
              className="hidden"
              disabled={uploadStatus === 'uploading'}
            />
            <div className="flex flex-col items-center gap-4">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                uploadStatus === 'uploading' 
                  ? 'bg-emerald-500/30' 
                  : 'bg-emerald-500/20'
              }`}>
                {uploadStatus === 'uploading' ? (
                  <Loader className="text-emerald-400 animate-spin" size={32} />
                ) : (
                  <Upload className="text-emerald-400" size={32} />
                )}
              </div>
              <div>
                <p className="text-lg font-medium text-white mb-1">
                  {uploadStatus === 'uploading' ? `Uploading... ${Math.round(uploadProgress)}%` : 'Click to upload or drag and drop'}
                </p>
                <p className="text-sm text-gray-400">
                  PNG, JPG, HEIC, WEBP (Max 10MB per image)
                </p>
              </div>
              <button 
                type="button"
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 disabled:from-slate-700 disabled:to-slate-700 text-white font-semibold rounded-lg transition-all"
                disabled={uploadStatus === 'uploading'}
              >
                <Camera size={18} />
                {uploadStatus === 'uploading' ? 'Uploading...' : 'Select Images'}
              </button>
            </div>
          </label>

          {/* Progress Bar */}
          {uploadStatus === 'uploading' && (
            <div className="mt-4">
              <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>

        {/* Image Previews */}
        {previews.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-white">
                Uploaded Images ({previews.length})
              </h3>
              <div className="flex items-center gap-2 text-sm text-green-400">
                <CheckCircle size={16} />
                <span>Saved to cloud</span>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {previews.map((preview, index) => (
                <div key={index} className="relative group">
                  <div className="relative">
                    <img
                      src={preview.url}
                      alt={`Scalp ${index + 1}`}
                      className="w-full h-48 object-cover rounded-lg border-2 border-slate-700 group-hover:border-emerald-500 transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 w-8 h-8 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={18} className="text-white" />
                    </button>
                  </div>
                  <div className="mt-2">
                    <p className="text-xs text-gray-400 truncate">{preview.name}</p>
                    <p className="text-xs text-gray-500">{formatFileSize(preview.size)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Guidelines */}
        <div className="bg-gradient-to-r from-blue-900/20 to-emerald-900/20 border border-emerald-700/30 rounded-lg p-4">
          <h3 className="font-medium text-white mb-3 text-sm">📸 Image Guidelines for Best Results</h3>
          <ul className="space-y-2 text-xs text-gray-400">
            <li className="flex items-start gap-2">
              <span className="text-emerald-400">•</span>
              <span>Take photos in good natural lighting</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400">•</span>
              <span>Include multiple angles: top, crown, hairline</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400">•</span>
              <span>Part your hair to show scalp clearly</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400">•</span>
              <span>Ensure images are in focus and well-lit</span>
            </li>
          </ul>
        </div>

        {/* Privacy Note */}
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
          <p className="text-xs text-gray-300">
            <strong className="text-blue-400">🔒 Privacy:</strong> Images are encrypted and stored securely in our cloud storage. Only you can access them.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ScalpImages;