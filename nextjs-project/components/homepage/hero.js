import Image from "next/image";

import classes from "./hero.module.css";

const Hero = () => {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image
          src="/images/site/brrrr.jpg"
          alt="A cold day in Tom town"
          width={300}
          height={300}
        />
      </div>
      <h1>Hallo!</h1>
      <p>I do stuff - and this is a vercel demo blog</p>
    </section>
  );
};

export default Hero;
