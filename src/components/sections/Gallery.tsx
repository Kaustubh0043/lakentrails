"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Maximize2, ChevronLeft, ChevronRight, Play } from "lucide-react";

interface GalleryItem {
  src: string;
  title: string;
  category: string;
  type: "image" | "video";
  colSpan?: string;
  rowSpan?: string;
}

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [visibleCount, setVisibleCount] = useState<number>(12);
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const galleryItems: GalleryItem[] = [
    {
      src: "/images/IMG_6878.MP4",
      title: "Welcome to Lake N Trails (Official Intro)",
      category: "Others",
      type: "video",
      colSpan: "md:col-span-2",
      rowSpan: "h-[300px] md:h-[450px]"
    },
    {
      src: "/images/IMG_6574.MOV",
      title: "Lakeside Vibe Video Tour",
      category: "Others",
      type: "video",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]"
    },
    {
      src: "/images/IMG_6591.MOV",
      title: "Lakeside Vibe Video Tour",
      category: "Others",
      type: "video",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]"
    },
    {
      src: "/images/IMG_6595.MOV",
      title: "Lakeside Vibe Video Tour",
      category: "Others",
      type: "video",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]"
    },
    {
      src: "/images/IMG_6608.MOV",
      title: "Lakeside Vibe Video Tour",
      category: "Others",
      type: "video",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]"
    },
    {
      src: "/images/IMG_6648.MOV",
      title: "Lakeside Vibe Video Tour",
      category: "Others",
      type: "video",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]"
    },
    {
      src: "/images/IMG_6649.MOV",
      title: "Lakeside Vibe Video Tour",
      category: "Others",
      type: "video",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]"
    },
    {
      src: "/images/IMG_6651.MOV",
      title: "Lakeside Vibe Video Tour",
      category: "Others",
      type: "video",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]"
    },
    {
      src: "/images/IMG_6653.MOV",
      title: "Lakeside Vibe Video Tour",
      category: "Others",
      type: "video",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]"
    },
    {
      src: "/images/IMG_6654.MOV",
      title: "Lakeside Vibe Video Tour",
      category: "Others",
      type: "video",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]"
    },
    {
      src: "/images/20260712_184521.jpg.jpeg",
      title: "Resort Landscape Snapshot",
      category: "Others",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]"
    },
    {
      src: "/images/20260715_191708.jpg.jpeg",
      title: "Resort Landscape Snapshot",
      category: "Others",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]"
    },
    {
      src: "/images/IMG_6667.MOV",
      title: "Lakeside Vibe Video Tour",
      category: "Others",
      type: "video",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]"
    },
    {
      src: "/images/IMG_6622.MOV",
      title: "Lakeside Vibe Video Tour",
      category: "Others",
      type: "video",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]"
    },
    {
      src: "/images/20260709_113356.jpg.jpeg",
      title: "Resort Landscape Snapshot",
      category: "Others",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]"
    },
    {
      src: "/images/20260709_152456.jpg.jpeg",
      title: "Resort Landscape Snapshot",
      category: "Others",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]"
    },
    {
      src: "/images/20260711_162821.jpg.jpeg",
      title: "Resort Landscape Snapshot",
      category: "Others",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]"
    },
    {
      src: "/images/20260711_170221.jpg.jpeg",
      title: "Resort Landscape Snapshot",
      category: "Others",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]"
    },
    {
      src: "/images/20260711_224443.jpg.jpeg",
      title: "Resort Landscape Snapshot",
      category: "Others",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]"
    },
    {
      src: "/images/20260712_104550.jpg.jpeg",
      title: "Resort Landscape Snapshot",
      category: "Others",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]"
    },
    {
      src: "/images/20260712_104825.jpg.jpeg",
      title: "Resort Landscape Snapshot",
      category: "Others",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]"
    },
    {
      src: "/images/20260712_113010.jpg.jpeg",
      title: "Resort Landscape Snapshot",
      category: "Others",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]"
    },
    {
      src: "/images/20260715_181522.mp4",
      title: "Lakeside Vibe Video Tour",
      category: "Others",
      type: "video",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]"
    },
    {
      src: "/images/20260718_170918.jpg.jpeg",
      title: "Resort Landscape Snapshot",
      category: "Others",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]"
    },
    {
      src: "/images/20260718_171843.jpg.jpeg",
      title: "Resort Landscape Snapshot",
      category: "Others",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]"
    },
    {
      src: "/images/20260718_201415.mp4",
      title: "Lakeside Vibe Video Tour",
      category: "Others",
      type: "video",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]"
    },
    {
      src: "/images/20260718_201428.mp4",
      title: "Lakeside Vibe Video Tour",
      category: "Others",
      type: "video",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]"
    },
    {
      src: "/images/20260719_095540.jpg.jpeg",
      title: "Resort Landscape Snapshot",
      category: "Others",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]"
    },
    {
      src: "/images/20260719_101718.jpg.jpeg",
      title: "Resort Landscape Snapshot",
      category: "Others",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]"
    },
    {
      src: "/images/20260719_103307.mp4",
      title: "Lakeside Vibe Video Tour",
      category: "Others",
      type: "video",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]"
    },
    {
      src: "/images/20260719_103315.mp4",
      title: "Lakeside Vibe Video Tour",
      category: "Others",
      type: "video",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]"
    },
    {
      src: "/images/20260719_105948.mp4",
      title: "Lakeside Vibe Video Tour",
      category: "Others",
      type: "video",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]"
    },
    {
      src: "/images/20260724_125325.jpg.jpeg",
      title: "Resort Landscape Snapshot",
      category: "Others",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]"
    },
    {
      src: "/images/20260724_190434.jpg.jpeg",
      title: "Resort Landscape Snapshot",
      category: "Others",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]"
    },
    {
      src: "/images/Dog birthday celebration/20260726_141031.jpg.jpeg",
      title: "Dog",
      category: "Dog",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]"
    },
    {
      src: "/images/Dog birthday celebration/20260726_142225.jpg.jpeg",
      title: "Dog",
      category: "Dog",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]"
    },
    {
      src: "/images/Dog birthday celebration/20260726_142329.jpg.jpeg",
      title: "Dog",
      category: "Dog",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]"
    },
    {
      src: "/images/Dog birthday celebration/20260726_142353.jpg.jpeg",
      title: "Dog",
      category: "Dog",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]"
    },
    {
      src: "/images/DVP_9209.JPG",
      title: "Lake N Trails Capture",
      category: "Others",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]"
    },
    {
      src: "/images/DVP_9215.JPG",
      title: "Lakeside Swimming Pool & Palms",
      category: "Others",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]"
    },
    {
      src: "/images/DVP_9216.JPG",
      title: "Lakeside Swimming Pool & Palms",
      category: "Others",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]"
    },
    {
      src: "/images/DVP_9217.JPG",
      title: "Lakeside Swimming Pool & Palms",
      category: "Others",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]"
    },
    {
      src: "/images/DVP_9218.JPG",
      title: "Lakeside Swimming Pool & Palms",
      category: "Others",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]"
    },
    {
      src: "/images/DVP_9223.JPG",
      title: "Premium Lakeside Canopy Dinner",
      category: "Others",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]"
    },
    {
      src: "/images/DVP_9224.JPG",
      title: "Premium Lakeside Canopy Dinner",
      category: "Others",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]"
    },
    {
      src: "/images/DVP_9227.JPG",
      title: "Luxury Geodesic Dome Vibe",
      category: "Others",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]"
    },
    {
      src: "/images/DVP_9228.JPG",
      title: "Luxury Geodesic Dome Vibe",
      category: "Others",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]"
    },
    {
      src: "/images/DVP_9229.JPG",
      title: "Luxury Geodesic Dome Vibe",
      category: "Others",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]"
    },
    {
      src: "/images/DVP_9231.JPG",
      title: "Luxury Geodesic Dome Vibe",
      category: "Others",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]"
    },
    {
      src: "/images/DVP_9232.JPG",
      title: "Luxury Geodesic Dome Vibe",
      category: "Others",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]"
    },
    {
      src: "/images/DVP_9237.JPG",
      title: "Palm sitout and lounge deck",
      category: "Others",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]"
    },
    {
      src: "/images/DVP_9245.JPG",
      title: "Palm sitout and lounge deck",
      category: "Others",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]"
    },
    {
      src: "/images/DVP_9248.JPG",
      title: "Lake N Trails Capture",
      category: "Others",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]"
    },
    {
      src: "/images/DVP_9254.JPG",
      title: "Lake N Trails Capture",
      category: "Others",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]"
    },
    {
      src: "/images/DVP_9272.JPG",
      title: "Outdoor Hammock & Palm Vibe",
      category: "Others",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]"
    },
    {
      src: "/images/IMG-20260712-WA0152.jpg.jpeg",
      title: "Resort Landscape Snapshot",
      category: "Others",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]"
    },
    {
      src: "/images/IMG-20260726-WA0037.jpg.jpeg",
      title: "Resort Landscape Snapshot",
      category: "Others",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]"
    },
    {
      src: "/images/img11.jpeg",
      title: "Resort Landscape Snapshot",
      category: "Others",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]"
    },
    {
      src: "/images/img12.jpeg",
      title: "Resort Landscape Snapshot",
      category: "Others",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]"
    },
    {
      src: "/images/img13.jpeg",
      title: "Resort Landscape Snapshot",
      category: "Others",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]"
    },
    {
      src: "/images/img14.jpeg",
      title: "Resort Landscape Snapshot",
      category: "Others",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]"
    },
    {
      src: "/images/img15.jpeg",
      title: "Resort Landscape Snapshot",
      category: "Others",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]"
    },
    {
      src: "/images/img16.jpeg",
      title: "Resort Landscape Snapshot",
      category: "Others",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]"
    },
    {
      src: "/images/img2_hd.png",
      title: "Resort Landscape Snapshot",
      category: "Others",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]"
    },
    {
      src: "/images/img3.jpeg",
      title: "Resort Landscape Snapshot",
      category: "Others",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]"
    },
    {
      src: "/images/img4.jpeg",
      title: "Resort Landscape Snapshot",
      category: "Others",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]"
    },
    {
      src: "/images/img5.jpeg",
      title: "Resort Landscape Snapshot",
      category: "Others",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]"
    },
    {
      src: "/images/img6.jpeg",
      title: "Resort Landscape Snapshot",
      category: "Others",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]"
    },
    {
      src: "/images/img7.jpeg",
      title: "Resort Landscape Snapshot",
      category: "Others",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]"
    },
    {
      src: "/images/img8.jpeg",
      title: "Resort Landscape Snapshot",
      category: "Others",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]"
    },
    {
      src: "/images/img9.jpeg",
      title: "Resort Landscape Snapshot",
      category: "Others",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]"
    },
    {
      src: "/images/IMG_6569.MOV",
      title: "Lakeside Vibe Video Tour",
      category: "Others",
      type: "video",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]"
    },
    {
      src: "/images/IMG_6572.MOV",
      title: "Lakeside Vibe Video Tour",
      category: "Others",
      type: "video",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]"
    },
    {
      src: "/images/IMG_6576.MOV",
      title: "Lakeside Vibe Video Tour",
      category: "Others",
      type: "video",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]"
    },
    {
      src: "/images/IMG_6578.MOV",
      title: "Lakeside Vibe Video Tour",
      category: "Others",
      type: "video",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]"
    },
    {
      src: "/images/IMG_6580.MOV",
      title: "Lakeside Vibe Video Tour",
      category: "Others",
      type: "video",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]"
    },
    {
      src: "/images/IMG_6582.MOV",
      title: "Lakeside Vibe Video Tour",
      category: "Others",
      type: "video",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]"
    },
    {
      src: "/images/IMG_6586.MOV",
      title: "Lakeside Vibe Video Tour",
      category: "Others",
      type: "video",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]"
    },
    {
      src: "/images/IMG_6593.MOV",
      title: "Lakeside Vibe Video Tour",
      category: "Others",
      type: "video",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]"
    },
    {
      src: "/images/IMG_6594.MOV",
      title: "Lakeside Vibe Video Tour",
      category: "Others",
      type: "video",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]"
    },
    {
      src: "/images/IMG_6596.MOV",
      title: "Lakeside Vibe Video Tour",
      category: "Others",
      type: "video",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]"
    },
    {
      src: "/images/IMG_6597.MOV",
      title: "Lakeside Vibe Video Tour",
      category: "Others",
      type: "video",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]"
    },
    {
      src: "/images/IMG_6600.MOV",
      title: "Lakeside Vibe Video Tour",
      category: "Others",
      type: "video",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]"
    },
    {
      src: "/images/IMG_6601.MOV",
      title: "Lakeside Vibe Video Tour",
      category: "Others",
      type: "video",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]"
    },
    {
      src: "/images/IMG_6602.MOV",
      title: "Lakeside Vibe Video Tour",
      category: "Others",
      type: "video",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]"
    },
    {
      src: "/images/IMG_6603.MOV",
      title: "Lakeside Vibe Video Tour",
      category: "Others",
      type: "video",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]"
    },
    {
      src: "/images/IMG_6605.MOV",
      title: "Lakeside Vibe Video Tour",
      category: "Others",
      type: "video",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]"
    },
    {
      src: "/images/IMG_6607.MOV",
      title: "Lakeside Vibe Video Tour",
      category: "Others",
      type: "video",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]"
    },
    {
      src: "/images/IMG_6612.MOV",
      title: "Lakeside Vibe Video Tour",
      category: "Others",
      type: "video",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]"
    },
    {
      src: "/images/IMG_6614.MOV",
      title: "Lakeside Vibe Video Tour",
      category: "Others",
      type: "video",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]"
    },
    {
      src: "/images/IMG_6620.MOV",
      title: "Lakeside Vibe Video Tour",
      category: "Others",
      type: "video",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]"
    },
    {
      src: "/images/IMG_6634.MOV",
      title: "Lakeside Vibe Video Tour",
      category: "Others",
      type: "video",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]"
    },
    {
      src: "/images/IMG_6639.MOV",
      title: "Lakeside Vibe Video Tour",
      category: "Others",
      type: "video",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]"
    },
    {
      src: "/images/IMG_6642.MOV",
      title: "Lakeside Vibe Video Tour",
      category: "Others",
      type: "video",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]"
    },
    {
      src: "/images/IMG_6643.MOV",
      title: "Lakeside Vibe Video Tour",
      category: "Others",
      type: "video",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]"
    },
    {
      src: "/images/IMG_6645.HEIC",
      title: "Resort Landscape Snapshot",
      category: "Others",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]"
    },
    {
      src: "/images/IMG_6645.jpg",
      title: "Resort Landscape Snapshot",
      category: "Others",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]"
    },
    {
      src: "/images/IMG_6646.HEIC",
      title: "Resort Landscape Snapshot",
      category: "Others",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]"
    },
    {
      src: "/images/IMG_6652.MOV",
      title: "Lakeside Vibe Video Tour",
      category: "Others",
      type: "video",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]"
    },
    {
      src: "/images/IMG_6655.MOV",
      title: "Lakeside Vibe Video Tour",
      category: "Others",
      type: "video",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]"
    },
    {
      src: "/images/IMG_6660.MOV",
      title: "Lakeside Vibe Video Tour",
      category: "Others",
      type: "video",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]"
    },
    {
      src: "/images/IMG_6663.MOV",
      title: "Lakeside Vibe Video Tour",
      category: "Others",
      type: "video",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]"
    },
    {
      src: "/images/IMG_6664.MOV",
      title: "Lakeside Vibe Video Tour",
      category: "Others",
      type: "video",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]"
    },
    {
      src: "/images/IMG_6665.MOV",
      title: "Lakeside Vibe Video Tour",
      category: "Others",
      type: "video",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]"
    },
    {
      src: "/images/IMG_6666.MOV",
      title: "Lakeside Vibe Video Tour",
      category: "Others",
      type: "video",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]"
    },
    {
      src: "/images/IMG_6672.HEIC",
      title: "Resort Landscape Snapshot",
      category: "Others",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]"
    },
    {
      src: "/images/IMG_6672.jpg",
      title: "Resort Landscape Snapshot",
      category: "Others",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]"
    },
    {
      src: "/images/IMG_6673.HEIC",
      title: "Resort Landscape Snapshot",
      category: "Others",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]"
    },
    {
      src: "/images/IMG_6673.jpg",
      title: "Resort Landscape Snapshot",
      category: "Others",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]"
    },
    {
      src: "/images/IMG_6675.HEIC",
      title: "Resort Landscape Snapshot",
      category: "Others",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]"
    },
    {
      src: "/images/IMG_6675.jpg",
      title: "Resort Landscape Snapshot",
      category: "Others",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]"
    },
    {
      src: "/images/IMG_6684.MOV",
      title: "Lakeside Vibe Video Tour",
      category: "Others",
      type: "video",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]"
    },
    {
      src: "/images/IMG_8338.jpeg",
      title: "Resort Landscape Snapshot",
      category: "Others",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]"
    },
    {
      src: "/images/IMG_8343.jpeg",
      title: "Resort Landscape Snapshot",
      category: "Others",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]"
    },
    {
      src: "/images/IMG_8376.jpeg",
      title: "Resort Landscape Snapshot",
      category: "Others",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]"
    },
    {
      src: "/images/IMG_8398.jpeg",
      title: "Resort Landscape Snapshot",
      category: "Others",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]"
    },
    {
      src: "/images/IMG_8399.jpeg",
      title: "Resort Landscape Snapshot",
      category: "Others",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]"
    },
    {
      src: "/images/IMG_8400.jpeg",
      title: "Resort Landscape Snapshot",
      category: "Others",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]"
    },
    {
      src: "/images/lakesideview2.jpeg",
      title: "Calm Waters of Adoshi Reservoir",
      category: "Others",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]"
    },
    {
      src: "/images/resort_background_hd_4k.jpg",
      title: "Resort Landscape Snapshot",
      category: "Others",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]"
    },
    {
      src: "/images/VID-20260719-WA0223.mp4",
      title: "Lakeside Vibe Video Tour",
      category: "Others",
      type: "video",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]"
    },
    {
      src: "/images/VID-20260726-WA0041.mp4",
      title: "Lakeside Vibe Video Tour",
      category: "Others",
      type: "video",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]"
    },
    {
      src: "/images/WhatsApp Image 2026-05-25 at 8.22.49 PM (2).jpeg",
      title: "Resort Landscape Snapshot",
      category: "Others",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]"
    },
    {
      src: "/images/WhatsApp Image 2026-05-25 at 8.22.50 PM (1).jpeg",
      title: "Resort Landscape Snapshot",
      category: "Others",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]"
    },
    {
      src: "/images/WhatsApp Image 2026-05-25 at 8.22.50 PM (2).jpeg",
      title: "Resort Landscape Snapshot",
      category: "Others",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]"
    },
    {
      src: "/images/WhatsApp Image 2026-05-25 at 8.22.50 PM.jpeg",
      title: "Resort Landscape Snapshot",
      category: "Others",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]"
    }
  ];

  // Filtering Categories list
  const categories = [
    "All",
    "Photos",
    "Videos",
    "Riders Special",
    "Dog's Birthday",
  ];

  // Listen for global custom events to change filter categories dynamically (e.g. from the top banner)
  useEffect(() => {
    const handleFilterEvent = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      if (customEvent.detail) {
        setActiveCategory(customEvent.detail);
      }
    };
    window.addEventListener("filter-gallery", handleFilterEvent);
    return () => window.removeEventListener("filter-gallery", handleFilterEvent);
  }, []);

  // Apply filters
  const filteredItems = galleryItems.filter((item) => {
    if (activeCategory === "All") return true;
    if (activeCategory === "Photos") return item.type === "image";
    if (activeCategory === "Videos") return item.type === "video";
    return item.category === activeCategory;
  });

  const displayedItems = filteredItems.slice(0, visibleCount);



  // Navigation handlers for Lightbox
  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeIdx === null) return;
    setActiveIdx((activeIdx + 1) % filteredItems.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeIdx === null) return;
    setActiveIdx((activeIdx - 1 + filteredItems.length) % filteredItems.length);
  };

  return (
    <section id="gallery" className="relative w-full py-24 md:py-32 bg-[#030a16] overflow-hidden">
      {/* Background Soft Ambient Light */}
      <div className="absolute top-[30%] left-[20%] w-[450px] h-[450px] rounded-full bg-luxury-teal/5 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-sans tracking-[0.3em] text-sunset uppercase mb-3 block font-medium">
            Visual Storytelling
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light text-white mb-6 uppercase tracking-wider">
            Resort <span className="text-glow-sunset italic font-normal text-sunset">Gallery</span>
          </h2>
          <p className="text-sand/80 text-sm md:text-base font-sans leading-relaxed">
            Step into the magical atmosphere of Lake N Trails Exotic Glamping. Explore our real drone footage and snaps highlighting beautiful sunsets, luxury glamping, poolside vibe stay, romantic weddings, and lakeside tables.
          </p>
        </div>

        {/* Filter Categories Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12 max-w-5xl mx-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setVisibleCount(12); // Reset count on filter change
              }}
              className={`px-4 py-2 rounded-full text-[10px] font-sans font-medium uppercase tracking-[0.15em] transition-all duration-300 border cursor-pointer ${
                activeCategory === cat
                  ? "bg-sunset border-sunset text-white shadow-lg shadow-sunset/15"
                  : "bg-[#030f26]/40 border-sand/15 text-sand hover:text-white hover:border-sunset/50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {displayedItems.map((item, idx) => (
              <motion.div
                key={`${item.src}-${idx}`}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="md:col-span-1 h-[300px] md:h-[350px] rounded-2xl overflow-hidden glass-panel border border-sand/15 relative group cursor-pointer"
                onClick={() => setActiveIdx(idx)}
              >
                {/* Media Element */}
                {item.src.toLowerCase().endsWith(".mp4") || item.src.toLowerCase().endsWith(".mov") ? (
                  <div className="absolute inset-0 w-full h-full">
                    <video
                      src={item.src}
                      muted
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                    />
                    <div className="absolute inset-0 flex items-center justify-center z-[3]">
                      <div className="w-12 h-12 rounded-full bg-sunset/80 backdrop-blur-sm flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-all duration-300">
                        <Play className="w-5 h-5 fill-current ml-0.5" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <img
                    src={item.src}
                    alt={item.title}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                  />
                )}

                {/* Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#030a16]/90 via-[#030a16]/30 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500 z-[1] pointer-events-none" />
                <div className="absolute inset-0 border border-transparent group-hover:border-sunset/30 rounded-2xl transition-colors duration-500 z-[2] pointer-events-none" />

                {/* Hover content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 z-10 pointer-events-none">
                  <span className="text-[9px] font-sans uppercase tracking-[0.25em] text-sunset mb-1.5 opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-500 ease-out">
                    {item.category}
                  </span>
                  <h3 className="text-base font-serif font-light text-[#fcfbf7] opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-500 delay-75 ease-out">
                    {item.title}
                  </h3>
                  
                  {/* Maximize / Preview Icon */}
                  <div className="absolute top-6 right-6 w-8 h-8 rounded-full glass-panel border border-sand/20 flex items-center justify-center text-white/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-auto">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Load More Button */}
        {filteredItems.length > visibleCount && (
          <div className="flex justify-center mt-12">
            <button
              onClick={() => setVisibleCount((prev) => Math.min(prev + 12, filteredItems.length))}
              className="px-8 py-3.5 rounded-full bg-[#fcfbf7] text-black hover:bg-sunset hover:text-white text-[10px] font-sans uppercase tracking-[0.2em] font-medium transition-all duration-300 shadow-xl cursor-pointer hover:-translate-y-0.5"
            >
              View More Snaps
            </button>
          </div>
        )}
      </div>

      {/* Lightbox / Fullscreen Modal */}
      <AnimatePresence>
        {activeIdx !== null && filteredItems[activeIdx] && (
          <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/95 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveIdx(null)}
            />

            {/* Content box */}
            <motion.div
              className="w-full max-w-5xl aspect-video md:aspect-[16/9] relative z-10 flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", damping: 30 }}
            >
              {/* Media viewer */}
              {filteredItems[activeIdx].src.toLowerCase().endsWith(".mp4") || filteredItems[activeIdx].src.toLowerCase().endsWith(".mov") ? (
                <video
                  src={filteredItems[activeIdx].src}
                  controls
                  autoPlay
                  muted={!filteredItems[activeIdx].src.toLowerCase().includes("img_6878")}
                  onVolumeChange={(e) => {
                    const video = e.currentTarget;
                    if (!video.src.toLowerCase().includes("img_6878")) {
                      video.muted = true;
                      video.volume = 0;
                    }
                  }}
                  className="w-full h-full object-contain max-h-[80vh] rounded-2xl shadow-2xl bg-black"
                />
              ) : (
                <img
                  src={filteredItems[activeIdx].src}
                  alt={filteredItems[activeIdx].title}
                  className="w-full h-full object-contain max-h-[80vh] rounded-2xl shadow-2xl"
                />
              )}

              {/* Top Banner Info */}
              <div className="absolute top-4 left-4 z-20 text-left glass-panel py-2.5 px-4 rounded-xl border border-sand/15 bg-black/40 backdrop-blur-sm">
                <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-sunset font-semibold block">
                  {filteredItems[activeIdx].category}
                </span>
                <h3 className="text-sm md:text-base font-serif font-light text-white leading-normal">
                  {filteredItems[activeIdx].title}
                </h3>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setActiveIdx(null)}
                className="absolute top-4 right-4 text-white/70 hover:text-sunset transition-colors duration-300 p-2.5 glass-panel rounded-full border border-sand/20 cursor-pointer bg-black/40 backdrop-blur-sm z-50"
                aria-label="Close preview"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Navigation Left / Right */}
              <button
                onClick={handlePrev}
                className="absolute left-4 p-3.5 glass-panel rounded-full border border-sand/20 text-white/70 hover:text-sunset hover:border-sunset transition-all cursor-pointer bg-black/40 backdrop-blur-sm z-50"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-4 p-3.5 glass-panel rounded-full border border-sand/20 text-white/70 hover:text-sunset hover:border-sunset transition-all cursor-pointer bg-black/40 backdrop-blur-sm z-50"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
