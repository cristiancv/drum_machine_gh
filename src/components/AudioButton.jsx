import { PropTypes } from 'prop-types';
export default function AudioButton ({active, src, name, id, handler }){
  const audio = <audio name={name} src={src} id={id} />;  
  return (
    <button className='drum-pad' onClick={handler}>
      {name} {active && audio} 
    </button>
  )
}
AudioButton.propTypes = {
  active: PropTypes.bool,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  handler: PropTypes.func.isRequired,
}