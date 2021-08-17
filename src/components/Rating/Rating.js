import './Rating.css'

export default function Rating (props) {
  if  (props.providers?.length) {
    return <div className='rating'>
      <span>{props.providers.map(p => '⭐️')}</span>
    </div>
  } else {
    return <div className='rating'></div>
  }
}