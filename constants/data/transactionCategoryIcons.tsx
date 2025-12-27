import JioHotstarIcon from "@/assets/icons/category-icons/jio.svg";
import LinkedInIcon from "@/assets/icons/category-icons/linkedin.svg";
import NetflixIcon from "@/assets/icons/category-icons/netflix.svg";
import SpotifyIcon from "@/assets/icons/category-icons/spotify.svg";
import YoutubeIcon from "@/assets/icons/category-icons/youtube.svg";
import { Ionicons } from "@expo/vector-icons";
import React from "react";

export const transactinCategoryIcons: { [key: string]: React.ReactNode } = {
  // INCOME
  salary: <Ionicons name="briefcase-outline" size={24} color="black" />,
  freelance: <Ionicons name="laptop-outline" size={24} color="black" />,
  rent: <Ionicons name="home-outline" size={24} color="black" />,
  stockGains: <Ionicons name="trending-up-outline" size={24} color="black" />,
  cryptoGains: <Ionicons name="logo-bitcoin" size={24} color="black" />,
  gifts: <Ionicons name="gift-outline" size={24} color="black" />,
  refund: <Ionicons name="return-down-back-outline" size={24} color="black" />,
  cashback: <Ionicons name="cash-outline" size={24} color="black" />,

  // EXPENSE
  ecommerce: <Ionicons name="cart-outline" size={24} color="black" />,
  clothes: <Ionicons name="shirt-outline" size={24} color="black" />,
  food: <Ionicons name="fast-food-outline" size={24} color="black" />,
  travel: <Ionicons name="airplane-outline" size={24} color="black" />,
  transport: <Ionicons name="bus-outline" size={24} color="black" />,
  fuel: <Ionicons name="flame-outline" size={24} color="black" />,
  entertainment: (
    <Ionicons name="game-controller-outline" size={24} color="black" />
  ),
  electricity: <Ionicons name="flash-outline" size={24} color="black" />,
  youtubePremium: <YoutubeIcon width={24} height={24} />,
  spotifyPremium: <SpotifyIcon width={24} height={24} />,
  linkedinPremium: <LinkedInIcon width={24} height={24} />,
  jioHotstarPremium: <JioHotstarIcon width={24} height={24} />,
  netflixSubscription: <NetflixIcon width={24} height={24} />,

  others: (
    <Ionicons
      name="ellipsis-horizontal-circle-outline"
      size={24}
      color="black"
    />
  ),
};
