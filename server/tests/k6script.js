import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate, Trend } from 'k6/metrics';
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";

export const reviewsErr = new Rate('GET /reviews errors');
export const reviewsTrend = new Trend('GET /reviews time');
export const metaErr = new Rate('GET /meta errors');
export const metaTrend = new Trend('GET /meta time');
export const reviewsPostErr = new Rate('POST /reviews errors');
export const reviewsPostTrend = new Trend('POST /reviews time');
export const helpPutErr = new Rate('PUT /helpfulness errors');
export const helpPutTrend = new Trend('PUT /helpfulness time');
export const reportPutErr = new Rate('PUT /reported errors');
export const reportPutTrend = new Trend('PUT /reported time');

export const randProdId = randomIntBetween(1, 1000011); // for reviews GET (const page, count, sort)
export const randRevID = randomIntBetween(1, 5774952); // for meta GET and helpful PUT + reported PUT

const vus = 425;

export const options = {
  discardResponseBodies: true,
  scenarios: {
    getReviews: {
      executor: 'constant-vus',
      exec: 'getReviews',
      vus: vus,
      duration: '1m',
      tags: { name: 'getReviews' },
    },
    getMeta: {
      executor: 'constant-vus',
      exec: 'getMeta',
      vus: vus,
      duration: '1m',
      tags: { name: 'getMeta' },
    },
    postReview: {
      executor: 'constant-vus',
      exec: 'postReview',
      vus: vus,
      duration: '1m',
      tags: { name: 'postReview' },
    },
    putHelpful: {
      executor: 'constant-vus',
      exec: 'putHelpful',
      vus: vus,
      duration: '1m',
      tags: { name: 'putHelpful' },
    },
    putReported: {
      executor: 'constant-vus',
      exec: 'putReported',
      vus: vus,
      duration: '1m',
      tags: { name: 'putReported' },
    },
  },
  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(95)<2000']
  },
};

export function getReviews() {
  const reviewsGET = http.get(`http://localhost:${process.env.SERVER_PORT}/api/reviews/${randProdId}/1/10/s`, {
    tags: { name: 'getReviews' }
  });
  reviewsTrend.add(reviewsGET.timings.duration);
  check(reviewsGET, {
    'GET /reviews response status is 200': (r) => r.status === 200
  }) || reviewsErr.add(1);
}

export function getMeta() {
  const metaGET = http.get(`http://localhost:${process.env.SERVER_PORT}/api/reviews/meta/${randRevID}`, {
    headers: { 'Content-Type': 'application/json' },
    tags: { name: 'getMeta' }
  });
  metaTrend.add(metaGET.timings.duration);
  check(metaGET, {
    'GET /meta response status is 200': (r) => r.status === 200
  }) || metaErr.add(1);
}

export function postReview() {
  var reviewPostObj = {
    product_id: 1,
    rating: 3,
    summary: 'roshTEST SUMMARY',
    body: 'roshTEST BODY',
    recommend: true,
    name: 'Ro Pa',
    email: 'roshTEST@TEST.TEST',
    photos: ['1st url', '2nd url', '3rd url'],
    characteristics: {
        15: 5
    }
  }
  var jsonBody = JSON.stringify(reviewPostObj);
  const reviewPost = http.post(`http://localhost:${process.env.SERVER_PORT}/api/reviews`, jsonBody, {
    headers: { 'Content-Type': 'application/json' },
    tags: { name: 'postReview' }
  });
  reviewsPostTrend.add(reviewPost.timings.duration);
  check(reviewPost, {
    'POST /review response status is 200': (r) => r.status === 200
  }) || reviewsPostErr.add(1);
}

export function putHelpful() {
  const helpPut = http.put(`http://localhost:${process.env.SERVER_PORT}/api/reviews/1/helpful`, {
    tags: { name: 'putHelpful' }
  });
  helpPutTrend.add(helpPut.timings.duration);
  check(helpPut, {
    'PUT /helpful response status is 200': (r) => r.status === 200
  }) || helpPutErr.add(1);
}

export function putReported() {
  const reportPut = http.put(`http://localhost:${process.env.SERVER_PORT}/api/reviews/${randRevID}/report`, {
    tags: { name: 'putReported' }
  });
  reportPutTrend.add(reportPut.timings.duration);
  check(reportPut, {
    'PUT /reported response status is 200': (r) => r.status === 200
  }) || reportPutErr.add(true);
}

export function handleSummary(data) {
  return {
    "summary.html": htmlReport(data),
    stdout: textSummary(data, { indent: " ", enableColors: true })
  };
}

export default function () {}
