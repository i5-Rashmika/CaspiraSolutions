'use client';
import { useState, useEffect } from 'react';
import AnimationSpline from '../../components/animation/AnimationSpline';

const GetIntouch = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        course: 'MOBILE APP DEVELOPMENT',
        slot: 'today',
        date: '26 Nov 2025',
        time: 'Select Time'
    });

    const [availableTimes, setAvailableTimes] = useState([]);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [splineLoaded, setSplineLoaded] = useState(false);

    const courses = [
        'FRONTEND DEVELOPMENT',
        'BACKEND DEVELOPMENT',
        'UI/UX DESIGN',
        'FULL STACK DEVELOPMENT',
        'MOBILE APP DEVELOPMENT',
        'CMS & WORDPRESS'
    ];

    // Generate available time slots based on current time and selected slot
    const generateTimeSlots = () => {
        const slots = [];
        const now = new Date();
        const currentHour = now.getHours();
        const currentMinute = now.getMinutes();

        let startHour = 9; // 9 AM
        let endHour = 18; // 6 PM

        // For today, start from current time + 1 hour
        if (formData.slot === 'today') {
            startHour = currentHour + 1;
            // If it's past 5 PM, no slots available today
            if (currentHour >= 17) {
                return [];
            }
        }

        // For tomorrow and custom, start from 10 AM
        if (formData.slot === 'tomorrow' || formData.slot === 'custom') {
            startHour = 10;
        }

        for (let hour = startHour; hour <= endHour; hour++) {
            // For the first hour, start from the next 30-minute interval
            let startMinute = 0;
            if (hour === startHour && formData.slot === 'today') {
                startMinute = currentMinute < 30 ? 30 : 0;
                if (startMinute === 0) hour++; // Move to next hour if current minute is past 30
            }

            for (let minute = startMinute; minute < 60; minute += 30) {
                if (hour === endHour && minute >= 30) break; // Don't go past 6:30 PM

                const timeString = `${hour}:${minute === 0 ? '00' : minute}`;
                const displayTime = `${hour > 12 ? hour - 12 : hour}:${minute === 0 ? '00' : minute} ${hour >= 12 ? 'PM' : 'AM'}`;

                slots.push({
                    value: timeString,
                    display: displayTime
                });

                // Only add one time slot for the first hour in today mode
                if (hour === startHour && formData.slot === 'today') break;
            }
        }

        return slots;
    };

    // Update available times when slot changes
    useEffect(() => {
        const times = generateTimeSlots();
        queueMicrotask(() => {
            setAvailableTimes(times);
            if (formData.time !== 'Select Time') {
                setFormData(prev => ({ ...prev, time: 'Select Time' }));
            }
        });
    }, [formData.slot]);

    // Update date based on slot selection
    useEffect(() => {
        const now = new Date();
        const tomorrow = new Date(now);
        tomorrow.setDate(tomorrow.getDate() + 1);

        const formatDate = (date) => {
            return date.toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
            });
        };

        queueMicrotask(() => {
            if (formData.slot === 'today') {
                setFormData(prev => ({ ...prev, date: formatDate(now) }));
            } else if (formData.slot === 'tomorrow') {
                setFormData(prev => ({ ...prev, date: formatDate(tomorrow) }));
            }
        });
    }, [formData.slot]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleCourseSelect = (course) => {
        setFormData(prev => ({
            ...prev,
            course
        }));
    };

    const handleTimeSelect = (time) => {
        setFormData(prev => ({
            ...prev,
            time: time.display
        }));
        setShowTimePicker(false);
    };

    const handleCustomDateSelect = () => {
        if (formData.slot === 'custom') {
            const dateInput = document.createElement('input');
            dateInput.type = 'date';
            dateInput.min = new Date().toISOString().split('T')[0];

            dateInput.onchange = (e) => {
                const selectedDate = new Date(e.target.value);
                const formattedDate = selectedDate.toLocaleDateString('en-US', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                });
                setFormData(prev => ({
                    ...prev,
                    date: formattedDate
                }));
            };

            dateInput.click();
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
    };

    return (
        <>
            <div className="flex flex-col-reverse lg:flex-row gap-8 items-start max-w-full xl:max-w-7xl mx-auto px-4 mt-20">
                {/* Form Section */}
                <div className="w-full lg:w-1/2">
                    <form
                        onSubmit={handleSubmit}
                        className="nav_bg rounded-xl shadow-lg pt-6 pb-4 px-3 xs:px-4 flex flex-col w-full"
                    >
                        {/* Input Fields */}
                        <div className="grid xs:grid-cols-2 gap-3 xs:gap-3.5">
                            {/* Name Input */}
                            <div className="max-xs:col-span-1">
                                <div className="flex items-center max-w-full w-full gap-2 border-slate-800 border rounded-[50px] px-4 md:px-5 py-2 xs:py-2.5 md:py-3 shadow-md justify-between h-11 md:h-14">
                                    <input
                                        className="bg-transparent outline-none border-none  [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none font-normal text-sm sm:text-base leading-[150%]! tracking-normal text-white placeholder:text-gray-400 w-full"
                                        placeholder="Enter your Name"
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <i className="fas fa-user text-gray-400"></i>
                                </div>
                            </div>

                            {/* Phone Input */}
                            <div className="max-xs:col-span-1">
                                <div className="flex items-center max-w-full w-full gap-2 border-slate-800 border rounded-[50px] px-4 md:px-5 py-2 xs:py-2.5 md:py-3 shadow-md justify-between h-11 md:h-14">
                                    <input
                                        className="bg-transparent outline-none border-none  [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none font-normal text-sm sm:text-base leading-[150%]! tracking-normal text-white placeholder:text-gray-400 w-full"
                                        placeholder="Enter your Phone No."
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <i className="fas fa-phone text-gray-400"></i>
                                </div>
                            </div>

                            {/* Email Input */}
                            <div className="max-xs:col-span-1 col-span-2 w-full">
                                <div className="flex items-center max-w-full w-full gap-2 border-slate-800 border rounded-[50px] px-4 md:px-5 py-2 xs:py-2.5 md:py-3 shadow-md justify-between h-11 md:h-14">
                                    <input
                                        className="bg-transparent outline-none border-none font-normal text-sm sm:text-base leading-[150%]! w-full tracking-normal text-white placeholder:text-gray-400"
                                        placeholder="Enter your Email"
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <i className="fas fa-envelope text-gray-400"></i>
                                </div>
                            </div>
                        </div>

                        {/* Course Selection */}
                        <div className="mt-3 md:mt-5">
                            <label className="block text-base xs:text-lg md:text-xl font-medium mb-2.5 text-white">
                                Preferred Course<span className="text-red-600">*</span>
                            </label>

                            {/* Mobile Dropdown */}
                            <div className="block md:hidden">
                                <select
                                    className="w-full appearance-none border border-slate-800 rounded-[50px] px-4 py-2 pr-4 text-base text-gray-300 bg-transparent flex justify-between items-center h-11 md:h-14"
                                    value={formData.course}
                                    onChange={(e) => handleCourseSelect(e.target.value)}
                                >
                                    {courses.map((course) => (
                                        <option key={course} value={course}>
                                            {course}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Desktop Course Grid */}
                            <div className="hidden md:grid grid-cols-1 md:grid-cols-2 gap-3 xs:gap-3.5">
                                {courses.map((course) => (
                                    <button
                                        key={course}
                                        type="button"
                                        onClick={() => handleCourseSelect(course)}
                                        className={`flex items-center gap-3 border rounded-[50px] cursor-pointer transition px-4 py-4 xs:py-2 sm:py-2.5 md:py-3 lg:py-[13.2px] md:px-5 max-w-full w-full text-base leading-[150%]! font-normal tracking-normal uppercase justify-between h-14 ${formData.course === course
                                            ? ' border-blue-500 text-white'
                                            : ' border-slate-800 text-gray-600'
                                            }`}
                                    >
                                        <span className="text-sm md:text-base font-normal">{course}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Time Slot Selection */}
                        <div className="w-full mt-5">
                            <label className="block text-base xs:text-lg md:text-xl font-medium mb-2.5 text-white">
                                Preferred Time Slot<span className="text-red-600">*</span>
                            </label>

                            {/* Radio Buttons */}
                            <div className="flex flex-wrap flex-row gap-3 md:gap-6 text-sm md:text-base font-normal mb-3">
                                {['today', 'tomorrow', 'custom'].map((slot) => (
                                    <label key={slot} className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            className="accent-blue-600"
                                            type="radio"
                                            value={slot}
                                            checked={formData.slot === slot}
                                            onChange={handleInputChange}
                                            name="slot"
                                        />
                                        <span className="text-white capitalize">{slot}</span>
                                    </label>
                                ))}
                            </div>

                            {/* Date and Time Selection */}
                            <div className="flex gap-4 flex-col sm:flex-row">
                                {/* Date Picker */}
                                <div
                                    onClick={handleCustomDateSelect}
                                    className="relative max-xs:w-full! flex items-center gap-2 xs:gap-3 text-gray-500 cursor-pointer rounded-4xl border border-slate-800 px-2.5 md:px-5 py-1.5 xs:py-2 sm:py-2.5 md:py-3 lg:py-[13.2px] w-[230px] justify-between"
                                >
                                    <span className="text-sm xs:text-base leading-[150%]! font-normal tracking-normal text-gray-500">
                                        {formData.date}
                                    </span>
                                    <div className="bg-blue-50 max-xs:w-7 xs:w-8 max-xs:h-7 xs:h-8 rounded-full text-blue-600 flex justify-center items-center">
                                        <i className="fas fa-calendar"></i>
                                    </div>
                                </div>

                                {/* Time Picker */}
                                <div className="relative max-xs:w-full!">
                                    <div
                                        onClick={() => setShowTimePicker(!showTimePicker)}
                                        className="flex items-center gap-2 xs:gap-3 text-gray-500 cursor-pointer rounded-4xl border border-slate-800 px-2.5 py-1.5 xs:py-2 sm:py-2.5 md:py-3 lg:py-[13.2px] md:px-5 w-[230px] justify-between"
                                    >
                                        <span className="text-sm xs:text-base leading-[150%]! font-normal tracking-normal text-gray-500">
                                            {formData.time}
                                        </span>
                                        <div className="bg-blue-50 max-xs:w-7 xs:w-8 max-xs:h-7 xs:h-8 flex justify-center items-center rounded-full text-blue-600">
                                            <i className="fas fa-clock"></i>
                                        </div>
                                    </div>

                                    {/* Time Picker Dropdown */}
                                    {showTimePicker && (
                                        <div className="absolute top-full left-0 mt-2 w-[230px] bg-slate-800 border border-slate-800 rounded-lg shadow-lg z-50 max-h-60 overflow-y-scroll">
                                            <div className="p-3">
                                                <div className="text-white text-sm font-medium mb-2">
                                                    Available Time Slots {formData.slot === 'today' && '(Next 1 hour)'}
                                                </div>
                                                {availableTimes.length > 0 ? (
                                                    <div className="grid grid-cols-2 gap-2">
                                                        {availableTimes.map((time, index) => (
                                                            <button
                                                                key={index}
                                                                type="button"
                                                                onClick={() => handleTimeSelect(time)}
                                                                className="p-2 text-sm text-white bg-slate-800 rounded hover:bg-blue-500 transition-colors"
                                                            >
                                                                {time.display}
                                                            </button>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <div className="text-gray-400 text-sm p-2 text-center">
                                                        No available slots for {formData.slot}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Selected Time Display */}
                            <div className="mt-4 p-3 rounded-lg text-sm xs:text-base font-normal text-white">
                                <span className="text-sm xs:text-lg font-semibold xs:font-medium">Selected: </span>
                                {formData.date} at {formData.time === 'Select Time' ? 'No time selected' : formData.time}
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="disabled:pointer-events-none disabled:opacity-70 buttonbg text-white mt-4 xs:mt-[30px] px-4 py-2.5 xs:py-3 md:py-4 hover:scale-95 transition-transform duration-200 flex justify-center items-center rounded-lg font-medium text-lg"
                        >
                            Submit
                        </button>
                    </form>
                </div>
                {/* Spline Viewer Section */}
                <div className='w-full lg:w-1/2 h-[600px]'>
                    <AnimationSpline />
                </div>

            </div>
        </>
    );
};

export default GetIntouch;