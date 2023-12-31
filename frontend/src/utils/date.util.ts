const dayjs = require('dayjs');
const relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);

export function dateTimeToDateString(dt) {

  if(typeof dt == 'string') {
    return new Date(dt ?? '').toLocaleDateString('en-GB');
  } else if(dt instanceof Date) {
    return dt.toLocaleDateString('en-GB');
  }
}

export function timeAgo(datetime) {
  
  try {
    return dayjs(datetime)
    .fromNow()
    .replace('minutes ago', 'phút trước')
    .replace('minute ago', 'phút trước')
    .replace('hours ago', 'giờ trước')
    .replace('an hour ago', '1 giờ trước')
    .replace('hour ago', 'giờ trước')
    .replace('days ago', 'ngày trước')
    .replace('a day ago', '1 ngày trước')
    .replace('a month ago', '1 tháng trước')
    .replace('a year ago', '1 năm trước')
    .replace('months ago', 'ngày trước')
    .replace('month ago', 'ngày trước')
    .replace('years ago', 'năm trước')
    .replace('year ago', 'năm trước')
  } catch(error) {
    return '';
  }
}

// export function timeAgo(time) {

//   switch (typeof time) {
//     case 'number':
//       break;
//     case 'string':
//       time = +new Date(time);
//       break;
//     case 'object':
//       if (time.constructor === Date) time = time.getTime();
//       break;
//     default:
//       time = +new Date();
//   }
//   let time_formats = [
//     [60, 'seconds', 1], // 60
//     [120, '1 minute ago', '1 minute from now'], // 60*2
//     [3600, 'minutes', 60], // 60*60, 60
//     [7200, '1 hour ago', '1 hour from now'], // 60*60*2
//     [86400, 'hours', 3600], // 60*60*24, 60*60
//     [172800, 'Yesterday', 'Tomorrow'], // 60*60*24*2
//     [604800, 'days', 86400], // 60*60*24*7, 60*60*24
//     [1209600, 'Last week', 'Next week'], // 60*60*24*7*4*2
//     [2419200, 'weeks', 604800], // 60*60*24*7*4, 60*60*24*7
//     [4838400, 'Last month', 'Next month'], // 60*60*24*7*4*2
//     [29030400, 'months', 2419200], // 60*60*24*7*4*12, 60*60*24*7*4
//     [58060800, 'Last year', 'Next year'], // 60*60*24*7*4*12*2
//     [2903040000, 'years', 29030400], // 60*60*24*7*4*12*100, 60*60*24*7*4*12
//     [5806080000, 'Last century', 'Next century'], // 60*60*24*7*4*12*100*2
//     [58060800000, 'centuries', 2903040000] // 60*60*24*7*4*12*100*20, 60*60*24*7*4*12*100
//   ];
//   let seconds = (+new Date() - time) / 1000,
//     token = 'ago',
//     list_choice = 1;

//   if (seconds === 0) {
//     return 'Just now'
//   }
//   if (seconds < 0) {
//     seconds = Math.abs(seconds);
//     token = 'from now';
//     list_choice = 2;
//   }
//   let i = 0, format;
//   while (format === time_formats[i++])
//     if (seconds < format[0]) {
//       if (typeof format[2] == 'string')
//         return format[list_choice];
//       else
//         return Math.floor(seconds / format[2]) + ' ' + format[1] + ' ' + token;
//     }
//   return time;
// }