import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, MapPin, Phone } from "lucide-react";
import { whatsapp_dark, instagram_dark } from "@/assets/icons";

const ContactPage = () => {
  return (
    <div className="container mx-auto py-12">
      <h1 className="mb-12 text-center text-4xl font-medium uppercase text-primary-400">
        Contact Us
      </h1>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Contact Information */}
        <Card className="border-primary-200 bg-primary-50">
          <CardHeader>
            <CardTitle className="text-2xl font-medium text-primary-400">Get in Touch</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-start gap-4">
              <MapPin className="mt-1 size-5 text-primary-300" />
              <div>
                <h3 className="mb-1 text-lg font-medium text-primary-400">Our Location</h3>
                <p className="text-primary-200">123 Bakery Street, Geneva, Switzerland</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Phone className="mt-1 size-5 text-primary-300" />
              <div>
                <h3 className="mb-1 text-lg font-medium text-primary-400">Phone Number</h3>
                <p className="text-primary-200">+41 22 123 45 67</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Mail className="mt-1 size-5 text-primary-300" />
              <div>
                <h3 className="mb-1 text-lg font-medium text-primary-400">Email Address</h3>
                <p className="text-primary-200">contact@cakery.com</p>
              </div>
            </div>

            <div className="pt-4">
              <h3 className="mb-4 text-lg font-medium text-primary-400">Follow Us</h3>
              <div className="flex gap-4">
                <a
                  href="https://www.instagram.com/cakery19.ch/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={instagram_dark} alt="Instagram" className="size-6" />
                </a>
                <a
                  href="https://api.whatsapp.com/send?phone=41764598116&text=Hi%20My%2C%0A%0AI%20would%20like%20to%20make%20an%20order%20"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={whatsapp_dark} alt="WhatsApp" className="size-6" />
                </a>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Form */}
        <Card className="border-primary-200 bg-primary-50">
          <CardHeader>
            <CardTitle className="text-2xl font-medium text-primary-400">
              Send us a Message
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-primary-400">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full rounded-md border border-primary-200 bg-transparent px-4 py-2 text-primary-400 outline-none focus:border-primary-300"
                  placeholder="Your name"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-primary-400">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full rounded-md border border-primary-200 bg-transparent px-4 py-2 text-primary-400 outline-none focus:border-primary-300"
                  placeholder="Your email"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-primary-400">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full rounded-md border border-primary-200 bg-transparent px-4 py-2 text-primary-400 outline-none focus:border-primary-300"
                  placeholder="Your message"
                />
              </div>

              <Button className="w-full bg-primary-300 text-white hover:bg-primary-400">
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ContactPage;
