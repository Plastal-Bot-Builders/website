import React, { useRef, useState } from 'react';
import { apiFetch } from '../api/client';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CodeOfConductNotice from '../components/CodeOfConduct';
import styled from 'styled-components';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import 'styled-components';
import { SEOConfig } from '../components/SEO';
import { FaBriefcase, FaCalendarAlt, FaCity, FaEnvelope, FaFacebook, FaGlobe, FaInstagram, FaLinkedin, FaPhone, FaTwitter, FaUser, FaVenusMars } from 'react-icons/fa';

declare module 'styled-components' {
    export interface DefaultTheme {
        inputBg: string;
        borderColor: string;
        textColor: string;
        accentColor: string;
        focusRing: string;
    }
}

gsap.registerPlugin(ScrollTrigger);

const InputField = styled.input`
  background-color: ${props => props.theme.inputBg || 'transparent'};
  border: 1px solid ${props => props.theme.borderColor || '#d1d5db'};
  padding: 0.5rem 0.75rem;
  border-radius: 0.375rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  transition: border-color 0.3s ease, background-color 0.3s ease;
  width: 100%;
  height: 3rem;
  color: ${props => props.theme.textColor || 'inherit'};

    &:hover {
    border-color: ${props => props.theme.accentColor || '#0CFFBB'};
    }

  &:focus {
    outline: none;
    border-color: ${props => props.theme.accentColor || '#0CFFBB'};
    box-shadow: 0 0 0 3px ${props => props.theme.focusRing || 'rgba(12, 255, 187, 0.5)'};
  }
`;
const Checkbox = styled.input`
  width: 1rem;
  height: 1rem;
  flex: 0 0 auto;
  margin-right: 0.5rem;
  accent-color: ${props => props.theme.accentColor || 'var(--accent)'};
  cursor: pointer;

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px ${props => props.theme.focusRing || 'var(--focus-ring)'};
  }
`;


const SelectField = styled.select`
  background-color: ${props => props.theme.inputBg || 'transparent'};
  border: 1px solid ${props => props.theme.borderColor || '#d1d5db'};
  padding: 0.5rem 0.75rem;
  border-radius: 0.375rem;
  appearance: none;
  width: 100%;
  height: 3rem;
  font-size: 0.875rem;
  color: ${props => props.theme.textColor || '#1f2937'};
  transition: border-color 0.3s ease, background-color 0.3s ease;

  &:hover {
    border-color: ${props => props.theme.accentColor || '#0CFFBB'};
  }

  &:focus {
    outline: none;
    border-color: ${props => props.theme.accentColor || '#0CFFBB'};
    box-shadow: 0 0 0 3px ${props => props.theme.focusRing || 'rgba(12, 255, 187, 0.5)'};
  }
`;

const TextAreaField = styled.textarea`
  background-color: ${props => props.theme.inputBg || 'transparent'};
  border: 1px solid ${props => props.theme.borderColor || '#d1d5db'};
  padding: 0.5rem 0.75rem;
  border-radius: 0.375rem;
  width: 100%; 
  color: ${props => props.theme.textColor || '#1f2937'};
  transition: border-color 0.3s ease, background-color 0.3s ease;
  resize: vertical;

  &:hover {
    border-color: ${props => props.theme.accentColor || '#0CFFBB'};
  }

  &:focus {
    outline: none;
    border-color: ${props => props.theme.accentColor || '#0CFFBB'};
    box-shadow: 0 0 0 3px ${props => props.theme.focusRing || 'rgba(12, 255, 187, 0.5)'};
  }
`;

const initialFormState = {
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
    expertise: [] as string[], // Important: reset arrays properly
    otherExpertise: '',

    // Interest & Motivation
    inspiration: [] as string[], // Important: reset arrays properly
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

    // Anti-spam honeypot — must stay empty; see backend/middleware/formGuards.js
    website: '',

    // Consents
    informationAccuracy: false,
    rulesAgreement: false,
    dataProcessing: false

};


