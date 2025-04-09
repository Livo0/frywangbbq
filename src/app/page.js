'use client'

import { useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, Stars, Text, Center } from '@react-three/drei'
import { motion } from 'framer-motion'

// Simulated House Sigils Component
function HouseSigil({ house }) {
  const sigilColors = {
    DRG1: '#d1d5db',
    DRG2: '#ef4444',
    DRG3: '#171717',
    DRG4: '#facc15',
  }
  
  return (
    <div className="w-24 h-24 rounded-full flex items-center justify-center" 
         style={{ backgroundColor: sigilColors[house] }}>
      <span className="text-white text-xl font-bold">{house.charAt(0).toUpperCase()}</span>
    </div>
  )
}

// Animated Throne Component - Fixed to use Text instead of Text3D with custom font
function ThroneModel() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <Center>
        <Text
          fontSize={1.2}
          color="#fbbf24"
          anchorX="center"
          anchorY="middle"
          material-metalness={0.8}
          material-roughness={0.3}
        >
          DRAGONS
        </Text>
      </Center>
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
    </>
  )
}

// Donation Progress Bar
function ProgressBar({ current, goal }) {
  const percentage = Math.min((current / goal) * 100, 100)
  
  return (
    <div className="w-full bg-gray-700 rounded-full h-6 mt-4">
      <div 
        className="bg-gradient-to-r from-red-500 via-yellow-500 to-red-500 h-6 rounded-full"
        style={{ width: `${percentage}%` }}
      >
      </div>
      <div className="flex justify-between text-sm mt-1">
        <span>{current.toLocaleString()} Dragons</span>
        <span>{goal.toLocaleString()} Dragons</span>
      </div>
    </div>
  )
}

// Donation Tier Component
function DonationTier({ title, amount, perks, featured = false }) {
  return (
    <motion.div 
      whileHover={{ scale: 1.03 }}
      className={`p-6 rounded-xl border transition-all ${
        featured 
          ? 'border-yellow-400 bg-gradient-to-b from-gray-900 to-black shadow-xl shadow-yellow-900/20' 
          : 'border-gray-700 bg-gray-900'
      }`}
    >
      <h3 className={`text-2xl font-bold mb-2 ${featured ? 'text-yellow-400' : 'text-gray-200'}`}>{title}</h3>
      <p className="text-3xl font-bold mb-4">{amount} <span className="text-yellow-500">USD</span></p>
      <ul className="space-y-2 mb-6">
        {perks.map((perk, index) => (
          <li key={index} className="flex items-start">
            <span className="text-yellow-500 mr-2">◆</span>
            <span className="text-gray-300">{perk}</span>
          </li>
        ))}
      </ul>
      <button className={`w-full py-3 rounded-lg font-bold transition-colors ${
        featured 
          ? 'bg-yellow-500 text-black hover:bg-yellow-400' 
          : 'bg-gray-700 text-white hover:bg-gray-600'
      }`}>
        Donate
      </button>
    </motion.div>
  )
}

// Quote Carousel Component
function QuoteCarousel() {
  const [currentQuote, setCurrentQuote] = useState(0)
  const quotes = [
    { text: "I will make you miserable.", author: "Dean" },
    { text: "Wang you cry like bitch.", author: "Ligmaballsu" },
    { text: "Papa wang fuck you.", author: "Ninu" },
    { text: "Wang send moni.", author: "House Stark" },
    { text: "wang Visit us once and i'll destroy you", author: "Harley Quinn" },
    { text: "Giggity", author: "Quagmire" },
    
  ]
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote(prev => (prev + 1) % quotes.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [])
  
  return (
    <div className="py-16 px-6 bg-gradient-to-r from-gray-900 via-black to-gray-900">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          key={currentQuote}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 1 }}
        >
          <p className="text-2xl md:text-3xl italic text-gray-300 mb-4">"{quotes[currentQuote].text}"</p>
          <p className="text-xl text-yellow-500">— {quotes[currentQuote].author}</p>
        </motion.div>
      </div>
    </div>
  )
}

// Testimonial Component
function Testimonial({ quote, name, house, image }) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 shadow-xl">
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-700 flex items-center justify-center mr-4">
          {image || <span className="text-xl font-bold">{name[0]}</span>}
        </div>
        <div>
          <h4 className="font-bold text-white">{name}</h4>
          <p className="text-sm text-yellow-500"> {house}</p>
        </div>
      </div>
      <p className="text-gray-300 italic">"{quote}"</p>
    </div>
  )
}

