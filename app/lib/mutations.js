export const createInfluencer = `
mutation CreateInfluencer($input: InfluencerInput!) {
  createInfluencer(input: $input) {
    id
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
  }
}
`;

export const createCompany = `
mutation CreateCompany($input: CompanyInput!) {
  createCompany(input: $input) {
    id
  }
}`;

export const loginUser = `
mutation Login($email: String, $password: String) {
  login(email: $email, password: $password) {
    token
    user {
      ... on Influencer {
        role
      }
      ... on Company {
        role
      }
    }
  }
}
`;

export const createOffer = `
mutation PostJob($input: jobInput!, $user: ID!) {
  postJob(input: $input, user: $user) {
    message
  }
}`;


export const applyToJob = `
mutation PostJob( $userid: ID!, $postJobRequestInput: postJobRequestInput) {
    postJobRequest(userid: $userid, input: $postJobRequestInput) {
    message
  }
}
`

export const updateJobRequest = `
mutation UpdateJobRequestStatus($companyId: ID!, $status: String!, $jobId: ID!) {
  updateJobRequestStatus(companyId: $companyId, status: $status, id: $jobId)
}
  `