import React, { useEffect, useRef, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CodeOfConductNotice from '../components/CodeOfConduct';
import styled from 'styled-components';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const InputField = styled.input`
  background-color: transparent;
  border: 1px solid #d1d5db; /* border-gray-300 */
  padding: 0.5rem 0.75rem; /* px-3 py-2 */
  border-radius: 0.375rem; /* rounded-md */
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05); /* shadow-sm */
  transition: border-color 0.3s ease;
  width: 100%; /* Full width */
  height: 3rem; /* Adjust height as needed */

  &:hover {
    border-color: #0CFFBB;

  &:focus {
    outline: none;
    border-color: #0CFFBB;
    box-shadow: 0 0 0 3px rgba(12, 255, 187, 0.5); /* focus:ring-blue-500 */
  }
`;

const Checkbox = styled.input`
  margin-right: 0.5rem; /* mr-2 */
  width: 1rem; /* w-4 */
  height: 1rem; /* h-4 */
  color: #0cffbb; /* Custom color */
  border: 1px solid #0cffbb; /* border-gray-300 */
  transition: border-color 0.3s ease;

  &:checked {
    background-color: #0cffbb; /* Custom color when checked */
    border-color: #0cffbb; /* Custom border color when checked */
  }

  &:focus {
    outline: none;
    border-color: #0cffbb;
    box-shadow: 0 0 0 3px rgba(12, 255, 187, 0.5); /* focus:ring-0 */
  }
`;


const SelectField = styled.select`
    background-color: transparent;
  border: 1px solid #d1d5db; /* border-gray-300 */
  padding: 0.5rem 0.75rem; /* px-2.5 pb-2.5 pt-4 */
  border-radius: 0.375rem; /* rounded-lg */
  appearance: none;
  width: 100%; /* Full width */
  height: 3rem; /* Adjust height as needed */
  font-size: 0.875rem; /* text-sm */
  color: #1f2937; /* text-gray-900 */
  transition: border-color 0.3s ease;

  &:hover {
    border-color: #0CFFBB;
  }

  &:focus {
    outline: none;
    border-color: #0CFFBB;
    box-shadow: 0 0 0 3px rgba(12, 255, 187, 0.5); /* focus:ring-0 */
  }

  &.dark {
    color: #ffffff; /* dark:text-white */
    border-color: #4b5563; /* dark:border-gray-600 */
  }

  &.dark:focus {
    border-color: #3b82f6; /* dark:focus:border-blue-500 */
  } 
`;

const TextAreaField = styled.textarea`
  background-color: transparent;
  border: 1px solid #d1d5db; /* border-gray-300 */
  padding: 0.5rem 0.75rem; /* p-2 */
  border-radius: 0.375rem; /* rounded-lg */
  width: 100%; /* Full width */
  color: #1f2937; /* text-gray-900 */
  transition: border-color 0.3s ease;
  resize: vertical; /* Allow vertical resizing */

  &:hover {
    border-color: #0CFFBB;
  }

  &:focus {
    outline: none;
    border-color: #0CFFBB;
    box-shadow: 0 0 0 3px rgba(12, 255, 187, 0.5); /* focus:ring-0 */
  }

  &.dark {
    color: #ffffff; /* dark:text-white */
    border-color: #4b5563; /* dark:border-gray-600 */
  }

  &.dark:focus {
    border-color: #3b82f6; /* dark:focus:border-blue-500 */
  }
`;

// Add this near the top of your component
const [formData, setFormData] = useState({
  // Personal Information
  fullName: '',
  dateOfBirth: '',
  gender: 'Male',
  email: '',
  phoneNumber: '',
  cityCountry: '',
  occupation: '',
  
  // Social Media
  linkedin: '',
  facebook: '',
  instagram: '',
  twitter: '',
  otherSocial: '',
  
  // Membership Type
  membershipType: 'Student',
  educationalBackground: '',
  expertise: [],
  otherExpertise: '',
  
  // Interest & Motivation
  inspiration: [],
  otherInspiration: '',
  motivation: '',
  hasExperience: 'No',
  experienceDescription: '',
  
  // Commitments
  timeAvailability: '1-2 hours',
  contribution: '',
  eventParticipation: 'No',
  
  // Additional Info
  referralSource: 'Website',
  comments: '',
  
  // Consents
  informationAccuracy: false,
  rulesAgreement: false,
  dataProcessing: false
});



const MembershipForm: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');
    const [formData, setFormData] = useState({

    });
        useEffect(() => {
      sectionRef.current.forEach((section) => {
        gsap.from(section, {
          opacity: 0,
          y: 50,
          duration: 1,
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'bottom 60%',
            toggleActions: 'play none none reverse',
          },
        });
      });
    }, []);

    // Handle text, select, textarea inputs
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    };
    
    // Handle checkbox inputs
    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value, checked } = e.target;
      
      // For regular checkboxes (true/false)
      if (name === 'informationAccuracy' || name === 'rulesAgreement' || name === 'dataProcessing') {
        setFormData(prev => ({
          ...prev,
          [name]: checked
        }));
        return;
      }
      
      // For arrays of checkboxes (like expertise, inspiration)
      if (name === 'expertise' || name === 'inspiration') {
        setFormData(prev => {
          const updatedArray = checked
            ? [...prev[name], value]
            : prev[name].filter((item: string) => item !== value);
          
          return {
            ...prev,
            [name]: updatedArray
          };
        });
        return;
      }
      
      // For radio-like checkboxes (membershipType, hasExperience, eventParticipation)
      if (name === 'membershipType' || name === 'hasExperience' || name === 'eventParticipation') {
        setFormData(prev => ({
          ...prev,
          [name]: value
        }));
      }
    };
    // Form submission handler
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      
      // Validate form
      if (!formData.fullName || !formData.email || !formData.phoneNumber) {
        setErrorMessage('Please fill in all required fields');
        setSubmitStatus('error');
        return;
      }
      
      // Validate consents
      if (!formData.informationAccuracy || !formData.rulesAgreement || !formData.dataProcessing) {
        setErrorMessage('You must agree to all terms to submit the application');
        setSubmitStatus('error');
        return;
      }
      
      try {
        setIsSubmitting(true);
        setSubmitStatus('idle');
        setErrorMessage('');
        
        const response = await fetch('/api/members/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData)
        });
        
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.message || 'Failed to submit application');
        }
        
        // Success!
        setSubmitStatus('success');
        // Reset form
        setFormData({
          // Reset to initial values
          fullName: '',
          dateOfBirth: '',
          // ... etc.
        });
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
      } catch (error: any) {
        console.error('Error submitting form:', error);
        setErrorMessage(error.message || 'An unexpected error occurred');
        setSubmitStatus('error');
      } finally {
        setIsSubmitting(false);
      }
    };

    const [showNotice, setShowNotice] = useState(true);   
    const [showPrivacyNotice, setShowPrivacyNotice] = useState(true);

    
  
    return (
        <section className="scroll-smooth focus:scroll-auto">
            <Header />
            <div ref={(el) => el && sectionRef.current.push(el)} className="max-w-7xl mx-auto px-4 ">
                <h1
                    className="mb-4 text-3xl font-extrabold leading-none tracking-tight md:text-4xl lg:text-5xl">
                    <span className="text-hex "> Membership </span>  Application Form 
                </h1>
                {/* Form Application Introduction */}
                <div className="mb-6">
                    <p className="text-lg">Our goal is to bridge the technology gap and foster self-sufficiency in
                        young people. The stronger our community, the better positioned we are to move the needle for diversity
                        in tech and entrepreneurship. Thank you for joining us.</p>
                </div>
                {showNotice && (
                <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 mb-6 relative flex justify-between items-center">
                    <p className="text-gray-300">
                    <span className="text-hex">*</span> Indicates required fields
                    </p>
                    <button 
                    onClick={() => setShowNotice(false)}
                    className="text-gray-400 hover:text-white transition-colors"
                    aria-label="Dismiss notice"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                )}
                {showPrivacyNotice && (
                  <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 mb-6 relative flex justify-between items-center">
                    <p className="text-gray-300">
                      <span className="text-hex">🔒</span> Your Privacy Matters: Rest assured, all information provided in this application will be kept confidential and will not be shared with any third party.
                    </p>
                    <button 
                      onClick={() => setShowPrivacyNotice(false)}
                      className="text-gray-400 hover:text-white transition-colors"
                      aria-label="Dismiss privacy notice"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                )}
                // Add this right before your form sections
                {submitStatus === 'success' && (
                  <div className="bg-green-900 border border-green-800 text-green-100 p-4 mb-6 rounded-lg">
                    <h3 className="text-lg font-bold text-green-100">Application Submitted Successfully!</h3>
                    <p>Thank you for your interest in joining Plastal-Bot Builders. We will review your application and get back to you shortly.</p>
                  </div>
                )}
                
                {submitStatus === 'error' && (
                  <div className="bg-red-900 border border-red-800 text-red-100 p-4 mb-6 rounded-lg">
                    <h3 className="text-lg font-bold text-red-100">Error Submitting Application</h3>
                    <p>{errorMessage || 'Please check your information and try again.'}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Card 1: Section 1 - Personal Information */}
                    <div className="p-6 rounded-lg interactive-card">
                        <h2 className="text-xl font-semibold mb-4"> <span className="text-hex "> Section 1: </span> Personal
                            Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="mb-4 flex items-center">
                                    <i className="fas fa-user mr-2"></i> Full Name
                                </label>
                                <InputField
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleInputChange}
                                    type="text"
                                    placeholder="John Mwansa"
                                    required
                                />
                            </div>
                            <div>
                                <label className="mb-4 flex items-center">
                                    <i className="fas fa-calendar-alt mr-2"></i> Date of Birth
                                </label>
                                <InputField 
                                    type="date"
                                    name="dateOfBirth"
                                    value={formData.dateOfBirth}
                                    onChange={handleInputChange}
                                    required 
                                />
                            </div>
                            <div>
                                <label className="mb-4 flex items-center">
                                    <i className="fas fa-venus-mars mr-2"></i> Gender
                                </label>
                                <SelectField 
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleInputChange}
                                    required    
                                >
                                    <option>Male</option>
                                    <option>Female</option>
                                    <option>Prefer not to say</option>
                                </SelectField>
                            </div>
                            <div>
                                <label className="mb-4 flex items-center">
                                    <i className="fas fa-envelope mr-2"></i> Email Address
                                </label>
                                <InputField 
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="example@domain.com" 
                                    required
                                />
                            </div>
                            <div>
                                <label className="mb-4 flex items-center">
                                    <i className="fas fa-phone mr-2"></i> Phone Number
                                </label>
                                <InputField 
                                    type="text"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleInputChange}
                                    placeholder="+260 123 456 789" 
                                    required 
                                />
                            </div>
                            <div>
                                <label className="mb-4 flex items-center">
                                    <i className="fas fa-city mr-2"></i> City & Country
                                </label>
                                <InputField 
                                    type="text"
                                    name="cityCountry"
                                    value={formData.cityCountry}
                                    onChange={handleInputChange}
                                    placeholder="Lusaka, Zambia" 
                                    required 
                                />
                            </div>
                            <div>
                                <label className="mb-4 flex items-center">
                                    <i className="fas fa-briefcase mr-2"></i> Occupation/Profession
                                </label>
                                <InputField 
                                    type="text"
                                    name="occupationProfession"
                                    value={formData.occupationProfession}
                                    onChange={handleInputChange}
                                    placeholder="Student, Engineer, etc." 
                                />
                            </div>
                        </div>
                    </div>
                    {/* <!-- Card 2: Section  - Social Media Links --> */}
                    <div
                        className="p-6 rounded-lg  interactive-card">
                        <h2 className="text-xl font-semibold mb-4"> <span className="text-hex "> Section 2: </span>Social Media
                            Links ( Optional ) </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="mb-4 flex items-center">
                                    <i className="fab fa-linkedin mr-2"></i> LinkedIn Profile
                                </label>
                                <InputField 
                                    type="url"
                                    name="linkedin"
                                    value={formData.linkedin}
                                    onChange={handleInputChange}
                                    placeholder="https://www.linkedin.com/in/username" />
                            </div>
                            <div>
                                <label className="mb-4 flex items-center">
                                    <i className="fab fa-facebook mr-2"></i> Facebook Profile
                                </label>
                                <InputField 
                                    type="url"
                                    name="facebook"
                                    value={formData.facebook}
                                    onChange={handleInputChange}
                                    placeholder="https://www.facebook.com/username" 
                                />
                            </div>
                            <div>
                                <label className="mb-4 flex items-center">
                                    <i className="fab fa-instagram mr-2"></i> Instagram Profile
                                </label>
                                <InputField 
                                    type="url"
                                    name="instagram"
                                    value={formData.instagram}
                                    onChange={handleInputChange}
                                    placeholder="https://www.instagram.com/username" 
                                />
                            </div>
                            <div>
                                <label className="mb-4 flex items-center">
                                    <i className="fab fa-twitter mr-2"></i> Twitter Profile
                                </label>
                                <InputField 
                                    type="url"
                                    name="twitter"
                                    value={formData.twitter}
                                    onChange={handleInputChange}
                                    placeholder="https://www.twitter.com/username" 
                                />
                            </div>
                            <div>
                                <label className="mb-4 flex items-center">
                                    <i className="fas fa-globe mr-2"></i> Other Platform
                                </label>
                                <InputField 
                                    type="url"
                                    name="otherSocials"
                                    value={formData.otherSocial}
                                    onChange={handleInputChange}
                                    placeholder="https://example.com/username" 
                                />
                            </div>
                        </div>
                    </div>

                    {/* Card 3: Section 3 - Membership Type */}
                    <div className="p-6 rounded-lg interactive-card">
                        <h2 className="text-xl font-semibold mb-4">
                            <span className="text-hex"> Section 3: </span>Membership Type
                        </h2>
                        <div className="space-y-4">
                            {/* Membership Selection */}
                            <div>
                            <label className="block mb-2">Please select the type of membership you are applying for:</label>
                                <div className="space-y-2">
                                    <label>
                                        <Checkbox
                                            type="checkbox"
                                            name="membershipType"
                                            value="Student"
                                            checked={formData.membershipType === "Student"}
                                            onChange={handleCheckboxChange} 
                                        />
                                        Student Member
                                    </label>
                                    <br />
                                    <label>
                                        <Checkbox
                                            type="checkbox"
                                            name="membershipType"
                                            value="Professional"
                                            checked={formData.membershipType === "Professional"}
                                            onChange={handleCheckboxChange}
                                        />
                                        Professional Member
                                    </label>
                                    <br />
                                    <label>
                                        <Checkbox
                                            type="checkbox"
                                            name="membershipType"
                                            value="Mentor/Volunteer"
                                            checked={formData.membershipType === "Mentor/Volunteer"}
                                            onChange={handleCheckboxChange}                                         
                                        />
                                        Mentor/Volunteer Member
                                    </label><br />
                                    <label>
                                        <Checkbox
                                            type="checkbox"
                                            name="membershipType"
                                            value="Partner/Supporter"
                                            checked={formData.membershipType === "Partner/Supporter"}
                                            onChange={handleCheckboxChange}
                                        />
                                        Partner/Supporter Member
                                    </label>
                                </div>
                            </div>

                            {/* Educational Background */}
                            <div>
                                <label className="block mb-4">
                                    Educational Background/Current Institution (For Student Members)
                                </label>
                                <InputField
                                    type="text"
                                    name="educationalBackground"
                                    value={formData.educationalBackground}
                                    onChange={handleInputChange}
                                    placeholder="University of Zambia"
                                />
                            </div>

                            {/* Professional Expertise */}
                            <div>
                                <label className="block mb-2">
                                    If applying as a Professional or Mentor, please specify your expertise or skill areas:
                                </label>
                                <div className="space-y-2">
                                    <label>
                                        <Checkbox
                                            type="checkbox"                                                                                          name="expertise"
                                            value="Engineering"  // or whatever value is appropriate
                                            checked={formData.expertise.includes("Engineering")}  
                                            onChange={handleCheckboxChange}                       
                                        />
                                        Engineering
                                    </label><br />
                                    <label>
                                        <Checkbox
                                            type="checkbox" 
                                            value="programmingCoding"
                                            checked={formData.expertise.includes("programmingCoding")}   
                                            onChange={handleCheckboxChange}                
                                        />
                                        Programming/Coding
                                    </label><br />
                                    <label>
                                        <Checkbox
                                            type="checkbox" 
                                            value="environmentScience"
                                            checked={formData.expertise.includes("environmentScience")}
                                            onChange={handleCheckboxChange}                              
                                        />
                                        Environmental Sciences
                                    </label><br />
                                    <label>
                                        <Checkbox
                                            type="checkbox"
                                            value="Education"
                                            checked={formData.expertise.includes("Education")}
                                            onChange={handleCheckboxChange}      
                                        />
                                        Education
                                    </label><br />
                                    <label>
                                        <Checkbox
                                            type="checkbox"
                                            value="projectManagement"
                                            checked={formData.expertise.includes("projectManagement")}
                                            onChange={handleCheckboxChange}
                                        />
                                        Project Management
                                    </label><br />

                                    {/* Other Expertise */}
                                    <label className="flex items-center space-x-2">
                                        <Checkbox
                                            type="checkbox"
                                            value="others"
                                            checked={formData.expertise.includes("others")}
                                            onChange={handleCheckboxChange}           
                                        />
                                        <span>Other:</span>
                                        <InputField
                                            type="text"
                                            placeholder="Specify"
                                        />
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Card 4: Section 4 - Interest & Motivation */}
                    <div className="p-6 rounded-lg interactive-card">
                        <h2 className="text-xl font-semibold mb-4">
                            <span className="text-hex"> Section 4: </span> Interest & Motivation
                        </h2>
                        <div className="space-y-4">

                            {/* Inspiration to join */}
                            <div>
                                <label className="block mb-2">What inspired you to join Plastal-Bot Builders?</label>
                                <div className="space-y-2">
                                    <label>
                                        <Checkbox
                                            value="Interest in Robotics"
                                            name="inspiration"
                                            type="checkbox"
                                            checked={formData.inspiration.includes("Interest in Robotics")}
                                            onChange={handleCheckboxChange}
                                        />
                                        Interest in Robotics
                                    </label><br />
                            
                                    <label>
                                        <Checkbox
                                            value="Passion for STEM Education"
                                            name="inspiration"
                                            type="checkbox"
                                            checked={formData.inspiration.includes("Passion for STEM Education")}
                                            onChange={handleCheckboxChange}
                                        />
                                        Passion for STEM Education
                                    </label><br />
                            
                                    <label>
                                        <Checkbox
                                            value="Environmental Advocacy"
                                            name="inspiration"
                                            type="checkbox"
                                            checked={formData.inspiration.includes("Environmental Advocacy")}
                                            onChange={handleCheckboxChange}
                                        />
                                        Environmental Advocacy
                                    </label><br />
                            
                                    <label>
                                        <Checkbox
                                            value="Desire to Mentor Young People"
                                            name="inspiration"
                                            type="checkbox"
                                            checked={formData.inspiration.includes("Desire to Mentor Young People")}
                                            onChange={handleCheckboxChange}
                                        />
                                        Desire to Mentor Young People
                                    </label><br />
                            
                                    <label>
                                        <Checkbox
                                            value="Networking and Professional Growth"
                                            name="inspiration"
                                            type="checkbox"
                                            checked={formData.inspiration.includes("Networking and Professional Growth")}
                                            onChange={handleCheckboxChange}
                                        />
                                        Networking and Professional Growth
                                    </label><br />
                            
                                    <label className="flex items-center space-x-2">
                                        <Checkbox
                                            value="Other"
                                            name="inspiration"
                                            type="checkbox"
                                            checked={formData.inspiration.includes("Other")}
                                            onChange={handleCheckboxChange}
                                        />
                                        <span>Other:</span>
                                        <InputField
                                            type="text"
                                            name="otherInspiration"
                                            value={formData.otherInspiration}
                                            onChange={handleInputChange}
                                            placeholder="Specify"
                                        />
                                    </label>
                                </div>
                            </div>

                            {/* Motivation to join */}
                            <div>
                                <label className="block mb-2">Why do you want to become a member of Plastal-Bot Builders?</label>
                                <TextAreaField
                                    name="motivation"
                                    value={formData.motivation}
                                    onChange={handleInputChange}
                                    rows={3}
                                    placeholder="Share your motivation for joining..."
                                ></TextAreaField>
                            </div>

                            {/* Experience in robotics or STEM */}
                            <div>
                                <label className="block mb-2">Do you have any previous experience in robotics, coding, or STEM-related projects?</label>
                                <div className="space-y-2 mb-4">
                                  <label className="inline-flex items-center mr-4">
                                    <Checkbox
                                      type="checkbox"
                                      name="hasExperience"
                                      value="Yes"
                                      checked={formData.hasExperience === "Yes"}
                                      onChange={handleCheckboxChange}
                                      className="mr-2 w-4 h-4 custom-color rounded focus:ring-2"
                                    />
                                    Yes
                                  </label>
                                  <label className="inline-flex items-center">
                                    <Checkbox
                                      type="checkbox"
                                      name="hasExperience"
                                      value="No"
                                      checked={formData.hasExperience === "No"}
                                      onChange={handleCheckboxChange}
                                      className="mr-2 w-4 h-4 custom-color rounded focus:ring-2"
                                    />
                                    No
                                  </label>
                                </div>
                                <TextAreaField
                                    name="experienceDescription"
                                    value={formData.experienceDescription}
                                    onChange={handleInputChange}
                                    rows={3}
                                    placeholder="If Yes, please provide a brief description"
                                ></TextAreaField>
                            </div>
                        </div>
                    </div>

                    {/* <!-- Card 5: Section 5 - Membership Commitments --> */}
                    <div
                        className="p-6 rounded-lg interactive-card">
                        <h2 className="text-xl font-semibold mb-4"> <span className="text-hex "> Section 5: </span> Membership
                            Commitments</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block mb-2">Time Availability</label>
                                <SelectField 
                                    name="timeAvailability"
                                    value={formData.timeAvailability}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option>1-2 hours</option>
                                    <option>3-5 hours</option>
                                    <option>5-10 hours</option>
                                    <option>10+ hours</option>
                                </SelectField>
                            </div>
                            <div>
                                <label className="block mb-2">In what ways do you think you can contribute to the organization?</label>
                                <TextAreaField
                                    name="contribution"
                                    value={formData.contribution}
                                    onChange={handleInputChange}
                                    rows={3}
                                    placeholder="Describe how you can contribute..."
                                ></TextAreaField>
                            </div>
                            <div>
                                <label className="block mb-2">Are you willing to participate in virtual or in-person events?</label>
                                <div className="space-y-6">
                                  <label className="inline-flex items-center mr-4">
                                    <Checkbox 
                                        type="checkbox" 
                                        name="eventParticipation" 
                                        value="Yes"
                                        checked={formData.eventParticipation === "Yes"}
                                        onChange={handleCheckboxChange}
                                        className="mr-2 w-4 h-4 custom-color rounded focus:ring-2" 
                                    />
                                    Yes
                                  </label>
                                  <label className="inline-flex items-center">
                                    <Checkbox 
                                        type="checkbox" 
                                        name="eventParticipation" 
                                        value="No"
                                        checked={formData.eventParticipation === "No"}
                                        onChange={handleCheckboxChange}
                                        className="mr-2 w-4 h-4 custom-color rounded focus:ring-2" 
                                    />
                                    No
                                  </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <!-- Card 6: Section 6 - Additional Information --> */}  
                    <div
                        className="p-6 rounded-lg interactive-card">
                        <h2 className="text-xl font-semibold mb-4"> <span className="text-hex "> Section 6: </span> Additional
                            Information</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block mb-2">How did you hear about Plastal-Bot Builders?</label>
                                <SelectField
                                    name="referralSource"
                                    value={formData.referralSource}
                                    onChange={handleInputChange}
                                >
                                    <option>Website</option>
                                    <option>Social Media</option>
                                    <option>Friend/Colleague</option>
                                    <option>Event/Workshop</option>
                                    <option>Other</option>
                                </SelectField>
                            </div>
                            <div>
                                <label className="block mb-2">Do you have any other comments or questions?</label>
                                <TextAreaField
                                    name="comments"
                                    value={formData.comments}
                                    onChange={handleInputChange}
                                    rows={3}
                                    placeholder="Share any additional comments..."
                                ></TextAreaField>
                            </div>
                        </div>
                    </div>
                    {/* <!-- Card 6: Section 6 - Declaration & Consent --> */}
                    <div
                        className="p-6 rounded-lg interactive-card lg:col-span-2">
                        <h2 className="text-xl font-semibold mb-4"> <span className="text-hex "> Section 7: </span> Declaration
                            & Consent</h2>
                        <div className="space-y-4">
                            <label>
                                <Checkbox 
                                    type="checkbox"
                                    name="informationAccuracy"
                                    checked={formData.informationAccuracy}
                                    onChange={handleCheckboxChange}
                                    className="mr-2 w-4 h-4 custom-color rounded focus:ring-2"
                                />
                                I hereby declare that the information provided is true and accurate to the best of my knowledge.
                            </label>
                            <br />
                            <label>
                                <Checkbox 
                                    type="checkbox"
                                    name="rulesAgreement"
                                    checked={formData.rulesAgreement}
                                    onChange={handleCheckboxChange} 
                                    className="mr-2 w-4 h-4 custom-color rounded focus:ring-2" 
                                /> 
                                I agree to abide by the rules and regulations of Plastal-Bot Builders.
                            </label> 
                            <br />
                            <label>
                                <Checkbox 
                                    type="checkbox"
                                    name="dataProcessing"
                                    checked={formData.dataProcessing}
                                    onChange={handleCheckboxChange}
                                    className="mr-2 w-4 h-4 custom-color rounded focus:ring-2" 
                                /> 
                                I consent to the processing of my personal data in accordance with the organization's data privacy policy.
                            </label>
                        </div>
                    </div>
                    <CodeOfConductNotice />
                </form>
                {/* <!-- Submit Button --> */}
                <div className="flex flex-col items-center mt-8 mb-6">
                    <button 
                        type="submit"
                        className="custom-button"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit Application'}          
                    </button>
                </div>
                <Footer />
            </div>
        </section>
    );
}

export default MembershipForm;