import React, { useState, useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const STORY_DURATION = 5000; // 5 seconds per story

const Stories = () => {
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [progress, setProgress] = useState(0);
  const progressTimer = useRef(null);
  const slideTimer = useRef(null);

  // Sample data - replace with your actual data
  const data = {
    id: "3adb0aa2-4387-4fab-a8ed-4c38fc2334e4",
    campaign_type: "STR",
    details: [
      {
        id: "fe64197c-fa99-4f19-8132-0b61ee1956f5",
        name: "CheQ",
        thumbnail: "https://appstorysmediabucket.s3.amazonaws.com/story_groups/Screenshot_2024-12-24_at_1.03.07PM.png",
        ringColor: "#d7b404",
        nameColor: "#000000",
        order: 2,
        slides: [
          {
            id: "ff9d8e07-def5-4781-9944-6fe7d8dcec28",
            parent: "fe64197c-fa99-4f19-8132-0b61ee1956f5",
            image: "https://appstorysmediabucket.s3.amazonaws.com/story_slides/New_App_Android.png",
            video: null,
            link: "https://app20.in/4",
            button_text: "CheQ Offer",
            order: 1
          }
        ]
      },
      {
        id: "38779bb3-52ac-440d-bdd3-80b6e18118a2",
        name: "Do's and Don't",
        thumbnail: "https://appstorysmediabucket.s3.amazonaws.com/story_groups/Group_24.png",
        ringColor: "#ffea00",
        nameColor: "#111111",
        order: 4,
        slides: [
          {
            id: "17859fbc-9457-40a6-8d83-0f8482694323",
            parent: "38779bb3-52ac-440d-bdd3-80b6e18118a2",
            image: "https://appstorysmediabucket.s3.amazonaws.com/story_slides/Frame_38.png",
            video: null,
            link: "",
            button_text: "",
            order: 2
          }
        ]
      },
      {
        id: "2f143cc1-93f8-4b3b-a23c-b2836b79cd25",
        name: "IOS",
        thumbnail: "https://appstorysmediabucket.s3.amazonaws.com/story_groups/Frame_2_2.png",
        ringColor: "#ffd500",
        nameColor: "#111111",
        order: 5,
        slides: [
          {
            id: "7d945e48-3d3f-4a74-bd04-0b2296bbb9ea",
            parent: "2f143cc1-93f8-4b3b-a23c-b2836b79cd25",
            image: "https://appstorysmediabucket.s3.amazonaws.com/story_slides/sportsbaazi.jpg",
            video: null,
            link: "https://app20.in/ios",
            button_text: "iOS Offer",
            order: 1
          }
        ]
      },
      // ... other story groups
    ]
  };
  const startProgressTimer = () => {
    if (progressTimer.current) clearInterval(progressTimer.current);
    if (slideTimer.current) clearTimeout(slideTimer.current);

    let startTime = Date.now();
    setProgress(0);

    progressTimer.current = setInterval(() => {
      if (!isPaused) {
        const elapsedTime = Date.now() - startTime;
        const newProgress = (elapsedTime / STORY_DURATION) * 100;
        
        if (newProgress >= 100) {
          clearInterval(progressTimer.current);
        } else {
          setProgress(newProgress);
        }
      }
    }, 10);

    slideTimer.current = setTimeout(() => {
      if (!isPaused) handleNext();
    }, STORY_DURATION);
  };

  useEffect(() => {
    if (selectedGroup) {
      startProgressTimer();
    }
    return () => {
      if (progressTimer.current) clearInterval(progressTimer.current);
      if (slideTimer.current) clearTimeout(slideTimer.current);
    };
  }, [selectedGroup, currentSlideIndex, isPaused]);

  const handleStoryClick = (group) => {
    setSelectedGroup(group);
    setCurrentSlideIndex(0);
    setProgress(0);
  };

  const handleClose = () => {
    setSelectedGroup(null);
    setCurrentSlideIndex(0);
    setProgress(0);
  };

  const handleNext = () => {
    if (!selectedGroup) return;

    if (currentSlideIndex < selectedGroup.slides.length - 1) {
      setCurrentSlideIndex(prev => prev + 1);
      setProgress(0);
    } else {
      const currentIndex = data.details.findIndex(g => g.id === selectedGroup.id);
      if (currentIndex < data.details.length - 1) {
        setSelectedGroup(data.details[currentIndex + 1]);
        setCurrentSlideIndex(0);
        setProgress(0);
      } else {
        handleClose();
      }
    }
  };

  const handlePrevious = () => {
    if (!selectedGroup) return;

    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(prev => prev - 1);
      setProgress(0);
    } else {
      const currentIndex = data.details.findIndex(g => g.id === selectedGroup.id);
      if (currentIndex > 0) {
        setSelectedGroup(data.details[currentIndex - 1]);
        setCurrentSlideIndex(data.details[currentIndex - 1].slides.length - 1);
        setProgress(0);
      }
    }
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
    setIsPaused(true);
  };

  const handleTouchMove = (e) => {
    if (!touchStart) return;

    const xDiff = touchStart - e.touches[0].clientX;

    if (Math.abs(xDiff) > 50) {
      if (xDiff > 0) {
        handleNext();
      } else {
        handlePrevious();
      }
      setTouchStart(null);
    }
  };

  const handleTouchEnd = () => {
    setTouchStart(null);
    setIsPaused(false);
  };

  const handleMouseDown = () => setIsPaused(true);
  const handleMouseUp = () => setIsPaused(false);

  return (
    <div className="p-4">
      {!selectedGroup ? (
        // Story Groups Display
        <div className="flex gap-4 overflow-x-auto pb-2">
          {data.details.sort((a, b) => a.order - b.order).map((group) => (
            <div 
              key={group.id} 
              className="flex flex-col items-center cursor-pointer transform transition-transform hover:scale-105"
              onClick={() => handleStoryClick(group)}
            >
              <div 
                className="w-20 h-20 rounded-full mb-2 p-0.5 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500"
              >
                <div className="w-full h-full p-0.5 bg-white rounded-full">
                  <img
                    src={group.thumbnail}
                    alt={group.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
              </div>
              <span 
                style={{ color: group.nameColor }} 
                className="text-sm font-medium"
              >
                {group.name}
              </span>
            </div>
          ))}
        </div>
      ) : (
        // Story Viewer
        <div 
          className="fixed inset-0 bg-black flex items-center justify-center z-50"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
        >
          {/* Progress bars */}
          <div className="absolute top-4 left-4 right-4 flex gap-1">
            {selectedGroup.slides.map((_, index) => (
              <div 
                key={index}
                className="h-1 flex-1 bg-gray-600 rounded overflow-hidden"
              >
                <div 
                  className="h-full bg-white rounded transition-all duration-100"
                  style={{ 
                    width: `${index === currentSlideIndex ? progress : index < currentSlideIndex ? 100 : 0}%`
                  }}
                />
              </div>
            ))}
          </div>

          <button 
            onClick={handleClose}
            className="absolute top-8 right-4 text-white p-2 hover:bg-gray-800 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
          
          <div 
            className="absolute left-0 w-1/4 h-full cursor-pointer"
            onClick={handlePrevious}
          />
          <div 
            className="absolute right-0 w-1/4 h-full cursor-pointer"
            onClick={handleNext}
          />

          <div className="w-full max-w-lg px-4">
            <img
              src={selectedGroup.slides[currentSlideIndex].image}
              alt={`Story ${currentSlideIndex + 1}`}
              className="w-full h-auto rounded-lg"
            />
            
            {selectedGroup.slides[currentSlideIndex].button_text && (
              <a
                href={selectedGroup.slides[currentSlideIndex].link}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 
                         bg-blue-500 text-white px-6 py-2 rounded-full 
                         hover:bg-blue-600 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                {selectedGroup.slides[currentSlideIndex].button_text}
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Stories;