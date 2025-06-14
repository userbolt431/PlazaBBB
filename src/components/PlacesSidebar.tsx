import React, { useState } from 'react';
import { Search, ChevronRight, X } from 'lucide-react';

interface PlacesSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Country {
  id: string;
  name: string;
  cities: {
    name: string;
    places: {
      name: string;
      description: string;
      image: string;
      tags: string[];
    }[];
  }[];
}

interface Region {
  id: string;
  name: string;
  image: string;
  countries: Country[];
  trendingPlaces: {
    name: string;
    description: string;
    image: string;
    tags: string[];
    country: string;
    city: string;
  }[];
}

const regions: Region[] = [
  {
    id: 'europe',
    name: 'Europe',
    image: 'https://images.pexels.com/photos/2570063/pexels-photo-2570063.jpeg',
    trendingPlaces: [
      {
        name: 'Eiffel Tower',
        description: 'Iconic iron lattice tower on the Champ de Mars, symbol of Paris and France.',
        image: 'https://images.pexels.com/photos/699466/pexels-photo-699466.jpeg',
        tags: ['Landmark', 'Architecture', 'Tourism'],
        country: 'France',
        city: 'Paris'
      },
      {
        name: 'Colosseum',
        description: 'Ancient amphitheater in the heart of Rome, an iconic symbol of the Roman Empire.',
        image: 'https://images.pexels.com/photos/532263/pexels-photo-532263.jpeg',
        tags: ['Historical', 'Architecture', 'Tourism'],
        country: 'Italy',
        city: 'Rome'
      },
      {
        name: 'Sagrada Familia',
        description: 'Antoni Gaudí\'s masterpiece basilica in Barcelona, a UNESCO World Heritage Site.',
        image: 'https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg',
        tags: ['Architecture', 'Religious', 'Art'],
        country: 'Spain',
        city: 'Barcelona'
      },
      {
        name: 'Big Ben',
        description: 'Famous clock tower at the Palace of Westminster in London.',
        image: 'https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg',
        tags: ['Landmark', 'Historical', 'Architecture'],
        country: 'United Kingdom',
        city: 'London'
      }
    ],
    countries: [
      {
        id: 'france',
        name: 'France',
        cities: [
          {
            name: 'Paris',
            places: [
              {
                name: 'Eiffel Tower',
                description: 'Iconic iron lattice tower on the Champ de Mars, symbol of Paris and France.',
                image: 'https://images.pexels.com/photos/699466/pexels-photo-699466.jpeg',
                tags: ['Landmark', 'Architecture', 'Tourism']
              },
              {
                name: 'Louvre Museum',
                description: 'World\'s largest art museum and home to many famous works including the Mona Lisa.',
                image: 'https://images.pexels.com/photos/2363/france-landmark-lights-night.jpg',
                tags: ['Art', 'Museum', 'Culture']
              }
            ]
          },
          {
            name: 'Lyon',
            places: [
              {
                name: 'Basilique Notre-Dame de Fourvière',
                description: 'Beautiful basilica overlooking the city of Lyon.',
                image: 'https://images.pexels.com/photos/2901209/pexels-photo-2901209.jpeg',
                tags: ['Religious', 'Architecture', 'Views']
              }
            ]
          },
          {
            name: 'Nice',
            places: [
              {
                name: 'Promenade des Anglais',
                description: 'Famous waterfront promenade along the Mediterranean coast.',
                image: 'https://images.pexels.com/photos/1010657/pexels-photo-1010657.jpeg',
                tags: ['Beach', 'Promenade', 'Mediterranean']
              }
            ]
          }
        ]
      },
      {
        id: 'italy',
        name: 'Italy',
        cities: [
          {
            name: 'Rome',
            places: [
              {
                name: 'Colosseum',
                description: 'Ancient amphitheater in the heart of Rome, an iconic symbol of the Roman Empire.',
                image: 'https://images.pexels.com/photos/532263/pexels-photo-532263.jpeg',
                tags: ['Historical', 'Architecture', 'Tourism']
              },
              {
                name: 'Vatican Museums',
                description: 'World-renowned museums featuring art collections including the Sistine Chapel.',
                image: 'https://images.pexels.com/photos/2402926/pexels-photo-2402926.jpeg',
                tags: ['Art', 'Culture', 'Religious']
              }
            ]
          },
          {
            name: 'Florence',
            places: [
              {
                name: 'Uffizi Gallery',
                description: 'One of the most famous art museums in the world.',
                image: 'https://images.pexels.com/photos/1797161/pexels-photo-1797161.jpeg',
                tags: ['Art', 'Museum', 'Renaissance']
              }
            ]
          },
          {
            name: 'Venice',
            places: [
              {
                name: 'St. Mark\'s Square',
                description: 'The principal public square of Venice.',
                image: 'https://images.pexels.com/photos/1797161/pexels-photo-1797161.jpeg',
                tags: ['Historical', 'Architecture', 'Square']
              }
            ]
          }
        ]
      },
      {
        id: 'spain',
        name: 'Spain',
        cities: [
          {
            name: 'Barcelona',
            places: [
              {
                name: 'Sagrada Familia',
                description: 'Antoni Gaudí\'s masterpiece basilica, a UNESCO World Heritage Site.',
                image: 'https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg',
                tags: ['Architecture', 'Religious', 'Art']
              }
            ]
          },
          {
            name: 'Madrid',
            places: [
              {
                name: 'Prado Museum',
                description: 'Spain\'s main national art museum.',
                image: 'https://images.pexels.com/photos/2901209/pexels-photo-2901209.jpeg',
                tags: ['Art', 'Museum', 'Culture']
              }
            ]
          },
          {
            name: 'Seville',
            places: [
              {
                name: 'Alcázar of Seville',
                description: 'Royal palace originally developed by Moorish Muslim kings.',
                image: 'https://images.pexels.com/photos/1797161/pexels-photo-1797161.jpeg',
                tags: ['Palace', 'Historical', 'Architecture']
              }
            ]
          }
        ]
      },
      {
        id: 'uk',
        name: 'United Kingdom',
        cities: [
          {
            name: 'London',
            places: [
              {
                name: 'Big Ben',
                description: 'Famous clock tower at the Palace of Westminster.',
                image: 'https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg',
                tags: ['Landmark', 'Historical', 'Architecture']
              }
            ]
          },
          {
            name: 'Edinburgh',
            places: [
              {
                name: 'Edinburgh Castle',
                description: 'Historic fortress dominating the skyline of Edinburgh.',
                image: 'https://images.pexels.com/photos/1797161/pexels-photo-1797161.jpeg',
                tags: ['Castle', 'Historical', 'Views']
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'asia',
    name: 'Asia',
    image: 'https://images.pexels.com/photos/1440476/pexels-photo-1440476.jpeg',
    trendingPlaces: [
      {
        name: 'Senso-ji Temple',
        description: 'Ancient Buddhist temple in Asakusa, Tokyo\'s oldest temple.',
        image: 'https://images.pexels.com/photos/5169056/pexels-photo-5169056.jpeg',
        tags: ['Religious', 'Cultural', 'Historical'],
        country: 'Japan',
        city: 'Tokyo'
      },
      {
        name: 'Burj Khalifa',
        description: 'World\'s tallest building with observation decks offering panoramic views.',
        image: 'https://images.pexels.com/photos/162031/dubai-tower-arab-khalifa-162031.jpeg',
        tags: ['Architecture', 'Modern', 'Luxury'],
        country: 'UAE',
        city: 'Dubai'
      }
    ],
    countries: [
      {
        id: 'japan',
        name: 'Japan',
        cities: [
          {
            name: 'Tokyo',
            places: [
              {
                name: 'Senso-ji Temple',
                description: 'Ancient Buddhist temple in Asakusa, Tokyo\'s oldest temple.',
                image: 'https://images.pexels.com/photos/5169056/pexels-photo-5169056.jpeg',
                tags: ['Religious', 'Cultural', 'Historical']
              },
              {
                name: 'Shibuya Crossing',
                description: 'Famous pedestrian crossing known as the busiest in the world.',
                image: 'https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg',
                tags: ['Urban', 'Modern', 'Iconic']
              }
            ]
          },
          {
            name: 'Kyoto',
            places: [
              {
                name: 'Fushimi Inari Shrine',
                description: 'Famous shrine with thousands of vermillion torii gates.',
                image: 'https://images.pexels.com/photos/5169056/pexels-photo-5169056.jpeg',
                tags: ['Religious', 'Cultural', 'Nature']
              }
            ]
          }
        ]
      },
      {
        id: 'uae',
        name: 'United Arab Emirates',
        cities: [
          {
            name: 'Dubai',
            places: [
              {
                name: 'Burj Khalifa',
                description: 'World\'s tallest building with observation decks offering panoramic views.',
                image: 'https://images.pexels.com/photos/162031/dubai-tower-arab-khalifa-162031.jpeg',
                tags: ['Architecture', 'Modern', 'Luxury']
              },
              {
                name: 'Palm Jumeirah',
                description: 'Artificial archipelago in the shape of a palm tree.',
                image: 'https://images.pexels.com/photos/4388164/pexels-photo-4388164.jpeg',
                tags: ['Man-made', 'Luxury', 'Beach']
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'africa',
    name: 'Africa',
    image: 'https://images.pexels.com/photos/259447/pexels-photo-259447.jpeg',
    trendingPlaces: [
      {
        name: 'Table Mountain',
        description: 'Flat-topped mountain overlooking Cape Town, accessible by hiking or cable car.',
        image: 'https://images.pexels.com/photos/1004665/pexels-photo-1004665.jpeg',
        tags: ['Nature', 'Hiking', 'Views'],
        country: 'South Africa',
        city: 'Cape Town'
      },
      {
        name: 'Pyramids of Giza',
        description: 'Ancient Egyptian pyramids and the Great Sphinx, symbols of ancient civilization.',
        image: 'https://images.pexels.com/photos/71241/pexels-photo-71241.jpeg',
        tags: ['Ancient', 'Wonder', 'Historical'],
        country: 'Egypt',
        city: 'Cairo'
      }
    ],
    countries: [
      {
        id: 'south-africa',
        name: 'South Africa',
        cities: [
          {
            name: 'Cape Town',
            places: [
              {
                name: 'Table Mountain',
                description: 'Flat-topped mountain overlooking Cape Town, accessible by hiking or cable car.',
                image: 'https://images.pexels.com/photos/1004665/pexels-photo-1004665.jpeg',
                tags: ['Nature', 'Hiking', 'Views']
              },
              {
                name: 'Robben Island',
                description: 'Historic prison island where Nelson Mandela was imprisoned.',
                image: 'https://images.pexels.com/photos/1485894/pexels-photo-1485894.jpeg',
                tags: ['Historical', 'Cultural', 'Museum']
              }
            ]
          }
        ]
      },
      {
        id: 'egypt',
        name: 'Egypt',
        cities: [
          {
            name: 'Cairo',
            places: [
              {
                name: 'Pyramids of Giza',
                description: 'Ancient Egyptian pyramids and the Great Sphinx, symbols of ancient civilization.',
                image: 'https://images.pexels.com/photos/71241/pexels-photo-71241.jpeg',
                tags: ['Ancient', 'Wonder', 'Historical']
              },
              {
                name: 'Egyptian Museum',
                description: 'Museum housing ancient Egyptian artifacts including Tutankhamun\'s treasures.',
                image: 'https://images.pexels.com/photos/71281/pexels-photo-71281.jpeg',
                tags: ['Museum', 'Historical', 'Cultural']
              }
            ]
          }
        ]
      },
      {
        id: 'morocco',
        name: 'Morocco',
        cities: [
          {
            name: 'Chefchaouen',
            places: [
              {
                name: 'Blue Medina',
                description: 'Famous blue-painted streets and buildings of Chefchaouen.',
                image: 'https://images.pexels.com/photos/4388167/pexels-photo-4388167.jpeg',
                tags: ['Cultural', 'Architecture', 'Photography']
              }
            ]
          },
          {
            name: 'Marrakech',
            places: [
              {
                name: 'Jemaa el-Fnaa',
                description: 'Famous square and marketplace in Marrakech\'s medina quarter.',
                image: 'https://images.pexels.com/photos/4388167/pexels-photo-4388167.jpeg',
                tags: ['Cultural', 'Market', 'Traditional']
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'north-america',
    name: 'North America',
    image: 'https://images.pexels.com/photos/290386/pexels-photo-290386.jpeg',
    trendingPlaces: [
      {
        name: 'Statue of Liberty',
        description: 'Iconic symbol of freedom and democracy on Liberty Island.',
        image: 'https://images.pexels.com/photos/64271/queen-of-liberty-statue-of-liberty-new-york-liberty-statue-64271.jpeg',
        tags: ['Landmark', 'Historical', 'Tourism'],
        country: 'USA',
        city: 'New York'
      },
      {
        name: 'Golden Gate Bridge',
        description: 'Iconic suspension bridge spanning the Golden Gate strait.',
        image: 'https://images.pexels.com/photos/208745/pexels-photo-208745.jpeg',
        tags: ['Architecture', 'Landmark', 'Engineering'],
        country: 'USA',
        city: 'San Francisco'
      }
    ],
    countries: [
      {
        id: 'usa',
        name: 'United States',
        cities: [
          {
            name: 'New York',
            places: [
              {
                name: 'Statue of Liberty',
                description: 'Iconic symbol of freedom and democracy on Liberty Island.',
                image: 'https://images.pexels.com/photos/64271/queen-of-liberty-statue-of-liberty-new-york-liberty-statue-64271.jpeg',
                tags: ['Landmark', 'Historical', 'Tourism']
              },
              {
                name: 'Central Park',
                description: 'Massive urban park in Manhattan with various attractions.',
                image: 'https://images.pexels.com/photos/76969/central-park-new-york-panorama-76969.jpeg',
                tags: ['Nature', 'Recreation', 'Urban']
              }
            ]
          },
          {
            name: 'San Francisco',
            places: [
              {
                name: 'Golden Gate Bridge',
                description: 'Iconic suspension bridge spanning the Golden Gate strait.',
                image: 'https://images.pexels.com/photos/208745/pexels-photo-208745.jpeg',
                tags: ['Architecture', 'Landmark', 'Engineering']
              },
              {
                name: 'Alcatraz Island',
                description: 'Former high-security prison on an island in San Francisco Bay.',
                image: 'https://images.pexels.com/photos/1141853/pexels-photo-1141853.jpeg',
                tags: ['Historical', 'Prison', 'Museum']
              }
            ]
          }
        ]
      },
      {
        id: 'canada',
        name: 'Canada',
        cities: [
          {
            name: 'Toronto',
            places: [
              {
                name: 'CN Tower',
                description: 'Iconic telecommunications tower and tourist attraction.',
                image: 'https://images.pexels.com/photos/374870/pexels-photo-374870.jpeg',
                tags: ['Architecture', 'Views', 'Modern']
              }
            ]
          },
          {
            name: 'Vancouver',
            places: [
              {
                name: 'Stanley Park',
                description: 'Large urban park surrounded by water on three sides.',
                image: 'https://images.pexels.com/photos/1004665/pexels-photo-1004665.jpeg',
                tags: ['Nature', 'Park', 'Recreation']
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'south-america',
    name: 'South America',
    image: 'https://images.pexels.com/photos/1768744/pexels-photo-1768744.jpeg',
    trendingPlaces: [
      {
        name: 'Christ the Redeemer',
        description: 'Art Deco statue of Jesus Christ atop Corcovado mountain.',
        image: 'https://images.pexels.com/photos/2868242/pexels-photo-2868242.jpeg',
        tags: ['Landmark', 'Religious', 'Views'],
        country: 'Brazil',
        city: 'Rio de Janeiro'
      },
      {
        name: 'Machu Picchu',
        description: 'Ancient Incan city set high in the Andes Mountains.',
        image: 'https://images.pexels.com/photos/2356045/pexels-photo-2356045.jpeg',
        tags: ['Ancient', 'Wonder', 'Archaeological'],
        country: 'Peru',
        city: 'Cusco'
      }
    ],
    countries: [
      {
        id: 'brazil',
        name: 'Brazil',
        cities: [
          {
            name: 'Rio de Janeiro',
            places: [
              {
                name: 'Christ the Redeemer',
                description: 'Art Deco statue of Jesus Christ atop Corcovado mountain.',
                image: 'https://images.pexels.com/photos/2868242/pexels-photo-2868242.jpeg',
                tags: ['Landmark', 'Religious', 'Views']
              },
              {
                name: 'Copacabana Beach',
                description: 'Famous beach known for its crescent shape and lively atmosphere.',
                image: 'https://images.pexels.com/photos/2868255/pexels-photo-2868255.jpeg',
                tags: ['Beach', 'Recreation', 'Culture']
              }
            ]
          }
        ]
      },
      {
        id: 'peru',
        name: 'Peru',
        cities: [
          {
            name: 'Cusco',
            places: [
              {
                name: 'Machu Picchu',
                description: 'Ancient Incan city set high in the Andes Mountains.',
                image: 'https://images.pexels.com/photos/2356045/pexels-photo-2356045.jpeg',
                tags: ['Ancient', 'Wonder', 'Archaeological']
              },
              {
                name: 'Sacred Valley',
                description: 'Valley with numerous archaeological remains and villages.',
                image: 'https://images.pexels.com/photos/2356087/pexels-photo-2356087.jpeg',
                tags: ['Historical', 'Nature', 'Cultural']
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'oceania',
    name: 'Oceania',
    image: 'https://images.pexels.com/photos/1878293/pexels-photo-1878293.jpeg',
    trendingPlaces: [
      {
        name: 'Sydney Opera House',
        description: 'Iconic performing arts venue with distinctive shell-like design.',
        image: 'https://images.pexels.com/photos/1878293/pexels-photo-1878293.jpeg',
        tags: ['Architecture', 'Arts', 'Landmark'],
        country: 'Australia',
        city: 'Sydney'
      },
      {
        name: 'Sky Tower',
        description: 'Observation and telecommunications tower in city center.',
        image: 'https://images.pexels.com/photos/5169489/pexels-photo-5169489.jpeg',
        tags: ['Modern', 'Views', 'Architecture'],
        country: 'New Zealand',
        city: 'Auckland'
      }
    ],
    countries: [
      {
        id: 'australia',
        name: 'Australia',
        cities: [
          {
            name: 'Sydney',
            places: [
              {
                name: 'Sydney Opera House',
                description: 'Iconic performing arts venue with distinctive shell-like design.',
                image: 'https://images.pexels.com/photos/1878293/pexels-photo-1878293.jpeg',
                tags: ['Architecture', 'Arts', 'Landmark']
              },
              {
                name: 'Bondi Beach',
                description: 'Famous beach known for its golden sand and surfing.',
                image: 'https://images.pexels.com/photos/1878354/pexels-photo-1878354.jpeg',
                tags: ['Beach', 'Surfing', 'Recreation']
              }
            ]
          }
        ]
      },
      {
        id: 'new-zealand',
        name: 'New Zealand',
        cities: [
          {
            name: 'Auckland',
            places: [
              {
                name: 'Sky Tower',
                description: 'Observation and telecommunications tower in city center.',
                image: 'https://images.pexels.com/photos/5169489/pexels-photo-5169489.jpeg',
                tags: ['Modern', 'Views', 'Architecture']
              },
              {
                name: 'Waiheke Island',
                description: 'Island in the Hauraki Gulf known for wineries and beaches.',
                image: 'https://images.pexels.com/photos/5169490/pexels-photo-5169490.jpeg',
                tags: ['Nature', 'Wine', 'Recreation']
              }
            ]
          }
        ]
      }
    ]
  }
];

const PlacesSidebar: React.FC<PlacesSidebarProps> = ({ isOpen, onClose }) => {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const selectedRegionData = regions.find(r => r.id === selectedRegion);
  const selectedCountryData = selectedRegionData?.countries.find(c => c.id === selectedCountry);

  const handleRegionClick = (regionId: string) => {
    if (selectedRegion === regionId) {
      setSelectedRegion(null);
      setSelectedCountry(null);
    } else {
      setSelectedRegion(regionId);
      setSelectedCountry(null);
    }
  };

  const handleCountryClick = (countryId: string) => {
    if (selectedCountry === countryId) {
      setSelectedCountry(null);
    } else {
      setSelectedCountry(countryId);
    }
  };

  return (
    <div className={`fixed inset-y-0 right-0 h-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 flex ${
      isOpen ? 'translate-x-0' : 'translate-x-full'
    }`}
    style={{ width: '800px' }}>
      {/* First Column - Regions */}
      <div className="w-20 border-r border-slate-200 bg-slate-50 flex flex-col">
        <div className="p-4 border-b border-slate-200 flex items-center justify-center">
          <button
            onClick={onClose}
            className="p-1 hover:bg-slate-200 rounded-full transition-colors"
            aria-label="Close sidebar"
          >
            <X size={20} className="text-slate-600" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {regions.map((region) => (
            <button
              key={region.id}
              onClick={() => handleRegionClick(region.id)}
              className={`w-full py-4 flex items-center justify-center hover:bg-slate-100 transition-colors ${
                selectedRegion === region.id ? 'bg-slate-200' : ''
              }`}
            >
              <div className="relative w-12 h-12 rounded-full overflow-hidden">
                <img
                  src={region.image}
                  alt={region.name}
                  className="w-full h-full object-cover"
                />
                {selectedRegion === region.id && (
                  <ChevronRight size={16} className="absolute bottom-0 right-0 text-white bg-black/50 rounded-full p-1" />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Second Column - Countries or Region Name */}
      {selectedRegion && (
        <div className="w-64 border-r border-slate-200 bg-white flex flex-col">
          <div className="p-4 border-b border-slate-200">
            <h3 className="font-medium text-slate-800">
              {selectedRegionData?.name}
            </h3>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {selectedRegionData?.countries.map((country) => (
              <button
                key={country.id}
                onClick={() => handleCountryClick(country.id)}
                className={`w-full px-4 py-3 text-left hover:bg-slate-50 transition-colors ${
                  selectedCountry === country.id ? 'bg-slate-100' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-slate-700">{country.name}</span>
                  <ChevronRight size={16} className="text-slate-500" />
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Third Column - Cities or Places */}
      <div className="flex-1 bg-slate-50 flex flex-col">
        {selectedRegion && (
          <div className="p-4 border-b border-slate-200">
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder={selectedCountry ? "Search cities..." : "Search places..."}
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        )}
        
        <div className="flex-1 overflow-y-auto p-4">
          {selectedCountry && selectedCountryData ? (
            // Show cities when a country is selected
            <div>
              <h3 className="text-lg font-medium text-slate-800 mb-4">
                Cities in {selectedCountryData.name}
              </h3>
              <div className="grid gap-4">
                {selectedCountryData.cities
                  .filter(city => 
                    city.name.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map((city, index) => (
                    <div key={index} className="bg-white rounded-lg border border-slate-200 p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-slate-800 text-lg">{city.name}</h4>
                          <p className="text-sm text-slate-600 mt-1">
                            {city.places.length} place{city.places.length !== 1 ? 's' : ''} to visit
                          </p>
                        </div>
                        <ChevronRight size={20} className="text-slate-400" />
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {city.places.slice(0, 3).map((place, i) => (
                          <span key={i} className="bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded">
                            {place.name}
                          </span>
                        ))}
                        {city.places.length > 3 && (
                          <span className="bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded">
                            +{city.places.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ) : selectedRegion && selectedRegionData ? (
            // Show trending places for the selected region
            <div>
              <h3 className="text-lg font-medium text-slate-800 mb-4">
                Trending Places in {selectedRegionData.name}
              </h3>
              <div className="grid gap-4">
                {selectedRegionData.trendingPlaces
                  .filter(place => 
                    place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    place.description.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map((place, index) => (
                    <div key={index} className="bg-white rounded-lg border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
                      <div className="relative h-48 overflow-hidden">
                        <img 
                          src={place.image} 
                          alt={place.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                          <h3 className="font-medium text-white text-lg">{place.name}</h3>
                          <p className="text-white/90 text-sm">{place.city}, {place.country}</p>
                        </div>
                      </div>
                      <div className="p-4">
                        <p className="text-sm text-slate-600 mb-3">{place.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {place.tags.map((tag, i) => (
                            <span key={i} className="bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ) : (
            <div className="text-center p-6">
              <h3 className="text-lg font-medium text-slate-500">Select a region</h3>
              <p className="text-slate-400 mt-1">Click on a region to explore places</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlacesSidebar;