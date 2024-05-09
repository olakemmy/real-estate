import moment from 'moment';

export const formatRelativeDate = (date: string) => {
  const now = moment();
  const createdAt = moment(date);
  const diffInDays = now.diff(createdAt, 'days');

  if (diffInDays === 0) {
    return 'today';
  } else if (diffInDays === 1) {
    return 'yesterday';
  } else if (diffInDays < 7) {
    return `${diffInDays} days ago`;
  } else if (diffInDays < 30) {
    const diffInWeeks = Math.floor(diffInDays / 7);
    return `${diffInWeeks} week${diffInWeeks > 1 ? 's' : ''} ago`;
  } else {
    return `on ${createdAt.format('Do MMM YYYY')}`;
  }
}
