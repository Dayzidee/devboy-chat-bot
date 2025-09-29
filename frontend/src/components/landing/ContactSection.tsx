// src/components/landing/ContactSection.tsx

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import {
  LoaderCircle,
  Mail,
  Github,
  Twitter,
  Linkedin,
  HelpCircle,
  CheckCircle,
} from "lucide-react";

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters." }),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

const ContactSection = () => {
  const [ref, isInView] = useInView({ threshold: 0.1 });
  const [isSuccess, setIsSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    console.log("Form data submitted:", data);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSuccess(true);
    setTimeout(() => {
        reset();
        setIsSuccess(false);
    }, 5000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.3 } },
  };

  const slideUpVariant = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section className="py-24 bg-background">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
        className="container max-w-6xl mx-auto"
      >
        {/* Section Header */}
        <motion.div className="text-center mb-16" variants={slideUpVariant}>
          <h2 className="text-4xl font-extrabold font-display">Get In Touch</h2>
          <p className="mt-4 text-lg text-foreground/70">
            Have a question or feedback? We'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column: Contact Info & Socials */}
          <motion.div className="space-y-8" variants={slideUpVariant}>
            <div className="p-6 bg-card rounded-lg border border-border">
              <h3 className="text-2xl font-bold font-display mb-4">
                Contact Information
              </h3>
              <div className="space-y-4">
                <a
                  href="mailto:support@devbot.ai"
                  className="flex items-center gap-3 group"
                >
                  <Mail className="w-5 h-5 text-primary" />
                  <span className="text-foreground/80 group-hover:text-primary transition-colors">
                    support@devbot.ai
                  </span>
                </a>
                <a href="/faq" className="flex items-center gap-3 group">
                  <HelpCircle className="w-5 h-5 text-primary" />
                  <span className="text-foreground/80 group-hover:text-primary transition-colors">
                    Check our FAQ
                  </span>
                </a>
              </div>
            </div>

            <div className="p-6 bg-card rounded-lg border border-border">
              <h3 className="text-2xl font-bold font-display mb-4">
                Follow Us
              </h3>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="p-3 bg-card rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <Github className="w-6 h-6" />
                </a>
                <a
                  href="#"
                  className="p-3 bg-card rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <Twitter className="w-6 h-6" />
                </a>
                <a
                  href="#"
                  className="p-3 bg-card rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div variants={slideUpVariant}>
            {isSuccess ? (
              <div className="flex flex-col items-center justify-center h-full p-8 bg-card rounded-lg border border-border text-center">
                <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
                <h3 className="text-2xl font-bold font-display">Message Sent!</h3>
                <p className="text-foreground/70 mt-2">Thank you for reaching out. We'll get back to you as soon as possible.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-1"
                  >
                    Name
                  </label>
                  <input
                    {...register("name")}
                    disabled={isSubmitting}
                    className="w-full bg-background border border-border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-1"
                  >
                    Email
                  </label>
                  <input
                    {...register("email")}
                    disabled={isSubmitting}
                    className="w-full bg-background border border-border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-1"
                  >
                    Message
                  </label>
                  <textarea
                    {...register("message")}
                    disabled={isSubmitting}
                    rows={5}
                    className="w-full bg-background border border-border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.message.message}
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center rounded-md bg-primary px-8 py-3 text-lg font-bold text-primary-foreground shadow-lg transition-all hover:bg-primary-darker focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background disabled:bg-primary/50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <LoaderCircle className="animate-spin mr-2" />
                  ) : (
                    "Send Message"
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default ContactSection;