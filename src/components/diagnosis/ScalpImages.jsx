import { Upload, Camera, X, CheckCircle, AlertCircle } from 'lucide-react';
import { useState } from 'react';

const ScalpImages = ({ data, onChange }) => {
  const [previews, setPreviews] = useState([]);
  const [uploadStatus, setUploadStatus] = useState('idle'); // idle, uploading, success, error
  const [errorMessage, setErrorMessage] = useState('');

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    
    // Validation
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/heic'];
    
    const validFiles = [];
    const errors = [];

    files.forEach(file => {
      if (!allowedTypes.includes(file.type)) {
        errors.push(`${file.name}: Invalid format (only JPG, PNG, HEIC allowed)`);
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
    
    // Create previews
    const newPreviews = validFiles.map(file => ({
      url: URL.createObjectURL(file),
      name: file.name,
      size: file.size
    }));
    
    // Simulate upload delay (remove in production)
    setTimeout(() => {
      setPreviews([...previews, ...newPreviews]);
      onChange([...data, ...validFiles.map(f => f.name)]);
      setUploadStatus('success');
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setUploadStatus('idle');
      }, 3000);
    }, 1000);
  };

  const removeImage = (index) => {
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
      <h2 className="text-3xl font-display font-bold mb-2 text-white">Scalp Images (Optional)</h2>
      <p className="text-gray-400 mb-8">
        Upload clear images of your scalp for visual analysis. This helps our AI assess hair density, 
        scalp condition, and visible patterns.
      </p>

      <div className="space-y-6">
        {/* Upload Status Messages */}
        {uploadStatus === 'success' && (
          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 flex items-start gap-3">
            <CheckCircle className="text-green-400 flex-shrink-0" size={20} />
            <div>
              <p className="text-green-300 font-medium">Images uploaded successfully!</p>
              <p className="text-green-400/70 text-sm mt-1">{previews.length} image(s) ready for analysis</p>
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
            ? 'border-primary-500 bg-primary-500/5' 
            : 'border-navy-600 hover:border-primary-500'
        }`}>
          <label className="cursor-pointer block">
            <input
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/heic"
              multiple
              onChange={handleFileChange}
              className="hidden"
              disabled={uploadStatus === 'uploading'}
            />
            <div className="flex flex-col items-center gap-4">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                uploadStatus === 'uploading' 
                  ? 'bg-primary-500/30 animate-pulse' 
                  : 'bg-primary-500/20'
              }`}>
                <Upload className="text-primary-400" size={32} />
              </div>
              <div>
                <p className="text-lg font-medium text-white mb-1">
                  {uploadStatus === 'uploading' ? 'Uploading...' : 'Click to upload or drag and drop'}
                </p>
                <p className="text-sm text-gray-400">
                  PNG, JPG or HEIC (Max 10MB per image)
                </p>
              </div>
              <button 
                type="button"
                className="btn-primary"
                disabled={uploadStatus === 'uploading'}
              >
                <Camera className="inline mr-2" size={18} />
                {uploadStatus === 'uploading' ? 'Uploading...' : 'Select Images'}
              </button>
            </div>
          </label>
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
                <span>Ready for analysis</span>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {previews.map((preview, index) => (
                <div key={index} className="relative group">
                  <div className="relative">
                    <img
                      src={preview.url}
                      alt={`Scalp ${index + 1}`}
                      className="w-full h-48 object-cover rounded-lg border-2 border-navy-600 group-hover:border-primary-500 transition-colors"
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
        <div className="bg-navy-800/50 rounded-lg p-6 border border-navy-600">
          <h3 className="font-medium text-white mb-3">📸 Image Guidelines for Best Results</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li className="flex items-start gap-2">
              <span className="text-primary-400">•</span>
              <span>Take photos in good natural lighting</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary-400">•</span>
              <span>Include multiple angles: top, crown, hairline</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary-400">•</span>
              <span>Part your hair to show scalp clearly</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary-400">•</span>
              <span>Ensure images are in focus and well-lit</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary-400">•</span>
              <span>Accepted formats: JPG, PNG, HEIC (max 10MB each)</span>
            </li>
          </ul>
        </div>

        {/* Privacy Note */}
        <div className="bg-primary-500/10 border border-primary-500/30 rounded-lg p-4">
          <p className="text-sm text-gray-300">
            <strong className="text-primary-400">🔒 Privacy:</strong> Your images are processed securely 
            and never shared. They're used solely for your personalized analysis.
          </p>
        </div>

        {/* Skip Option */}
        <div className="text-center">
          <p className="text-gray-400 text-sm">
            Don't have images handy? No problem! You can skip this step and still get valuable insights 
            based on your health and lifestyle data.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ScalpImages;