// Main Page Component
export default function Home() {
  const [raised, setRaised] = useState(400)
  const goalAmount = 1000
  
  return (
    <div className="min-h-screen bg-black text-white font-serif">
      {/* Navigation */}
      <nav className="bg-black bg-opacity-95 py-4 px-6 sticky top-0 z-50 border-b border-gray-800">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <svg className="w-8 h-8 text-yellow-500" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L2 8l10 6 10-6-10-6zM2 20l10-6 10 6-10 6-10-6z" />
            </svg>
            <span className="text-xl font-bold tracking-wider text-yellow-500">X GOLD DRAGON X</span>
          </div>
          <div className="hidden md:flex space-x-8">
            <a href="#about" className="text-gray-300 hover:text-yellow-500 transition">About</a>
            <a href="#houses" className="text-gray-300 hover:text-yellow-500 transition">Houses</a>
            <a href="#rewards" className="text-gray-300 hover:text-yellow-500 transition">Incentives</a>
            <a href="#faq" className="text-gray-300 hover:text-yellow-500 transition">FAQ</a>
          </div>
          <button className="bg-yellow-600 px-5 py-2 rounded-full text-black font-bold hover:bg-yellow-500 transition shadow-lg shadow-yellow-900/20">
            Join us
          </button>
        </div>
      </nav>

      {/* Hero Section - Note: Video background is commented out as it would require a real video file */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-70 z-10"></div>
          {/* Using gradient background instead of video since video would need a real file */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800"></div>
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-5xl">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight"
          >
            <span className="text-yellow-500">HELP US</span> TO SPANK <span className="text-yellow-500">WANG</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto"
          >
            Join the great houses of DRG#50 in our quest to spank wang and experience the satisfaction.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <button className="bg-yellow-600 px-8 py-4 rounded-full text-black text-xl font-bold hover:bg-yellow-500 transition mr-4 shadow-lg shadow-yellow-900/20">
              Pledge Your Loyality
            </button>
          </motion.div>
        </div>
      </header>

      {/* Progress Bar Section */}
      <section className="bg-gray-900 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold mb-2">Our Fundraising Progress</h2>
            <p className="text-xl text-gray-300">Help us reach our goal of {goalAmount.toLocaleString()} Gold Dragons</p>
          </div>
          <ProgressBar current={raised} goal={goalAmount} />
          
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-3xl font-bold text-yellow-500">100</p>
              <p className="text-gray-400">Backers</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-yellow-500">4</p>
              <p className="text-gray-400">Great Houses</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-yellow-500">60</p>
              <p className="text-gray-400">Days Remaining</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-yellow-500">30%</p>
              <p className="text-gray-400">Funded</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">About The <span className="text-yellow-500">X Gold Dragon X</span></h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              An ambitious cause to unite gamers across the severs and beyond to spank wang
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-yellow-500">Our Vision</h3>
              <p className="text-gray-300 mb-6">
                The DRG Alliance aims to create the most immersive Battle Field experience ever conceived. 
                With your support, we will bring the rich world of DRG's to Make wang miserable by winning Duels, 
                Capitals and bully,and create history over the servers.
              </p>
              <h3 className="text-2xl font-bold mb-4 text-yellow-500">Your Role</h3>
              <p className="text-gray-300">
                By pledging your Loyality, you're not just funding to spank wang but you're joining an alliance of devoted 
                committed to preserving and celebrating the legacy of Dragons. Each contributor will 
                be recognized according to their house affiliation and level of support.
              </p>
            </div>
            
            <div className="aspect-square w-full h-full">
              <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                <ThroneModel />
                <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1} />
                <Environment preset="night" />
              </Canvas>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <QuoteCarousel />

      {/* Houses Section */}
      <section id="houses" className="py-20 px-6 bg-gray-950">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Join Your <span className="text-yellow-500">House</span></h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Pledge your allegiance and contribute to the glory of your chosen house
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6 justify-items-center">
            {['DRG1', 'DRG2', 'DRG3', 'DRG4'].map(house => (
              <motion.div 
                key={house}
                whileHover={{ y: -10 }}
                className="flex flex-col items-center"
              >
                <HouseSigil house={house} />
                <p className="mt-4 font-bold text-center capitalize">{house}</p>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <p className="text-xl text-gray-300 mb-8">
              The house with the most damage on wang will receive special recognition in the server.
            </p>
            <button className="bg-gray-800 px-6 py-3 rounded-lg text-white hover:bg-gray-700 transition">
              View House Standings
            </button>
          </div>
        </div>
      </section>

      {/* Rewards Section */}
      <section id="rewards" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Backer <span className="text-yellow-500">Rewards</span></h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Choose your level of support and receive exclusive benefits
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <DonationTier 
              title="Basic Donation" 
              amount="25" 
              perks={[
                "Digital thank you scroll",
                "Name in credits",
                "Exclusive desktop wallpapers"
              ]}
            />
            
            <DonationTier 
              title="Noble Donation" 
              amount="100" 
              perks={[
                "All Smallfolk rewards",
                "Limited edition giveaway RSS",
                "Early access to plans",
                "Exclusive Benifits on capital"
              ]}
              featured={true}
            />
            
            <DonationTier 
              title="Legendary Donation" 
              amount="500" 
              perks={[
                "All Noble House rewards",
                "On spot capital buff",
                "Your name engraved on the Townhalls",
                "VIP invitation to the VC"
              ]}
            />
          </div>
          
          <div className="mt-12 text-center">
            <button className="bg-yellow-600 px-8 py-3 rounded-lg text-black font-bold hover:bg-yellow-500 transition">
              View All Reward Tiers
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 bg-black">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Voices of the <span className="text-yellow-500">Dragons</span></h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Hear from those who have already pledged their support
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Testimonial 
              quote="As a devoted Dragon loyalist, I couldn't pass up the chance to help bring spank wang. The exclusive updates alone have been worth every dragon!"
              name="Deanozaur"
              house="Dino"
            />
            
            <Testimonial 
              quote="Spank wang on every chance i get and throw stones on all haters."
              name="Harley Quinn"
              house="Kerri"
            />
            
            <Testimonial 
              quote="Fire and blood! This honors the legacy of my house while bringing something new to the table. I'm proud to contribute."
              name="Ligmaballsu"
              house="Licky"
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-6 bg-gray-950">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Frequently Asked <span className="text-yellow-500">Questions</span></h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Get answers to common inquiries about the Dragons
            </p>
          </div>
          
          <div className="space-y-6">
            {[
              {
                q: "When will the project be completed?",
                a: "We aim to complete the project within 3 months of reaching our funding goal. Regular updates will be provided to all backers."
              },
              {
                q: "Can I change my house allegiance after pledging?",
                a: "No, We fucking zero your watch tower if you do."
              },
              {
                q: "How will funds be used?",
                a: "Funds will be allocated to buy equipments, construction , and buffs Everything in power to spank wang to zero."
              },
              {
                q: "Will there be physical locations to visit?",
                a: "No! We meet on discord and if all goes well we meet once in real life."
              },
              {
                q: "What happens if the funding goal isn't reached?",
                a: "Well wang would laugh his ass off we fucking try again until it's done, we do everything in our to fuck with wang."
              }
            ].map((item, index) => (
              <div key={index} className="bg-gray-900 border border-gray-800 rounded-lg p-6">
                <h4 className="text-xl font-bold mb-2 text-yellow-500">{item.q}</h4>
                <p className="text-gray-300">{item.a}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-gray-400 mb-4">Still have questions?</p>
            <button className="bg-transparent border-2 border-yellow-500 px-6 py-2 rounded-lg text-yellow-500 hover:bg-yellow-900/20 transition">
              Contact the Dragon Keeper
            </button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-6 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
            <span className="text-yellow-500">WAR</span> Is Coming
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto">
            The time to act is now. Join the Dragon Alliance and help us bring the Server to life before the dkk hits again.
          </p>
          <button className="bg-yellow-600 px-10 py-4 rounded-full text-black text-xl font-bold hover:bg-yellow-500 transition shadow-lg shadow-yellow-900/20">
            Support Us
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-12 px-6 border-t border-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <svg className="w-6 h-6 text-yellow-500" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L2 8l10 6 10-6-10-6zM2 20l10-6 10 6-10 6-10-6z" />
                </svg>
                <span className="text-lg font-bold text-yellow-500">GOLD DRAGON</span>
              </div>
              <p className="text-gray-400 text-sm">
                A community-funded initiative to celebrate the successful spanking of wang.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-4">Navigate</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#about" className="hover:text-yellow-500 transition">About</a></li>
                <li><a href="#houses" className="hover:text-yellow-500 transition">Houses</a></li>
                <li><a href="#rewards" className="hover:text-yellow-500 transition">Rewards</a></li>
                <li><a href="#faq" className="hover:text-yellow-500 transition">FAQ</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-yellow-500 transition">Terms of Service</a></li>
                <li><a href="#" className="hover:text-yellow-500 transition">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-yellow-500 transition">Refund Policy</a></li>
                <li><a href="#" className="hover:text-yellow-500 transition">Copyright Notice</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Connect</h4>
              <div className="flex space-x-4 mb-4">
                <a href="#" className="text-gray-400 hover:text-yellow-500 transition">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-yellow-500 transition">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-yellow-500 transition">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-yellow-500 transition">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z"/></svg>
                </a>
              </div>
              <p className="text-gray-400 text-sm">
                Subscribe to our Dragon Keeper for exclusive updates
              </p>
              <div className="mt-2 flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="bg-gray-800 border border-gray-700 rounded-l-lg px-4 py-2 text-white w-full focus:outline-none focus:border-yellow-500"
                />
                <button className="bg-yellow-600 text-black px-4 py-2 rounded-r-lg hover:bg-yellow-500 transition">
                  Send
                </button>
              </div>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
            <p>© 2025 Dragon Fundraiser.</p>
            <p className="mt-2">Created with passion for the SV#50. All donations support this to spank wang.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}