import { MapPin, Phone, Camera, CheckCircle2, Heart } from 'lucide-react';

const About = () => {
  return (
    <div className="pt-32 pb-12">
      {/* Catering Section */}
      <section className="container mb-6">
        <div className="card glass relative overflow-hidden" style={{ border: '2px solid var(--color-primary)' }}>
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary opacity-5 rounded-full -mr-20 -mt-20"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex-1">
              <div className="badge badge-primary mb-2">Catering Services</div>
              <h2 className="heading-lg mb-2">We Accept Catering Orders</h2>
              <p className="text-lg mb-4" style={{ color: 'var(--color-text-light)' }}>
                Make your special occasions memorable with our delicious, hygienic, and on-time catering services.
              </p>
              
              <div className="grid grid-cols-2 gap-2 mb-4">
                <div className="flex items-center gap-1">
                  <CheckCircle2 className="text-primary" size={20} />
                  <span className="font-medium">Birthday Parties</span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle2 className="text-primary" size={20} />
                  <span className="font-medium">Kitty Parties</span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle2 className="text-primary" size={20} />
                  <span className="font-medium">Family Functions</span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle2 className="text-primary" size={20} />
                  <span className="font-medium">Office Events</span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle2 className="text-primary" size={20} />
                  <span className="font-medium">Other Occasions</span>
                </div>
              </div>
            </div>
            
            <div className="flex-1 text-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="heading-md mb-2">Book Now</h3>
              <p className="text-sm mb-4">Call us to discuss your event requirements and customize your menu.</p>
              <a href="tel:7023800696" className="btn btn-primary w-full justify-center" style={{ fontSize: '1.2rem' }}>
                <Phone size={24} /> 7023800696
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Review & Love Section */}
      <section className="container mb-6">
        <div className="text-center max-w-3xl mx-auto py-6">
          <Heart size={48} className="text-accent mx-auto mb-4" fill="currentColor" />
          <h2 className="heading-lg mb-2" style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}>
            "Agar dil khush ho gaya ho... to hume zaroor batana"
          </h2>
          <p className="text-lg mb-6 text-light">
            Aapka review hamare liye bahut maayne rakhta hai. Please rate us on:
          </p>
          
          <div className="flex justify-center gap-4">
            <a href="#" className="card flex items-center gap-2 hover:-translate-y-2 transition" style={{ padding: '1rem 2rem', border: '2px solid #CB202D' }}>
              <span style={{ color: '#CB202D', fontWeight: 'bold', fontSize: '1.5rem' }}>zomato</span>
            </a>
            <a href="#" className="card flex items-center gap-2 hover:-translate-y-2 transition" style={{ padding: '1rem 2rem', border: '2px solid #FC8019', background: '#FC8019' }}>
              <span style={{ color: 'white', fontWeight: 'bold', fontSize: '1.5rem' }}>SWIGGY</span>
            </a>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="container">
        <div className="grid grid-cols-2 gap-4">
          <div className="card text-center">
            <div className="inline-block p-4 bg-primary bg-opacity-10 rounded-full mb-4 text-primary">
              <Phone size={32} />
            </div>
            <h3 className="heading-sm">Call Us</h3>
            <p className="text-lg font-medium">7023800696</p>
            <p className="text-sm text-light mt-1">Available 9 AM to 10 PM</p>
          </div>
          
          <div className="card text-center">
            <div className="inline-block p-4 bg-accent bg-opacity-10 rounded-full mb-4 text-accent">
              <Camera size={32} />
            </div>
            <h3 className="heading-sm">Follow Us</h3>
            <p className="text-lg font-medium">@desighr</p>
            <p className="text-sm text-light mt-1">Stay updated with our latest offers</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
