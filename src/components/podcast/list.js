import React from 'react'
import {graphql, StaticQuery} from 'gatsby'
import Link from 'components/link'
import {css} from '@emotion/core'
import theme from '../../../config/theme'
import {fonts} from '../../lib/typography'
import {bpMaxMD} from '../../lib/breakpoints'

function List({data}) {
  return (
    <ul
      css={css({
        margin: 0,
        listStyle: 'none',
        marginLeft: -20,
        [bpMaxMD]: {
          marginLeft: 0,
        },
      })}
    >
      {data.allEpisode.nodes.map(episode => (
        <li
          key={episode.id}
          css={css({
            marginBottom: 5,
          })}
        >
          <Link
            to={`/podcast/${episode.fields.slug}`}
            activeClassName="active"
            css={css({
              // bump font size accordingly to title length
              // consider adding episode image
              fontSize: '15px',
              display: 'block',
              height: '100%',
              padding: '10px 17px',
              fontFamily: fonts.semibold,
              color: theme.colors.body_color,
              borderRadius: 3,
              overflow: 'none',
              borderLeft: '3px solid',
              borderColor: theme.colors.bg_color,
              '&.active': {
                borderLeft: '3px solid',
                borderColor: theme.brand.primary,
                color: theme.brand.primary,
                background: 'white',
                boxShadow: '0 10px 25px -10px rgba(0,0,0,0.15)',
                ':hover': {
                  borderColor: theme.brand.primary,
                },
              },
              ':hover': {
                color: theme.brand.primary,
                borderColor: 'white',
                background: 'white',
                boxShadow: '0 10px 25px -10px rgba(0,0,0,0.15)',
              },
              small: {
                marginLeft: 5,
                opacity: 0.6,
              },
            })}
          >
            {episode.title}
            <small>E{episode.number}</small>
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default function PodcastList(props) {
  return (
    <StaticQuery
      query={graphql`
        {
          allEpisode(filter: {season: {number: {eq: 1}}}) {
            nodes {
              id
              title
              number
              enclosure_url
              season {
                number
              }
              fields {
                slug
              }
            }
          }
        }
      `}
      render={data => <List data={data} {...props} />}
    />
  )
}
