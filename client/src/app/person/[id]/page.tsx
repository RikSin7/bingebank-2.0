import { notFound } from "next/navigation";
import { getPersonDetails } from "@/services/personService";
import { Suspense } from "react";
import BackButton from "@/components/common/BackButton";
import PersonHeroSection from "@/components/person/PersonHeroSection";
import PersonContentWrapper from "@/components/wrappers/PersonContentWrapper";

export default async function PersonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const person = await getPersonDetails(id);
  
  if (!person) notFound();

  return (
    <div className="min-h-screen relative bg-[var(--bg-primary)] text-[var(--text-primary)]">

         <div className="absolute left-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-r from-[var(--gradient-base)] via-transparent to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-l from-[var(--gradient-base)] via-transparent to-transparent z-10 pointer-events-none" />
      <div className="absolute md:block hidden top-6 md:left-24 z-50">
        <BackButton />
      </div>
      
      {/* 1. Hero Section for Person (bio, image, basic info) */}
      <PersonHeroSection person={person} />
      
      {/* 2. Wrapper for fetching the credits in parallel/after */}
      <Suspense fallback={<div className="h-64 flex justify-center items-center"><div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div></div>}>
        <PersonContentWrapper id={id} department={person.known_for_department} />
      </Suspense>
    </div>
  );
}