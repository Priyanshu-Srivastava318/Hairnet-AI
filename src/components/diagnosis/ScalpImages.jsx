import { Upload, Camera, X } from 'lucide-react';
import { useState } from 'react';

const ScalpImages = ({ data, onChange }) => {
  const [previews, setPreviews] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    
    // Create previews
    const newPreviews = files.map(file => URL.createObjectURL(file));
    setPreviews([...previews, ...newPreviews]);
    
    // Store file names (in a real app, you'd upload these)
    onChange([...data, ...files.map(f => f.name)]);
  };

  const removeImage = (index) => {
    const newPreviews = previews.filter((_, i) => i !== index);
    const newData = data.filter((_, i) => i !== index);
    setPreviews(newPreviews);
    onChange(newData);
  };

  return (
    <div>
      <h2 className="text-3xl font-display font-bold mb-2 text-white">Scalp Images (Optional)</h2>
      <p className="text-gray-400 mb-8">
        Upload clear images of your scalp for visual analysis. This helps our AI assess hair density, 
        scalp condition, and visible patterns.
      </p>

      <div className="space-y-6">
        {/* Upload Area */}
        <div className="border-2 border-dashed border-navy-600 rounded-xl p-8 text-center hover:border-primary-500 transition-colors">
          <label className="cursor-pointer block">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="hidden"
            />
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-primary-500/20 flex items-center justify-center">
                <Upload className="text-primary-400" size={32} />
              </div>
              <div>
                <p className="text-lg font-medium text-white mb-1">
                  Click to upload or drag and drop
                </p>
                <p className="text-sm text-gray-400">
                  PNG, JPG or HEIC (Max 10MB per image)
                </p>
              </div>
              <button className="btn-primary">
                <Camera className="inline mr-2" size={18} />
                Select Images
              </button>
            </div>
          </label>
        </div>

        {/* Image Previews */}
        {previews.length > 0 && (
          <div>
            <h3 className="text-lg font-medium text-white mb-4">
              Uploaded Images ({previews.length})
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {previews.map((preview, index) => (
                <div key={index} className="relative group">
                  <img
                    src={preview}
                    alt={`Scalp ${index + 1}`}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <button
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={18} className="text-white" />
                  </button>
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
