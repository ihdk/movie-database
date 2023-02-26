import React, { useEffect, useRef, useState } from 'react';

import 'swiper/css';
import { Navigation } from 'swiper';
import {
  Swiper as CoreSwiper,
  SwiperProps as CoreSwiperProps,
  SwiperSlide as CoreSwiperSlide,
  SwiperSlideProps as CoreSwiperSlideProps
} from 'swiper/react';

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { styled, useTheme } from '@mui/material/styles';


const useNavigationRef = <T extends HTMLButtonElement>(): [T | null, React.Ref<T>] => {
  const [element, setElement] = useState<T | null>(null)
  const ref = useRef<T>(null)

  useEffect(() => {
    if (ref.current) {
      setElement(ref.current)
    }
  }, [])

  return [element, ref]
}

interface SwiperPops<S> {
  slides: S[]
}

/**
 *  Custom swiper
 */
const Swiper = <S extends React.ReactNode>({ slides }: SwiperPops<S>) => {
  const theme = useTheme()
  const [nextHtmlElement, nextRef] = useNavigationRef<HTMLButtonElement>();
  const [prevHtmlElement, prevRef] = useNavigationRef<HTMLButtonElement>();

  return (
    <StyledSwiper
      modules={[Navigation]}
      spaceBetween={parseInt(theme.spacing(2))}
      breakpoints={{
        [theme.breakpoints.values.lg]: {
          slidesPerView: 8,
          //slidesPerGroup: 8
        },
        [theme.breakpoints.values.md]: {
          slidesPerView: 5,
          //slidesPerGroup: 5
        },
        [theme.breakpoints.values.sm]: {
          slidesPerView: 3,
          //slidesPerGroup: 3
        },
        [theme.breakpoints.values.xs]: {
          slidesPerView: 2,
          //slidesPerGroup: 2
        }
      }}
      navigation={{
        prevEl: prevHtmlElement,
        nextEl: nextHtmlElement
      }}
      style={{ overflow: "visible", userSelect: "none" }}
      watchSlidesProgress
    >
      {slides.map((slide, index) => <SwiperSlide key={index}>{slide}</SwiperSlide>)}
      <NavigationButton ref={prevRef} size="large" navigation="prev" className="button-prev button-navigation"><ArrowBackIosNewIcon fontSize='large' /></NavigationButton>
      <NavigationButton ref={nextRef} size="large" navigation="next" className="button-next button-navigation"><ArrowForwardIosIcon fontSize='large' /></NavigationButton>
    </StyledSwiper >
  )
}

const StyledSwiper = styled(CoreSwiper)<CoreSwiperProps>(() => ({
  "&:not(:hover)": {
    "& .button-navigation": {
      opacity: 0
    }
  }
}))

const SwiperSlide = styled(CoreSwiperSlide)<CoreSwiperSlideProps>(() => ({
  "&:not(.swiper-slide-visible)": {
    pointerEvents: "none",
  }
}))


interface NavigationButtonProps extends IconButtonProps {
  navigation: 'next' | 'prev'
}

const NavigationButton = styled(IconButton)<NavigationButtonProps>(({ theme, navigation }) => {
  console.count(navigation)
  return ({
    color: theme.palette.primary.dark,
    background: theme.palette.background.whiteGradient,
    position: "absolute",
    top: "50%",
    zIndex: 1,
    transform: "translateY(-50%)",
    visibility: "visible",
    opacity: 1,
    transition: "opacity 0.3s",
    ...(navigation === "next" && { right: theme.spacing(2) }),
    ...(navigation === "prev" && { left: theme.spacing(2) }),

    "&:not(.swiper-button-disabled):hover": {
      background: theme.palette.background.fancy,
      color: theme.palette.primary.main,
    },

    "&.swiper-button-disabled": {
      opacity: 0,
      visibility: "hidden",
    }
  })
});

export default Swiper


