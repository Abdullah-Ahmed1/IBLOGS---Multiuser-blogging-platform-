import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as SiIcons from "react-icons/si";

export const SidebarData = [
  {
    title: "Blog",
    path: "/",
    icon: <SiIcons.SiBloglovin color="white" />,
    cName: "nav-text",
  },
  {
    title: "AddPost",
    path: "/bloggerdashboard/addpost ",
    icon: <AiIcons.AiFillPlusCircle color="white" />,
    cName: "nav-text",
  }, 
   
  // {
  //   title: "Home",
  //   path: "/",
  //   icon: <AiIcons.AiFillHome />,
  //   cName: "nav-text",
  // },
  {
    title: "AllPosts",
    path: "/bloggerdashboard/",
    icon: <IoIcons.IoIosPaper />,
    cName: "nav-text",
  },
  {
    title: "Comments",
    path: "/comemnts",
    icon: <FaIcons.FaCommentAlt/>,
    cName: "nav-text",
  },
  {
    title: "stats",
    path: "/stats",
    icon: <IoIcons.IoIosStats size="25px" />,
    cName: "nav-text",
  },
  {
    title: "Messages",
    path: "/messages",
    icon: <FaIcons.FaEnvelopeOpenText />,
    cName: "nav-text",
  },
  {
    title: "Support",
    path: "/support",
    icon: <IoIcons.IoMdHelpCircle />,
    cName: "nav-text",
  },
];
