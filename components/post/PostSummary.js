
import React, {useState} from 'react';
import cs from 'classnames'
import Link from 'next/link'
// import img from ''
import {
  LazyLoadImage,
} from 'react-lazy-load-image-component';
import '@/public/style/components/post/post-summary.less'

const PostSummary = (props) => {
  const [myList, setMyList] = useState(props.list.data)
  console.log(myList)
  return (
    <>
      {myList.map((item, index) => (
        <div 
          className={cs(
            "blog_summary_content", 
            index % 2 === 0 ? "reverse" : '',
          )} 
          key={index}
        >
          <div className="blog_thumb_wrapper">
            <Link href={`/detail?id=${item.id}`}>
              <figure className="blog_thumb">
                <LazyLoadImage
                  className="img"
                  alt={item.title}
                  width='100%'
                  height='100%'
                  effect='blur'
                  src={item.cover_url || 'http://pic.wyfs.top/blog/86fba42e3919ba4c947ef4412f6a5c43.jpg'}
                />
              </figure>
            </Link>
          </div>
          <div className="blog_info">
            <p className="publish_date">
              {/* <svg>
                <use xlinkHref={`${svgIcons}${svgSprite.time}`} />
              </svg> */}
              Released {item.addTime}
            </p>
            {/* <Link to={`${routePath.blogDetail}${post._id}`}> */}
              <h3 className="title">{item.title}</h3>
            {/* </Link> */}
            <div className="extra_info">
              <span>
                {/* <svg>
                  <use xlinkHref={`${svgIcons}${svgSprite.eye}`} />
                </svg> */}
                {item.view_count} PV
              </span>
              <span>
                {/* <svg>
                  <use xlinkHref={`${svgIcons}${svgSprite.comments1}`} />
                </svg> */}
                <Link href={`/detail?id=${item.id}`}>
                  <span>{item.view_count}{' '}{item.view_count > 1 ? 'Likes' : 'Like'}</span>
                </Link>
              </span>
              <span className="category">
                {/* <svg>
                  <use xlinkHref={`${svgIcons}${svgSprite.closeFolder}`} />
                </svg> */}
                <Link href={`/detail?id=${item.id}`}>
                  <span>{item.typeName}</span>
                </Link>
              </span>
            </div>
            <p className="summary_content">{item.introduce}</p>
            <div className="show_detail_wrapper">
              {/* <Link to={`${routePath.blogDetail}${post._id}`}>
                <svg className={styles.icon_more}>
                  <use xlinkHref={`${svgIcons}${svgSprite.more}`} />
                </svg>
              </Link> */}
            </div>
          </div>
        </div>
      ))}
    </>
  )
}


export default PostSummary