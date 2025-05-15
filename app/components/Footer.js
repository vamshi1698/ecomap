import { MapPin,Mail,Calendar,Github,Linkedin } from "lucide-react"
import Link from "next/link"
import AnimatedCard from "@/app/components/AnimatedCard";
import ScrollFadePop from "./ScrollFadePop";

export default async function FooterPage() {
    const skills = ['MongoDB','Express JS','React JS','Node.js','Git','Next JS']
    return(
      <AnimatedCard>
        <footer className="bg-[#0D1C1C]  text-gray-200 border-t-1 border-[#263A3A] mt-3 place-items-center">
          <ScrollFadePop >
            <h1 className="text-center text-[#E0F2F1] font-bold pt-4"><span className="border-b-2 border-gray-60">Developer Details</span></h1>
          </ScrollFadePop >
          <div className="grid sm:grid-cols-2  lg:grid-cols-4 gap-6 p-4">
          <div className="about-me flex flex-col lg:border-r-1 lg:pr-2 gap-7">
          <ScrollFadePop >
            <h1 className="text-center"><span className="border-b-1 border-gray-600">About</span></h1>
          </ScrollFadePop >
            <AnimatedCard >
              <p className="pl-3 text-[#B2DFDB]"> I’m  Anakarla Vamsi — a full stack developer with a strong focus on backend development. Currently in my second year of BCA at National College Jayanagar, I enjoy architecting server-side applications and ensuring smooth data flow across systems</p>
            </AnimatedCard >
          </div>
          <div className="contact-info flex-col flex gap-7 lg:border-r-1 lg:pr-2">
          <ScrollFadePop >
            <h1 className="text-center"><span className="border-b-1 border-gray-600">Contact Info</span></h1>
          </ScrollFadePop >
            <AnimatedCard >
            <div className="flex flex-col gap-4 pl-3">
              <div className="flex gap-2 text-[#B2DFDB] items-center pointer"><MapPin />Bangalore</div>
              <div className="flex gap-2 text-[#B2DFDB] items-center"><Mail />vamshia332@gmail.com</div>
              <div className="flex gap-2 text-[#B2DFDB] items-center"><Calendar />Available for freelance</div>
            </div>
            </AnimatedCard >
          </div>
          <div className="connect lg:border-r-1 lg:pr-2 flex flex-col gap-7">
          <ScrollFadePop >
              <h1 className="text-center"><span className="border-b-2 border-gray-600">My Links</span></h1>
          </ScrollFadePop>
            <AnimatedCard >
              <div className="links flex flex-col gap-4">
                <Link href='https://github.com/vamshi1698' className="flex gap-2 text-[#B2DFDB] items-center cursor-pointer"><Github />Github link</Link>
                <Link href='https://www.linkedin.com/in/vamsi-anakarla/' className="flex gap-2 text-[#B2DFDB] items-center cursor-pointer"><Linkedin />Linkedin Link</Link>
              </div>
            </AnimatedCard >
          </div>
          <div className="technical-skills flex flex-col  gap-7 ">
          <ScrollFadePop >
            <h1 className="text-center"><span className="border-b-2 border-gray-600">Technical Skills</span></h1>
          </ScrollFadePop >
            <div className="skills grid gap-7 pl-3 grid-cols-[repeat(auto-fit,_minmax(100px,_1fr))]">
              {skills.map((skill,index)=>(
              <AnimatedCard key={index}>
                <span  className="bg-gray-700 w-max p-2 text-[#B2DFDB] rounded-2xl">{skill}</span>
              </AnimatedCard >
              ))}
            </div>
          </div>
          </div>
          <div className="bg-teal-900 w-full text-center">
          © 2025 ECOMAP . All rights reserved.
          </div>
        </footer>
      </AnimatedCard>
    )
}