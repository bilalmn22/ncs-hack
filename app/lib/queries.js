export const getJobs = `
query GetInfluencerFeed($getInfluencerFeedId: ID!) {
  getInfluencerFeed(id: $getInfluencerFeedId) {
    _id
    title
    price
    companyInfo {
      title
      photo
      _id
    }
    platforms
    deadline
    contentType
    minFollowers
    contentRequirements
    targetAudience
    eligibilityRequirements
    deliverables
    description
    attachments {
      link
      kind
    }
    tags
    createdAt
  }
}
`;


export const getJobDetails = `
query PreviewJob($previewJobId: ID!, $user: ID!) {
  previewJob(id: $previewJobId, user: $user) {
    _id
    title
    price
    company {
      title
      photo
      email
    }
    platforms
    deadline
    minFollowers
    contentType
    contentRequirements
    targetAudience
    eligibilityRequirements
    deliverables
    description
    attachments {
      link
      kind
    }
  }
}
`