import { Button } from "@/components/ui/button";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import HeroSection from "@/components/hero";
import Link from "next/link";
export default function Home() {
  return (
    <div>
      <div className="grid-background"></div>
      <HeroSection />
      <section className="container mx-auto">
        <div className="text-center mt-10 mb-10">
          <p className="text-muted-foreground text-lg font-semibold ">
            We offer a range of features to help you achieve your career goals.
          </p>
          <div className="text-center">
            <h3 className="text-4xl font-bold text-primary ">
              Our Features
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6 transition-all duration-300 hover:shadow-lg hover:scale-105 hover:-translate-y-1">
              <div className="flex items-center gap-2 mb-4 group">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary transition-transform duration-300 group-hover:rotate-12">
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
                  <polyline points="14 2 14 8 20 8"/>
                </svg>
                <h4 className="text-xl font-semibold transition-colors duration-300 group-hover:text-primary">AI Resume Builder</h4>
              </div>
              <p className="text-muted-foreground transition-opacity duration-300 group-hover:opacity-90">Create professional resumes tailored to your industry with our AI-powered resume builder.</p>
            </div>

            <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6 transition-all duration-300 hover:shadow-lg hover:scale-105 hover:-translate-y-1">
              <div className="flex items-center gap-2 mb-4 group">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary transition-transform duration-300 group-hover:rotate-12">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
                <h4 className="text-xl font-semibold transition-colors duration-300 group-hover:text-primary">Career Advice</h4>
              </div>
              <p className="text-muted-foreground transition-opacity duration-300 group-hover:opacity-90">Get personalized career guidance and insights from industry experts to advance your career.</p>
            </div>

            <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6 transition-all duration-300 hover:shadow-lg hover:scale-105 hover:-translate-y-1">
              <div className="flex items-center gap-2 mb-4 group">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary transition-transform duration-300 group-hover:rotate-12">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                <h4 className="text-xl font-semibold transition-colors duration-300 group-hover:text-primary">Cover Letter Generator</h4>
              </div>
              <p className="text-muted-foreground transition-opacity duration-300 group-hover:opacity-90">Generate compelling cover letters customized for different job applications using AI technology.</p>
            </div>
          </div>
          
        </div>

      </section>
      <section className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        <div className="text-center mt-10 mb-10 flex flex-col items-center justify-center">
          <h3 className="text-4xl font-bold text-primary ">
            100+
          </h3>
          <p className="text-muted-foreground text-lg font-semibold  ">
            Industries Served
          </p>

        </div>
        <div className="text-center mt-10 mb-10 flex flex-col items-center justify-center">
          <h3 className="text-4xl font-bold text-primary ">
            AI-Powered
          </h3>
          <p className="text-muted-foreground text-lg font-semibold  ">
            Our platform is powered by the latest AI technology to ensure you get the best possible results.
          </p>
        </div>
        <div className="text-center mt-10 mb-10 flex flex-col items-center justify-center">
          <h3 className="text-4xl font-bold text-primary ">
            95%
          </h3>
          <p className="text-muted-foreground text-lg font-semibold  ">
            Customer Satisfaction
          </p>
        </div>
      </section>


      {/* how it works */}
      <section className="container mx-auto py-16">
        <div className="text-center mb-12">
          <div className="flex justify-center gap-4 mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary animate-bounce">
              <path d="M12 19V5"/>
              <path d="m5 12 7-7 7 7"/>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary animate-pulse">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 16v-4"/>
              <path d="M12 8h.01"/>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary animate-bounce">
              <path d="M12 5v14"/>
              <path d="m19 12-7 7-7-7"/>
            </svg>
          </div>
          <h2 className="text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get started with CareerPilot in three simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-card hover:shadow-lg transition-all duration-300">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <span className="text-2xl font-bold text-primary">1</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Create Your Profile</h3>
            <p className="text-muted-foreground">
              Sign up and fill in your professional details to get personalized career guidance
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-card hover:shadow-lg transition-all duration-300">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <span className="text-2xl font-bold text-primary">2</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Choose Your Tools</h3>
            <p className="text-muted-foreground">
              Select from our range of AI-powered tools for resume building, cover letters, and interview prep
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-card hover:shadow-lg transition-all duration-300">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <span className="text-2xl font-bold text-primary">3</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Get Results</h3>
            <p className="text-muted-foreground">
              Receive tailored career advice and professionally crafted documents to advance your career
            </p>
          </div>
        </div>
      </section>
     {/* what our customers say */}
      <section className="py-16">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 hover:scale-105 transition-transform duration-300">What Our Customers Say</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Hear from professionals who have transformed their careers with CareerPilot
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-card transition-all duration-300 hover:shadow-xl hover:scale-105 hover:border-primary">
              <div className="mb-6 transform transition-transform duration-300 hover:rotate-6">
                <img
                  src="/testimonial-1.jpg" 
                  alt="Sarah Johnson"
                  className="h-20 w-20 rounded-full object-cover border-2 border-primary hover:border-4 transition-all duration-300"
                />
              </div>
              <blockquote className="mb-4 hover:text-primary transition-colors duration-300">
                <p className="text-muted-foreground italic">
                  "CareerPilot helped me land my dream job in tech. The AI-powered resume builder was a game-changer!"
                </p>
              </blockquote>
              <div className="group">
                <h4 className="font-semibold group-hover:text-primary transition-colors duration-300">Sarah Johnson</h4>
                <p className="text-sm text-muted-foreground group-hover:text-primary/70 transition-colors duration-300">Software Engineer at Google</p>
              </div>
            </div>

            <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-card transition-all duration-300 hover:shadow-xl hover:scale-105 hover:border-primary">
              <div className="mb-6 transform transition-transform duration-300 hover:rotate-6">
                <img
                  src="/testimonial-2.jpg"
                  alt="Michael Chen"
                  className="h-20 w-20 rounded-full object-cover border-2 border-primary hover:border-4 transition-all duration-300"
                />
              </div>
              <blockquote className="mb-4 hover:text-primary transition-colors duration-300">
                <p className="text-muted-foreground italic">
                  "The interview preparation tools gave me the confidence I needed. Highly recommend!"
                </p>
              </blockquote>
              <div className="group">
                <h4 className="font-semibold group-hover:text-primary transition-colors duration-300">Michael Chen</h4>
                <p className="text-sm text-muted-foreground group-hover:text-primary/70 transition-colors duration-300">Product Manager at Amazon</p>
              </div>
            </div>

            <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-card transition-all duration-300 hover:shadow-xl hover:scale-105 hover:border-primary">
              <div className="mb-6 transform transition-transform duration-300 hover:rotate-6">
                <img
                  src="/testimonial-3.jpg"
                  alt="Emily Rodriguez"
                  className="h-20 w-20 rounded-full object-cover border-2 border-primary hover:border-4 transition-all duration-300"
                />
              </div>
              <blockquote className="mb-4 hover:text-primary transition-colors duration-300">
                <p className="text-muted-foreground italic">
                  "The personalized career guidance helped me pivot into a new industry seamlessly."
                </p>
              </blockquote>
              <div className="group">
                <h4 className="font-semibold group-hover:text-primary transition-colors duration-300">Emily Rodriguez</h4>
                <p className="text-sm text-muted-foreground group-hover:text-primary/70 transition-colors duration-300">Marketing Director at Netflix</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* FAQ */}
      <section className="container mx-auto py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about CareerPilot
          </p>
          <Accordion type="single" collapsible className="w-full max-w-2xl mx-auto mt-8">
            <AccordionItem value="item-1">
              <AccordionTrigger>How does CareerPilot help with interview preparation?</AccordionTrigger>
              <AccordionContent>
                CareerPilot provides comprehensive interview preparation tools including practice questions, mock interview simulations, industry-specific guides, and personalized feedback to help you perform your best during interviews.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>What career guidance services do you offer?</AccordionTrigger>
              <AccordionContent>
                We offer personalized career counseling, resume reviews, industry insights, skill gap analysis, and career transition planning. Our expert advisors work with you to create a tailored career development strategy.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>Is CareerPilot suitable for career changers?</AccordionTrigger>
              <AccordionContent>
                Yes! CareerPilot specializes in supporting career transitions. We provide resources, guidance, and tools specifically designed to help professionals successfully pivot into new industries or roles.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger>How much does CareerPilot cost?</AccordionTrigger>
              <AccordionContent>
                CareerPilot offers flexible pricing plans starting from $29/month. We also provide a free trial period so you can explore our platform and determine the best plan for your needs.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
      {/* start your journey */}
      <section className="container mx-auto py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Start Your Journey Today</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Sign up now and take the first step towards a brighter career future
          </p>
          <Link href="/dashboard">
          <Button variant="destructive" className="mt-4 animate-bounce">Get Started</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
