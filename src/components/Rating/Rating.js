import './Rating.css';
import ReactLoading from 'react-loading';

const RATINGS = new Array(5).fill(0);

function getStars (rating) {
  return RATINGS.map((_, i) => {
    return i < rating
      ? '⭐️'
      : '☆'
  })
}

export default function Rating (props) {
  if (props.loading) {
    return (<div className='rating'>
      <ReactLoading type='bubbles' color='#fff' />
    </div>)
  }

  if (props.providers?.length) {
    return (<div className='rating'>
      <span>{getStars(props.providers?.length)}</span>
      {/* <span>{props.providers.map(p => '⭐️')}</span> */}
    </div>)
  } else {
    return <div className='rating'></div>
  }
}