import React, { useState, useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';

const STORY_DURATION = 5000; // 5 seconds per story

const Stories = () => {
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const progressTimer = useRef(null);
  const slideTimer = useRef(null);
  const startTimeRef = useRef(null);
  const pausedProgressRef = useRef(0);

  // Sample data structure
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
          },
          {
            id: "59feb0e4-68ce-4c6a-a2b6-c34eb82322b4",
            parent: "2f143cc1-93f8-4b3b-a23c-b2836b79cd25",
            image:"https://appstorysmediabucket.s3.amazonaws.com/story_slides/WhatsApp_Image_2025-01-10_at_13.01.31_7eadf664.jpg",
            video: null,
            link: "https://app20.in/ios/1",
            button_text: "iOS Offer 1",
            order: 2
            },
            {
              id: "45f756ed-7eaf-45ca-b057-dcd784f8909f",
              parent: "2f143cc1-93f8-4b3b-a23c-b2836b79cd25",
              image:
              "https://appstorysmediabucket.s3.amazonaws.com/story_slides/WhatsApp_Image_2025-01-10_at_13.01.32_290dca51.jpg",
              video: null,
              link: "https://app20.in/ios/2",
              button_text: "iOS Offer 2",
              order: 3
              },
              {
                id: "d9825fb3-0fa3-4db9-9801-e044c7936172",
                parent: "2f143cc1-93f8-4b3b-a23c-b2836b79cd25",
                image:
                "https://appstorysmediabucket.s3.amazonaws.com/story_slides/WhatsApp_Image_2025-01-10_at_13.01.32_a5975c0b.jpg",
                video: null,
                link: "https://app20.in/ios/4",
                button_text: "iOS Offer 4",
                order: 4
                }
        ]
      },

      {
        "id": "ba82ab84-86bb-4c67-97fd-620410523119",
        "name": "Zupee",
        "thumbnail":
        "https://appstorysmediabucket.s3.amazonaws.com/story_groups/Group_22.png",
        "ringColor": "#ffd500",
        "nameColor": "#111111",
        "order": 8,
        "slides": [
        {
        "id": "d9afb861-cda2-484e-a714-ccddcd79f134",
        "parent": "ba82ab84-86bb-4c67-97fd-620410523119",
        "image":
        "https://appstorysmediabucket.s3.amazonaws.com/story_slides/Frame_36.png",
        "video": null,
        "link": "https://app20.in/3",
        "button_text": "Start Offer",
        "order": 1
        }
        ]
        },
        {
          "id": "128d0e25-cf02-4ce0-842f-fc36938701b6",
          "name": "EloElo",
          "thumbnail":
          "https://appstorysmediabucket.s3.amazonaws.com/story_groups/eleelo.png",
          "ringColor": "#fbff00",
          "nameColor": "#000000",
          "order": 9,
          "slides": [
          {
          "id": "e19c3f6b-2108-474f-827c-beca7d3c1eb4",
          "parent": "128d0e25-cf02-4ce0-842f-fc36938701b6",
          "image":
          "https://appstorysmediabucket.s3.amazonaws.com/story_slides/App-min.png",
          "video": null,
          "link": "https://app20.in/6",
          "button_text": "EloElo App Offer",
          "order": 1
          }
          ]
          },
          {
            "id": "47bc5cbe-5deb-4fe3-8fbc-ba8de055702c",
            "name": "New Offers",
            "thumbnail":
            "https://appstorysmediabucket.s3.amazonaws.com/story_groups/new-offer.png",
            "ringColor": "#ffdd00",
            "nameColor": "#000000",
            "order": 10,
            "slides": [
            {
            "id": "f6209a23-7c11-418c-97d2-a4b69155f74f",
            "parent": "47bc5cbe-5deb-4fe3-8fbc-ba8de055702c",
            "image":
            "https://appstorysmediabucket.s3.amazonaws.com/story_slides/WhatsApp_Image_2025-01-10_at_12.31.32.jpeg",
            "video": null,
            "link": "https://app20.in/7",
            "button_text": "Ludo Supreme Offer",
            "order": 1
            },
            {
            "id": "7e6f8afc-b3ff-4ddc-b9b4-759f8decfc56",
            "parent": "47bc5cbe-5deb-4fe3-8fbc-ba8de055702c",
            "image":
            "https://appstorysmediabucket.s3.amazonaws.com/story_slides/WhatsApp_Image_2025-01-10_at_12.32.26.jpeg",
            "video": null,
            "link": "https://app20.in/8",
            "button_text": "Pepperfry Offer",
            "order": 2
            }
            ]
          
          }
      // ... other story groups
    ]
  };

  const startProgressTimer = () => {
    if (progressTimer.current) clearInterval(progressTimer.current);
    if (slideTimer.current) clearTimeout(slideTimer.current);

    startTimeRef.current = Date.now() - (pausedProgressRef.current * STORY_DURATION / 100);
    
    progressTimer.current = setInterval(() => {
      if (!isPaused) {
        const elapsedTime = Date.now() - startTimeRef.current;
        const newProgress = (elapsedTime / STORY_DURATION) * 100;
        
        if (newProgress >= 100) {
          clearInterval(progressTimer.current);
        } else {
          setProgress(newProgress);
        }
      }
    }, 10);

    if (!isPaused) {
      const remainingTime = STORY_DURATION * (1 - pausedProgressRef.current / 100);
      slideTimer.current = setTimeout(() => {
        handleNext();
      }, remainingTime);
    }
  };

  useEffect(() => {
    if (selectedGroup && !isPaused) {
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
    setIsPaused(false);
    pausedProgressRef.current = 0;
  };

  const handleClose = () => {
    setSelectedGroup(null);
    setCurrentSlideIndex(0);
    setProgress(0);
    setIsPaused(false);
    pausedProgressRef.current = 0;
  };

  const handleNext = () => {
    if (!selectedGroup) return;

    pausedProgressRef.current = 0;
    
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

    pausedProgressRef.current = 0;
    
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

  const togglePause = () => {
    if (!isPaused) {
      // Pausing
      pausedProgressRef.current = progress;
      if (progressTimer.current) clearInterval(progressTimer.current);
      if (slideTimer.current) clearTimeout(slideTimer.current);
    }
    setIsPaused(!isPaused);
  };

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
        // Story Viewer with semi-transparent background
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
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

          {/* Close button */}
          <button 
            onClick={handleClose}
            className="absolute top-8 right-4 text-white p-2 hover:bg-gray-800/50 rounded-full transition-colors z-20"
          >
            <X size={24} />
          </button>

          {/* Navigation buttons */}
          <div className="absolute inset-0 flex items-center justify-between px-4 z-10">
            <button
              onClick={handlePrevious}
              className="w-12 h-12 flex items-center justify-center bg-black/50 rounded-full text-white hover:bg-black/75 transition-all"
            >
              <ChevronLeft size={28} />
            </button>

            <button
              onClick={togglePause}
              className="w-12 h-12 flex items-center justify-center bg-black/50 rounded-full text-white hover:bg-black/75 transition-all"
            >
              {isPaused ? <Play size={28} /> : <Pause size={28} />}
            </button>

            <button
              onClick={handleNext}
              className="w-12 h-12 flex items-center justify-center bg-black/50 rounded-full text-white hover:bg-black/75 transition-all"
            >
              <ChevronRight size={28} />
            </button>
          </div>

          {/* Story content */}
          <div className="relative w-full max-w-lg h-full max-h-[80vh] flex items-center justify-center px-4">
            <img
              src={selectedGroup.slides[currentSlideIndex].image}
              alt={`Story ${currentSlideIndex + 1}`}
              className="w-full h-full object-contain rounded-lg"
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