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
`;

export const getJobRequests = `
query GetCompanyJobRequests($companyId: ID!) {
  getCompanyJobRequests(companyId: $companyId) {
    _id
    description
    attachments {
      link
      kind
    }
    price
    influencer {
      _id
      fullName
      photo
      email
      phoneNumber
      role
      description
      createdAt
      banned
      isVerified
      moneyMade
      socialMedia
      idCardUrl
      introVideo
      birthday
    }
    job
    createdAt
  }
}
`;

export const getJobRequestById = `
query GetJobRequest($getJobRequestId: ID!, $companyId: ID!) {
  getJobRequest(id: $getJobRequestId, companyId: $companyId) {
    _id
    description
    price
    status
    influencer {
      _id
      fullName
      photo
      email
      phoneNumber
      role
      description
      createdAt
      banned
      isVerified
      moneyMade
      socialMedia
      idCardUrl
      introVideo
      birthday
    }
    job {
      _id
      title
      price
      company {
        title
        photo
        _id
      }
    }
    createdAt
    attachments {
      link
      kind
    }
  }
}
`;

export const getCompanyPofile = `
query CompanyProfile($id: ID) {
  companyProfile(id: $id) {
    company {
      _id
      title
      photo
      email
      phoneNumber
      role
      description
      createdAt
      banned
      isVerified
      moneySpent
    }
  }
}
`;

export const getInfluencerProfile = `
query CompanyProfile($id: ID) {
  influencerProfile(id: $id) {
    influencer {
      _id
      fullName
      photo
      email
      phoneNumber
      role
      description
      createdAt
      banned
      isVerified
      moneyMade
      socialMedia
      idCardUrl
      introVideo
      birthday
    }
  }
}
`;
