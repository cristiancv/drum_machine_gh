import { PropTypes } from "prop-types";

export default function Audio({ src, id, vol }) {
  //console.log("this.audio.vol --> ",vol/100);
  const Vol = vol / 100;
  console.log("Vol --> ", Vol);
  return (
    <audio
      src={src}
      id={id}
      className="clip"
      volume={Vol}
      type="audio/wav"
      autoPlay
      controls
    />
  );
}

Audio.propTypes = {
  src: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  vol: PropTypes.number.isRequired,
};
Audio.defaultProps = {
  vol: 0.6,
};
