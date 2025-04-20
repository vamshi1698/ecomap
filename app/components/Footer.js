import { MapPin,Mail,Calendar,Github,Linkedin } from "lucide-react"

export default async function FooterPage() {
    const skills = ['javascript','React','Node.js','MongoDB','Git','NextJS']
    return(
        <footer className="bg-[#0D1C1C]  text-gray-200 border-t-1 border-[#263A3A] mt-3 place-items-center">
          <h1 className="text-center text-[#E0F2F1] font-bold pt-4"><span className="border-b-2 border-gray-60">Developer Details</span></h1>
          <div className="grid sm:grid-cols-2  lg:grid-cols-4 gap-6 p-4">
          <div className="about-me flex flex-col lg:border-r-1 lg:pr-2 gap-4">
            <h1 className="text-center"><span className="border-b-1 border-gray-600">About</span></h1>
            <p className="pl-3 text-[#B2DFDB]"> I’m  Anakarla Vamsi — a full stack developer with a strong focus on backend development. Currently in my final year of BCA at National College Jayanagar, I enjoy architecting robust server-side applications and ensuring smooth data flow across systems</p>
          </div>
          <div className="contact-info flex-col flex gap-4 lg:border-r-1 lg:pr-2">
            <h1 className="text-center"><span className="border-b-1 border-gray-600">Contact Info</span></h1>
            <div className="flex flex-col gap-4 pl-3">
              <div className="flex gap-2 text-[#B2DFDB] items-center"><MapPin />Bangalore</div>
              <div className="flex gap-2 text-[#B2DFDB] items-center"><Mail />vamshia332@gmail.com</div>
              <div className="flex gap-2 text-[#B2DFDB] items-center"><Calendar />Available for freelance</div>
            </div>
          </div>
          <div className="connect lg:border-r-1 lg:pr-2 flex flex-col gap-4">
              <h1 className="text-center"><span className="border-b-2 border-gray-600">My Links</span></h1>
              <div className="links">
                <div className="flex gap-2 text-[#B2DFDB] items-center"><Github />Github link</div>
                <div className="flex gap-2 text-[#B2DFDB] items-center"><Linkedin />Linkedin Link</div>
              </div>
          </div>
          <div className="technical-skills flex flex-col  gap-4 ">
            <h1 className="text-center"><span className="border-b-2 border-gray-600">Technical Skills</span></h1>
            <div className="skills grid gap-2 pl-3 grid-cols-[repeat(auto-fit,_minmax(100px,_1fr))]">
              {skills.map((skill,index)=>(
                <span key={index} className="bg-gray-700 w-max p-2 text-[#B2DFDB] rounded-2xl ">{skill}</span>
              ))}
            </div>
          </div>
          </div>
        </footer>
    )
}