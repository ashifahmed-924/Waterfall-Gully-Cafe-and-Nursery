import AmbientGarden from "@/components/ambience/AmbientGarden";
import CustomCursor from "@/components/CustomCursor";
import GardenCafeHero from "@/components/hero/GardenCafeHero";
import BotanicalTagStrip from "@/components/BotanicalTagStrip";
import CafeNurseryIntro from "@/components/CafeNurseryIntro";
import BreakfastGarden from "@/components/BreakfastGarden";
import RostiMoment from "@/components/RostiMoment";
import TeaUnderLeaves from "@/components/TeaUnderLeaves";
import CoffeeCanopy from "@/components/CoffeeCanopy";
import MenuSection from "@/components/Menu/MenuSection";
import CabinetGlasshouse from "@/components/CabinetGlasshouse";
import NurseryTransition from "@/components/Nursery/NurseryTransition";
import NurseryAisles from "@/components/Nursery/NurseryAisles";
import NurseryPhotoWalk from "@/components/Nursery/NurseryPhotoWalk";
import OutdoorGarden from "@/components/OutdoorGarden";
import GiftCardSection from "@/components/GiftCardSection";
import LoyaltySection from "@/components/LoyaltySection";
import BotanicalFilmStrip from "@/components/BotanicalFilmStrip";
import FeedbackSection from "@/components/FeedbackSection";
import GreenhouseHours from "@/components/GreenhouseHours";
import PottingBenchLocation from "@/components/PottingBenchLocation";
import FinalGardenCTA from "@/components/FinalGardenCTA";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <AmbientGarden />
      <CustomCursor />
      <main id="main-content">
        <GardenCafeHero />
        <BotanicalTagStrip />
        <CafeNurseryIntro />
        <BreakfastGarden />
        <RostiMoment />
        <TeaUnderLeaves />
        <CoffeeCanopy />
        <MenuSection />
        <CabinetGlasshouse />
        <NurseryTransition />
        <NurseryAisles />
        <NurseryPhotoWalk />
        <OutdoorGarden />
        <GiftCardSection />
        <LoyaltySection />
        <BotanicalFilmStrip />
        <FeedbackSection />
        <GreenhouseHours />
        <PottingBenchLocation />
        <FinalGardenCTA />
      </main>
      <Footer />
    </>
  );
}