const MembershipForm: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');
    const [formData, setFormData] = useState(initialFormState);
    // Every value resolves against the active theme automatically, so the form
    // follows light/dark (and live theme switches) exactly like the rest of the site.
    const styledTheme = {
        inputBg: 'transparent',
        borderColor: 'var(--surface-border)',
        accentColor: 'var(--accent)',
        textColor: 'var(--text)',
        focusRing: 'var(--focus-ring)'
    };

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
            const response = await apiFetch('/members/register', {
                method: 'POST',
                json: formData // Backend expects flat fields; it builds the nested document
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to submit application');
            }

            // Set success status
            setSubmitStatus('success');
            // Reset form
            setFormData(initialFormState);
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
        <>
            <SEOConfig
                title="Membership | Plastal-Bot Builders"
                description="Join Plastal-Bot Builders and be part of a community dedicated to empowering youth through technology and robotics."
                image="/resources/Photos/fredmpelembe.jpeg"
            />
            <StyledThemeProvider theme={styledTheme}>
                <section className="scroll-smooth focus:scroll-auto">
                    <Header />
                    <div ref={(el) => el && sectionRef.current.push(el)} className="max-w-7xl mx-auto px-4 ">
                        <h1
                            className="mb-4 type-h1 pt-8">
                            <span className="text-hex "> Membership </span>  Application Form
                        </h1>
                        {/* Form Application Introduction */}
                        <div className="mb-6">
                            <p className="text-lg">Our goal is to bridge the technology gap and foster self-sufficiency in
                                young people. The stronger our community, the better positioned we are to move the needle for diversity
                                in tech and entrepreneurship. Thank you for joining us.</p>
                        </div>
                        {showNotice && (
                            <div className="surface border border-surface rounded-lg p-4 mb-6 relative flex justify-between items-center gap-3">
                                <p className="text-current">
                                    <span className="text-hex">*</span> Indicates required fields
                                </p>
                                <button
                                    onClick={() => setShowNotice(false)}
                                    className="text-current opacity-60 hover:opacity-100 transition-opacity flex-shrink-0"
                                    aria-label="Dismiss notice"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        )}
                        {showPrivacyNotice && (
                            <div className="surface border border-surface rounded-lg p-4 mb-6 relative flex justify-between items-center gap-3">
                                <p className="text-current">
                                    <span className="text-hex">🔒</span> Your Privacy Matters: Rest assured, all information provided in this application will be kept confidential and will not be shared with any third party.
                                </p>
                                <button
                                    onClick={() => setShowPrivacyNotice(false)}
                                    className="text-current opacity-60 hover:opacity-100 transition-opacity flex-shrink-0"
                                    aria-label="Dismiss privacy notice"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        )}

                        {submitStatus === 'success' && (
                            <div role="status" aria-live="polite" className="bg-green-100 dark:bg-green-900 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-100 p-4 mb-6 rounded-lg">
                                <h3 className="text-lg font-bold text-green-800 dark:text-green-100">Application Submitted Successfully!</h3>
                                <p>Thank you for your interest in joining Plastal-Bot Builders. We will review your application and get back to you shortly.</p>
                            </div>
                        )}

                        {submitStatus === 'error' && (
                            <div role="alert" aria-live="assertive" className="bg-red-100 dark:bg-red-900 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-100 p-4 mb-6 rounded-lg">
                                <h3 className="text-lg font-bold text-red-800 dark:text-red-100">Error Submitting Application</h3>
                                <p>{errorMessage || 'Please check your information and try again.'}</p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Anti-spam honeypot: invisible to people, tempting to bots */}
                            <div className="hp-field" aria-hidden="true">
                                <label htmlFor="website">Leave this field empty</label>
                                <input
                                    type="text"
                                    id="website"
                                    name="website"
                                    value={formData.website}
                                    onChange={handleInputChange}
                                    tabIndex={-1}
                                    autoComplete="off"
                                />
                            </div>
                            {/* Card 1: Section 1 - Personal Information */}
                            <div className="p-6 rounded-lg interactive-card">
                                <h2 className="text-xl font-semibold mb-4"> <span className="text-hex "> Section 1: </span> Personal
                                    Information</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="mb-4 flex items-center" htmlFor="fullName">
                                            <FaUser className="inline-block mr-2" aria-hidden="true" /> Full Name
                                        </label>
                                        <InputField
                                            id="fullName"
                                            name="fullName"
                                            value={formData.fullName}
                                            onChange={handleInputChange}
                                            type="text"
                                            placeholder="John Mwansa"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="mb-4 flex items-center" htmlFor="dateOfBirth">
                                            <FaCalendarAlt className="inline-block mr-2" aria-hidden="true" /> Date of Birth
                                        </label>
                                        <InputField
                                            id="dateOfBirth"
                                            type="date"
                                            name="dateOfBirth"
                                            value={formData.dateOfBirth}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="mb-4 flex items-center" htmlFor="gender">
                                            <FaVenusMars className="inline-block mr-2" aria-hidden="true" /> Gender
                                        </label>
                                        <SelectField
                                            id="gender"
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
                                        <label className="mb-4 flex items-center" htmlFor="email">
                                            <FaEnvelope className="inline-block mr-2" aria-hidden="true" /> Email Address
                                        </label>
                                        <InputField
                                            id="email"
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            placeholder="example@domain.com"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="mb-4 flex items-center" htmlFor="phoneNumber">
                                            <FaPhone className="inline-block mr-2" aria-hidden="true" /> Phone Number
                                        </label>
                                        <InputField
                                            id="phoneNumber"
                                            type="text"
                                            name="phoneNumber"
                                            value={formData.phoneNumber}
                                            onChange={handleInputChange}
                                            placeholder="+260 123 456 789"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="mb-4 flex items-center" htmlFor="cityCountry">
                                            <FaCity className="inline-block mr-2" aria-hidden="true" /> City & Country
                                        </label>
                                        <InputField
                                            id="cityCountry"
                                            type="text"
                                            name="cityCountry"
                                            value={formData.cityCountry}
                                            onChange={handleInputChange}
                                            placeholder="Lusaka, Zambia"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="mb-4 flex items-center" htmlFor="occupation">
                                            <FaBriefcase className="inline-block mr-2" aria-hidden="true" /> Occupation/Profession
                                        </label>
                                        <InputField
                                            id="occupation"
                                            type="text"
                                            name="occupation"
                                            value={formData.occupation}
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
                                        <label className="mb-4 flex items-center" htmlFor="linkedin">
                                            <FaLinkedin className="inline-block mr-2" aria-hidden="true" /> LinkedIn Profile
                                        </label>
                                        <InputField
                                            id="linkedin"
                                            type="url"
                                            name="linkedin"
                                            value={formData.linkedin}
                                            onChange={handleInputChange}
                                            placeholder="https://www.linkedin.com/in/username" />
                                    </div>
                                    <div>
                                        <label className="mb-4 flex items-center" htmlFor="facebook">
                                            <FaFacebook className="inline-block mr-2" aria-hidden="true" /> Facebook Profile
                                        </label>
                                        <InputField
                                            id="facebook"
                                            type="url"
                                            name="facebook"
                                            value={formData.facebook}
                                            onChange={handleInputChange}
                                            placeholder="https://www.facebook.com/username"
                                        />
                                    </div>
                                    <div>
                                        <label className="mb-4 flex items-center" htmlFor="instagram">
                                            <FaInstagram className="inline-block mr-2" aria-hidden="true" /> Instagram Profile
                                        </label>
                                        <InputField
                                            id="instagram"
                                            type="url"
                                            name="instagram"
                                            value={formData.instagram}
                                            onChange={handleInputChange}
                                            placeholder="https://www.instagram.com/username"
                                        />
                                    </div>
                                    <div>
                                        <label className="mb-4 flex items-center" htmlFor="twitter">
                                            <FaTwitter className="inline-block mr-2" aria-hidden="true" /> Twitter Profile
                                        </label>
                                        <InputField
                                            id="twitter"
                                            type="url"
                                            name="twitter"
                                            value={formData.twitter}
                                            onChange={handleInputChange}
                                            placeholder="https://www.twitter.com/username"
                                        />
                                    </div>
                                    <div>
                                        <label className="mb-4 flex items-center" htmlFor="otherSocial">
                                            <FaGlobe className="inline-block mr-2" aria-hidden="true" /> Other Platform
                                        </label>
                                        <InputField
                                            id="otherSocial"
                                            type="url"
                                            name="otherSocial"
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
                                            <label className="flex items-center">
                                                <Checkbox
                                                    type="checkbox"
                                                    name="membershipType"
                                                    value="Student"
                                                    checked={formData.membershipType === "Student"}
                                                    onChange={handleCheckboxChange}
                                                />
                                                Student Member
                                            </label>
                                            <label className="flex items-center">
                                                <Checkbox
                                                    type="checkbox"
                                                    name="membershipType"
                                                    value="Professional"
                                                    checked={formData.membershipType === "Professional"}
                                                    onChange={handleCheckboxChange}
                                                />
                                                Professional Member
                                            </label>
                                            <label className="flex items-center">
                                                <Checkbox
                                                    type="checkbox"
                                                    name="membershipType"
                                                    value="Mentor/Volunteer"
                                                    checked={formData.membershipType === "Mentor/Volunteer"}
                                                    onChange={handleCheckboxChange}
                                                />
                                                Mentor/Volunteer Member
                                            </label><br />
                                            <label className="flex items-center">
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
                                        <label className="block mb-4" htmlFor="educationalBackground">
                                            Educational Background/Current Institution (For Student Members)
                                        </label>
                                        <InputField
                                            id="educationalBackground"
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
                                            <label className="flex items-center">
                                                <Checkbox
                                                    type="checkbox"
                                                    name="expertise"
                                                    value="Engineering"  // or whatever value is appropriate
                                                    checked={formData.expertise.includes("Engineering")}
                                                    onChange={handleCheckboxChange}
                                                />
                                                Engineering
                                            </label><br />
                                            <label className="flex items-center">
                                                <Checkbox
                                                    type="checkbox"
                                                    value="programmingCoding"
                                                    name="expertise"
                                                    checked={formData.expertise.includes("programmingCoding")}
                                                    onChange={handleCheckboxChange}
                                                />
                                                Programming/Coding
                                            </label><br />
                                            <label className="flex items-center">
                                                <Checkbox
                                                    type="checkbox"
                                                    value="environmentScience"
                                                    name="expertise"
                                                    checked={formData.expertise.includes("environmentScience")}
                                                    onChange={handleCheckboxChange}
                                                />
                                                Environmental Sciences
                                            </label><br />
                                            <label className="flex items-center">
                                                <Checkbox
                                                    type="checkbox"
                                                    value="Education"
                                                    name="expertise"
                                                    checked={formData.expertise.includes("Education")}
                                                    onChange={handleCheckboxChange}
                                                />
                                                Education
                                            </label><br />
                                            <label className="flex items-center">
                                                <Checkbox
                                                    type="checkbox"
                                                    value="projectManagement"
                                                    name="expertise"
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
                                                    name="expertise"
                                                    checked={formData.expertise.includes("others")}
                                                    onChange={handleCheckboxChange}
                                                />
                                                <span>Other:</span>
                                                <InputField
                                                    type="text"
                                                    id="otherExpertise"
                                                    aria-label="Other area of expertise"
                                                    name="otherExpertise"
                                                    value={formData.otherExpertise}
                                                    onChange={handleInputChange}
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
                                            <label className="flex items-center">
                                                <Checkbox
                                                    value="Interest in Robotics"
                                                    name="inspiration"
                                                    type="checkbox"
                                                    checked={formData.inspiration.includes("Interest in Robotics")}
                                                    onChange={handleCheckboxChange}
                                                />
                                                Interest in Robotics
                                            </label><br />

                                            <label className="flex items-center">
                                                <Checkbox
                                                    value="Passion for STEM Education"
                                                    name="inspiration"
                                                    type="checkbox"
                                                    checked={formData.inspiration.includes("Passion for STEM Education")}
                                                    onChange={handleCheckboxChange}
                                                />
                                                Passion for STEM Education
                                            </label><br />

                                            <label className="flex items-center">
                                                <Checkbox
                                                    value="Environmental Advocacy"
                                                    name="inspiration"
                                                    type="checkbox"
                                                    checked={formData.inspiration.includes("Environmental Advocacy")}
                                                    onChange={handleCheckboxChange}
                                                />
                                                Environmental Advocacy
                                            </label><br />

                                            <label className="flex items-center">
                                                <Checkbox
                                                    value="Desire to Mentor Young People"
                                                    name="inspiration"
                                                    type="checkbox"
                                                    checked={formData.inspiration.includes("Desire to Mentor Young People")}
                                                    onChange={handleCheckboxChange}
                                                />
                                                Desire to Mentor Young People
                                            </label><br />

                                            <label className="flex items-center">
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
                                                    id="otherInspiration"
                                                    aria-label="Other source of inspiration"
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
                                        <label className="block mb-2" htmlFor="motivation">Why do you want to become a member of Plastal-Bot Builders?</label>
                                        <TextAreaField
                                            id="motivation"
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
                                                />
                                                No
                                            </label>
                                        </div>
                                        <TextAreaField
                                            id="experienceDescription"
                                            aria-label="Describe your previous robotics, coding or STEM experience"
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
                                        <label className="block mb-2" htmlFor="timeAvailability">Time Availability</label>
                                        <SelectField
                                            id="timeAvailability"
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
                                        <label className="block mb-2" htmlFor="contribution">In what ways do you think you can contribute to the organization?</label>
                                        <TextAreaField
                                            id="contribution"
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
                                        <label className="block mb-2" htmlFor="referralSource">How did you hear about Plastal-Bot Builders?</label>
                                        <SelectField
                                            id="referralSource"
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
                                        <label className="block mb-2" htmlFor="comments">Do you have any other comments or questions?</label>
                                        <TextAreaField
                                            id="comments"
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
                                <div className="space-y-3">
                                    {([
                                        ['informationAccuracy', 'I hereby declare that the information provided is true and accurate to the best of my knowledge.'],
                                        ['rulesAgreement', 'I agree to abide by the rules and regulations of Plastal-Bot Builders.'],
                                        ['dataProcessing', "I consent to the processing of my personal data in accordance with the organization's data privacy policy."],
                                    ] as const).map(([name, label]) => (
                                        <label key={name} className="flex items-start cursor-pointer">
                                            <Checkbox
                                                type="checkbox"
                                                name={name}
                                                checked={formData[name]}
                                                onChange={handleCheckboxChange}
                                                style={{ marginTop: '0.2rem' }}
                                            />
                                            <span className="text-sm sm:text-base leading-relaxed">{label}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <CodeOfConductNotice standalone={false} />
                            {/* <!-- Submit Button --> */}
                            <div className="flex flex-col items-center mt-8 mb-6 lg:col-span-2">
                                <button
                                    type="submit"
                                    className="custom-button"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Submitting...' : 'Submit Application'}
                                </button>
                            </div>
                        </form>

                        <Footer />
                    </div>
                </section>
            </StyledThemeProvider>
        </>
    );
}

export default MembershipForm;