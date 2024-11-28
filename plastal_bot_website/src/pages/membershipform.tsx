import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styled from 'styled-components';


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

const MembershipForm: React.FC = () => {
    return (
        <section className="scroll-smooth focus:scroll-auto">
            <Header />
            <div className="max-w-7xl mx-auto px-4">
                <h1
                    className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl dark:text-white">
                    <span className="text-hex "> Membership <span className="text-white"> Application Form </span></span>
                </h1>
                {/* Form Application Introduction */}
                <div className="mb-12">
                    <p className="text-lg text-white">Our goal is to bridge the technology gap and foster self-sufficiency in
                        young people. The stronger our community, the better positioned we are to move the needle for diversity
                        in tech and entrepreneurship. Thank you for joining us.</p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Card 1: Section 1 - Personal Information */}
                    <div className="p-6 rounded-lg  border-2 border-gray-300 hover:border-[#0CFFBB] transition duration-300 ease-in-out">
                        <h2 className="text-xl font-semibold mb-4"> <span className="text-hex "> Section 1: </span> Personal
                            Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="mb-4 flex items-center">
                                    <i className="fas fa-user mr-2"></i> Full Name
                                </label>
                                <InputField
                                    id="large-input"
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
                                    required 
                                />
                            </div>
                            <div>
                                <label className="mb-4 flex items-center">
                                    <i className="fas fa-venus-mars mr-2"></i> Gender
                                </label>
                                <SelectField required>
                                    <option>Male</option>
                                    <option>Female</option>
                                    <option>Prefer not to say</option>
                                </SelectField>
                            </div>
                            <div>
                                <label className="mb-4 flex items-center">
                                    <i className="fas fa-envelope mr-2"></i> Email Address
                                </label>
                                <InputField type="email"
                                    required placeholder="example@domain.com" />
                            </div>
                            <div>
                                <label className="mb-4 flex items-center">
                                    <i className="fas fa-phone mr-2"></i> Phone Number
                                </label>
                                <InputField type="text"
                                    required placeholder="+260 123 456 789" />
                            </div>
                            <div>
                                <label className="mb-4 flex items-center">
                                    <i className="fas fa-city mr-2"></i> City & Country
                                </label>
                                <InputField type="text"
                                    required placeholder="Lusaka, Zambia" />
                            </div>
                            <div>
                                <label className="mb-4 flex items-center">
                                    <i className="fas fa-briefcase mr-2"></i> Occupation/Profession
                                </label>
                                <InputField type="text"
                                    required placeholder="Student, Engineer, etc." />
                            </div>
                        </div>
                    </div>
                    {/* <!-- Card 2: Section  - Social Media Links --> */}
                    <div
                        className="p-6 rounded-lg  border-2 border-gray-300 hover:border-[#0CFFBB] transition duration-300 ease-in-out">
                        <h2 className="text-xl font-semibold mb-4"> <span className="text-hex "> Section 2: </span>Social Media
                            Links ( Optional ) </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="mb-4 flex items-center">
                                    <i className="fab fa-linkedin mr-2"></i> LinkedIn Profile
                                </label>
                                <InputField type="url"
                                    placeholder="https://www.linkedin.com/in/username" />
                            </div>
                            <div>
                                <label className="mb-4 flex items-center">
                                    <i className="fab fa-facebook mr-2"></i> Facebook Profile
                                </label>
                                <InputField type="url"
                                    placeholder="https://www.facebook.com/username" />
                            </div>
                            <div>
                                <label className="mb-4 flex items-center">
                                    <i className="fab fa-instagram mr-2"></i> Instagram Profile
                                </label>
                                <InputField type="url"
                                    placeholder="https://www.instagram.com/username" />
                            </div>
                            <div>
                                <label className="mb-4 flex items-center">
                                    <i className="fab fa-twitter mr-2"></i> Twitter Profile
                                </label>
                                <InputField type="url"
                                    placeholder="https://www.twitter.com/username" />
                            </div>
                            <div>
                                <label className="mb-4 flex items-center">
                                    <i className="fas fa-globe mr-2"></i> Other Platform
                                </label>
                                <InputField type="url"
                                    placeholder="https://example.com/username" />
                            </div>
                        </div>
                    </div>

                    {/* Card 3: Section 3 - Membership Type */}
                    <div className="p-6 rounded-lg border-2 border-gray-300 hover:border-[#0CFFBB] transition duration-300 ease-in-out">
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
                                            name="membership"
                                            
                                        />
                                        Student Member
                                    </label><br />
                                    <label>
                                        <Checkbox
                                            type="checkbox"
                                            name="membership"
                                        />
                                        Professional Member
                                    </label><br />
                                    <label>
                                        <Checkbox
                                            type="checkbox"
                                            name="membership"
                                            
                                        />
                                        Mentor/Volunteer Member
                                    </label><br />
                                    <label>
                                        <Checkbox
                                            type="checkbox"
                                            name="membership"
                                            
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
                                            type="checkbox"
                                            
                                        />
                                        Engineering
                                    </label><br />
                                    <label>
                                        <Checkbox
                                            type="checkbox"
                                            
                                        />
                                        Programming/Coding
                                    </label><br />
                                    <label>
                                        <Checkbox
                                            type="checkbox"
                                            
                                        />
                                        Environmental Sciences
                                    </label><br />
                                    <label>
                                        <Checkbox
                                            type="checkbox"
                                            
                                        />
                                        Education
                                    </label><br />
                                    <label>
                                        <Checkbox
                                            type="checkbox"
                                            
                                        />
                                        Project Management
                                    </label><br />

                                    {/* Other Expertise */}
                                    <label className="flex items-center space-x-2">
                                        <Checkbox
                                            type="checkbox"
                                            
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
                    <div className="p-6 rounded-lg border-2 border-gray-300 hover:border-[#0CFFBB] transition duration-300 ease-in-out">
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
                                            id="bordered-checkbox-1"
                                            value="Interest in Robotics"
                                            name="inspiration"
                                            type="checkbox"
                                            
                                        />
                                        Interest in Robotics
                                    </label><br />

                                    <label>
                                        <Checkbox
                                            id="bordered-checkbox-2"
                                            value="Passion for STEM Education"
                                            name="inspiration"
                                            type="checkbox"
                                            
                                        />
                                        Passion for STEM Education
                                    </label><br />

                                    <label>
                                        <Checkbox
                                            id="bordered-checkbox-3"
                                            value="Environmental Advocacy"
                                            name="inspiration"
                                            type="checkbox"
                                            
                                        />
                                        Environmental Advocacy
                                    </label><br />

                                    <label>
                                        <Checkbox
                                            id="bordered-checkbox-4"
                                            value="Desire to Mentor Young People"
                                            name="inspiration"
                                            type="checkbox"
                                            
                                        />
                                        Desire to Mentor Young People
                                    </label><br />

                                    <label>
                                        <Checkbox
                                            id="bordered-checkbox-5"
                                            value="Networking and Professional Growth"
                                            name="inspiration"
                                            type="checkbox"
                                            
                                        />
                                        Networking and Professional Growth
                                    </label><br />

                                    <label className="flex items-center space-x-2">
                                        <Checkbox
                                            id="bordered-checkbox-6"
                                            value="Other"
                                            name="inspiration"
                                            type="checkbox"
                                            
                                        />
                                        <span>Other:</span>
                                        <InputField
                                            type="text"
                                            placeholder="Specify"
                                        />
                                    </label>
                                </div>
                            </div>

                            {/* Motivation to join */}
                            <div>
                                <label className="block mb-2">Why do you want to become a member of Plastal-Bot Builders?</label>
                                <TextAreaField
                                    rows={3}
                                ></TextAreaField>
                            </div>

                            {/* Experience in robotics or STEM */}
                            <div>
                                <label className="block mb-2">Do you have any previous experience in robotics, coding, or STEM-related projects?</label>
                                <div className="space-y-2 mb-4">
                                  <label className="inline-flex items-center mr-4">
                                    <Checkbox
                                      type="checkbox"
                                      name="experience"
                                      className="mr-2 w-4 h-4 custom-color rounded focus:ring-2"
                                    />
                                    Yes
                                  </label>
                                  <label className="inline-flex items-center">
                                    <Checkbox
                                      type="checkbox"
                                      name="experience"
                                      className="mr-2 w-4 h-4 custom-color rounded focus:ring-2"
                                    />
                                    No
                                  </label>
                                </div>
                                <TextAreaField
                                    rows={3}
                                    placeholder="If Yes, please provide a brief description"
                                ></TextAreaField>
                            </div>
                        </div>
                    </div>

                    {/* <!-- Card 5: Section 5 - Membership Commitments --> */}
                    <div
                        className="p-6 rounded-lg  border-2 border-gray-300 hover:border-[#0CFFBB] transition duration-300 ease-in-out">
                        <h2 className="text-xl font-semibold mb-4"> <span className="text-hex "> Section 5: </span> Membership
                            Commitments</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block mb-2">Time Availability</label>
                                <SelectField required>
                                    <option>1-2 hours</option>
                                    <option>3-5 hours</option>
                                    <option>5-10 hours</option>
                                    <option>10+ hours</option>
                                </SelectField>
                            </div>
                            <div>
                                <label className="block mb-2">In what ways do you think you can contribute to the
                                    organization?
                                </label>
                                    <TextAreaField
                                        rows={3}
                                    ></TextAreaField>
                            </div>
                            <div>
                                <label className="block mb-2">Are you willing to participate in virtual or in-person
                                    events?</label>
                                <div className="space-y-6">
                                  <label className="inline-flex items-center mr-4">
                                    <Checkbox type="checkbox" name="participation" className="mr-2 w-4 h-4 custom-color rounded focus:ring-2" />
                                    Yes
                                  </label>
                                  <label className="inline-flex items-center">
                                    <Checkbox type="checkbox" name="participation" className="mr-2 w-4 h-4 custom-color rounded focus:ring-2" />
                                    No
                                  </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <!-- Card 6: Section 6 - Additional Information --> */}  
                    <div
                        className="p-6 rounded-lg  border-2 border-gray-300 hover:border-[#0CFFBB] transition duration-300 ease-in-out">
                        <h2 className="text-xl font-semibold mb-4"> <span className="text-hex "> Section 6: </span> Additional
                            Information</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block mb-2">How did you hear about Plastal-Bot Builders?</label>
                                <SelectField>
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
                                    rows={3}>
                                </TextAreaField>
                            </div>
                        </div>
                    </div>
                    {/* <!-- Card 6: Section 6 - Declaration & Consent --> */}
                    <div
                        className="p-6 rounded-lg  border-2 border-gray-300 hover:border-[#0CFFBB] transition duration-300 ease-in-out lg:col-span-2">
                        <h2 className="text-xl font-semibold mb-4"> <span className="text-hex "> Section 7: </span> Declaration
                            & Consent</h2>
                        <div className="space-y-4">
                            <label><input type="checkbox" className="mr-2 w-4 h-4 custom-color rounded focus:ring-2" />I hereby
                                declare that the information provided is true
                                and accurate to the best of my knowledge.</label><br />
                                <label>
                                    <input 
                                        type="checkbox" 
                                        className="mr-2 w-4 h-4 custom-color rounded focus:ring-2" 
                                    /> 
                                    I agree to abide by the rules and regulations of Plastal-Bot Builders.
                                </label> 
                                <br />
                                <label>
                                    <input 
                                        type="checkbox" 
                                        className="mr-2 w-4 h-4 custom-color rounded focus:ring-2" 
                                    /> 
                                    I consent to the processing of my personal data in accordance with the organization's data privacy policy.
                                </label>
                        </div>
                    </div>
                    {/* <!-- Submit Button --> */}
                    <div className="flex justify-center mt-8 mb-6">
                        <button className="custom-button">Submit Application</button>
                    </div>
                </div>
                <Footer />
            </div>
        </section>
    );
}

export default MembershipForm;