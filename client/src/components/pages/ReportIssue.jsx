import { useState } from "react";
import { Button } from "../common/Button";
import { CheckCircle2, MapPin, FileText, Upload } from "lucide-react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

export default function ReportIssue() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState(null);

  const getCategoryName = (value) => {
    const categories = {
      pothole: "Pothole / Road Damage",
      water: "Water Issues / Leaks",
      electricity: "Electricity Outage",
      streetlight: "Street Light Not Working",
      drainage: "Drainage / Sewage",
      sidewalk: "Sidewalk Damage",
      graffiti: "Graffiti / Vandalism",
      other: "Other",
    };
    return categories[value] || value;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!category || !location || !description) {
      alert("Please fill in all required fields");
      return;
    }

    // Generate a report object
    const report = {
      id: Math.random().toString(36).substr(2, 9).toUpperCase(),
      category: getCategoryName(category),
      location,
      description,
      status: "Submitted",
      submittedAt: new Date(),
      phone: phone || undefined,
    };

    // Store report in localStorage for demo purposes
    localStorage.setItem("lastReport", JSON.stringify(report));

    // Navigate to confirmation page
    navigate("/report-confirmation");
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-[#222222] mb-4" style={{ fontSize: '42px', fontWeight: 700 }}>Report an Issue</h1>
          <p className="text-[#666666] max-w-2xl mx-auto" style={{ fontSize: '18px', lineHeight: '1.7' }}>
            Help improve your community by reporting infrastructure problems. Your report will be reviewed by city officials.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-4">
              {/* Step 1 */}
              <div className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                    step >= 1
                      ? "bg-[#5b9138] text-white"
                      : "bg-gray-200 text-gray-400"
                  }`}
                >
                  {step > 1 ? <CheckCircle2 size={20} /> : "1"}
                </div>
                <span className="ml-2 hidden sm:inline text-[#222222]">Select Category</span>
              </div>

              {/* Divider */}
              <div className={`h-0.5 w-12 sm:w-24 ${step >= 2 ? "bg-[#5b9138]" : "bg-gray-200"}`}></div>

              {/* Step 2 */}
              <div className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                    step >= 2
                      ? "bg-[#5b9138] text-white"
                      : "bg-gray-200 text-gray-400"
                  }`}
                >
                  {step > 2 ? <CheckCircle2 size={20} /> : "2"}
                </div>
                <span className="ml-2 hidden sm:inline text-[#222222]">Add Details</span>
              </div>

              {/* Divider */}
              <div className={`h-0.5 w-12 sm:w-24 ${step >= 3 ? "bg-[#5b9138]" : "bg-gray-200"}`}></div>

              {/* Step 3 */}
              <div className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                    step >= 3
                      ? "bg-[#5b9138] text-white"
                      : "bg-gray-200 text-gray-400"
                  }`}
                >
                  3
                </div>
                <span className="ml-2 hidden sm:inline text-[#222222]">Review & Submit</span>
              </div>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-[#222222]">
              {step === 1 && "Select Issue Category"}
              {step === 2 && "Provide Details"}
              {step === 3 && "Review Your Report"}
            </h2>
            <p className="text-[#666666] mt-1">
              {step === 1 && "Choose the type of infrastructure issue you're reporting"}
              {step === 2 && "Add location and description of the problem"}
              {step === 3 && "Review your information before submitting"}
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="category" className="text-[#222222] font-medium">Issue Category *</label>
                  <select
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-3 py-3 focus:outline-none focus:ring-2 focus:ring-[#5b9138] focus:border-[#5b9138]"
                  >
                    <option value="">Select a category</option>
                    <option value="pothole">Pothole / Road Damage</option>
                    <option value="water">Water Issues / Leaks</option>
                    <option value="electricity">Electricity Outage</option>
                    <option value="streetlight">Street Light Not Working</option>
                    <option value="drainage">Drainage / Sewage</option>
                    <option value="sidewalk">Sidewalk Damage</option>
                    <option value="graffiti">Graffiti / Vandalism</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { value: "pothole", label: "Pothole", IconComponent: MapPin },
                    { value: "water", label: "Water", IconComponent: FileText },
                    { value: "electricity", label: "Power", IconComponent: CheckCircle2 },
                    { value: "streetlight", label: "Lights", IconComponent: Upload },
                  ].map((item) => (
                    <button
                      key={item.value}
                      type="button"
                      onClick={() => setCategory(item.value)}
                      className={`p-6 rounded-lg border-2 transition-all hover:border-[#5b9138] hover:shadow-md ${
                        category === item.value
                          ? "border-[#5b9138] bg-[#5b9138]/5 shadow-md"
                          : "border-gray-200"
                      }`}
                    >
                      <div className="flex flex-col items-center text-center">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${
                          category === item.value ? "bg-[#5b9138]" : "bg-gray-100"
                        }`}>
                          <item.IconComponent
                            className={category === item.value ? "text-white" : "text-gray-600"}
                            size={24}
                          />
                        </div>
                        <div className={`${category === item.value ? "text-[#5b9138]" : "text-gray-700"}`} style={{ fontWeight: 600 }}>
                          {item.label}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                <Button
                  type="button"
                  onClick={() => {
                    if (category) {
                      setStep(2);
                    } else {
                      toast.error("Please select a category");
                    }
                  }}
                  className="w-full bg-[#5b9138] hover:bg-[#4a7a2d] text-white rounded-lg py-4 transition-all border-0"
                  style={{ fontSize: '16px', fontWeight: 600 }}
                >
                  Continue
                </Button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="location" className="text-[#222222] font-medium">
                    <MapPin className="inline mr-2" size={16} />
                    Location *
                  </label>
                  <input
                    id="location"
                    placeholder="Street address or intersection"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-3 py-3 focus:outline-none focus:ring-2 focus:ring-[#5b9138] focus:border-[#5b9138]"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="description" className="text-[#222222] font-medium">
                    <FileText className="inline mr-2" size={16} />
                    Description *
                  </label>
                  <textarea
                    id="description"
                    placeholder="Describe the issue in detail..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={5}
                    className="w-full rounded-lg border border-gray-300 px-3 py-3 focus:outline-none focus:ring-2 focus:ring-[#5b9138] focus:border-[#5b9138]"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="phone" className="text-[#222222] font-medium">
                    Phone Number (Optional)
                  </label>
                  <input
                    id="phone"
                    placeholder="For status updates"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-3 py-3 focus:outline-none focus:ring-2 focus:ring-[#5b9138] focus:border-[#5b9138]"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="image" className="text-[#222222] font-medium">
                    <Upload className="inline mr-2" size={16} />
                    Upload Photo (Optional)
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[#5b9138] transition-colors">
                    <input
                      type="file"
                      id="image"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    <label
                      htmlFor="image"
                      className="cursor-pointer flex flex-col items-center"
                    >
                      <Upload className="text-gray-400 mb-2" size={32} />
                      <span className="text-gray-600">
                        {image ? image.name : "Click to upload an image"}
                      </span>
                    </label>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 border-2 border-gray-300 text-[#166534] hover:underline bg-white hover:bg-gray-50 rounded-lg py-2 transition-all"
                    style={{ fontSize: '16px', fontWeight: 600 }}
                  >
                    Back
                  </Button>
                  <Button
                    type="button"
                    onClick={() => {
                      if (location && description) {
                        setStep(3);
                      } else {
                        toast.error("Please fill in all required fields");
                      }
                    }}
                    className="flex-1 bg-[#5b9138] hover:bg-[#4a7a2d] text-white rounded-lg py-4 transition-all border-0"
                    style={{ fontSize: '16px', fontWeight: 600 }}
                  >
                    Continue
                  </Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                  <div>
                    <div className="text-gray-500 mb-1">Category</div>
                    <div className="text-gray-900">{getCategoryName(category)}</div>
                  </div>
                  <div>
                    <div className="text-gray-500 mb-1">Location</div>
                    <div className="text-gray-900">{location}</div>
                  </div>
                  <div>
                    <div className="text-gray-500 mb-1">Description</div>
                    <div className="text-gray-900">{description}</div>
                  </div>
                  {phone && (
                    <div>
                      <div className="text-gray-500 mb-1">Phone Number</div>
                      <div className="text-gray-900">{phone}</div>
                    </div>
                  )}
                  {image && (
                    <div>
                      <div className="text-gray-500 mb-1">Attached Photo</div>
                      <div className="text-gray-900">{image.name}</div>
                    </div>
                  )}
                </div>

                <div className="flex gap-3">
                  <Button
                    type="button"
                    onClick={() => setStep(2)}
                    className="flex-1 border-2 border-gray-300 text-[#166534] hover:underline bg-white hover:bg-gray-50 rounded-lg py-4 transition-all"
                    style={{ fontSize: '16px', fontWeight: 600 }}
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-[#F7941E] hover:bg-[#e88410] text-white rounded-lg py-2 transition-all border-0"
                    style={{ fontSize: '16px', fontWeight: 600 }}
                  >
                    Submit Report
                  </Button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}