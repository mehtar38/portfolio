import img1 from "../assets/img-3.jpeg";
import img2 from "../assets/img-2.jpeg";
import img3 from "../assets/img-1.jpeg";
import img4 from "../assets/leo.jpg";
import kala from "../assets/kala.png";

export interface VolunteerImageItem {
  id: string;
  type: "image";
  title: string;
  year: string;
  role?: string;
  description: string;
  gridClass: string;
  image: string;
}

export interface VolunteerTextItem {
  id: string;
  type: "text" | "achievement" | "leadership" | "stat" | "project";
  title: string;
  subtitle?: string;
  description?: string;
  stat?: string;
  gridClass: string;
}

export type VolunteerItem = VolunteerImageItem | VolunteerTextItem;

export const volunteerItems: VolunteerItem[] = [
  {
    id: "photo-1",
    type: "image",
    title: "Service Project: Harbour of Joy",
    year: "2023",
    // role: "Volunteer",
    description: "We took the kids on a ferry ride!",
    image: img2,
    gridClass: "col-span-12 md:col-span-7 row-span-4",
  },

  {
    id: "events",
    type: "stat",
    title: "Events organized",
    stat: "50+",
    description: "Starts from ideation, talking to the organisations about their needs, scheduling timings, gathering a team, supervising the team's progress and actions, scheduling meetings, documenting those meetings, talking to vendors and managing budgets, coordinate volunteers, working thorugh on-day logistics, reporting the project with accurate statistics and doing it all over again the next day, I've done this all and so much more!",
    gridClass: "col-span-12 md:col-span-5 row-span-3",
  },

  {
    id: "budget",
    type: "stat",
    title: "Budget managed",
    stat: "₹15L+",
    // description: "Placeholder description.",
    gridClass: "col-span-12 md:col-span-5 row-span-1",
  },
  {
    id: "creative-director",
    type: "leadership",
    title: "Creative Director",
    subtitle: "2022–23",
    description: "Helped handle the social media account of the club, making creative posts and documenting the projects on day",
    gridClass: "col-span-12 md:col-span-5 row-span-2",
  },
  {
    id: "photo-2",
    type: "image",
    title: "Rural Day",
    year: "2022",
    role: "Project Lead",
    description: "",
    image: img1,
    gridClass: "col-span-12 md:col-span-7 row-span-3",
  },
  {
    id: "photo-3",
    type: "image",
    title: "Diwali Project",
    year: "2022",
    // role: "Coordinator",
    description: "Spreading a little light with underpriviledged children!",
    image: img3,
    gridClass: "col-span-12 md:col-span-5 row-span-4",
  },
  {
    id: "joint-secretary",
    type: "leadership",
    title: "Joint Secretary",
    subtitle: "2023–24",
    description: "What a journey it is. So much work but so much more fun!",
    gridClass: "col-span-12 md:col-span-4 row-span-2",
  },
  {
    id: "members",
    type: "stat",
    title: "Members worked with",
    stat: "300+",
    description: "Just to show that I have worked with A LOT of different personalities.",
    gridClass: "col-span-12 md:col-span-3 row-span-2",
  },
  {
    id: "teaching",
    type: "image",
    title: "Teaching Project",
    year: "2021",
    role: "English Teacher",
    description:
      "Taught English to teachers in a remote area for 2 months.",
    image: kala,
    gridClass: "col-span-12 md:col-span-7 row-span-3",
  },
    {
    id: "joint-secretary",
    type: "leadership",
    title: "Service Month Coordinator",
    subtitle: "2022",
    description: "Went all in on service for the month and I was responsible for handling 3 of those!",
    gridClass: "col-span-12 md:col-span-5 row-span-2",
  },
  {
    id: "photo-4",
    type: "image",
    title: "We won Awards!",
    year: "2024",
    // role: "Volunteer",
    description: "Maybe the awards were the friends we made along the way lol",
    image: img4,
    gridClass: "col-span-12 md:col-span-7 row-span-3",
  },

  {
    id: "award-2",
    type: "text",
    title: "Rural Day",
    subtitle: "My favorite project",
    // subtitle: "2022",
    description: "We installed Solar Panels, set up a library, planted trees, donated toys, books and clothes, organised a fun fair and had the best time with kids in 2 rural schools. One of those days when you put in all your effort and it turns out to be equally rewarding. This project also won an award at the District level! ",
    gridClass: "col-span-12 md:col-span-5 row-span-3",
  },
];
