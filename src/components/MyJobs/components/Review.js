import { Body, Icon, Left, ListItem, Text, Thumbnail } from 'native-base';
import myJobsImg from '../../../assets/image/profile.png';
import {
  BLUE_DARK,
  BLUE_LIGHT,
  BLUE_MAIN,
  VIOLET_MAIN,
} from '../../../shared/colorPalette';
import { getRatingEmployeeFormat } from '../job-utils';
import moment from 'moment';
import React from 'react';

export const starsArray = [1, 2, 3, 4, 5];

export function Review({ review, fromSender }) {
  return (
    <>
      <ListItem noBorder style={{ paddingBottom: 5 }}>
        <Left>
          <Thumbnail
            source={
              fromSender
                ? review.sender && review.sender.picture
                  ? { uri: review.sender.picture }
                  : myJobsImg
                : review.shift &&
                  review.shift.employer &&
                  review.shift.employer.picture
                  ? { uri: review.shift.employer.picture }
                  : myJobsImg
            }
          />
          <Body>
            {review.shift && review.shift.employer ? (
              <Text style={{ color: VIOLET_MAIN, fontSize: 14 }}>
                {fromSender
                  ? `${review.sender.user.first_name} ${review.sender.user.last_name}`
                  : review.shift.employer.title}
              </Text>
            ) : null}
            {review.shift && review.shift.position ? (
              <Text
                style={{
                  color: BLUE_LIGHT,
                  fontSize: 16,
                  fontWeight: 'normal',
                }}>
                {`Working as `}
                <Text
                  style={{
                    color: BLUE_MAIN,
                  }}>
                  {review.shift.position.title}
                </Text>
              </Text>
            ) : null}
            <Text
              style={{
                color: BLUE_DARK,
                fontSize: 16,
                fontWeight: 'normal',
              }}>
              {getRatingEmployeeFormat(review.rating)}{' '}
              <Text>
                {starsArray.map((star, i) => {
                  return (
                    <Icon
                      key={i}
                      name={'md-star'}
                      style={{
                        color: review.rating >= star ? BLUE_DARK : BLUE_LIGHT,
                        fontSize: 16,
                      }}
                    />
                  );
                })}
                <Text
                  style={{
                    color: BLUE_DARK,
                    fontSize: 12,
                  }}>
                  {'                '}
                  {moment(review.created_at)
                    .tz(moment.tz.guess())
                    .format('L')}
                </Text>
              </Text>
            </Text>
          </Body>
        </Left>
      </ListItem>
      <ListItem
        style={{ paddingTop: 5, paddingLeft: 18, marginLeft: 0 }}
        noBorder={false}>
        <Text
          style={{
            color: BLUE_DARK,
            fontSize: 14,
          }}>
          {`"${review.comments}"`}
        </Text>
      </ListItem>
    </>
  );
}
