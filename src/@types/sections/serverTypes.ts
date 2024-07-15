export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Date` scalar type represents a year, month and day in accordance with the [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601) standard. */
  Date: any;
  /** The `DateTime` scalar type represents a date and time. `DateTime` expects timestamps to be formatted in accordance with the [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601) standard. */
  DateTime: any;
  /** The `DateTimeOffset` scalar type represents a date, time and offset from UTC. `DateTimeOffset` expects timestamps to be formatted in accordance with the [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601) standard. */
  DateTimeOffset: any;
  Decimal: any;
  Guid: any;
  Long: any;
};

export type ArticlePostReqDto = {
  id?: InputMaybe<Scalars['Guid']>;
};

export type ArticlePostResDto = {
  __typename?: 'ArticlePostResDto';
  audience?: Maybe<Audience>;
  body?: Maybe<Scalars['String']>;
  countOfComments?: Maybe<Scalars['String']>;
  countOfLikes?: Maybe<Scalars['String']>;
  countOfShared?: Maybe<Scalars['String']>;
  countOfViews?: Maybe<Scalars['String']>;
  coverImage: Scalars['String'];
  createdDateTime?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  fullName?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  isDeleted?: Maybe<Scalars['Boolean']>;
  lastName?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
  mentionedUserIds?: Maybe<Array<Scalars['ID']>>;
  ownerUserId: Scalars['ID'];
  pictureUrls?: Maybe<Array<Maybe<Scalars['String']>>>;
  status?: Maybe<PostStatus>;
  tagIds?: Maybe<Array<Scalars['ID']>>;
  title: Scalars['String'];
  userAvatarUrl?: Maybe<Scalars['String']>;
  userName?: Maybe<Scalars['String']>;
  videoUrls?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export enum Audience {
  Friends = 'FRIENDS',
  Ngo = 'NGO',
  Private = 'PRIVATE',
  Public = 'PUBLIC'
}

export enum AudienceEnum {
  ExceptFollowes = 'EXCEPT_FOLLOWES',
  OnlyMe = 'ONLY_ME',
  Private = 'PRIVATE',
  Public = 'PUBLIC',
  SpecificFollowes = 'SPECIFIC_FOLLOWES'
}

export type Certificate = {
  __typename?: 'Certificate';
  audience?: Maybe<AudienceEnum>;
  certificateName?: Maybe<CertificateName>;
  certificateNameId?: Maybe<Scalars['Guid']>;
  credentialDoesExpire?: Maybe<Scalars['Boolean']>;
  credentialID?: Maybe<Scalars['String']>;
  credentialUrl?: Maybe<Scalars['String']>;
  expirationDate?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  issueDate?: Maybe<Scalars['DateTime']>;
  issuingOrganization?: Maybe<IssuingOrganization>;
  issuingOrganizationId?: Maybe<Scalars['Guid']>;
  person?: Maybe<Person>;
  personId?: Maybe<Scalars['Guid']>;
};

export type CertificateDeleteDto = {
  __typename?: 'CertificateDeleteDto';
  id?: Maybe<Scalars['Guid']>;
};

export type CertificateDeleteDtoInput = {
  id?: InputMaybe<Scalars['Guid']>;
};

export type CertificateGetAllInput = {
  id?: InputMaybe<Scalars['Guid']>;
};

export type CertificateInput = {
  audience?: InputMaybe<AudienceEnum>;
  certificateNameId?: InputMaybe<Scalars['Guid']>;
  credentialDoesExpire?: InputMaybe<Scalars['Boolean']>;
  credentialID?: InputMaybe<Scalars['String']>;
  credentialUrl?: InputMaybe<Scalars['String']>;
  expirationDate?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['Guid']>;
  issueDate?: InputMaybe<Scalars['DateTime']>;
  issuingOrganizationId?: InputMaybe<Scalars['Guid']>;
};

export type CertificateName = {
  __typename?: 'CertificateName';
  id?: Maybe<Scalars['Guid']>;
  title?: Maybe<Scalars['String']>;
};

export type CertificateNameSearchInput = {
  id?: InputMaybe<Scalars['Guid']>;
  title?: InputMaybe<Scalars['String']>;
};

export type College = {
  __typename?: 'College';
  alphaTwoCode?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  instituteType?: Maybe<InstituteTypeEnum>;
  name?: Maybe<Scalars['String']>;
  stateProvince?: Maybe<Scalars['String']>;
  webSiteUrl1?: Maybe<Scalars['String']>;
  webSiteUrl2?: Maybe<Scalars['String']>;
  webSiteUrl3?: Maybe<Scalars['String']>;
  webSiteUrl4?: Maybe<Scalars['String']>;
};

export type Company = {
  __typename?: 'Company';
  id?: Maybe<Scalars['Guid']>;
  logoUrl?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type CompanySearchInput = {
  id?: InputMaybe<Scalars['Guid']>;
  title?: InputMaybe<Scalars['String']>;
};

export type Concentration = {
  __typename?: 'Concentration';
  id: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
};

export type ConcentrationCreateInput = {
  id?: InputMaybe<Scalars['Guid']>;
  title?: InputMaybe<Scalars['String']>;
};

export type ConcentrationInput = {
  id?: InputMaybe<Scalars['Guid']>;
  title?: InputMaybe<Scalars['String']>;
};

export type ConfirmForgotPasswordRequestDto = {
  confirmationCode: Scalars['String'];
  userName: Scalars['String'];
};

export type ConfirmPhoneNumDtoInput = {
  phoneNumber?: InputMaybe<Scalars['String']>;
  verificationCode?: InputMaybe<Scalars['String']>;
};

export type ConfirmUserEmailDtoInput = {
  email?: InputMaybe<Scalars['String']>;
  verificationCode?: InputMaybe<Scalars['String']>;
};

export type Country = {
  __typename?: 'Country';
  background?: Maybe<Scalars['String']>;
  capital?: Maybe<Scalars['String']>;
  currency?: Maybe<Scalars['String']>;
  currencyName?: Maybe<Scalars['String']>;
  currencySymbol?: Maybe<Scalars['String']>;
  emoji?: Maybe<Scalars['String']>;
  emojiU?: Maybe<Scalars['String']>;
  flagUrl?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  iso2?: Maybe<Scalars['String']>;
  iso3?: Maybe<Scalars['String']>;
  latitude?: Maybe<Scalars['Float']>;
  longitude?: Maybe<Scalars['Float']>;
  name?: Maybe<Scalars['String']>;
  native?: Maybe<Scalars['String']>;
  numericCode?: Maybe<Scalars['String']>;
  phoneCode?: Maybe<Scalars['String']>;
  region?: Maybe<Scalars['String']>;
  subregion?: Maybe<Scalars['String']>;
  tld?: Maybe<Scalars['String']>;
  usingLanguageId?: Maybe<Scalars['ID']>;
};

export type CountryDataInput = {
  background?: InputMaybe<Scalars['String']>;
  capital?: InputMaybe<Scalars['String']>;
  currency?: InputMaybe<Scalars['String']>;
  currencyName?: InputMaybe<Scalars['String']>;
  currencySymbol?: InputMaybe<Scalars['String']>;
  emoji?: InputMaybe<Scalars['String']>;
  emojiU?: InputMaybe<Scalars['String']>;
  flagUrl?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Guid']>;
  iso2?: InputMaybe<Scalars['String']>;
  iso3?: InputMaybe<Scalars['String']>;
  latitude?: InputMaybe<Scalars['Float']>;
  longitude?: InputMaybe<Scalars['Float']>;
  name?: InputMaybe<Scalars['String']>;
  native?: InputMaybe<Scalars['String']>;
  numericCode?: InputMaybe<Scalars['String']>;
  phoneCode?: InputMaybe<Scalars['String']>;
  region?: InputMaybe<Scalars['String']>;
  subregion?: InputMaybe<Scalars['String']>;
  tld?: InputMaybe<Scalars['String']>;
  usingLanguageId?: InputMaybe<Scalars['ID']>;
};

export type CountryInput = {
  flagUrl?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Guid']>;
  name?: InputMaybe<Scalars['String']>;
  usingLanguageId?: InputMaybe<Scalars['ID']>;
};

export type CreateArticlePost = {
  __typename?: 'CreateArticlePost';
  id: Scalars['ID'];
};

export type CreateArticlePostInput = {
  audience?: InputMaybe<Audience>;
  body?: InputMaybe<Scalars['String']>;
  coverImage?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Guid']>;
  mentionedUserIds?: InputMaybe<Array<InputMaybe<Scalars['Guid']>>>;
  pictureUrls?: InputMaybe<Array<InputMaybe<PictureUrlInputType>>>;
  status?: InputMaybe<PostStatus>;
  tagIds?: InputMaybe<Array<InputMaybe<Scalars['Guid']>>>;
  title?: InputMaybe<Scalars['String']>;
  videoUrls?: InputMaybe<Array<InputMaybe<VideoUrlInputType>>>;
};

export type CreateCertificateName = {
  id?: InputMaybe<Scalars['Guid']>;
  title?: InputMaybe<Scalars['String']>;
};

export type CreateCollegeInput = {
  alphaTwoCode?: InputMaybe<Scalars['String']>;
  country?: InputMaybe<Scalars['String']>;
  instituteType?: InputMaybe<InstituteTypeEnum>;
  name?: InputMaybe<Scalars['String']>;
  stateProvince?: InputMaybe<Scalars['String']>;
  webSiteUrl1?: InputMaybe<Scalars['String']>;
  webSiteUrl2?: InputMaybe<Scalars['String']>;
  webSiteUrl3?: InputMaybe<Scalars['String']>;
  webSiteUrl4?: InputMaybe<Scalars['String']>;
};

export type CreateCompany = {
  id?: InputMaybe<Scalars['Guid']>;
  logoUrl?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type CreateFundRaisingPost = {
  __typename?: 'CreateFundRaisingPost';
  id: Scalars['ID'];
};

export type CreateFundRaisingPostInput = {
  audience?: InputMaybe<Audience>;
  body?: InputMaybe<Scalars['String']>;
  coverImageUrl?: InputMaybe<Scalars['String']>;
  expirationDateTime?: InputMaybe<Scalars['DateTime']>;
  headline?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Guid']>;
  mentionedUserIds?: InputMaybe<Array<InputMaybe<Scalars['Guid']>>>;
  pictureUrls?: InputMaybe<Array<InputMaybe<PictureUrlInputType>>>;
  tagIds?: InputMaybe<Array<InputMaybe<Scalars['Guid']>>>;
  target?: InputMaybe<TargetType>;
  videoUrls?: InputMaybe<Array<InputMaybe<VideoUrlInputType>>>;
};

export type CreateGroupCategory = {
  groupCategoryType?: InputMaybe<GroupCategoryTypeEnum>;
  id?: InputMaybe<Scalars['Guid']>;
  title?: InputMaybe<Scalars['String']>;
};

export type CreateIssuingOrganization = {
  id?: InputMaybe<Scalars['Guid']>;
  title?: InputMaybe<Scalars['String']>;
};

export type CreateSchoolInput = {
  title?: InputMaybe<Scalars['String']>;
};

export type CreateSocialPost = {
  __typename?: 'CreateSocialPost';
  id: Scalars['ID'];
};

export type CreateSocialPostInput = {
  audience?: InputMaybe<Audience>;
  body?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Guid']>;
  location?: InputMaybe<Scalars['String']>;
  mentionedUserIds?: InputMaybe<Array<InputMaybe<Scalars['Guid']>>>;
  pictureUrls?: InputMaybe<Array<InputMaybe<PictureUrlInputType>>>;
  placeId?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<PostStatus>;
  tagIds?: InputMaybe<Array<InputMaybe<Scalars['Guid']>>>;
  videoUrls?: InputMaybe<Array<InputMaybe<VideoUrlInputType>>>;
};

export type CreateUpdateFundRaisingPost = {
  __typename?: 'CreateUpdateFundRaisingPost';
  id: Scalars['ID'];
};

export type CreateUpdateFundRaisingPostInput = {
  audience?: InputMaybe<Audience>;
  body?: InputMaybe<Scalars['String']>;
  coverImageUrl?: InputMaybe<Scalars['String']>;
  headline?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Guid']>;
  mentionedUserIds?: InputMaybe<Array<InputMaybe<Scalars['Guid']>>>;
  parentId?: InputMaybe<Scalars['Guid']>;
  pictureUrls?: InputMaybe<Array<InputMaybe<PictureUrlInputType>>>;
  tagIds?: InputMaybe<Array<InputMaybe<Scalars['Guid']>>>;
  updateProgress?: InputMaybe<Scalars['Decimal']>;
  videoUrls?: InputMaybe<Array<InputMaybe<VideoUrlInputType>>>;
};

export type Culture = {
  __typename?: 'Culture';
  createdDateTime: Scalars['DateTime'];
  id: Scalars['ID'];
  languageDirection?: Maybe<LanguageDirection>;
  name?: Maybe<Scalars['String']>;
  published: Scalars['Boolean'];
  slug?: Maybe<Scalars['String']>;
  updatedDateTime: Scalars['DateTime'];
};

export type CultureInput = {
  displayOrder?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['Guid']>;
  published?: InputMaybe<Scalars['Boolean']>;
};

export type DateDiffDto = {
  __typename?: 'DateDiffDto';
  days?: Maybe<Scalars['Int']>;
  months?: Maybe<Scalars['Int']>;
  years?: Maybe<Scalars['Int']>;
};

export enum EmailOrPhoneNumberEnum {
  Email = 'EMAIL',
  PhoneNumber = 'PHONE_NUMBER'
}

export enum EmploymentTypeEnum {
  Freelance = 'FREELANCE',
  FullTime = 'FULL_TIME',
  PartTime = 'PART_TIME'
}

export enum EntityType {
  Category = 'CATEGORY',
  ChatAudio = 'CHAT_AUDIO',
  ChatDocument = 'CHAT_DOCUMENT',
  ChatImage = 'CHAT_IMAGE',
  ChatVideo = 'CHAT_VIDEO',
  Country = 'COUNTRY',
  Currency = 'CURRENCY',
  Language = 'LANGUAGE',
  Occasion = 'OCCASION',
  Person = 'PERSON',
  PostAudio = 'POST_AUDIO',
  PostDocument = 'POST_DOCUMENT',
  PostImage = 'POST_IMAGE',
  PostVideo = 'POST_VIDEO',
  Product = 'PRODUCT',
  ProductClass = 'PRODUCT_CLASS',
  Resource = 'RESOURCE',
  Style = 'STYLE',
  Test = 'TEST',
  VariantItem = 'VARIANT_ITEM'
}

export enum ExceptionGraphType {
  Accepted = 'ACCEPTED',
  BadGateway = 'BAD_GATEWAY',
  BadRequest = 'BAD_REQUEST',
  CannotDelete = 'CANNOT_DELETE',
  Conflict = 'CONFLICT',
  Continue = 'CONTINUE',
  Created = 'CREATED',
  EntityExist = 'ENTITY_EXIST',
  ExpectationFailed = 'EXPECTATION_FAILED',
  Forbidden = 'FORBIDDEN',
  GatewayTimeout = 'GATEWAY_TIMEOUT',
  Gone = 'GONE',
  HttpVersionNotSupported = 'HTTP_VERSION_NOT_SUPPORTED',
  InternalServerError = 'INTERNAL_SERVER_ERROR',
  LengthRequired = 'LENGTH_REQUIRED',
  MethodNotAllowed = 'METHOD_NOT_ALLOWED',
  Moved = 'MOVED',
  MultipleChoices = 'MULTIPLE_CHOICES',
  NonAuthoritativeInformation = 'NON_AUTHORITATIVE_INFORMATION',
  NotAcceptable = 'NOT_ACCEPTABLE',
  NotFound = 'NOT_FOUND',
  NotImplemented = 'NOT_IMPLEMENTED',
  NotModified = 'NOT_MODIFIED',
  NoContent = 'NO_CONTENT',
  Ok = 'OK',
  PartialContent = 'PARTIAL_CONTENT',
  PaymentRequired = 'PAYMENT_REQUIRED',
  PreconditionFailed = 'PRECONDITION_FAILED',
  ProxyAuthenticationRequired = 'PROXY_AUTHENTICATION_REQUIRED',
  Redirect = 'REDIRECT',
  RedirectMethod = 'REDIRECT_METHOD',
  RequestedRangeNotSatisfiable = 'REQUESTED_RANGE_NOT_SATISFIABLE',
  RequestEntityTooLarge = 'REQUEST_ENTITY_TOO_LARGE',
  RequestTimeout = 'REQUEST_TIMEOUT',
  RequestUriTooLong = 'REQUEST_URI_TOO_LONG',
  ResetContent = 'RESET_CONTENT',
  ServiceUnavailable = 'SERVICE_UNAVAILABLE',
  SwitchingProtocols = 'SWITCHING_PROTOCOLS',
  TemporaryRedirect = 'TEMPORARY_REDIRECT',
  Unauthorized = 'UNAUTHORIZED',
  UnsupportedMediaType = 'UNSUPPORTED_MEDIA_TYPE',
  Unused = 'UNUSED',
  UpgradeRequired = 'UPGRADE_REQUIRED',
  UseProxy = 'USE_PROXY'
}

export type ExistUserDto = {
  emailOrPhone?: InputMaybe<EmailOrPhoneNumberEnum>;
  password: Scalars['String'];
  userName: Scalars['String'];
  userType?: InputMaybe<UserTypeEnum>;
};

export type Experience = {
  __typename?: 'Experience';
  audience?: Maybe<AudienceEnum>;
  cityDto?: Maybe<City>;
  cityId?: Maybe<Scalars['Guid']>;
  companyDto?: Maybe<Company>;
  companyId?: Maybe<Scalars['Guid']>;
  dateDiff?: Maybe<DateDiffDto>;
  description?: Maybe<Scalars['String']>;
  employmentType?: Maybe<EmploymentTypeEnum>;
  endDate?: Maybe<Scalars['Date']>;
  id?: Maybe<Scalars['Guid']>;
  mediaUrl?: Maybe<Scalars['String']>;
  startDate?: Maybe<Scalars['Date']>;
  stillWorkingThere?: Maybe<Scalars['Boolean']>;
  title?: Maybe<Scalars['String']>;
};

export type ExperienceDeleteDto = {
  __typename?: 'ExperienceDeleteDto';
  id?: Maybe<Scalars['Guid']>;
};

export type ExperienceDeleteDtoInput = {
  id?: InputMaybe<Scalars['Guid']>;
};

export type ExperienceInput = {
  audience?: InputMaybe<AudienceEnum>;
  cityId?: InputMaybe<Scalars['Guid']>;
  companyId?: InputMaybe<Scalars['Guid']>;
  description?: InputMaybe<Scalars['String']>;
  employmentType?: InputMaybe<EmploymentTypeEnum>;
  endDate?: InputMaybe<Scalars['Date']>;
  id?: InputMaybe<Scalars['Guid']>;
  mediaUrl?: InputMaybe<Scalars['String']>;
  startDate?: InputMaybe<Scalars['Date']>;
  stillWorkingThere?: InputMaybe<Scalars['Boolean']>;
  title?: InputMaybe<Scalars['String']>;
};

export type File = {
  __typename?: 'File';
  createdDateTime: Scalars['DateTime'];
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  published: Scalars['Boolean'];
  updatedDateTime: Scalars['DateTime'];
  url?: Maybe<Scalars['String']>;
};

export type FileInput = {
  binary?: InputMaybe<Scalars['String']>;
  displayOrder?: InputMaybe<Scalars['Int']>;
  entityType?: InputMaybe<EntityType>;
  id?: InputMaybe<Scalars['Guid']>;
  name?: InputMaybe<Scalars['String']>;
  published?: InputMaybe<Scalars['Boolean']>;
  size?: InputMaybe<Scalars['Float']>;
  type?: InputMaybe<Scalars['String']>;
  url?: InputMaybe<Scalars['String']>;
};

export type FollowerDto = {
  __typename?: 'FollowerDto';
  avatarUrl?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  fullName?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  isSelected?: Maybe<Scalars['Boolean']>;
  lastName?: Maybe<Scalars['String']>;
};

export type ForgotPasswordTokenRequestDto = {
  userName: Scalars['String'];
};

export type ForgotPasswordTokenResponseDto = {
  __typename?: 'ForgotPasswordTokenResponseDto';
  message: Scalars['String'];
  userName: Scalars['String'];
};

export enum GenderEnum {
  Custom = 'CUSTOM',
  Female = 'FEMALE',
  Male = 'MALE',
  NonBinary = 'NON_BINARY',
  Transgender = 'TRANSGENDER'
}

export type GenericFilterRequestArticlePostReqType = {
  all?: InputMaybe<Scalars['Boolean']>;
  dto?: InputMaybe<ArticlePostReqDto>;
  filterExpression?: InputMaybe<Scalars['String']>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['Guid']>>>;
  includes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  orderByDescendings?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
  orderByFields?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  pageIndex?: InputMaybe<Scalars['Int']>;
  pageSize?: InputMaybe<Scalars['Int']>;
  sessionKey?: InputMaybe<Scalars['String']>;
};

export type GenericFilterRequestBooleanGraphType = {
  all?: InputMaybe<Scalars['Boolean']>;
  dto?: InputMaybe<Scalars['Boolean']>;
  filterExpression?: InputMaybe<Scalars['String']>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['Guid']>>>;
  includes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  orderByDescendings?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
  orderByFields?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  pageIndex?: InputMaybe<Scalars['Int']>;
  pageSize?: InputMaybe<Scalars['Int']>;
  sessionKey?: InputMaybe<Scalars['String']>;
  slug?: InputMaybe<Scalars['String']>;
};

export type GenericFilterRequestCertificateGetAllInputType = {
  all?: InputMaybe<Scalars['Boolean']>;
  dto?: InputMaybe<CertificateGetAllInput>;
  filterExpression?: InputMaybe<Scalars['String']>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['Guid']>>>;
  includes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  orderByDescendings?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
  orderByFields?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  pageIndex?: InputMaybe<Scalars['Int']>;
  pageSize?: InputMaybe<Scalars['Int']>;
  sessionKey?: InputMaybe<Scalars['String']>;
};

export type GenericFilterRequestCertificateNameSearchInputType = {
  all?: InputMaybe<Scalars['Boolean']>;
  dto?: InputMaybe<CertificateNameSearchInput>;
  filterExpression?: InputMaybe<Scalars['String']>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['Guid']>>>;
  includes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  orderByDescendings?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
  orderByFields?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  pageIndex?: InputMaybe<Scalars['Int']>;
  pageSize?: InputMaybe<Scalars['Int']>;
  sessionKey?: InputMaybe<Scalars['String']>;
};

export type GenericFilterRequestCompanySearchInputType = {
  all?: InputMaybe<Scalars['Boolean']>;
  dto?: InputMaybe<CompanySearchInput>;
  filterExpression?: InputMaybe<Scalars['String']>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['Guid']>>>;
  includes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  orderByDescendings?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
  orderByFields?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  pageIndex?: InputMaybe<Scalars['Int']>;
  pageSize?: InputMaybe<Scalars['Int']>;
  sessionKey?: InputMaybe<Scalars['String']>;
};

export type GenericFilterRequestConcentrationInputType = {
  all?: InputMaybe<Scalars['Boolean']>;
  dto?: InputMaybe<ConcentrationInput>;
  filterExpression?: InputMaybe<Scalars['String']>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['Guid']>>>;
  includes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  orderByDescendings?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
  orderByFields?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  pageIndex?: InputMaybe<Scalars['Int']>;
  pageSize?: InputMaybe<Scalars['Int']>;
  sessionKey?: InputMaybe<Scalars['String']>;
};

export type GenericFilterRequestCountryInputType = {
  all?: InputMaybe<Scalars['Boolean']>;
  dto?: InputMaybe<CountryInput>;
  filterExpression?: InputMaybe<Scalars['String']>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['Guid']>>>;
  includes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  orderByDescendings?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
  orderByFields?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  pageIndex?: InputMaybe<Scalars['Int']>;
  pageSize?: InputMaybe<Scalars['Int']>;
  sessionKey?: InputMaybe<Scalars['String']>;
  slug?: InputMaybe<Scalars['String']>;
};

export type GenericFilterRequestCultureInputType = {
  all?: InputMaybe<Scalars['Boolean']>;
  dto?: InputMaybe<CultureInput>;
  filterExpression?: InputMaybe<Scalars['String']>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['Guid']>>>;
  includes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  orderByDescendings?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
  orderByFields?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  pageIndex?: InputMaybe<Scalars['Int']>;
  pageSize?: InputMaybe<Scalars['Int']>;
  sessionKey?: InputMaybe<Scalars['String']>;
  slug?: InputMaybe<Scalars['String']>;
};

export type GenericFilterRequestEndorsementSkillGetInputType = {
  all?: InputMaybe<Scalars['Boolean']>;
  dto?: InputMaybe<SkillEndorsementDtoGetInput>;
  filterExpression?: InputMaybe<Scalars['String']>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['Guid']>>>;
  includes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  orderByDescendings?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
  orderByFields?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  pageIndex?: InputMaybe<Scalars['Int']>;
  pageSize?: InputMaybe<Scalars['Int']>;
  sessionKey?: InputMaybe<Scalars['String']>;
};

export type GenericFilterRequestFollowerInputType = {
  all?: InputMaybe<Scalars['Boolean']>;
  dto?: InputMaybe<SearchFollowerDtoInput>;
  filterExpression?: InputMaybe<Scalars['String']>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['Guid']>>>;
  includes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  orderByDescendings?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
  orderByFields?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  pageIndex?: InputMaybe<Scalars['Int']>;
  pageSize?: InputMaybe<Scalars['Int']>;
  sessionKey?: InputMaybe<Scalars['String']>;
};

export type GenericFilterRequestGetPersonSkillsInputType = {
  all?: InputMaybe<Scalars['Boolean']>;
  dto?: InputMaybe<PersonSkillGetAllInput>;
  filterExpression?: InputMaybe<Scalars['String']>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['Guid']>>>;
  includes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  orderByDescendings?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
  orderByFields?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  pageIndex?: InputMaybe<Scalars['Int']>;
  pageSize?: InputMaybe<Scalars['Int']>;
  sessionKey?: InputMaybe<Scalars['String']>;
};

export type GenericFilterRequestGifReqType = {
  all?: InputMaybe<Scalars['Boolean']>;
  dto?: InputMaybe<GifReqDto>;
  filterExpression?: InputMaybe<Scalars['String']>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['Guid']>>>;
  includes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  orderByDescendings?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
  orderByFields?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  pageIndex?: InputMaybe<Scalars['Int']>;
  pageSize?: InputMaybe<Scalars['Int']>;
  sessionKey?: InputMaybe<Scalars['String']>;
};

export type GenericFilterRequestGroupCategorySearchInputType = {
  all?: InputMaybe<Scalars['Boolean']>;
  dto?: InputMaybe<GroupCategorySearchInput>;
  filterExpression?: InputMaybe<Scalars['String']>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['Guid']>>>;
  includes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  orderByDescendings?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
  orderByFields?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  pageIndex?: InputMaybe<Scalars['Int']>;
  pageSize?: InputMaybe<Scalars['Int']>;
  sessionKey?: InputMaybe<Scalars['String']>;
};

export type GenericFilterRequestIssuingOrganizationSearchInputType = {
  all?: InputMaybe<Scalars['Boolean']>;
  dto?: InputMaybe<IssuingOrganizationSearchInput>;
  filterExpression?: InputMaybe<Scalars['String']>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['Guid']>>>;
  includes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  orderByDescendings?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
  orderByFields?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  pageIndex?: InputMaybe<Scalars['Int']>;
  pageSize?: InputMaybe<Scalars['Int']>;
  sessionKey?: InputMaybe<Scalars['String']>;
};

export type GenericFilterRequestLanguageInputType = {
  all?: InputMaybe<Scalars['Boolean']>;
  dto?: InputMaybe<LanguageInput>;
  filterExpression?: InputMaybe<Scalars['String']>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['Guid']>>>;
  includes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  orderByDescendings?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
  orderByFields?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  pageIndex?: InputMaybe<Scalars['Int']>;
  pageSize?: InputMaybe<Scalars['Int']>;
  sessionKey?: InputMaybe<Scalars['String']>;
  slug?: InputMaybe<Scalars['String']>;
};

export type GenericFilterRequestLanguageManagementInputType = {
  all?: InputMaybe<Scalars['Boolean']>;
  dto?: InputMaybe<LanguageManagementInput>;
  filterExpression?: InputMaybe<Scalars['String']>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['Guid']>>>;
  includes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  orderByDescendings?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
  orderByFields?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  pageIndex?: InputMaybe<Scalars['Int']>;
  pageSize?: InputMaybe<Scalars['Int']>;
  sessionKey?: InputMaybe<Scalars['String']>;
  slug?: InputMaybe<Scalars['String']>;
};

export type GenericFilterRequestLanguageResourceInputDtoType = {
  all?: InputMaybe<Scalars['Boolean']>;
  dto?: InputMaybe<LanguageResourceDtoInput>;
  filterExpression?: InputMaybe<Scalars['String']>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['Guid']>>>;
  includes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  orderByDescendings?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
  orderByFields?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  pageIndex?: InputMaybe<Scalars['Int']>;
  pageSize?: InputMaybe<Scalars['Int']>;
  sessionKey?: InputMaybe<Scalars['String']>;
  slug?: InputMaybe<Scalars['String']>;
};

export type GenericFilterRequestLocationGetInputType = {
  all?: InputMaybe<Scalars['Boolean']>;
  dto?: InputMaybe<LocationGetInput>;
  filterExpression?: InputMaybe<Scalars['String']>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['Guid']>>>;
  includes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  orderByDescendings?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
  orderByFields?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  pageIndex?: InputMaybe<Scalars['Int']>;
  pageSize?: InputMaybe<Scalars['Int']>;
  sessionKey?: InputMaybe<Scalars['String']>;
};

export type GenericFilterRequestOrgUserCertificateGetAllInputType = {
  all?: InputMaybe<Scalars['Boolean']>;
  dto?: InputMaybe<OrgUserCertificateGetAllInput>;
  filterExpression?: InputMaybe<Scalars['String']>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['Guid']>>>;
  includes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  orderByDescendings?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
  orderByFields?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  pageIndex?: InputMaybe<Scalars['Int']>;
  pageSize?: InputMaybe<Scalars['Int']>;
  sessionKey?: InputMaybe<Scalars['String']>;
};

export type GenericFilterRequestOrganizationUserProjectInputType = {
  all?: InputMaybe<Scalars['Boolean']>;
  dto?: InputMaybe<ProjectInput>;
  filterExpression?: InputMaybe<Scalars['String']>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['Guid']>>>;
  includes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  orderByDescendings?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
  orderByFields?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  pageIndex?: InputMaybe<Scalars['Int']>;
  pageSize?: InputMaybe<Scalars['Int']>;
  sessionKey?: InputMaybe<Scalars['String']>;
};

export type GenericFilterRequestPersonCollegeGetAllInputType = {
  all?: InputMaybe<Scalars['Boolean']>;
  dto?: InputMaybe<PersonCollegeGetAllInput>;
  filterExpression?: InputMaybe<Scalars['String']>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['Guid']>>>;
  includes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  orderByDescendings?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
  orderByFields?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  pageIndex?: InputMaybe<Scalars['Int']>;
  pageSize?: InputMaybe<Scalars['Int']>;
  sessionKey?: InputMaybe<Scalars['String']>;
};

export type GenericFilterRequestPersonExperienceInputType = {
  all?: InputMaybe<Scalars['Boolean']>;
  dto?: InputMaybe<ExperienceInput>;
  filterExpression?: InputMaybe<Scalars['String']>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['Guid']>>>;
  includes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  orderByDescendings?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
  orderByFields?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  pageIndex?: InputMaybe<Scalars['Int']>;
  pageSize?: InputMaybe<Scalars['Int']>;
  sessionKey?: InputMaybe<Scalars['String']>;
};

export type GenericFilterRequestPersonGetInputType = {
  all?: InputMaybe<Scalars['Boolean']>;
  dto?: InputMaybe<PersonGetInput>;
  filterExpression?: InputMaybe<Scalars['String']>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['Guid']>>>;
  includes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  orderByDescendings?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
  orderByFields?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  pageIndex?: InputMaybe<Scalars['Int']>;
  pageSize?: InputMaybe<Scalars['Int']>;
  sessionKey?: InputMaybe<Scalars['String']>;
};

export type GenericFilterRequestPersonSchoolGetAllInputType = {
  all?: InputMaybe<Scalars['Boolean']>;
  dto?: InputMaybe<PersonSchoolGetAllInput>;
  filterExpression?: InputMaybe<Scalars['String']>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['Guid']>>>;
  includes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  orderByDescendings?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
  orderByFields?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  pageIndex?: InputMaybe<Scalars['Int']>;
  pageSize?: InputMaybe<Scalars['Int']>;
  sessionKey?: InputMaybe<Scalars['String']>;
};

export type GenericFilterRequestPlaceReqType = {
  all?: InputMaybe<Scalars['Boolean']>;
  dto?: InputMaybe<PlaceReqDto>;
  filterExpression?: InputMaybe<Scalars['String']>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['Guid']>>>;
  includes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  orderByDescendings?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
  orderByFields?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  pageIndex?: InputMaybe<Scalars['Int']>;
  pageSize?: InputMaybe<Scalars['Int']>;
  sessionKey?: InputMaybe<Scalars['String']>;
};

export type GenericFilterRequestProjectMediasInputType = {
  all?: InputMaybe<Scalars['Boolean']>;
  dto?: InputMaybe<ProjectMediaGetAllInput>;
  filterExpression?: InputMaybe<Scalars['String']>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['Guid']>>>;
  includes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  orderByDescendings?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
  orderByFields?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  pageIndex?: InputMaybe<Scalars['Int']>;
  pageSize?: InputMaybe<Scalars['Int']>;
  sessionKey?: InputMaybe<Scalars['String']>;
};

export type GenericFilterRequestRelationshipItemInputType = {
  all?: InputMaybe<Scalars['Boolean']>;
  dto?: InputMaybe<RelationshipItemInput>;
  filterExpression?: InputMaybe<Scalars['String']>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['Guid']>>>;
  includes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  orderByDescendings?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
  orderByFields?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  pageIndex?: InputMaybe<Scalars['Int']>;
  pageSize?: InputMaybe<Scalars['Int']>;
  sessionKey?: InputMaybe<Scalars['String']>;
};

export type GenericFilterRequestRelationshipStatusInputType = {
  all?: InputMaybe<Scalars['Boolean']>;
  dto?: InputMaybe<RelationshipStatusInput>;
  filterExpression?: InputMaybe<Scalars['String']>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['Guid']>>>;
  includes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  orderByDescendings?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
  orderByFields?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  pageIndex?: InputMaybe<Scalars['Int']>;
  pageSize?: InputMaybe<Scalars['Int']>;
  sessionKey?: InputMaybe<Scalars['String']>;
};

export type GenericFilterRequestSearchCitiesInputType = {
  all?: InputMaybe<Scalars['Boolean']>;
  dto?: InputMaybe<SearchCitiesInput>;
  filterExpression?: InputMaybe<Scalars['String']>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['Guid']>>>;
  includes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  orderByDescendings?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
  orderByFields?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  pageIndex?: InputMaybe<Scalars['Int']>;
  pageSize?: InputMaybe<Scalars['Int']>;
  sessionKey?: InputMaybe<Scalars['String']>;
};

export type GenericFilterRequestSearchCollegeInputType = {
  all?: InputMaybe<Scalars['Boolean']>;
  dto?: InputMaybe<SearchCollegesInput>;
  filterExpression?: InputMaybe<Scalars['String']>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['Guid']>>>;
  includes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  orderByDescendings?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
  orderByFields?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  pageIndex?: InputMaybe<Scalars['Int']>;
  pageSize?: InputMaybe<Scalars['Int']>;
  sessionKey?: InputMaybe<Scalars['String']>;
};

export type GenericFilterRequestSearchPlacesInputType = {
  all?: InputMaybe<Scalars['Boolean']>;
  dto?: InputMaybe<PlaceItemDtoInput>;
  filterExpression?: InputMaybe<Scalars['String']>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['Guid']>>>;
  includes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  orderByDescendings?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
  orderByFields?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  pageIndex?: InputMaybe<Scalars['Int']>;
  pageSize?: InputMaybe<Scalars['Int']>;
  sessionKey?: InputMaybe<Scalars['String']>;
};

export type GenericFilterRequestSearchSchoolInputType = {
  all?: InputMaybe<Scalars['Boolean']>;
  dto?: InputMaybe<SearchSchoolsInput>;
  filterExpression?: InputMaybe<Scalars['String']>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['Guid']>>>;
  includes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  orderByDescendings?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
  orderByFields?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  pageIndex?: InputMaybe<Scalars['Int']>;
  pageSize?: InputMaybe<Scalars['Int']>;
  sessionKey?: InputMaybe<Scalars['String']>;
};

export type GenericFilterRequestSkillInputType = {
  all?: InputMaybe<Scalars['Boolean']>;
  dto?: InputMaybe<SkillInput>;
  filterExpression?: InputMaybe<Scalars['String']>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['Guid']>>>;
  includes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  orderByDescendings?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
  orderByFields?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  pageIndex?: InputMaybe<Scalars['Int']>;
  pageSize?: InputMaybe<Scalars['Int']>;
  sessionKey?: InputMaybe<Scalars['String']>;
};

export type GenericFilterRequestSocialMediaInputType = {
  all?: InputMaybe<Scalars['Boolean']>;
  dto?: InputMaybe<SocialMediaInput>;
  filterExpression?: InputMaybe<Scalars['String']>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['Guid']>>>;
  includes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  orderByDescendings?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
  orderByFields?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  pageIndex?: InputMaybe<Scalars['Int']>;
  pageSize?: InputMaybe<Scalars['Int']>;
  sessionKey?: InputMaybe<Scalars['String']>;
};

export type GenericFilterRequestSocialPostReqType = {
  all?: InputMaybe<Scalars['Boolean']>;
  dto?: InputMaybe<SocialPostReqDto>;
  filterExpression?: InputMaybe<Scalars['String']>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['Guid']>>>;
  includes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  orderByDescendings?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
  orderByFields?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  pageIndex?: InputMaybe<Scalars['Int']>;
  pageSize?: InputMaybe<Scalars['Int']>;
  sessionKey?: InputMaybe<Scalars['String']>;
};

export type GenericFilterRequestTagReqType = {
  all?: InputMaybe<Scalars['Boolean']>;
  dto?: InputMaybe<TagReqDto>;
  filterExpression?: InputMaybe<Scalars['String']>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['Guid']>>>;
  includes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  orderByDescendings?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
  orderByFields?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  pageIndex?: InputMaybe<Scalars['Int']>;
  pageSize?: InputMaybe<Scalars['Int']>;
  sessionKey?: InputMaybe<Scalars['String']>;
};

export type GenericFilterRequestUserEmailGetAllInputType = {
  all?: InputMaybe<Scalars['Boolean']>;
  dto?: InputMaybe<UserEmailGetAllInput>;
  filterExpression?: InputMaybe<Scalars['String']>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['Guid']>>>;
  includes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  orderByDescendings?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
  orderByFields?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  pageIndex?: InputMaybe<Scalars['Int']>;
  pageSize?: InputMaybe<Scalars['Int']>;
  sessionKey?: InputMaybe<Scalars['String']>;
};

export type GenericFilterRequestUserInputType = {
  all?: InputMaybe<Scalars['Boolean']>;
  dto?: InputMaybe<UserInput>;
  filterExpression?: InputMaybe<Scalars['String']>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['Guid']>>>;
  includes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  orderByDescendings?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
  orderByFields?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  pageIndex?: InputMaybe<Scalars['Int']>;
  pageSize?: InputMaybe<Scalars['Int']>;
  sessionKey?: InputMaybe<Scalars['String']>;
};

export type GenericFilterRequestUserPhoneNumberGetAllInputType = {
  all?: InputMaybe<Scalars['Boolean']>;
  dto?: InputMaybe<UserPhoneNumberGetAllInput>;
  filterExpression?: InputMaybe<Scalars['String']>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['Guid']>>>;
  includes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  orderByDescendings?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
  orderByFields?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  pageIndex?: InputMaybe<Scalars['Int']>;
  pageSize?: InputMaybe<Scalars['Int']>;
  sessionKey?: InputMaybe<Scalars['String']>;
};

export type GenericFilterRequestUserReqType = {
  all?: InputMaybe<Scalars['Boolean']>;
  dto?: InputMaybe<UserReqDto>;
  filterExpression?: InputMaybe<Scalars['String']>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['Guid']>>>;
  includes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  orderByDescendings?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
  orderByFields?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  pageIndex?: InputMaybe<Scalars['Int']>;
  pageSize?: InputMaybe<Scalars['Int']>;
  sessionKey?: InputMaybe<Scalars['String']>;
};

export type GenericFilterRequestUserSocialMediaGetAllInputType = {
  all?: InputMaybe<Scalars['Boolean']>;
  dto?: InputMaybe<UserSocialMediaGetAllInput>;
  filterExpression?: InputMaybe<Scalars['String']>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['Guid']>>>;
  includes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  orderByDescendings?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
  orderByFields?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  pageIndex?: InputMaybe<Scalars['Int']>;
  pageSize?: InputMaybe<Scalars['Int']>;
  sessionKey?: InputMaybe<Scalars['String']>;
};

export type GenericFilterRequestUserWebSiteGetAllInputType = {
  all?: InputMaybe<Scalars['Boolean']>;
  dto?: InputMaybe<UserWebSiteGetAllInput>;
  filterExpression?: InputMaybe<Scalars['String']>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['Guid']>>>;
  includes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  orderByDescendings?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
  orderByFields?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  pageIndex?: InputMaybe<Scalars['Int']>;
  pageSize?: InputMaybe<Scalars['Int']>;
  sessionKey?: InputMaybe<Scalars['String']>;
};

export type GenericMutationRequestCertificateDeleteInputType = {
  dto?: InputMaybe<CertificateDeleteDtoInput>;
  externalIncludes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['Guid']>>>;
  ignoreGetResponse?: InputMaybe<Scalars['Boolean']>;
  includes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  sessionKey?: InputMaybe<Scalars['String']>;
};

export type GenericMutationRequestCertificateInputType = {
  dto?: InputMaybe<CertificateInput>;
  externalIncludes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['Guid']>>>;
  ignoreGetResponse?: InputMaybe<Scalars['Boolean']>;
  includes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  sessionKey?: InputMaybe<Scalars['String']>;
};

export type GenericMutationRequestConcentrationCreateInputType = {
  dto?: InputMaybe<ConcentrationCreateInput>;
  externalIncludes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['Guid']>>>;
  ignoreGetResponse?: InputMaybe<Scalars['Boolean']>;
  includes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  sessionKey?: InputMaybe<Scalars['String']>;
};

export type GenericMutationRequestConfirmForgotPasswordInputType = {
  dto?: InputMaybe<ConfirmForgotPasswordRequestDto>;
  externalIncludes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['Guid']>>>;
  ignoreGetResponse?: InputMaybe<Scalars['Boolean']>;
  includes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  sessionKey?: InputMaybe<Scalars['String']>;
  slug?: InputMaybe<Scalars['String']>;
};

export type GenericMutationRequestConfirmPhoneNumberInputType = {
  dto?: InputMaybe<ConfirmPhoneNumDtoInput>;
  externalIncludes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['Guid']>>>;
  ignoreGetResponse?: InputMaybe<Scalars['Boolean']>;
  includes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  sessionKey?: InputMaybe<Scalars['String']>;
};

export type GenericMutationRequestConfirmUserEmailInputType = {
  dto?: InputMaybe<ConfirmUserEmailDtoInput>;
  externalIncludes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['Guid']>>>;
  ignoreGetResponse?: InputMaybe<Scalars['Boolean']>;
  includes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  sessionKey?: InputMaybe<Scalars['String']>;
};

export type GenericMutationRequestCountryDataInputType = {
  dto?: InputMaybe<CountryDataInput>;
  externalIncludes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['Guid']>>>;
  ignoreGetResponse?: InputMaybe<Scalars['Boolean']>;
  includes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  sessionKey?: InputMaybe<Scalars['String']>;
};

export type GenericMutationRequestCreateArticlePostInputType = {
  dto?: InputMaybe<CreateArticlePostInput>;
  externalIncludes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['Guid']>>>;
  ignoreGetResponse?: InputMaybe<Scalars['Boolean']>;
  includes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  sessionKey?: InputMaybe<Scalars['String']>;
};

export type GenericMutationRequestCreateCertificateNameInputType = {
  dto?: InputMaybe<CreateCertificateName>;
  externalIncludes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['Guid']>>>;
  ignoreGetResponse?: InputMaybe<Scalars['Boolean']>;
  includes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  sessionKey?: InputMaybe<Scalars['String']>;
};

export type GenericMutationRequestCreateCollegeInputType = {
  dto?: InputMaybe<CreateCollegeInput>;
  externalIncludes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['Guid']>>>;
  ignoreGetResponse?: InputMaybe<Scalars['Boolean']>;
  includes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  sessionKey?: InputMaybe<Scalars['String']>;
};

export type GenericMutationRequestCreateCompanyInputType = {
  dto?: InputMaybe<CreateCompany>;
  externalIncludes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['Guid']>>>;
  ignoreGetResponse?: InputMaybe<Scalars['Boolean']>;
  includes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  sessionKey?: InputMaybe<Scalars['String']>;
};

export type GenericMutationRequestCreateFundRaisingPostInputType = {
  dto?: InputMaybe<CreateFundRaisingPostInput>;
  externalIncludes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['Guid']>>>;
  ignoreGetResponse?: InputMaybe<Scalars['Boolean']>;
  includes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  sessionKey?: InputMaybe<Scalars['String']>;
};

export type GenericMutationRequestCreateGroupCategoryInputType = {
  dto?: InputMaybe<CreateGroupCategory>;
  externalIncludes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['Guid']>>>;
  ignoreGetResponse?: InputMaybe<Scalars['Boolean']>;
  includes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  sessionKey?: InputMaybe<Scalars['String']>;
};

export type GenericMutationRequestCreateIssuingOrganizationInputType = {
  dto?: InputMaybe<CreateIssuingOrganization>;
  externalIncludes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['Guid']>>>;
  ignoreGetResponse?: InputMaybe<Scalars['Boolean']>;
  includes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  sessionKey?: InputMaybe<Scalars['String']>;
};

export type GenericMutationRequestCreateSchoolInputType = {
  dto?: InputMaybe<CreateSchoolInput>;
  externalIncludes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['Guid']>>>;
  ignoreGetResponse?: InputMaybe<Scalars['Boolean']>;
  includes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  sessionKey?: InputMaybe<Scalars['String']>;
};

export type GenericMutationRequestCreateSocialPostInputType = {
  dto?: InputMaybe<CreateSocialPostInput>;
  externalIncludes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['Guid']>>>;
  ignoreGetResponse?: InputMaybe<Scalars['Boolean']>;
  includes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  sessionKey?: InputMaybe<Scalars['String']>;
};

export type GenericMutationRequestCreateUpdateFundRaisingPostInputType = {
  dto?: InputMaybe<CreateUpdateFundRaisingPostInput>;
  externalIncludes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['Guid']>>>;
  ignoreGetResponse?: InputMaybe<Scalars['Boolean']>;
  includes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  sessionKey?: InputMaybe<Scalars['String']>;
};

export type GenericMutationRequestEndorsementSkillInputType = {
  dto?: InputMaybe<SkillEndorsementDtoInput>;
  externalIncludes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['Guid']>>>;
  ignoreGetResponse?: InputMaybe<Scalars['Boolean']>;
  includes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  sessionKey?: InputMaybe<Scalars['String']>;
};

export type GenericMutationRequestExistUserInputType = {
  dto?: InputMaybe<ExistUserDto>;
  externalIncludes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['Guid']>>>;
  ignoreGetResponse?: InputMaybe<Scalars['Boolean']>;
  includes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  sessionKey?: InputMaybe<Scalars['String']>;
  slug?: InputMaybe<Scalars['String']>;
};

export type GenericMutationRequestExperienceDeleteInputType = {
  dto?: InputMaybe<ExperienceDeleteDtoInput>;
  externalIncludes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['Guid']>>>;
  ignoreGetResponse?: InputMaybe<Scalars['Boolean']>;
  includes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  sessionKey?: InputMaybe<Scalars['String']>;
};

export type GenericMutationRequestFileInputType = {
  dto?: InputMaybe<FileInput>;
  externalIncludes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['Guid']>>>;
  ignoreGetResponse?: InputMaybe<Scalars['Boolean']>;
  includes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  sessionKey?: InputMaybe<Scalars['String']>;
  slug?: InputMaybe<Scalars['String']>;
};

export type GenericMutationRequestForgotPasswordTokenInputType = {
  dto?: InputMaybe<ForgotPasswordTokenRequestDto>;
  externalIncludes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['Guid']>>>;
  ignoreGetResponse?: InputMaybe<Scalars['Boolean']>;
  includes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  sessionKey?: InputMaybe<Scalars['String']>;
  slug?: InputMaybe<Scalars['String']>;
};

export type GenericMutationRequestGoogleTokenInputType = {
  dto?: InputMaybe<GoogleTokenRequestDto>;
  externalIncludes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['Guid']>>>;
  ignoreGetResponse?: InputMaybe<Scalars['Boolean']>;
  includes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  sessionKey?: InputMaybe<Scalars['String']>;
  slug?: InputMaybe<Scalars['String']>;
};

export type GenericMutationRequestLanguageInputType = {
  dto?: InputMaybe<LanguageInput>;
  externalIncludes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['Guid']>>>;
  ignoreGetResponse?: InputMaybe<Scalars['Boolean']>;
  includes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  sessionKey?: InputMaybe<Scalars['String']>;
  slug?: InputMaybe<Scalars['String']>;
};

export type GenericMutationRequestLanguageManagementInputType = {
  dto?: InputMaybe<LanguageManagementInput>;
  externalIncludes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['Guid']>>>;
  ignoreGetResponse?: InputMaybe<Scalars['Boolean']>;
  includes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  sessionKey?: InputMaybe<Scalars['String']>;
  slug?: InputMaybe<Scalars['String']>;
};

export type GenericMutationRequestLocationDeleteInputType = {
  dto?: InputMaybe<LocationBaseDtoInput>;
  externalIncludes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['Guid']>>>;
  ignoreGetResponse?: InputMaybe<Scalars['Boolean']>;
  includes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  sessionKey?: InputMaybe<Scalars['String']>;
};

export type GenericMutationRequestLocationInputType = {
  dto?: InputMaybe<LocationInput>;
  externalIncludes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['Guid']>>>;
  ignoreGetResponse?: InputMaybe<Scalars['Boolean']>;
  includes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  sessionKey?: InputMaybe<Scalars['String']>;
};

export type GenericMutationRequestLoginInputType = {
  dto?: InputMaybe<LoginRequestDto>;
  externalIncludes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['Guid']>>>;
  ignoreGetResponse?: InputMaybe<Scalars['Boolean']>;
  includes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  sessionKey?: InputMaybe<Scalars['String']>;
  slug?: InputMaybe<Scalars['String']>;
};

export type GenericMutationRequestOrgUserCertificateInputType = {
  dto?: InputMaybe<OrgUserCertificateInput>;
  externalIncludes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['Guid']>>>;
  ignoreGetResponse?: InputMaybe<Scalars['Boolean']>;
  includes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  sessionKey?: InputMaybe<Scalars['String']>;
};

export type GenericMutationRequestOrganizationUserBioInputType = {
  dto?: InputMaybe<OrganizationUserBioInput>;
  externalIncludes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['Guid']>>>;
  ignoreGetResponse?: InputMaybe<Scalars['Boolean']>;
  includes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  sessionKey?: InputMaybe<Scalars['String']>;
};

export type GenericMutationRequestOrganizationUserInputType = {
  dto?: InputMaybe<OrganizationUserInput>;
  externalIncludes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['Guid']>>>;
  ignoreGetResponse?: InputMaybe<Scalars['Boolean']>;
  includes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  sessionKey?: InputMaybe<Scalars['String']>;
};

export type GenericMutationRequestOrganizationUserProjectInputType = {
  dto?: InputMaybe<ProjectInput>;
  externalIncludes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['Guid']>>>;
  ignoreGetResponse?: InputMaybe<Scalars['Boolean']>;
  includes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  sessionKey?: InputMaybe<Scalars['String']>;
};

export type GenericMutationRequestPersonCollegeDeleteInputType = {
  dto?: InputMaybe<PersonCollegeDeleteDtoInput>;
  externalIncludes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['Guid']>>>;
  ignoreGetResponse?: InputMaybe<Scalars['Boolean']>;
  includes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  sessionKey?: InputMaybe<Scalars['String']>;
};

export type GenericMutationRequestPersonCollegeInputType = {
  dto?: InputMaybe<PersonCollegeInput>;
  externalIncludes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['Guid']>>>;
  ignoreGetResponse?: InputMaybe<Scalars['Boolean']>;
  includes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  sessionKey?: InputMaybe<Scalars['String']>;
};

export type GenericMutationRequestPersonExperienceInputType = {
  dto?: InputMaybe<ExperienceInput>;
  externalIncludes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['Guid']>>>;
  ignoreGetResponse?: InputMaybe<Scalars['Boolean']>;
  includes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  sessionKey?: InputMaybe<Scalars['String']>;
};

export type GenericMutationRequestPersonInputType = {
  dto?: InputMaybe<PersonInput>;
  externalIncludes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['Guid']>>>;
  ignoreGetResponse?: InputMaybe<Scalars['Boolean']>;
  includes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  sessionKey?: InputMaybe<Scalars['String']>;
};

export type GenericMutationRequestPersonJoinInputType = {
  dto?: InputMaybe<PersonJoinInput>;
  externalIncludes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['Guid']>>>;
  ignoreGetResponse?: InputMaybe<Scalars['Boolean']>;
  includes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  sessionKey?: InputMaybe<Scalars['String']>;
};

export type GenericMutationRequestPersonProfileInputType = {
  dto?: InputMaybe<PersonEditInput>;
  externalIncludes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['Guid']>>>;
  ignoreGetResponse?: InputMaybe<Scalars['Boolean']>;
  includes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  sessionKey?: InputMaybe<Scalars['String']>;
};

export type GenericMutationRequestPersonSchoolDeleteInputType = {
  dto?: InputMaybe<PersonSchoolDeleteDtoInput>;
  externalIncludes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['Guid']>>>;
  ignoreGetResponse?: InputMaybe<Scalars['Boolean']>;
  includes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  sessionKey?: InputMaybe<Scalars['String']>;
};

export type GenericMutationRequestPersonSchoolInputType = {
  dto?: InputMaybe<PersonSchoolInput>;
  externalIncludes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['Guid']>>>;
  ignoreGetResponse?: InputMaybe<Scalars['Boolean']>;
  includes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  sessionKey?: InputMaybe<Scalars['String']>;
};

export type GenericMutationRequestPersonSkillDeleteInputType = {
  dto?: InputMaybe<PersonSkillDeleteDtoInput>;
  externalIncludes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['Guid']>>>;
  ignoreGetResponse?: InputMaybe<Scalars['Boolean']>;
  includes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  sessionKey?: InputMaybe<Scalars['String']>;
};

export type GenericMutationRequestPersonSkillsInputType = {
  dto?: InputMaybe<PersonSkillDtoInput>;
  externalIncludes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['Guid']>>>;
  ignoreGetResponse?: InputMaybe<Scalars['Boolean']>;
  includes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  sessionKey?: InputMaybe<Scalars['String']>;
};

export type GenericMutationRequestPlaceReqType = {
  dto?: InputMaybe<PlaceReqDto>;
  externalIncludes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['Guid']>>>;
  ignoreGetResponse?: InputMaybe<Scalars['Boolean']>;
  includes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  sessionKey?: InputMaybe<Scalars['String']>;
};

export type GenericMutationRequestProjectDeleteInputType = {
  dto?: InputMaybe<ProjectDeleteDtoInput>;
  externalIncludes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['Guid']>>>;
  ignoreGetResponse?: InputMaybe<Scalars['Boolean']>;
  includes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  sessionKey?: InputMaybe<Scalars['String']>;
};

export type GenericMutationRequestProjectMediaDeleteInputType = {
  dto?: InputMaybe<ProjectMediaDeleteInput>;
  externalIncludes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['Guid']>>>;
  ignoreGetResponse?: InputMaybe<Scalars['Boolean']>;
  includes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  sessionKey?: InputMaybe<Scalars['String']>;
};

export type GenericMutationRequestProjectMediaInputType = {
  dto?: InputMaybe<ProjectMediaInput>;
  externalIncludes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['Guid']>>>;
  ignoreGetResponse?: InputMaybe<Scalars['Boolean']>;
  includes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  sessionKey?: InputMaybe<Scalars['String']>;
};

export type GenericMutationRequestRefreshTokenInputType = {
  dto?: InputMaybe<RefreshTokenRequestDto>;
  externalIncludes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['Guid']>>>;
  ignoreGetResponse?: InputMaybe<Scalars['Boolean']>;
  includes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  sessionKey?: InputMaybe<Scalars['String']>;
  slug?: InputMaybe<Scalars['String']>;
};

export type GenericMutationRequestRelationshipInputType = {
  dto?: InputMaybe<RelationshipInput>;
  externalIncludes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['Guid']>>>;
  ignoreGetResponse?: InputMaybe<Scalars['Boolean']>;
  includes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  sessionKey?: InputMaybe<Scalars['String']>;
};

export type GenericMutationRequestResendEmailCodeInputType = {
  dto?: InputMaybe<ResendEmailCodeDtoInput>;
  externalIncludes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['Guid']>>>;
  ignoreGetResponse?: InputMaybe<Scalars['Boolean']>;
  includes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  sessionKey?: InputMaybe<Scalars['String']>;
};

export type GenericMutationRequestResendPhoneNumberCodeInputType = {
  dto?: InputMaybe<ResendPhoneCodeDtoInput>;
  externalIncludes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['Guid']>>>;
  ignoreGetResponse?: InputMaybe<Scalars['Boolean']>;
  includes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  sessionKey?: InputMaybe<Scalars['String']>;
};

export type GenericMutationRequestResetPasswordInputType = {
  dto?: InputMaybe<ResetPasswordRequestDto>;
  externalIncludes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['Guid']>>>;
  ignoreGetResponse?: InputMaybe<Scalars['Boolean']>;
  includes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  sessionKey?: InputMaybe<Scalars['String']>;
  slug?: InputMaybe<Scalars['String']>;
};

export type GenericMutationRequestSkillInputType = {
  dto?: InputMaybe<SkillInput>;
  externalIncludes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['Guid']>>>;
  ignoreGetResponse?: InputMaybe<Scalars['Boolean']>;
  includes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  sessionKey?: InputMaybe<Scalars['String']>;
};

export type GenericMutationRequestTagReqType = {
  dto?: InputMaybe<TagReqDto>;
  externalIncludes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['Guid']>>>;
  ignoreGetResponse?: InputMaybe<Scalars['Boolean']>;
  includes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  sessionKey?: InputMaybe<Scalars['String']>;
};

export type GenericMutationRequestUserEmailDeleteInputType = {
  dto?: InputMaybe<UserEmailDeleteDtoInput>;
  externalIncludes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['Guid']>>>;
  ignoreGetResponse?: InputMaybe<Scalars['Boolean']>;
  includes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  sessionKey?: InputMaybe<Scalars['String']>;
};

export type GenericMutationRequestUserEmailInputType = {
  dto?: InputMaybe<UserEmailInput>;
  externalIncludes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['Guid']>>>;
  ignoreGetResponse?: InputMaybe<Scalars['Boolean']>;
  includes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  sessionKey?: InputMaybe<Scalars['String']>;
};

export type GenericMutationRequestUserPhoneNumberDeleteInputType = {
  dto?: InputMaybe<UserPhoneNumberDeleteDtoInput>;
  externalIncludes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['Guid']>>>;
  ignoreGetResponse?: InputMaybe<Scalars['Boolean']>;
  includes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  sessionKey?: InputMaybe<Scalars['String']>;
};

export type GenericMutationRequestUserPhoneNumberInputType = {
  dto?: InputMaybe<UserPhoneNumberInput>;
  externalIncludes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['Guid']>>>;
  ignoreGetResponse?: InputMaybe<Scalars['Boolean']>;
  includes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  sessionKey?: InputMaybe<Scalars['String']>;
};

export type GenericMutationRequestUserRegistrationInputType = {
  dto?: InputMaybe<RegisterModelDto>;
  externalIncludes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['Guid']>>>;
  ignoreGetResponse?: InputMaybe<Scalars['Boolean']>;
  includes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  sessionKey?: InputMaybe<Scalars['String']>;
  slug?: InputMaybe<Scalars['String']>;
};

export type GenericMutationRequestUserSocialMediaDeleteInputType = {
  dto?: InputMaybe<UserSocialMediaDeleteDtoInput>;
  externalIncludes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['Guid']>>>;
  ignoreGetResponse?: InputMaybe<Scalars['Boolean']>;
  includes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  sessionKey?: InputMaybe<Scalars['String']>;
};

export type GenericMutationRequestUserSocialMediaInputType = {
  dto?: InputMaybe<UserSocialMediaInput>;
  externalIncludes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['Guid']>>>;
  ignoreGetResponse?: InputMaybe<Scalars['Boolean']>;
  includes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  sessionKey?: InputMaybe<Scalars['String']>;
};

export type GenericMutationRequestUserWebSiteDeleteInputType = {
  dto?: InputMaybe<UserWebSiteDeleteDtoInput>;
  externalIncludes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['Guid']>>>;
  ignoreGetResponse?: InputMaybe<Scalars['Boolean']>;
  includes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  sessionKey?: InputMaybe<Scalars['String']>;
};

export type GenericMutationRequestUserWebSiteInputType = {
  dto?: InputMaybe<UserWebSiteInput>;
  externalIncludes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['Guid']>>>;
  ignoreGetResponse?: InputMaybe<Scalars['Boolean']>;
  includes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  sessionKey?: InputMaybe<Scalars['String']>;
};

export type GenericMutationRequestVerifyEmailInputType = {
  dto?: InputMaybe<VerifyEmailRequestDto>;
  externalIncludes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['Guid']>>>;
  ignoreGetResponse?: InputMaybe<Scalars['Boolean']>;
  includes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  sessionKey?: InputMaybe<Scalars['String']>;
  slug?: InputMaybe<Scalars['String']>;
};

export type GenericQueryResponseArticlePostResType = {
  __typename?: 'GenericQueryResponseArticlePostResType';
  isSuccess?: Maybe<Scalars['Boolean']>;
  listDto?: Maybe<ListArticlePostResType>;
  messagingKey?: Maybe<Scalars['String']>;
  responseExceptionStatus?: Maybe<ResponseExceptionStatus>;
};

export type GenericQueryResponseBooleanGraphType = {
  __typename?: 'GenericQueryResponseBooleanGraphType';
  isSuccess?: Maybe<Scalars['Boolean']>;
  listDto?: Maybe<ListBooleanGraphType>;
  messagingKey?: Maybe<Scalars['String']>;
  responseExceptionStatus?: Maybe<ResponseExceptionStatus>;
};

export type GenericQueryResponseCertificateDeleteType = {
  __typename?: 'GenericQueryResponseCertificateDeleteType';
  isSuccess?: Maybe<Scalars['Boolean']>;
  listDto?: Maybe<ListCertificateDeleteType>;
  messagingKey?: Maybe<Scalars['String']>;
  responseExceptionStatus?: Maybe<ResponseExceptionStatus>;
};

export type GenericQueryResponseCertificateNameType = {
  __typename?: 'GenericQueryResponseCertificateNameType';
  isSuccess?: Maybe<Scalars['Boolean']>;
  listDto?: Maybe<ListCertificateNameType>;
  messagingKey?: Maybe<Scalars['String']>;
  responseExceptionStatus?: Maybe<ResponseExceptionStatus>;
};

export type GenericQueryResponseCertificateType = {
  __typename?: 'GenericQueryResponseCertificateType';
  isSuccess?: Maybe<Scalars['Boolean']>;
  listDto?: Maybe<ListCertificateType>;
  messagingKey?: Maybe<Scalars['String']>;
  responseExceptionStatus?: Maybe<ResponseExceptionStatus>;
};

export type GenericQueryResponseCollegeType = {
  __typename?: 'GenericQueryResponseCollegeType';
  isSuccess?: Maybe<Scalars['Boolean']>;
  listDto?: Maybe<ListCollegeType>;
  messagingKey?: Maybe<Scalars['String']>;
  responseExceptionStatus?: Maybe<ResponseExceptionStatus>;
};

export type GenericQueryResponseCompanyType = {
  __typename?: 'GenericQueryResponseCompanyType';
  isSuccess?: Maybe<Scalars['Boolean']>;
  listDto?: Maybe<ListCompanyType>;
  messagingKey?: Maybe<Scalars['String']>;
  responseExceptionStatus?: Maybe<ResponseExceptionStatus>;
};

export type GenericQueryResponseConcentrationType = {
  __typename?: 'GenericQueryResponseConcentrationType';
  isSuccess?: Maybe<Scalars['Boolean']>;
  listDto?: Maybe<ListConcentrationType>;
  messagingKey?: Maybe<Scalars['String']>;
  responseExceptionStatus?: Maybe<ResponseExceptionStatus>;
};

export type GenericQueryResponseCountryType = {
  __typename?: 'GenericQueryResponseCountryType';
  isSuccess?: Maybe<Scalars['Boolean']>;
  listDto?: Maybe<ListCountryType>;
  messagingKey?: Maybe<Scalars['String']>;
  responseExceptionStatus?: Maybe<ResponseExceptionStatus>;
};

export type GenericQueryResponseCreateArticlePostType = {
  __typename?: 'GenericQueryResponseCreateArticlePostType';
  isSuccess?: Maybe<Scalars['Boolean']>;
  listDto?: Maybe<ListCreateArticlePostType>;
  messagingKey?: Maybe<Scalars['String']>;
  responseExceptionStatus?: Maybe<ResponseExceptionStatus>;
};

export type GenericQueryResponseCreateFundRaisingPostType = {
  __typename?: 'GenericQueryResponseCreateFundRaisingPostType';
  isSuccess?: Maybe<Scalars['Boolean']>;
  listDto?: Maybe<ListCreateFundRaisingPostType>;
  messagingKey?: Maybe<Scalars['String']>;
  responseExceptionStatus?: Maybe<ResponseExceptionStatus>;
};

export type GenericQueryResponseCreateSocialPostType = {
  __typename?: 'GenericQueryResponseCreateSocialPostType';
  isSuccess?: Maybe<Scalars['Boolean']>;
  listDto?: Maybe<ListCreateSocialPostType>;
  messagingKey?: Maybe<Scalars['String']>;
  responseExceptionStatus?: Maybe<ResponseExceptionStatus>;
};

export type GenericQueryResponseCreateUpdateFundRaisingPostType = {
  __typename?: 'GenericQueryResponseCreateUpdateFundRaisingPostType';
  isSuccess?: Maybe<Scalars['Boolean']>;
  listDto?: Maybe<ListCreateUpdateFundRaisingPostType>;
  messagingKey?: Maybe<Scalars['String']>;
  responseExceptionStatus?: Maybe<ResponseExceptionStatus>;
};

export type GenericQueryResponseCultureType = {
  __typename?: 'GenericQueryResponseCultureType';
  isSuccess?: Maybe<Scalars['Boolean']>;
  listDto?: Maybe<ListCultureType>;
  messagingKey?: Maybe<Scalars['String']>;
  responseExceptionStatus?: Maybe<ResponseExceptionStatus>;
};

export type GenericQueryResponseExperienceDeleteType = {
  __typename?: 'GenericQueryResponseExperienceDeleteType';
  isSuccess?: Maybe<Scalars['Boolean']>;
  listDto?: Maybe<ListExperienceDeleteType>;
  messagingKey?: Maybe<Scalars['String']>;
  responseExceptionStatus?: Maybe<ResponseExceptionStatus>;
};

export type GenericQueryResponseFileType = {
  __typename?: 'GenericQueryResponseFileType';
  isSuccess?: Maybe<Scalars['Boolean']>;
  listDto?: Maybe<ListFileType>;
  messagingKey?: Maybe<Scalars['String']>;
  responseExceptionStatus?: Maybe<ResponseExceptionStatus>;
};

export type GenericQueryResponseFollowerType = {
  __typename?: 'GenericQueryResponseFollowerType';
  isSuccess?: Maybe<Scalars['Boolean']>;
  listDto?: Maybe<ListFollowerType>;
  messagingKey?: Maybe<Scalars['String']>;
  responseExceptionStatus?: Maybe<ResponseExceptionStatus>;
};

export type GenericQueryResponseForgotPasswordTokenResponseType = {
  __typename?: 'GenericQueryResponseForgotPasswordTokenResponseType';
  isSuccess?: Maybe<Scalars['Boolean']>;
  listDto?: Maybe<ListForgotPasswordTokenResponseType>;
  messagingKey?: Maybe<Scalars['String']>;
  responseExceptionStatus?: Maybe<ResponseExceptionStatus>;
};

export type GenericQueryResponseGifResType = {
  __typename?: 'GenericQueryResponseGifResType';
  isSuccess?: Maybe<Scalars['Boolean']>;
  listDto?: Maybe<ListGifResType>;
  messagingKey?: Maybe<Scalars['String']>;
  responseExceptionStatus?: Maybe<ResponseExceptionStatus>;
};

export type GenericQueryResponseGroupCategoryType = {
  __typename?: 'GenericQueryResponseGroupCategoryType';
  isSuccess?: Maybe<Scalars['Boolean']>;
  listDto?: Maybe<ListGroupCategoryType>;
  messagingKey?: Maybe<Scalars['String']>;
  responseExceptionStatus?: Maybe<ResponseExceptionStatus>;
};

export type GenericQueryResponseIssuingOrganizationType = {
  __typename?: 'GenericQueryResponseIssuingOrganizationType';
  isSuccess?: Maybe<Scalars['Boolean']>;
  listDto?: Maybe<ListIssuingOrganizationType>;
  messagingKey?: Maybe<Scalars['String']>;
  responseExceptionStatus?: Maybe<ResponseExceptionStatus>;
};

export type GenericQueryResponseLanguageManagementType = {
  __typename?: 'GenericQueryResponseLanguageManagementType';
  isSuccess?: Maybe<Scalars['Boolean']>;
  listDto?: Maybe<ListLanguageManagementType>;
  messagingKey?: Maybe<Scalars['String']>;
  responseExceptionStatus?: Maybe<ResponseExceptionStatus>;
};

export type GenericQueryResponseLanguageResType = {
  __typename?: 'GenericQueryResponseLanguageResType';
  isSuccess?: Maybe<Scalars['Boolean']>;
  listDto?: Maybe<ListLanguageResType>;
  messagingKey?: Maybe<Scalars['String']>;
  responseExceptionStatus?: Maybe<ResponseExceptionStatus>;
};

export type GenericQueryResponseLanguageResourceDtoType = {
  __typename?: 'GenericQueryResponseLanguageResourceDtoType';
  isSuccess?: Maybe<Scalars['Boolean']>;
  listDto?: Maybe<ListLanguageResourceDtoType>;
  messagingKey?: Maybe<Scalars['String']>;
  responseExceptionStatus?: Maybe<ResponseExceptionStatus>;
};

export type GenericQueryResponseLanguageType = {
  __typename?: 'GenericQueryResponseLanguageType';
  isSuccess?: Maybe<Scalars['Boolean']>;
  listDto?: Maybe<ListLanguageType>;
  messagingKey?: Maybe<Scalars['String']>;
  responseExceptionStatus?: Maybe<ResponseExceptionStatus>;
};

export type GenericQueryResponseLocationDeleteType = {
  __typename?: 'GenericQueryResponseLocationDeleteType';
  isSuccess?: Maybe<Scalars['Boolean']>;
  listDto?: Maybe<ListLocationDeleteType>;
  messagingKey?: Maybe<Scalars['String']>;
  responseExceptionStatus?: Maybe<ResponseExceptionStatus>;
};

export type GenericQueryResponseLocationType = {
  __typename?: 'GenericQueryResponseLocationType';
  isSuccess?: Maybe<Scalars['Boolean']>;
  listDto?: Maybe<ListLocationType>;
  messagingKey?: Maybe<Scalars['String']>;
  responseExceptionStatus?: Maybe<ResponseExceptionStatus>;
};

export type GenericQueryResponseLoginResponseType = {
  __typename?: 'GenericQueryResponseLoginResponseType';
  isSuccess?: Maybe<Scalars['Boolean']>;
  listDto?: Maybe<ListLoginResponseType>;
  messagingKey?: Maybe<Scalars['String']>;
  responseExceptionStatus?: Maybe<ResponseExceptionStatus>;
};

export type GenericQueryResponseOrgUserCertificateType = {
  __typename?: 'GenericQueryResponseOrgUserCertificateType';
  isSuccess?: Maybe<Scalars['Boolean']>;
  listDto?: Maybe<ListOrgUserCertificateType>;
  messagingKey?: Maybe<Scalars['String']>;
  responseExceptionStatus?: Maybe<ResponseExceptionStatus>;
};

export type GenericQueryResponseOrganizationUserProjectType = {
  __typename?: 'GenericQueryResponseOrganizationUserProjectType';
  isSuccess?: Maybe<Scalars['Boolean']>;
  listDto?: Maybe<ListOrganizationUserProjectType>;
  messagingKey?: Maybe<Scalars['String']>;
  responseExceptionStatus?: Maybe<ResponseExceptionStatus>;
};

export type GenericQueryResponseOrganizationUserType = {
  __typename?: 'GenericQueryResponseOrganizationUserType';
  isSuccess?: Maybe<Scalars['Boolean']>;
  listDto?: Maybe<ListOrganizationUserType>;
  messagingKey?: Maybe<Scalars['String']>;
  responseExceptionStatus?: Maybe<ResponseExceptionStatus>;
};

export type GenericQueryResponsePersonCollegeDeleteType = {
  __typename?: 'GenericQueryResponsePersonCollegeDeleteType';
  isSuccess?: Maybe<Scalars['Boolean']>;
  listDto?: Maybe<ListPersonCollegeDeleteType>;
  messagingKey?: Maybe<Scalars['String']>;
  responseExceptionStatus?: Maybe<ResponseExceptionStatus>;
};

export type GenericQueryResponsePersonCollegeType = {
  __typename?: 'GenericQueryResponsePersonCollegeType';
  isSuccess?: Maybe<Scalars['Boolean']>;
  listDto?: Maybe<ListPersonCollegeType>;
  messagingKey?: Maybe<Scalars['String']>;
  responseExceptionStatus?: Maybe<ResponseExceptionStatus>;
};

export type GenericQueryResponsePersonExperienceType = {
  __typename?: 'GenericQueryResponsePersonExperienceType';
  isSuccess?: Maybe<Scalars['Boolean']>;
  listDto?: Maybe<ListPersonExperienceType>;
  messagingKey?: Maybe<Scalars['String']>;
  responseExceptionStatus?: Maybe<ResponseExceptionStatus>;
};

export type GenericQueryResponsePersonSchoolDeleteType = {
  __typename?: 'GenericQueryResponsePersonSchoolDeleteType';
  isSuccess?: Maybe<Scalars['Boolean']>;
  listDto?: Maybe<ListPersonSchoolDeleteType>;
  messagingKey?: Maybe<Scalars['String']>;
  responseExceptionStatus?: Maybe<ResponseExceptionStatus>;
};

export type GenericQueryResponsePersonSchoolType = {
  __typename?: 'GenericQueryResponsePersonSchoolType';
  isSuccess?: Maybe<Scalars['Boolean']>;
  listDto?: Maybe<ListPersonSchoolType>;
  messagingKey?: Maybe<Scalars['String']>;
  responseExceptionStatus?: Maybe<ResponseExceptionStatus>;
};

export type GenericQueryResponsePersonSkillDeleteType = {
  __typename?: 'GenericQueryResponsePersonSkillDeleteType';
  isSuccess?: Maybe<Scalars['Boolean']>;
  listDto?: Maybe<ListPersonSkillDeleteType>;
  messagingKey?: Maybe<Scalars['String']>;
  responseExceptionStatus?: Maybe<ResponseExceptionStatus>;
};

export type GenericQueryResponsePersonSkillsType = {
  __typename?: 'GenericQueryResponsePersonSkillsType';
  isSuccess?: Maybe<Scalars['Boolean']>;
  listDto?: Maybe<ListPersonSkillsType>;
  messagingKey?: Maybe<Scalars['String']>;
  responseExceptionStatus?: Maybe<ResponseExceptionStatus>;
};

export type GenericQueryResponsePersonType = {
  __typename?: 'GenericQueryResponsePersonType';
  isSuccess?: Maybe<Scalars['Boolean']>;
  listDto?: Maybe<ListPersonType>;
  messagingKey?: Maybe<Scalars['String']>;
  responseExceptionStatus?: Maybe<ResponseExceptionStatus>;
};

export type GenericQueryResponsePlaceResType = {
  __typename?: 'GenericQueryResponsePlaceResType';
  isSuccess?: Maybe<Scalars['Boolean']>;
  listDto?: Maybe<ListPlaceResType>;
  messagingKey?: Maybe<Scalars['String']>;
  responseExceptionStatus?: Maybe<ResponseExceptionStatus>;
};

export type GenericQueryResponseProjectDeleteType = {
  __typename?: 'GenericQueryResponseProjectDeleteType';
  isSuccess?: Maybe<Scalars['Boolean']>;
  listDto?: Maybe<ListProjectDeleteType>;
  messagingKey?: Maybe<Scalars['String']>;
  responseExceptionStatus?: Maybe<ResponseExceptionStatus>;
};

export type GenericQueryResponseProjectMediaDeleteType = {
  __typename?: 'GenericQueryResponseProjectMediaDeleteType';
  isSuccess?: Maybe<Scalars['Boolean']>;
  listDto?: Maybe<ListProjectMediaDeleteType>;
  messagingKey?: Maybe<Scalars['String']>;
  responseExceptionStatus?: Maybe<ResponseExceptionStatus>;
};

export type GenericQueryResponseProjectMediaType = {
  __typename?: 'GenericQueryResponseProjectMediaType';
  isSuccess?: Maybe<Scalars['Boolean']>;
  listDto?: Maybe<ListProjectMediaType>;
  messagingKey?: Maybe<Scalars['String']>;
  responseExceptionStatus?: Maybe<ResponseExceptionStatus>;
};

export type GenericQueryResponseRelationshipStatusType = {
  __typename?: 'GenericQueryResponseRelationshipStatusType';
  isSuccess?: Maybe<Scalars['Boolean']>;
  listDto?: Maybe<ListRelationshipStatusType>;
  messagingKey?: Maybe<Scalars['String']>;
  responseExceptionStatus?: Maybe<ResponseExceptionStatus>;
};

export type GenericQueryResponseRelationshipType = {
  __typename?: 'GenericQueryResponseRelationshipType';
  isSuccess?: Maybe<Scalars['Boolean']>;
  listDto?: Maybe<ListRelationshipType>;
  messagingKey?: Maybe<Scalars['String']>;
  responseExceptionStatus?: Maybe<ResponseExceptionStatus>;
};

export type GenericQueryResponseResendEmailCodeType = {
  __typename?: 'GenericQueryResponseResendEmailCodeType';
  isSuccess?: Maybe<Scalars['Boolean']>;
  listDto?: Maybe<ListResendEmailCodeType>;
  messagingKey?: Maybe<Scalars['String']>;
  responseExceptionStatus?: Maybe<ResponseExceptionStatus>;
};

export type GenericQueryResponseResendPhoneCodeType = {
  __typename?: 'GenericQueryResponseResendPhoneCodeType';
  isSuccess?: Maybe<Scalars['Boolean']>;
  listDto?: Maybe<ListResendPhoneCodeType>;
  messagingKey?: Maybe<Scalars['String']>;
  responseExceptionStatus?: Maybe<ResponseExceptionStatus>;
};

export type GenericQueryResponseResetPasswordResponseType = {
  __typename?: 'GenericQueryResponseResetPasswordResponseType';
  isSuccess?: Maybe<Scalars['Boolean']>;
  listDto?: Maybe<ListResetPasswordResponseType>;
  messagingKey?: Maybe<Scalars['String']>;
  responseExceptionStatus?: Maybe<ResponseExceptionStatus>;
};

export type GenericQueryResponseResponseExistUserType = {
  __typename?: 'GenericQueryResponseResponseExistUserType';
  isSuccess?: Maybe<Scalars['Boolean']>;
  listDto?: Maybe<ListResponseExistUserType>;
  messagingKey?: Maybe<Scalars['String']>;
  responseExceptionStatus?: Maybe<ResponseExceptionStatus>;
};

export type GenericQueryResponseSchoolType = {
  __typename?: 'GenericQueryResponseSchoolType';
  isSuccess?: Maybe<Scalars['Boolean']>;
  listDto?: Maybe<ListSchoolType>;
  messagingKey?: Maybe<Scalars['String']>;
  responseExceptionStatus?: Maybe<ResponseExceptionStatus>;
};

export type GenericQueryResponseSearchCitiesType = {
  __typename?: 'GenericQueryResponseSearchCitiesType';
  isSuccess?: Maybe<Scalars['Boolean']>;
  listDto?: Maybe<ListSearchCitiesType>;
  messagingKey?: Maybe<Scalars['String']>;
  responseExceptionStatus?: Maybe<ResponseExceptionStatus>;
};

export type GenericQueryResponseSearchPlacesType = {
  __typename?: 'GenericQueryResponseSearchPlacesType';
  isSuccess?: Maybe<Scalars['Boolean']>;
  listDto?: Maybe<ListSearchPlacesType>;
  messagingKey?: Maybe<Scalars['String']>;
  responseExceptionStatus?: Maybe<ResponseExceptionStatus>;
};

export type GenericQueryResponseSkillType = {
  __typename?: 'GenericQueryResponseSkillType';
  isSuccess?: Maybe<Scalars['Boolean']>;
  listDto?: Maybe<ListSkillType>;
  messagingKey?: Maybe<Scalars['String']>;
  responseExceptionStatus?: Maybe<ResponseExceptionStatus>;
};

export type GenericQueryResponseSocialMediaType = {
  __typename?: 'GenericQueryResponseSocialMediaType';
  isSuccess?: Maybe<Scalars['Boolean']>;
  listDto?: Maybe<ListSocialMediaType>;
  messagingKey?: Maybe<Scalars['String']>;
  responseExceptionStatus?: Maybe<ResponseExceptionStatus>;
};

export type GenericQueryResponseSocialPostResType = {
  __typename?: 'GenericQueryResponseSocialPostResType';
  isSuccess?: Maybe<Scalars['Boolean']>;
  listDto?: Maybe<ListSocialPostResType>;
  messagingKey?: Maybe<Scalars['String']>;
  responseExceptionStatus?: Maybe<ResponseExceptionStatus>;
};

export type GenericQueryResponseTagResType = {
  __typename?: 'GenericQueryResponseTagResType';
  isSuccess?: Maybe<Scalars['Boolean']>;
  listDto?: Maybe<ListTagResType>;
  messagingKey?: Maybe<Scalars['String']>;
  responseExceptionStatus?: Maybe<ResponseExceptionStatus>;
};

export type GenericQueryResponseUserEmailDeleteType = {
  __typename?: 'GenericQueryResponseUserEmailDeleteType';
  isSuccess?: Maybe<Scalars['Boolean']>;
  listDto?: Maybe<ListUserEmailDeleteType>;
  messagingKey?: Maybe<Scalars['String']>;
  responseExceptionStatus?: Maybe<ResponseExceptionStatus>;
};

export type GenericQueryResponseUserEmailType = {
  __typename?: 'GenericQueryResponseUserEmailType';
  isSuccess?: Maybe<Scalars['Boolean']>;
  listDto?: Maybe<ListUserEmailType>;
  messagingKey?: Maybe<Scalars['String']>;
  responseExceptionStatus?: Maybe<ResponseExceptionStatus>;
};

export type GenericQueryResponseUserPhoneNumberDeleteType = {
  __typename?: 'GenericQueryResponseUserPhoneNumberDeleteType';
  isSuccess?: Maybe<Scalars['Boolean']>;
  listDto?: Maybe<ListUserPhoneNumberDeleteType>;
  messagingKey?: Maybe<Scalars['String']>;
  responseExceptionStatus?: Maybe<ResponseExceptionStatus>;
};

export type GenericQueryResponseUserPhoneNumberType = {
  __typename?: 'GenericQueryResponseUserPhoneNumberType';
  isSuccess?: Maybe<Scalars['Boolean']>;
  listDto?: Maybe<ListUserPhoneNumberType>;
  messagingKey?: Maybe<Scalars['String']>;
  responseExceptionStatus?: Maybe<ResponseExceptionStatus>;
};

export type GenericQueryResponseUserRegistrationType = {
  __typename?: 'GenericQueryResponseUserRegistrationType';
  isSuccess?: Maybe<Scalars['Boolean']>;
  listDto?: Maybe<ListUserRegistrationType>;
  messagingKey?: Maybe<Scalars['String']>;
  responseExceptionStatus?: Maybe<ResponseExceptionStatus>;
};

export type GenericQueryResponseUserResType = {
  __typename?: 'GenericQueryResponseUserResType';
  isSuccess?: Maybe<Scalars['Boolean']>;
  listDto?: Maybe<ListUserResType>;
  messagingKey?: Maybe<Scalars['String']>;
  responseExceptionStatus?: Maybe<ResponseExceptionStatus>;
};

export type GenericQueryResponseUserSocialMediaDeleteType = {
  __typename?: 'GenericQueryResponseUserSocialMediaDeleteType';
  isSuccess?: Maybe<Scalars['Boolean']>;
  listDto?: Maybe<ListUserSocialMediaDeleteType>;
  messagingKey?: Maybe<Scalars['String']>;
  responseExceptionStatus?: Maybe<ResponseExceptionStatus>;
};

export type GenericQueryResponseUserSocialMediaType = {
  __typename?: 'GenericQueryResponseUserSocialMediaType';
  isSuccess?: Maybe<Scalars['Boolean']>;
  listDto?: Maybe<ListUserSocialMediaType>;
  messagingKey?: Maybe<Scalars['String']>;
  responseExceptionStatus?: Maybe<ResponseExceptionStatus>;
};

export type GenericQueryResponseUserType = {
  __typename?: 'GenericQueryResponseUserType';
  isSuccess?: Maybe<Scalars['Boolean']>;
  listDto?: Maybe<ListUserType>;
  messagingKey?: Maybe<Scalars['String']>;
  responseExceptionStatus?: Maybe<ResponseExceptionStatus>;
};

export type GenericQueryResponseUserWebSiteDeleteType = {
  __typename?: 'GenericQueryResponseUserWebSiteDeleteType';
  isSuccess?: Maybe<Scalars['Boolean']>;
  listDto?: Maybe<ListUserWebSiteDeleteType>;
  messagingKey?: Maybe<Scalars['String']>;
  responseExceptionStatus?: Maybe<ResponseExceptionStatus>;
};

export type GenericQueryResponseUserWebSiteType = {
  __typename?: 'GenericQueryResponseUserWebSiteType';
  isSuccess?: Maybe<Scalars['Boolean']>;
  listDto?: Maybe<ListUserWebSiteType>;
  messagingKey?: Maybe<Scalars['String']>;
  responseExceptionStatus?: Maybe<ResponseExceptionStatus>;
};

export type GenericQueryResponseVerifyEmailType = {
  __typename?: 'GenericQueryResponseVerifyEmailType';
  isSuccess?: Maybe<Scalars['Boolean']>;
  listDto?: Maybe<ListVerifyEmailType>;
  messagingKey?: Maybe<Scalars['String']>;
  responseExceptionStatus?: Maybe<ResponseExceptionStatus>;
};

export type GifReqDto = {
  searchTerm?: InputMaybe<Scalars['String']>;
};

export type GifResType = {
  __typename?: 'GifResType';
  gifUrl?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type GoogleTokenRequestDto = {
  userType?: InputMaybe<UserTypeEnum>;
};

export type GroupCategory = {
  __typename?: 'GroupCategory';
  groupCategoryType?: Maybe<GroupCategoryTypeEnum>;
  id?: Maybe<Scalars['Guid']>;
  title?: Maybe<Scalars['String']>;
};

export type GroupCategorySearchInput = {
  groupCategoryType?: InputMaybe<GroupCategoryTypeEnum>;
  id?: InputMaybe<Scalars['Guid']>;
  title?: InputMaybe<Scalars['String']>;
};

export enum GroupCategoryTypeEnum {
  Category = 'CATEGORY',
  Industry = 'INDUSTRY'
}

export enum InstituteTypeEnum {
  College = 'COLLEGE',
  University = 'UNIVERSITY'
}

export type IssuingOrganization = {
  __typename?: 'IssuingOrganization';
  id?: Maybe<Scalars['Guid']>;
  title?: Maybe<Scalars['String']>;
};

export type IssuingOrganizationSearchInput = {
  id?: InputMaybe<Scalars['Guid']>;
  title?: InputMaybe<Scalars['String']>;
};

export type Language = {
  __typename?: 'Language';
  createdDateTime: Scalars['DateTime'];
  id: Scalars['ID'];
  published: Scalars['Boolean'];
  updatedDateTime: Scalars['DateTime'];
};

export enum LanguageDirection {
  Ltr = 'LTR',
  Rtl = 'RTL'
}

export type LanguageInput = {
  displayOrder?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['Guid']>;
  published?: InputMaybe<Scalars['Boolean']>;
  slug?: InputMaybe<Scalars['String']>;
};

export type LanguageManagement = {
  __typename?: 'LanguageManagement';
  createdDateTime: Scalars['DateTime'];
  cultureDto?: Maybe<Culture>;
  flagUrl?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  isDefault: Scalars['Boolean'];
  languageDirection?: Maybe<LanguageDirection>;
  name?: Maybe<Scalars['String']>;
  published: Scalars['Boolean'];
  resourceUrl?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  updatedDateTime: Scalars['DateTime'];
  usedInCountryDtos?: Maybe<Array<Maybe<Country>>>;
};

export type LanguageManagementInput = {
  cultureDto?: InputMaybe<CultureInput>;
  displayOrder?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['Guid']>;
  published?: InputMaybe<Scalars['Boolean']>;
  resourceUrl?: InputMaybe<Scalars['String']>;
  usedInCountryDtos?: InputMaybe<Array<InputMaybe<CountryInput>>>;
};

export type LanguageRes = {
  __typename?: 'LanguageRes';
  createdDateTime: Scalars['DateTime'];
  flagUrl?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  isDefault: Scalars['Boolean'];
  languageDirection?: Maybe<LanguageDirection>;
  languageResources?: Maybe<Array<Maybe<LanguageResource>>>;
  name?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  updatedDateTime: Scalars['DateTime'];
};

export type LanguageResource = {
  __typename?: 'LanguageResource';
  key?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type LanguageResourceDto = {
  __typename?: 'LanguageResourceDto';
  data?: Maybe<Array<Maybe<LanguageResource>>>;
  id?: Maybe<Scalars['Guid']>;
  slug?: Maybe<Scalars['String']>;
};

export type LanguageResourceDtoInput = {
  data?: InputMaybe<Array<InputMaybe<LanguageResourceInput>>>;
  id?: InputMaybe<Scalars['Guid']>;
  slug?: InputMaybe<Scalars['String']>;
};

export type LanguageResourceInput = {
  key?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
};

export type ListArticlePostResType = {
  __typename?: 'ListArticlePostResType';
  count?: Maybe<Scalars['Long']>;
  items?: Maybe<Array<Maybe<ArticlePostResDto>>>;
};

export type ListBooleanGraphType = {
  __typename?: 'ListBooleanGraphType';
  count?: Maybe<Scalars['Long']>;
  items?: Maybe<Array<Maybe<Scalars['Boolean']>>>;
};

export type ListCertificateDeleteType = {
  __typename?: 'ListCertificateDeleteType';
  count?: Maybe<Scalars['Long']>;
  items?: Maybe<Array<Maybe<CertificateDeleteDto>>>;
};

export type ListCertificateNameType = {
  __typename?: 'ListCertificateNameType';
  count?: Maybe<Scalars['Long']>;
  items?: Maybe<Array<Maybe<CertificateName>>>;
};

export type ListCertificateType = {
  __typename?: 'ListCertificateType';
  count?: Maybe<Scalars['Long']>;
  items?: Maybe<Array<Maybe<Certificate>>>;
};

export type ListCollegeType = {
  __typename?: 'ListCollegeType';
  count?: Maybe<Scalars['Long']>;
  items?: Maybe<Array<Maybe<College>>>;
};

export type ListCompanyType = {
  __typename?: 'ListCompanyType';
  count?: Maybe<Scalars['Long']>;
  items?: Maybe<Array<Maybe<Company>>>;
};

export type ListConcentrationType = {
  __typename?: 'ListConcentrationType';
  count?: Maybe<Scalars['Long']>;
  items?: Maybe<Array<Maybe<Concentration>>>;
};

export type ListCountryType = {
  __typename?: 'ListCountryType';
  count?: Maybe<Scalars['Long']>;
  items?: Maybe<Array<Maybe<Country>>>;
};

export type ListCreateArticlePostType = {
  __typename?: 'ListCreateArticlePostType';
  count?: Maybe<Scalars['Long']>;
  items?: Maybe<Array<Maybe<CreateArticlePost>>>;
};

export type ListCreateFundRaisingPostType = {
  __typename?: 'ListCreateFundRaisingPostType';
  count?: Maybe<Scalars['Long']>;
  items?: Maybe<Array<Maybe<CreateFundRaisingPost>>>;
};

export type ListCreateSocialPostType = {
  __typename?: 'ListCreateSocialPostType';
  count?: Maybe<Scalars['Long']>;
  items?: Maybe<Array<Maybe<CreateSocialPost>>>;
};

export type ListCreateUpdateFundRaisingPostType = {
  __typename?: 'ListCreateUpdateFundRaisingPostType';
  count?: Maybe<Scalars['Long']>;
  items?: Maybe<Array<Maybe<CreateUpdateFundRaisingPost>>>;
};

export type ListCultureType = {
  __typename?: 'ListCultureType';
  count?: Maybe<Scalars['Long']>;
  items?: Maybe<Array<Maybe<Culture>>>;
};

export type ListExperienceDeleteType = {
  __typename?: 'ListExperienceDeleteType';
  count?: Maybe<Scalars['Long']>;
  items?: Maybe<Array<Maybe<ExperienceDeleteDto>>>;
};

export type ListFileType = {
  __typename?: 'ListFileType';
  count?: Maybe<Scalars['Long']>;
  items?: Maybe<Array<Maybe<File>>>;
};

export type ListFollowerType = {
  __typename?: 'ListFollowerType';
  count?: Maybe<Scalars['Long']>;
  items?: Maybe<Array<Maybe<FollowerDto>>>;
};

export type ListForgotPasswordTokenResponseType = {
  __typename?: 'ListForgotPasswordTokenResponseType';
  count?: Maybe<Scalars['Long']>;
  items?: Maybe<Array<Maybe<ForgotPasswordTokenResponseDto>>>;
};

export type ListGifResType = {
  __typename?: 'ListGifResType';
  count?: Maybe<Scalars['Long']>;
  items?: Maybe<Array<Maybe<GifResType>>>;
};

export type ListGroupCategoryType = {
  __typename?: 'ListGroupCategoryType';
  count?: Maybe<Scalars['Long']>;
  items?: Maybe<Array<Maybe<GroupCategory>>>;
};

export type ListIssuingOrganizationType = {
  __typename?: 'ListIssuingOrganizationType';
  count?: Maybe<Scalars['Long']>;
  items?: Maybe<Array<Maybe<IssuingOrganization>>>;
};

export type ListLanguageManagementType = {
  __typename?: 'ListLanguageManagementType';
  count?: Maybe<Scalars['Long']>;
  items?: Maybe<Array<Maybe<LanguageManagement>>>;
};

export type ListLanguageResType = {
  __typename?: 'ListLanguageResType';
  count?: Maybe<Scalars['Long']>;
  items?: Maybe<Array<Maybe<LanguageRes>>>;
};

export type ListLanguageResourceDtoType = {
  __typename?: 'ListLanguageResourceDtoType';
  count?: Maybe<Scalars['Long']>;
  items?: Maybe<Array<Maybe<LanguageResourceDto>>>;
};

export type ListLanguageType = {
  __typename?: 'ListLanguageType';
  count?: Maybe<Scalars['Long']>;
  items?: Maybe<Array<Maybe<Language>>>;
};

export type ListLocationDeleteType = {
  __typename?: 'ListLocationDeleteType';
  count?: Maybe<Scalars['Long']>;
  items?: Maybe<Array<Maybe<LocationBaseDto>>>;
};

export type ListLocationType = {
  __typename?: 'ListLocationType';
  count?: Maybe<Scalars['Long']>;
  items?: Maybe<Array<Maybe<Location>>>;
};

export type ListLoginResponseType = {
  __typename?: 'ListLoginResponseType';
  count?: Maybe<Scalars['Long']>;
  items?: Maybe<Array<Maybe<LoginResponseDto>>>;
};

export type ListOrgUserCertificateType = {
  __typename?: 'ListOrgUserCertificateType';
  count?: Maybe<Scalars['Long']>;
  items?: Maybe<Array<Maybe<OrgUserCertificate>>>;
};

export type ListOrganizationUserProjectType = {
  __typename?: 'ListOrganizationUserProjectType';
  count?: Maybe<Scalars['Long']>;
  items?: Maybe<Array<Maybe<Project>>>;
};

export type ListOrganizationUserType = {
  __typename?: 'ListOrganizationUserType';
  count?: Maybe<Scalars['Long']>;
  items?: Maybe<Array<Maybe<OrganizationUser>>>;
};

export type ListPersonCollegeDeleteType = {
  __typename?: 'ListPersonCollegeDeleteType';
  count?: Maybe<Scalars['Long']>;
  items?: Maybe<Array<Maybe<PersonCollegeDeleteDto>>>;
};

export type ListPersonCollegeType = {
  __typename?: 'ListPersonCollegeType';
  count?: Maybe<Scalars['Long']>;
  items?: Maybe<Array<Maybe<PersonCollege>>>;
};

export type ListPersonExperienceType = {
  __typename?: 'ListPersonExperienceType';
  count?: Maybe<Scalars['Long']>;
  items?: Maybe<Array<Maybe<Experience>>>;
};

export type ListPersonSchoolDeleteType = {
  __typename?: 'ListPersonSchoolDeleteType';
  count?: Maybe<Scalars['Long']>;
  items?: Maybe<Array<Maybe<PersonSchoolDeleteDto>>>;
};

export type ListPersonSchoolType = {
  __typename?: 'ListPersonSchoolType';
  count?: Maybe<Scalars['Long']>;
  items?: Maybe<Array<Maybe<PersonSchool>>>;
};

export type ListPersonSkillDeleteType = {
  __typename?: 'ListPersonSkillDeleteType';
  count?: Maybe<Scalars['Long']>;
  items?: Maybe<Array<Maybe<PersonSkillDeleteDto>>>;
};

export type ListPersonSkillsType = {
  __typename?: 'ListPersonSkillsType';
  count?: Maybe<Scalars['Long']>;
  items?: Maybe<Array<Maybe<PersonSkillDto>>>;
};

export type ListPersonType = {
  __typename?: 'ListPersonType';
  count?: Maybe<Scalars['Long']>;
  items?: Maybe<Array<Maybe<Person>>>;
};

export type ListPlaceResType = {
  __typename?: 'ListPlaceResType';
  count?: Maybe<Scalars['Long']>;
  items?: Maybe<Array<Maybe<PlaceResDto>>>;
};

export type ListProjectDeleteType = {
  __typename?: 'ListProjectDeleteType';
  count?: Maybe<Scalars['Long']>;
  items?: Maybe<Array<Maybe<ProjectDeleteDto>>>;
};

export type ListProjectMediaDeleteType = {
  __typename?: 'ListProjectMediaDeleteType';
  count?: Maybe<Scalars['Long']>;
  items?: Maybe<Array<Maybe<ProjectMediaDelete>>>;
};

export type ListProjectMediaType = {
  __typename?: 'ListProjectMediaType';
  count?: Maybe<Scalars['Long']>;
  items?: Maybe<Array<Maybe<ProjectMedia>>>;
};

export type ListRelationshipStatusType = {
  __typename?: 'ListRelationshipStatusType';
  count?: Maybe<Scalars['Long']>;
  items?: Maybe<Array<Maybe<RelationshipStatus>>>;
};

export type ListRelationshipType = {
  __typename?: 'ListRelationshipType';
  count?: Maybe<Scalars['Long']>;
  items?: Maybe<Array<Maybe<Relationship>>>;
};

export type ListResendEmailCodeType = {
  __typename?: 'ListResendEmailCodeType';
  count?: Maybe<Scalars['Long']>;
  items?: Maybe<Array<Maybe<ResendEmailCodeDto>>>;
};

export type ListResendPhoneCodeType = {
  __typename?: 'ListResendPhoneCodeType';
  count?: Maybe<Scalars['Long']>;
  items?: Maybe<Array<Maybe<ResendPhoneCodeDto>>>;
};

export type ListResetPasswordResponseType = {
  __typename?: 'ListResetPasswordResponseType';
  count?: Maybe<Scalars['Long']>;
  items?: Maybe<Array<Maybe<ResetPasswordResponseDto>>>;
};

export type ListResponseExistUserType = {
  __typename?: 'ListResponseExistUserType';
  count?: Maybe<Scalars['Long']>;
  items?: Maybe<Array<Maybe<ResponseExistUser>>>;
};

export type ListSchoolType = {
  __typename?: 'ListSchoolType';
  count?: Maybe<Scalars['Long']>;
  items?: Maybe<Array<Maybe<School>>>;
};

export type ListSearchCitiesType = {
  __typename?: 'ListSearchCitiesType';
  count?: Maybe<Scalars['Long']>;
  items?: Maybe<Array<Maybe<SearchCities>>>;
};

export type ListSearchPlacesType = {
  __typename?: 'ListSearchPlacesType';
  count?: Maybe<Scalars['Long']>;
  items?: Maybe<Array<Maybe<PlaceItemDto>>>;
};

export type ListSkillType = {
  __typename?: 'ListSkillType';
  count?: Maybe<Scalars['Long']>;
  items?: Maybe<Array<Maybe<Skill>>>;
};

export type ListSocialMediaType = {
  __typename?: 'ListSocialMediaType';
  count?: Maybe<Scalars['Long']>;
  items?: Maybe<Array<Maybe<SocialMedia>>>;
};

export type ListSocialPostResType = {
  __typename?: 'ListSocialPostResType';
  count?: Maybe<Scalars['Long']>;
  items?: Maybe<Array<Maybe<SocialPostResDto>>>;
};

export type ListTagResType = {
  __typename?: 'ListTagResType';
  count?: Maybe<Scalars['Long']>;
  items?: Maybe<Array<Maybe<TagResDto>>>;
};

export type ListUserEmailDeleteType = {
  __typename?: 'ListUserEmailDeleteType';
  count?: Maybe<Scalars['Long']>;
  items?: Maybe<Array<Maybe<UserEmailDeleteDto>>>;
};

export type ListUserEmailType = {
  __typename?: 'ListUserEmailType';
  count?: Maybe<Scalars['Long']>;
  items?: Maybe<Array<Maybe<UserEmail>>>;
};

export type ListUserPhoneNumberDeleteType = {
  __typename?: 'ListUserPhoneNumberDeleteType';
  count?: Maybe<Scalars['Long']>;
  items?: Maybe<Array<Maybe<UserPhoneNumberDeleteDto>>>;
};

export type ListUserPhoneNumberType = {
  __typename?: 'ListUserPhoneNumberType';
  count?: Maybe<Scalars['Long']>;
  items?: Maybe<Array<Maybe<UserPhoneNumber>>>;
};

export type ListUserRegistrationType = {
  __typename?: 'ListUserRegistrationType';
  count?: Maybe<Scalars['Long']>;
  items?: Maybe<Array<Maybe<ResponseSignUp>>>;
};

export type ListUserResType = {
  __typename?: 'ListUserResType';
  count?: Maybe<Scalars['Long']>;
  items?: Maybe<Array<Maybe<UserResDto>>>;
};

export type ListUserSocialMediaDeleteType = {
  __typename?: 'ListUserSocialMediaDeleteType';
  count?: Maybe<Scalars['Long']>;
  items?: Maybe<Array<Maybe<UserSocialMediaDeleteDto>>>;
};

export type ListUserSocialMediaType = {
  __typename?: 'ListUserSocialMediaType';
  count?: Maybe<Scalars['Long']>;
  items?: Maybe<Array<Maybe<UserSocialMedia>>>;
};

export type ListUserType = {
  __typename?: 'ListUserType';
  count?: Maybe<Scalars['Long']>;
  items?: Maybe<Array<Maybe<UserDto>>>;
};

export type ListUserWebSiteDeleteType = {
  __typename?: 'ListUserWebSiteDeleteType';
  count?: Maybe<Scalars['Long']>;
  items?: Maybe<Array<Maybe<UserWebSiteDeleteDto>>>;
};

export type ListUserWebSiteType = {
  __typename?: 'ListUserWebSiteType';
  count?: Maybe<Scalars['Long']>;
  items?: Maybe<Array<Maybe<UserWebSite>>>;
};

export type ListVerifyEmailType = {
  __typename?: 'ListVerifyEmailType';
  count?: Maybe<Scalars['Long']>;
  items?: Maybe<Array<Maybe<VerifyEmailResponseDto>>>;
};

export type Location = {
  __typename?: 'Location';
  audience?: Maybe<AudienceEnum>;
  city?: Maybe<City>;
  cityId: Scalars['ID'];
  id: Scalars['String'];
  locationType?: Maybe<LocationTypeEnum>;
  personId: Scalars['ID'];
};

export type LocationBaseDto = {
  __typename?: 'LocationBaseDto';
  id?: Maybe<Scalars['Guid']>;
};

export type LocationBaseDtoInput = {
  id?: InputMaybe<Scalars['Guid']>;
  locationType?: InputMaybe<LocationTypeEnum>;
};

export type LocationDtoInput = {
  lat?: InputMaybe<Scalars['Float']>;
  lng?: InputMaybe<Scalars['Float']>;
  searchRadius?: InputMaybe<Scalars['Int']>;
  strictBounds?: InputMaybe<Scalars['Boolean']>;
};

export type LocationGetInput = {
  id?: InputMaybe<Scalars['Guid']>;
  locationType?: InputMaybe<LocationTypeEnum>;
};

export type LocationInput = {
  audience?: InputMaybe<AudienceEnum>;
  cityId?: InputMaybe<Scalars['Guid']>;
  id?: InputMaybe<Scalars['String']>;
  locationType?: InputMaybe<LocationTypeEnum>;
};

export enum LocationTypeEnum {
  CurrnetCity = 'CURRNET_CITY',
  Hometown = 'HOMETOWN'
}

export type LoginRequestDto = {
  password: Scalars['String'];
  userName: Scalars['String'];
};

export type LoginResponseDto = {
  __typename?: 'LoginResponseDto';
  expiry: Scalars['DateTimeOffset'];
  refreshToken: Scalars['String'];
  token: Scalars['String'];
};

export type MentionedUserType = {
  __typename?: 'MentionedUserType';
  avatarUrl?: Maybe<Scalars['String']>;
  cognitoUserId: Scalars['String'];
  fullName: Scalars['String'];
  userName?: Maybe<Scalars['String']>;
};

export type Mutations = {
  __typename?: 'Mutations';
  addExperience?: Maybe<GenericQueryResponsePersonExperienceType>;
  addPersonCollege?: Maybe<GenericQueryResponsePersonCollegeType>;
  addPersonSchool?: Maybe<GenericQueryResponsePersonSchoolType>;
  addProject?: Maybe<GenericQueryResponseOrganizationUserProjectType>;
  addProjectMedia?: Maybe<GenericQueryResponseProjectMediaType>;
  confirmForgotPassword?: Maybe<GenericQueryResponseForgotPasswordTokenResponseType>;
  confirmPhoneNumber?: Maybe<GenericQueryResponseUserPhoneNumberType>;
  confirmUserEmail?: Maybe<GenericQueryResponseUserEmailType>;
  createArticlePost?: Maybe<GenericQueryResponseCreateArticlePostType>;
  createCertificateName?: Maybe<GenericQueryResponseCertificateNameType>;
  createCollege?: Maybe<GenericQueryResponseCollegeType>;
  createCompany?: Maybe<GenericQueryResponseCompanyType>;
  createConcentration?: Maybe<GenericQueryResponseConcentrationType>;
  createFile?: Maybe<GenericQueryResponseFileType>;
  createFundRaisingPost?: Maybe<GenericQueryResponseCreateFundRaisingPostType>;
  createIssuingOrganization?: Maybe<GenericQueryResponseIssuingOrganizationType>;
  createLanguage?: Maybe<GenericQueryResponseLanguageManagementType>;
  createPersonSkill?: Maybe<GenericQueryResponsePersonSkillsType>;
  createPlace?: Maybe<GenericQueryResponsePlaceResType>;
  createSchool?: Maybe<GenericQueryResponseSchoolType>;
  createSkill?: Maybe<GenericQueryResponseSkillType>;
  createSocialPost?: Maybe<GenericQueryResponseCreateSocialPostType>;
  createTag?: Maybe<GenericQueryResponseTagResType>;
  createUpdateFundRaisingPost?: Maybe<GenericQueryResponseCreateUpdateFundRaisingPostType>;
  defaultLanguage?: Maybe<GenericQueryResponseLanguageType>;
  deleteArticlePost?: Maybe<GenericQueryResponseCreateArticlePostType>;
  deleteCertificate?: Maybe<GenericQueryResponseCertificateDeleteType>;
  deleteExperience?: Maybe<GenericQueryResponseExperienceDeleteType>;
  deleteFile?: Maybe<GenericQueryResponseFileType>;
  deleteFundRaisingPost?: Maybe<GenericQueryResponseCreateFundRaisingPostType>;
  deleteLanguage?: Maybe<GenericQueryResponseLanguageType>;
  deleteLocation?: Maybe<GenericQueryResponseLocationDeleteType>;
  deleteMedia?: Maybe<GenericQueryResponseProjectMediaDeleteType>;
  deleteOrgUserCertificate?: Maybe<GenericQueryResponseCertificateDeleteType>;
  deletePersonCollege?: Maybe<GenericQueryResponsePersonCollegeDeleteType>;
  deletePersonSchool?: Maybe<GenericQueryResponsePersonSchoolDeleteType>;
  deletePersonSkill?: Maybe<GenericQueryResponsePersonSkillDeleteType>;
  deletePhoneNumber?: Maybe<GenericQueryResponseUserPhoneNumberDeleteType>;
  deleteProject?: Maybe<GenericQueryResponseProjectDeleteType>;
  deleteSocialPost?: Maybe<GenericQueryResponseCreateSocialPostType>;
  deleteTag?: Maybe<GenericQueryResponseTagResType>;
  deleteUserEmail?: Maybe<GenericQueryResponseUserEmailDeleteType>;
  deleteUserSocialMedia?: Maybe<GenericQueryResponseUserSocialMediaDeleteType>;
  deleteWebSite?: Maybe<GenericQueryResponseUserWebSiteDeleteType>;
  editTag?: Maybe<GenericQueryResponseTagResType>;
  endorsementSkill?: Maybe<GenericQueryResponsePersonType>;
  existUser?: Maybe<GenericQueryResponseResponseExistUserType>;
  forgotPasswordToken?: Maybe<GenericQueryResponseForgotPasswordTokenResponseType>;
  googleToken?: Maybe<GenericQueryResponseUserRegistrationType>;
  login?: Maybe<GenericQueryResponseLoginResponseType>;
  refreshToken?: Maybe<GenericQueryResponseLoginResponseType>;
  register?: Maybe<GenericQueryResponseUserRegistrationType>;
  resendPhoneCode?: Maybe<GenericQueryResponseResendPhoneCodeType>;
  resendRegistrationCode?: Maybe<GenericQueryResponseUserRegistrationType>;
  resendUserEmailCode?: Maybe<GenericQueryResponseResendEmailCodeType>;
  resetPassword?: Maybe<GenericQueryResponseResetPasswordResponseType>;
  revokeToken?: Maybe<GenericQueryResponseLoginResponseType>;
  updateArticlePost?: Maybe<GenericQueryResponseCreateArticlePostType>;
  updateExperience?: Maybe<GenericQueryResponsePersonExperienceType>;
  updateFundRaisingPost?: Maybe<GenericQueryResponseCreateFundRaisingPostType>;
  updateJoinAudience?: Maybe<GenericQueryResponsePersonType>;
  updateLanguage?: Maybe<GenericQueryResponseLanguageManagementType>;
  updateOrganizationUserBio?: Maybe<GenericQueryResponseOrganizationUserType>;
  updateOrganizationUserField?: Maybe<GenericQueryResponseOrganizationUserType>;
  updatePersonCollege?: Maybe<GenericQueryResponsePersonCollegeType>;
  updatePersonProfile?: Maybe<GenericQueryResponsePersonType>;
  updatePersonSchool?: Maybe<GenericQueryResponsePersonSchoolType>;
  updateProfileFiled?: Maybe<GenericQueryResponsePersonType>;
  updateProject?: Maybe<GenericQueryResponseOrganizationUserProjectType>;
  updateProjectMedia?: Maybe<GenericQueryResponseProjectMediaType>;
  updateRelationship?: Maybe<GenericQueryResponseRelationshipType>;
  updateSocialPost?: Maybe<GenericQueryResponseCreateSocialPostType>;
  upsertCertificate?: Maybe<GenericQueryResponseCertificateType>;
  upsertCountry?: Maybe<GenericQueryResponseCountryType>;
  upsertGroupCategory?: Maybe<GenericQueryResponseGroupCategoryType>;
  upsertLocation?: Maybe<GenericQueryResponseLocationType>;
  upsertOrgUserCertificate?: Maybe<GenericQueryResponseOrgUserCertificateType>;
  upsertPhoneNumber?: Maybe<GenericQueryResponseUserPhoneNumberType>;
  upsertUserEmail?: Maybe<GenericQueryResponseUserEmailType>;
  upsertUserSocialMedia?: Maybe<GenericQueryResponseUserSocialMediaType>;
  upsertWebSite?: Maybe<GenericQueryResponseUserWebSiteType>;
  verifyRegistration?: Maybe<GenericQueryResponseVerifyEmailType>;
};


export type MutationsAddExperienceArgs = {
  filter: GenericMutationRequestPersonExperienceInputType;
};


export type MutationsAddPersonCollegeArgs = {
  filter: GenericMutationRequestPersonCollegeInputType;
};


export type MutationsAddPersonSchoolArgs = {
  filter: GenericMutationRequestPersonSchoolInputType;
};


export type MutationsAddProjectArgs = {
  filter: GenericMutationRequestOrganizationUserProjectInputType;
};


export type MutationsAddProjectMediaArgs = {
  filter: GenericMutationRequestProjectMediaInputType;
};


export type MutationsConfirmForgotPasswordArgs = {
  confirmForgotPassword: GenericMutationRequestConfirmForgotPasswordInputType;
};


export type MutationsConfirmPhoneNumberArgs = {
  filter: GenericMutationRequestConfirmPhoneNumberInputType;
};


export type MutationsConfirmUserEmailArgs = {
  filter: GenericMutationRequestConfirmUserEmailInputType;
};


export type MutationsCreateArticlePostArgs = {
  articlePost: GenericMutationRequestCreateArticlePostInputType;
};


export type MutationsCreateCertificateNameArgs = {
  filter: GenericMutationRequestCreateCertificateNameInputType;
};


export type MutationsCreateCollegeArgs = {
  filter: GenericMutationRequestCreateCollegeInputType;
};


export type MutationsCreateCompanyArgs = {
  filter: GenericMutationRequestCreateCompanyInputType;
};


export type MutationsCreateConcentrationArgs = {
  filter: GenericMutationRequestConcentrationCreateInputType;
};


export type MutationsCreateFileArgs = {
  file: GenericMutationRequestFileInputType;
};


export type MutationsCreateFundRaisingPostArgs = {
  fundRaisingPost: GenericMutationRequestCreateFundRaisingPostInputType;
};


export type MutationsCreateIssuingOrganizationArgs = {
  filter: GenericMutationRequestCreateIssuingOrganizationInputType;
};


export type MutationsCreateLanguageArgs = {
  language: GenericMutationRequestLanguageManagementInputType;
};


export type MutationsCreatePersonSkillArgs = {
  filter: GenericMutationRequestPersonSkillsInputType;
};


export type MutationsCreatePlaceArgs = {
  place: GenericMutationRequestPlaceReqType;
};


export type MutationsCreateSchoolArgs = {
  filter: GenericMutationRequestCreateSchoolInputType;
};


export type MutationsCreateSkillArgs = {
  filter: GenericMutationRequestSkillInputType;
};


export type MutationsCreateSocialPostArgs = {
  socialpost: GenericMutationRequestCreateSocialPostInputType;
};


export type MutationsCreateTagArgs = {
  tag: GenericMutationRequestTagReqType;
};


export type MutationsCreateUpdateFundRaisingPostArgs = {
  updateFundRaisingPost: GenericMutationRequestCreateUpdateFundRaisingPostInputType;
};


export type MutationsDefaultLanguageArgs = {
  language: GenericMutationRequestLanguageInputType;
};


export type MutationsDeleteArticlePostArgs = {
  articlePost: GenericMutationRequestCreateArticlePostInputType;
};


export type MutationsDeleteCertificateArgs = {
  filter: GenericMutationRequestCertificateDeleteInputType;
};


export type MutationsDeleteExperienceArgs = {
  filter: GenericMutationRequestExperienceDeleteInputType;
};


export type MutationsDeleteFileArgs = {
  file: GenericMutationRequestFileInputType;
};


export type MutationsDeleteFundRaisingPostArgs = {
  fundRaisingPost: GenericMutationRequestCreateFundRaisingPostInputType;
};


export type MutationsDeleteLanguageArgs = {
  language: GenericMutationRequestLanguageInputType;
};


export type MutationsDeleteLocationArgs = {
  filter: GenericMutationRequestLocationDeleteInputType;
};


export type MutationsDeleteMediaArgs = {
  filter: GenericMutationRequestProjectMediaDeleteInputType;
};


export type MutationsDeleteOrgUserCertificateArgs = {
  filter: GenericMutationRequestCertificateDeleteInputType;
};


export type MutationsDeletePersonCollegeArgs = {
  filter: GenericMutationRequestPersonCollegeDeleteInputType;
};


export type MutationsDeletePersonSchoolArgs = {
  filter: GenericMutationRequestPersonSchoolDeleteInputType;
};


export type MutationsDeletePersonSkillArgs = {
  filter: GenericMutationRequestPersonSkillDeleteInputType;
};


export type MutationsDeletePhoneNumberArgs = {
  filter: GenericMutationRequestUserPhoneNumberDeleteInputType;
};


export type MutationsDeleteProjectArgs = {
  filter: GenericMutationRequestProjectDeleteInputType;
};


export type MutationsDeleteSocialPostArgs = {
  socialPost: GenericMutationRequestCreateSocialPostInputType;
};


export type MutationsDeleteTagArgs = {
  tag: GenericMutationRequestTagReqType;
};


export type MutationsDeleteUserEmailArgs = {
  filter: GenericMutationRequestUserEmailDeleteInputType;
};


export type MutationsDeleteUserSocialMediaArgs = {
  filter: GenericMutationRequestUserSocialMediaDeleteInputType;
};


export type MutationsDeleteWebSiteArgs = {
  filter: GenericMutationRequestUserWebSiteDeleteInputType;
};


export type MutationsEditTagArgs = {
  tag: GenericMutationRequestTagReqType;
};


export type MutationsEndorsementSkillArgs = {
  filter: GenericMutationRequestEndorsementSkillInputType;
};


export type MutationsExistUserArgs = {
  existUserReqDto: GenericMutationRequestExistUserInputType;
};


export type MutationsForgotPasswordTokenArgs = {
  forgotPasswordToken: GenericMutationRequestForgotPasswordTokenInputType;
};


export type MutationsGoogleTokenArgs = {
  googleToken: GenericMutationRequestGoogleTokenInputType;
};


export type MutationsLoginArgs = {
  login: GenericMutationRequestLoginInputType;
};


export type MutationsRefreshTokenArgs = {
  refreshToken: GenericMutationRequestRefreshTokenInputType;
};


export type MutationsRegisterArgs = {
  registerReqDto: GenericMutationRequestUserRegistrationInputType;
};


export type MutationsResendPhoneCodeArgs = {
  filter: GenericMutationRequestResendPhoneNumberCodeInputType;
};


export type MutationsResendRegistrationCodeArgs = {
  resendRegistrationCodeDto: GenericMutationRequestForgotPasswordTokenInputType;
};


export type MutationsResendUserEmailCodeArgs = {
  filter: GenericMutationRequestResendEmailCodeInputType;
};


export type MutationsResetPasswordArgs = {
  resetPassword: GenericMutationRequestResetPasswordInputType;
};


export type MutationsRevokeTokenArgs = {
  revokeToken: GenericMutationRequestRefreshTokenInputType;
};


export type MutationsUpdateArticlePostArgs = {
  articlePost: GenericMutationRequestCreateArticlePostInputType;
};


export type MutationsUpdateExperienceArgs = {
  filter: GenericMutationRequestPersonExperienceInputType;
};


export type MutationsUpdateFundRaisingPostArgs = {
  fundRaisingPost: GenericMutationRequestCreateFundRaisingPostInputType;
};


export type MutationsUpdateJoinAudienceArgs = {
  filter: GenericMutationRequestPersonJoinInputType;
};


export type MutationsUpdateLanguageArgs = {
  language: GenericMutationRequestLanguageManagementInputType;
};


export type MutationsUpdateOrganizationUserBioArgs = {
  filter: GenericMutationRequestOrganizationUserBioInputType;
};


export type MutationsUpdateOrganizationUserFieldArgs = {
  filter: GenericMutationRequestOrganizationUserInputType;
};


export type MutationsUpdatePersonCollegeArgs = {
  filter: GenericMutationRequestPersonCollegeInputType;
};


export type MutationsUpdatePersonProfileArgs = {
  filter: GenericMutationRequestPersonProfileInputType;
};


export type MutationsUpdatePersonSchoolArgs = {
  filter: GenericMutationRequestPersonSchoolInputType;
};


export type MutationsUpdateProfileFiledArgs = {
  filter: GenericMutationRequestPersonInputType;
};


export type MutationsUpdateProjectArgs = {
  filter: GenericMutationRequestOrganizationUserProjectInputType;
};


export type MutationsUpdateProjectMediaArgs = {
  filter: GenericMutationRequestProjectMediaInputType;
};


export type MutationsUpdateRelationshipArgs = {
  filter: GenericMutationRequestRelationshipInputType;
};


export type MutationsUpdateSocialPostArgs = {
  socialpost: GenericMutationRequestCreateSocialPostInputType;
};


export type MutationsUpsertCertificateArgs = {
  filter: GenericMutationRequestCertificateInputType;
};


export type MutationsUpsertCountryArgs = {
  country: GenericMutationRequestCountryDataInputType;
};


export type MutationsUpsertGroupCategoryArgs = {
  filter: GenericMutationRequestCreateGroupCategoryInputType;
};


export type MutationsUpsertLocationArgs = {
  filter: GenericMutationRequestLocationInputType;
};


export type MutationsUpsertOrgUserCertificateArgs = {
  filter: GenericMutationRequestOrgUserCertificateInputType;
};


export type MutationsUpsertPhoneNumberArgs = {
  filter: GenericMutationRequestUserPhoneNumberInputType;
};


export type MutationsUpsertUserEmailArgs = {
  filter: GenericMutationRequestUserEmailInputType;
};


export type MutationsUpsertUserSocialMediaArgs = {
  filter: GenericMutationRequestUserSocialMediaInputType;
};


export type MutationsUpsertWebSiteArgs = {
  filter: GenericMutationRequestUserWebSiteInputType;
};


export type MutationsVerifyRegistrationArgs = {
  verifyRegistrationReqDto: GenericMutationRequestVerifyEmailInputType;
};

export type OrgUserCertificate = {
  __typename?: 'OrgUserCertificate';
  audience?: Maybe<AudienceEnum>;
  certificateName?: Maybe<CertificateName>;
  certificateNameId?: Maybe<Scalars['Guid']>;
  credentialDoesExpire?: Maybe<Scalars['Boolean']>;
  credentialID?: Maybe<Scalars['String']>;
  credentialUrl?: Maybe<Scalars['String']>;
  expirationDate?: Maybe<Scalars['Date']>;
  id: Scalars['ID'];
  issueDate?: Maybe<Scalars['Date']>;
  issuingOrganization?: Maybe<IssuingOrganization>;
  issuingOrganizationId?: Maybe<Scalars['Guid']>;
  organizationUserId?: Maybe<Scalars['Guid']>;
};

export type OrgUserCertificateGetAllInput = {
  id?: InputMaybe<Scalars['Guid']>;
};

export type OrgUserCertificateInput = {
  audience?: InputMaybe<AudienceEnum>;
  certificateNameId?: InputMaybe<Scalars['Guid']>;
  credentialDoesExpire?: InputMaybe<Scalars['Boolean']>;
  credentialID?: InputMaybe<Scalars['String']>;
  credentialUrl?: InputMaybe<Scalars['String']>;
  expirationDate?: InputMaybe<Scalars['Date']>;
  id?: InputMaybe<Scalars['Guid']>;
  issueDate?: InputMaybe<Scalars['Date']>;
  issuingOrganizationId?: InputMaybe<Scalars['Guid']>;
};

export enum OrgUserFieldEnum {
  AvatarUrl = 'AVATAR_URL',
  CoverUrl = 'COVER_URL',
  EstablishmentDate = 'ESTABLISHMENT_DATE',
  GroupCategory = 'GROUP_CATEGORY',
  JoinDateAudience = 'JOIN_DATE_AUDIENCE',
  Place = 'PLACE',
  Size = 'SIZE'
}

export type OrganizationUser = {
  __typename?: 'OrganizationUser';
  avatarUrl?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['String']>;
  coverUrl?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  establishmentDate?: Maybe<Scalars['Date']>;
  establishmentDateAudience?: Maybe<AudienceEnum>;
  fullName?: Maybe<Scalars['String']>;
  groupCategory?: Maybe<GroupCategory>;
  groupCategoryAudience?: Maybe<AudienceEnum>;
  groupCategoryId?: Maybe<Scalars['Guid']>;
  id: Scalars['ID'];
  joinAudience?: Maybe<AudienceEnum>;
  joinDateTime?: Maybe<Scalars['DateTime']>;
  organizationUserType?: Maybe<OrganizationUserTypeEnum>;
  place?: Maybe<Place>;
  placeAudience?: Maybe<AudienceEnum>;
  placeId?: Maybe<Scalars['Guid']>;
  size?: Maybe<Scalars['Int']>;
  sizeAudience?: Maybe<AudienceEnum>;
};

export type OrganizationUserBioInput = {
  body?: InputMaybe<Scalars['String']>;
};

export type OrganizationUserInput = {
  avatarUrl?: InputMaybe<Scalars['String']>;
  coverUrl?: InputMaybe<Scalars['String']>;
  establishmentDate?: InputMaybe<Scalars['Date']>;
  establishmentDateAudience?: InputMaybe<AudienceEnum>;
  field?: InputMaybe<OrgUserFieldEnum>;
  googlePlaceId?: InputMaybe<Scalars['String']>;
  groupCategoryAudience?: InputMaybe<AudienceEnum>;
  groupCategoryId?: InputMaybe<Scalars['Guid']>;
  joinAudience?: InputMaybe<AudienceEnum>;
  placeAudience?: InputMaybe<AudienceEnum>;
  size?: InputMaybe<Scalars['Int']>;
  sizeAudience?: InputMaybe<AudienceEnum>;
};

export enum OrganizationUserTypeEnum {
  Company = 'COMPANY',
  Ngo = 'NGO'
}

export type Person = {
  __typename?: 'Person';
  avatarUrl?: Maybe<Scalars['String']>;
  birthday?: Maybe<Scalars['Date']>;
  coverUrl?: Maybe<Scalars['String']>;
  currnetCity?: Maybe<Location>;
  email?: Maybe<Scalars['String']>;
  experience?: Maybe<Experience>;
  firstName?: Maybe<Scalars['String']>;
  fullName?: Maybe<Scalars['String']>;
  gender?: Maybe<GenderEnum>;
  headline?: Maybe<Scalars['String']>;
  hometown?: Maybe<Location>;
  id: Scalars['ID'];
  joinAudience?: Maybe<AudienceEnum>;
  joinDateTime?: Maybe<Scalars['DateTime']>;
  lastName?: Maybe<Scalars['String']>;
  personSchools?: Maybe<Array<Maybe<PersonSchool>>>;
  personUniversities?: Maybe<Array<Maybe<PersonCollege>>>;
  phoneNumber?: Maybe<Scalars['String']>;
  relationship?: Maybe<Relationship>;
};

export type PersonCollege = {
  __typename?: 'PersonCollege';
  audience?: Maybe<AudienceEnum>;
  collegeDto?: Maybe<College>;
  concentrationDto?: Maybe<Concentration>;
  endDate?: Maybe<Scalars['DateTime']>;
  graduated?: Maybe<Scalars['Boolean']>;
  id: Scalars['ID'];
  instituteType?: Maybe<InstituteTypeEnum>;
  personDto?: Maybe<Person>;
  startDate?: Maybe<Scalars['DateTime']>;
};

export type PersonCollegeDeleteDto = {
  __typename?: 'PersonCollegeDeleteDto';
  id?: Maybe<Scalars['Guid']>;
  instituteType?: Maybe<InstituteTypeEnum>;
};

export type PersonCollegeDeleteDtoInput = {
  id?: InputMaybe<Scalars['Guid']>;
  instituteType?: InputMaybe<InstituteTypeEnum>;
};

export type PersonCollegeGetAllInput = {
  id?: InputMaybe<Scalars['Guid']>;
  instituteType?: InputMaybe<InstituteTypeEnum>;
};

export type PersonCollegeInput = {
  audience?: InputMaybe<AudienceEnum>;
  collegeId?: InputMaybe<Scalars['Guid']>;
  concentrationId?: InputMaybe<Scalars['Guid']>;
  endDate?: InputMaybe<Scalars['DateTime']>;
  followerIds?: InputMaybe<Array<InputMaybe<Scalars['Guid']>>>;
  graduated?: InputMaybe<Scalars['Boolean']>;
  id?: InputMaybe<Scalars['Guid']>;
  instituteType?: InputMaybe<InstituteTypeEnum>;
  startDate?: InputMaybe<Scalars['DateTime']>;
};

export type PersonEditInput = {
  birthday?: InputMaybe<Scalars['Date']>;
  gender?: InputMaybe<GenderEnum>;
  headline?: InputMaybe<Scalars['String']>;
};

export type PersonGetInput = {
  id?: InputMaybe<Scalars['ID']>;
};

export type PersonInput = {
  avatarUrl?: InputMaybe<Scalars['String']>;
  birthday?: InputMaybe<Scalars['Date']>;
  coverUrl?: InputMaybe<Scalars['String']>;
  field?: InputMaybe<ProfileFieldEnum>;
  gender?: InputMaybe<GenderEnum>;
  headline?: InputMaybe<Scalars['String']>;
};

export type PersonJoinInput = {
  joinAudience?: InputMaybe<AudienceEnum>;
};

export type PersonSchool = {
  __typename?: 'PersonSchool';
  audience?: Maybe<AudienceEnum>;
  id: Scalars['ID'];
  personId?: Maybe<Scalars['Guid']>;
  school?: Maybe<School>;
  schoolId?: Maybe<Scalars['Guid']>;
  year?: Maybe<Scalars['Int']>;
};

export type PersonSchoolDeleteDto = {
  __typename?: 'PersonSchoolDeleteDto';
  id?: Maybe<Scalars['Guid']>;
};

export type PersonSchoolDeleteDtoInput = {
  id?: InputMaybe<Scalars['Guid']>;
};

export type PersonSchoolGetAllInput = {
  id?: InputMaybe<Scalars['Guid']>;
};

export type PersonSchoolInput = {
  audience?: InputMaybe<AudienceEnum>;
  id?: InputMaybe<Scalars['Guid']>;
  schoolId?: InputMaybe<Scalars['Guid']>;
  year?: InputMaybe<Scalars['Int']>;
};

export type PersonSkillDeleteDto = {
  __typename?: 'PersonSkillDeleteDto';
  id?: Maybe<Scalars['Guid']>;
};

export type PersonSkillDeleteDtoInput = {
  id?: InputMaybe<Scalars['Guid']>;
};

export type PersonSkillDto = {
  __typename?: 'PersonSkillDto';
  endorsementsCount?: Maybe<Scalars['Int']>;
  id: Scalars['ID'];
  personId?: Maybe<Scalars['Guid']>;
  persons?: Maybe<Array<Maybe<Person>>>;
  skill?: Maybe<Skill>;
};

export type PersonSkillDtoInput = {
  skillId?: InputMaybe<Scalars['Guid']>;
};

export type PersonSkillGetAllInput = {
  id?: InputMaybe<Scalars['ID']>;
};

export type PictureUrlInputType = {
  altImage?: InputMaybe<Scalars['String']>;
  isDefault?: InputMaybe<Scalars['Boolean']>;
  url?: InputMaybe<Scalars['String']>;
};

export type Place = {
  __typename?: 'Place';
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Guid']>;
  mainText?: Maybe<Scalars['String']>;
  placeId?: Maybe<Scalars['String']>;
  secondaryText?: Maybe<Scalars['String']>;
};

export type PlaceItemDto = {
  __typename?: 'PlaceItemDto';
  predictions?: Maybe<Array<Maybe<Prediction>>>;
  status?: Maybe<Scalars['String']>;
};

export type PlaceItemDtoInput = {
  isoCodes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  locationDto?: InputMaybe<LocationDtoInput>;
  restrictionType?: InputMaybe<RestrictionTypeEnum>;
  searchText?: InputMaybe<Scalars['String']>;
};

export type PlaceReqDto = {
  cityName?: InputMaybe<Scalars['String']>;
  cityPlaceId?: InputMaybe<Scalars['String']>;
  countryName?: InputMaybe<Scalars['String']>;
  countryPlaceId?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  mainText?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  secondaryText?: InputMaybe<Scalars['String']>;
};

export type PlaceResDto = {
  __typename?: 'PlaceResDto';
  cityName?: Maybe<Scalars['String']>;
  cityPlaceId?: Maybe<Scalars['String']>;
  countryName?: Maybe<Scalars['String']>;
  countryPlaceId?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  mainText?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  secondaryText?: Maybe<Scalars['String']>;
};

export enum PostStatus {
  Archived = 'ARCHIVED',
  Draft = 'DRAFT',
  Hide = 'HIDE',
  Show = 'SHOW'
}

export type Prediction = {
  __typename?: 'Prediction';
  description?: Maybe<Scalars['String']>;
  placeId?: Maybe<Scalars['String']>;
  structuredFormatting?: Maybe<StructuredFormatting>;
};

export enum ProfileFieldEnum {
  AvatarUrl = 'AVATAR_URL',
  Birthday = 'BIRTHDAY',
  CoverUrl = 'COVER_URL',
  Gender = 'GENDER',
  Headline = 'HEADLINE'
}

export type Project = {
  __typename?: 'Project';
  audience?: Maybe<AudienceEnum>;
  cityDto?: Maybe<City>;
  cityId?: Maybe<Scalars['Guid']>;
  dateDiff?: Maybe<DateDiffDto>;
  description?: Maybe<Scalars['String']>;
  endDate?: Maybe<Scalars['Date']>;
  id?: Maybe<Scalars['Guid']>;
  startDate?: Maybe<Scalars['Date']>;
  stillWorkingThere?: Maybe<Scalars['Boolean']>;
  title?: Maybe<Scalars['String']>;
};

export type ProjectDeleteDto = {
  __typename?: 'ProjectDeleteDto';
  id?: Maybe<Scalars['Guid']>;
};

export type ProjectDeleteDtoInput = {
  id?: InputMaybe<Scalars['Guid']>;
};

export type ProjectInput = {
  audience?: InputMaybe<AudienceEnum>;
  cityId?: InputMaybe<Scalars['Guid']>;
  description?: InputMaybe<Scalars['String']>;
  endDate?: InputMaybe<Scalars['Date']>;
  id?: InputMaybe<Scalars['Guid']>;
  startDate?: InputMaybe<Scalars['Date']>;
  stillWorkingThere?: InputMaybe<Scalars['Boolean']>;
  title?: InputMaybe<Scalars['String']>;
};

export type ProjectMedia = {
  __typename?: 'ProjectMedia';
  id?: Maybe<Scalars['Guid']>;
  projectId?: Maybe<Scalars['Guid']>;
  url?: Maybe<Scalars['String']>;
};

export type ProjectMediaDelete = {
  __typename?: 'ProjectMediaDelete';
  id?: Maybe<Scalars['Guid']>;
};

export type ProjectMediaDeleteInput = {
  id?: InputMaybe<Scalars['Guid']>;
};

export type ProjectMediaGetAllInput = {
  projectId?: InputMaybe<Scalars['Guid']>;
};

export type ProjectMediaInput = {
  id?: InputMaybe<Scalars['Guid']>;
  projectId?: InputMaybe<Scalars['Guid']>;
  url?: InputMaybe<Scalars['String']>;
};

export type Queries = {
  __typename?: 'Queries';
  concentrations?: Maybe<GenericQueryResponseConcentrationType>;
  countries?: Maybe<GenericQueryResponseCountryType>;
  createFundRaisingPost?: Maybe<GenericQueryResponseCreateFundRaisingPostType>;
  cultures?: Maybe<GenericQueryResponseCultureType>;
  deleteFundRaisingPost?: Maybe<GenericQueryResponseCreateFundRaisingPostType>;
  getArticlePost: GenericQueryResponseArticlePostResType;
  getCertificates?: Maybe<GenericQueryResponseCertificateType>;
  getEndorsements?: Maybe<GenericQueryResponsePersonType>;
  getExpriences?: Maybe<GenericQueryResponsePersonExperienceType>;
  getFollowers?: Maybe<GenericQueryResponseFollowerType>;
  getGifsQuery: GenericQueryResponseGifResType;
  getHomePageSocialPosts: GenericQueryResponseSocialPostResType;
  getLatestLocationsQuery: GenericQueryResponsePlaceResType;
  getLocation?: Maybe<GenericQueryResponseLocationType>;
  getMedias?: Maybe<GenericQueryResponseProjectMediaType>;
  getOrgUserCertificates?: Maybe<GenericQueryResponseOrgUserCertificateType>;
  getPersonColleges?: Maybe<GenericQueryResponsePersonCollegeType>;
  getPersonProfile?: Maybe<GenericQueryResponsePersonType>;
  getPersonSchools?: Maybe<GenericQueryResponsePersonSchoolType>;
  getPersonSkills?: Maybe<GenericQueryResponsePersonSkillsType>;
  getProjects?: Maybe<GenericQueryResponseOrganizationUserProjectType>;
  getRelationship?: Maybe<GenericQueryResponseRelationshipType>;
  getRelationshipStatus?: Maybe<GenericQueryResponseRelationshipStatusType>;
  getSkills?: Maybe<GenericQueryResponseSkillType>;
  getSocialMedias?: Maybe<GenericQueryResponseSocialMediaType>;
  getSocialPost: GenericQueryResponseSocialPostResType;
  getTagQuery: GenericQueryResponseTagResType;
  getUser?: Maybe<GenericQueryResponseUserType>;
  getUserEmails?: Maybe<GenericQueryResponseUserEmailType>;
  getUserPhoneNumbers?: Maybe<GenericQueryResponseUserPhoneNumberType>;
  getUserQuery: GenericQueryResponseUserResType;
  getUserSocialMedias?: Maybe<GenericQueryResponseUserSocialMediaType>;
  getUserWebSites?: Maybe<GenericQueryResponseUserWebSiteType>;
  languageResources?: Maybe<GenericQueryResponseLanguageResourceDtoType>;
  languages?: Maybe<GenericQueryResponseLanguageResType>;
  managementLanguages?: Maybe<GenericQueryResponseLanguageManagementType>;
  recommendedTags: GenericQueryResponseTagResType;
  searchCertificateNames?: Maybe<GenericQueryResponseCertificateNameType>;
  searchCities: GenericQueryResponseSearchCitiesType;
  searchColleges?: Maybe<GenericQueryResponseCollegeType>;
  searchCompanies?: Maybe<GenericQueryResponseCompanyType>;
  searchGroupCategories?: Maybe<GenericQueryResponseGroupCategoryType>;
  searchIssuingOrganizations?: Maybe<GenericQueryResponseIssuingOrganizationType>;
  searchPlaces: GenericQueryResponseSearchPlacesType;
  searchSchools?: Maybe<GenericQueryResponseSchoolType>;
  test?: Maybe<GenericQueryResponseBooleanGraphType>;
  updateFundRaisingPost?: Maybe<GenericQueryResponseCreateFundRaisingPostType>;
  userLanguages?: Maybe<GenericQueryResponseLanguageResType>;
};


export type QueriesConcentrationsArgs = {
  filter: GenericFilterRequestConcentrationInputType;
};


export type QueriesCountriesArgs = {
  filter: GenericFilterRequestCountryInputType;
};


export type QueriesCreateFundRaisingPostArgs = {
  fundRaisingPost: GenericMutationRequestCreateFundRaisingPostInputType;
};


export type QueriesCulturesArgs = {
  filter: GenericFilterRequestCultureInputType;
};


export type QueriesDeleteFundRaisingPostArgs = {
  fundRaisingPost: GenericMutationRequestCreateFundRaisingPostInputType;
};


export type QueriesGetArticlePostArgs = {
  filter: GenericFilterRequestArticlePostReqType;
};


export type QueriesGetCertificatesArgs = {
  filter: GenericFilterRequestCertificateGetAllInputType;
};


export type QueriesGetEndorsementsArgs = {
  filter: GenericFilterRequestEndorsementSkillGetInputType;
};


export type QueriesGetExpriencesArgs = {
  filter: GenericFilterRequestPersonExperienceInputType;
};


export type QueriesGetFollowersArgs = {
  filter: GenericFilterRequestFollowerInputType;
};


export type QueriesGetGifsQueryArgs = {
  filter: GenericFilterRequestGifReqType;
};


export type QueriesGetHomePageSocialPostsArgs = {
  filter: GenericFilterRequestSocialPostReqType;
};


export type QueriesGetLatestLocationsQueryArgs = {
  filter: GenericFilterRequestPlaceReqType;
};


export type QueriesGetLocationArgs = {
  filter: GenericFilterRequestLocationGetInputType;
};


export type QueriesGetMediasArgs = {
  filter: GenericFilterRequestProjectMediasInputType;
};


export type QueriesGetOrgUserCertificatesArgs = {
  filter: GenericFilterRequestOrgUserCertificateGetAllInputType;
};


export type QueriesGetPersonCollegesArgs = {
  filter: GenericFilterRequestPersonCollegeGetAllInputType;
};


export type QueriesGetPersonProfileArgs = {
  filter: GenericFilterRequestPersonGetInputType;
};


export type QueriesGetPersonSchoolsArgs = {
  filter: GenericFilterRequestPersonSchoolGetAllInputType;
};


export type QueriesGetPersonSkillsArgs = {
  filter: GenericFilterRequestGetPersonSkillsInputType;
};


export type QueriesGetProjectsArgs = {
  filter: GenericFilterRequestOrganizationUserProjectInputType;
};


export type QueriesGetRelationshipArgs = {
  filter: GenericFilterRequestRelationshipItemInputType;
};


export type QueriesGetRelationshipStatusArgs = {
  filter: GenericFilterRequestRelationshipStatusInputType;
};


export type QueriesGetSkillsArgs = {
  filter: GenericFilterRequestSkillInputType;
};


export type QueriesGetSocialMediasArgs = {
  filter: GenericFilterRequestSocialMediaInputType;
};


export type QueriesGetSocialPostArgs = {
  filter: GenericFilterRequestSocialPostReqType;
};


export type QueriesGetTagQueryArgs = {
  filter: GenericFilterRequestTagReqType;
};


export type QueriesGetUserArgs = {
  filter: GenericFilterRequestUserInputType;
};


export type QueriesGetUserEmailsArgs = {
  filter: GenericFilterRequestUserEmailGetAllInputType;
};


export type QueriesGetUserPhoneNumbersArgs = {
  filter: GenericFilterRequestUserPhoneNumberGetAllInputType;
};


export type QueriesGetUserQueryArgs = {
  filter: GenericFilterRequestUserReqType;
};


export type QueriesGetUserSocialMediasArgs = {
  filter: GenericFilterRequestUserSocialMediaGetAllInputType;
};


export type QueriesGetUserWebSitesArgs = {
  filter: GenericFilterRequestUserWebSiteGetAllInputType;
};


export type QueriesLanguageResourcesArgs = {
  filter: GenericFilterRequestLanguageResourceInputDtoType;
};


export type QueriesLanguagesArgs = {
  filter: GenericFilterRequestLanguageInputType;
};


export type QueriesManagementLanguagesArgs = {
  filter: GenericFilterRequestLanguageManagementInputType;
};


export type QueriesRecommendedTagsArgs = {
  filter: GenericFilterRequestTagReqType;
};


export type QueriesSearchCertificateNamesArgs = {
  filter: GenericFilterRequestCertificateNameSearchInputType;
};


export type QueriesSearchCitiesArgs = {
  filter: GenericFilterRequestSearchCitiesInputType;
};


export type QueriesSearchCollegesArgs = {
  filter: GenericFilterRequestSearchCollegeInputType;
};


export type QueriesSearchCompaniesArgs = {
  filter: GenericFilterRequestCompanySearchInputType;
};


export type QueriesSearchGroupCategoriesArgs = {
  filter: GenericFilterRequestGroupCategorySearchInputType;
};


export type QueriesSearchIssuingOrganizationsArgs = {
  filter: GenericFilterRequestIssuingOrganizationSearchInputType;
};


export type QueriesSearchPlacesArgs = {
  filter: GenericFilterRequestSearchPlacesInputType;
};


export type QueriesSearchSchoolsArgs = {
  filter: GenericFilterRequestSearchSchoolInputType;
};


export type QueriesTestArgs = {
  argument: GenericFilterRequestBooleanGraphType;
};


export type QueriesUpdateFundRaisingPostArgs = {
  fundRaisingPost: GenericMutationRequestCreateFundRaisingPostInputType;
};


export type QueriesUserLanguagesArgs = {
  filter: GenericFilterRequestLanguageInputType;
};

export type RefreshTokenRequestDto = {
  refreshToken: Scalars['String'];
};

export type RegisterModelDto = {
  firstName: Scalars['String'];
  fullName: Scalars['String'];
  lastName: Scalars['String'];
  userName: Scalars['String'];
};

export type Relationship = {
  __typename?: 'Relationship';
  audience?: Maybe<AudienceEnum>;
  personId?: Maybe<Scalars['Guid']>;
  relationshipStatus?: Maybe<RelationshipStatus>;
};

export type RelationshipInput = {
  audience?: InputMaybe<AudienceEnum>;
  relationshipStatusId?: InputMaybe<Scalars['Guid']>;
};

export type RelationshipItemInput = {
  id?: InputMaybe<Scalars['Guid']>;
};

export type RelationshipStatus = {
  __typename?: 'RelationshipStatus';
  id?: Maybe<Scalars['Guid']>;
  title?: Maybe<Scalars['String']>;
};

export type RelationshipStatusInput = {
  id?: InputMaybe<Scalars['Guid']>;
  title?: InputMaybe<Scalars['String']>;
};

export type ResendEmailCodeDto = {
  __typename?: 'ResendEmailCodeDto';
  email?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  verificationCode?: Maybe<Scalars['String']>;
};

export type ResendEmailCodeDtoInput = {
  email?: InputMaybe<Scalars['String']>;
};

export type ResendPhoneCodeDto = {
  __typename?: 'ResendPhoneCodeDto';
  id: Scalars['ID'];
  phoneNumber?: Maybe<Scalars['String']>;
  verificationCode?: Maybe<Scalars['String']>;
};

export type ResendPhoneCodeDtoInput = {
  phoneNumber?: InputMaybe<Scalars['String']>;
};

export type ResetPasswordRequestDto = {
  confirmationCode: Scalars['String'];
  password: Scalars['String'];
  userName: Scalars['String'];
};

export type ResetPasswordResponseDto = {
  __typename?: 'ResetPasswordResponseDto';
  userName: Scalars['String'];
};

export type ResponseExceptionStatus = {
  __typename?: 'ResponseExceptionStatus';
  exceptionType?: Maybe<ExceptionGraphType>;
  message?: Maybe<Scalars['String']>;
};

export type ResponseExistUser = {
  __typename?: 'ResponseExistUser';
  isExist: Scalars['Boolean'];
  message: Scalars['String'];
};

export type ResponseSignUp = {
  __typename?: 'ResponseSignUp';
  message: Scalars['String'];
  userName: Scalars['String'];
};

export enum RestrictionTypeEnum {
  Address = 'ADDRESS',
  Cities = 'CITIES',
  Establishment = 'ESTABLISHMENT',
  Geocode = 'GEOCODE',
  None = 'NONE',
  Regions = 'REGIONS'
}

export type School = {
  __typename?: 'School';
  id: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
};

export type SearchCities = {
  __typename?: 'SearchCities';
  country?: Maybe<Country>;
  countryId?: Maybe<Scalars['ID']>;
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  placeId?: Maybe<Scalars['String']>;
};

export type SearchCitiesInput = {
  countryId?: InputMaybe<Scalars['Guid']>;
  countryIso2?: InputMaybe<Scalars['String']>;
  countryIso3?: InputMaybe<Scalars['String']>;
  seearchValue?: InputMaybe<Scalars['String']>;
};

export type SearchCollegesInput = {
  alphaTwoCode?: InputMaybe<Scalars['String']>;
  country?: InputMaybe<Scalars['String']>;
  instituteType?: InputMaybe<InstituteTypeEnum>;
  name?: InputMaybe<Scalars['String']>;
};

export type SearchFollowerDtoInput = {
  id?: InputMaybe<Scalars['Guid']>;
  searchText?: InputMaybe<Scalars['String']>;
};

export type SearchSchoolsInput = {
  title?: InputMaybe<Scalars['String']>;
};

export type Skill = {
  __typename?: 'Skill';
  id: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
};

export type SkillEndorsementDtoGetInput = {
  personSkillId?: InputMaybe<Scalars['Guid']>;
};

export type SkillEndorsementDtoInput = {
  id?: InputMaybe<Scalars['Guid']>;
};

export type SkillInput = {
  id?: InputMaybe<Scalars['Guid']>;
  title?: InputMaybe<Scalars['String']>;
};

export type SocialMedia = {
  __typename?: 'SocialMedia';
  id: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
};

export type SocialMediaInput = {
  id?: InputMaybe<Scalars['Guid']>;
};

export type SocialPostReqDto = {
  id?: InputMaybe<Scalars['Guid']>;
};

export type SocialPostResDto = {
  __typename?: 'SocialPostResDto';
  audience?: Maybe<Audience>;
  body?: Maybe<Scalars['String']>;
  countOfComments?: Maybe<Scalars['String']>;
  countOfLikes?: Maybe<Scalars['String']>;
  countOfShared?: Maybe<Scalars['String']>;
  countOfViews?: Maybe<Scalars['String']>;
  createdDateTime?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  fullName?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  isDeleted?: Maybe<Scalars['Boolean']>;
  lastName?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
  mentionedUserIds?: Maybe<Array<Scalars['ID']>>;
  mentionedUsers?: Maybe<Array<Maybe<MentionedUserType>>>;
  ownerUserId: Scalars['ID'];
  pictureUrls?: Maybe<Array<Maybe<Scalars['String']>>>;
  status?: Maybe<PostStatus>;
  tagIds?: Maybe<Array<Scalars['ID']>>;
  userAvatarUrl?: Maybe<Scalars['String']>;
  userName?: Maybe<Scalars['String']>;
  videoUrls?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type StructuredFormatting = {
  __typename?: 'StructuredFormatting';
  mainText?: Maybe<Scalars['String']>;
  secondaryText?: Maybe<Scalars['String']>;
};

export type TagReqDto = {
  id?: InputMaybe<Scalars['Guid']>;
  pictureUrl?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type TagResDto = {
  __typename?: 'TagResDto';
  count: Scalars['Int'];
  id: Scalars['ID'];
  isMyFollow: Scalars['Boolean'];
  pictureUrl?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type TargetType = {
  amount?: InputMaybe<Scalars['Decimal']>;
  unit?: InputMaybe<UnitType>;
};

export enum UnitType {
  Dollar = 'DOLLAR',
  Euro = 'EURO',
  Pound = 'POUND'
}

export type UserDto = {
  __typename?: 'UserDto';
  contactInfoEmails?: Maybe<Array<Maybe<UserEmail>>>;
  contactInfoPhoneNumbers?: Maybe<Array<Maybe<UserPhoneNumber>>>;
  contactInfoSocialLinks?: Maybe<Array<Maybe<UserSocialMedia>>>;
  contactInfoWebSites?: Maybe<Array<Maybe<UserWebSite>>>;
  organizationUserDto?: Maybe<OrganizationUser>;
  personDto?: Maybe<Person>;
  userType?: Maybe<UserTypeEnum>;
};

export type UserEmail = {
  __typename?: 'UserEmail';
  audience?: Maybe<AudienceEnum>;
  email?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  status?: Maybe<VerificationStatusEnum>;
  userId: Scalars['ID'];
  verificationCode?: Maybe<Scalars['String']>;
};

export type UserEmailDeleteDto = {
  __typename?: 'UserEmailDeleteDto';
  id?: Maybe<Scalars['Guid']>;
};

export type UserEmailDeleteDtoInput = {
  id?: InputMaybe<Scalars['Guid']>;
  password?: InputMaybe<Scalars['String']>;
};

export type UserEmailGetAllInput = {
  id?: InputMaybe<Scalars['Guid']>;
  status?: InputMaybe<VerificationStatusEnum>;
};

export type UserEmailInput = {
  audience?: InputMaybe<AudienceEnum>;
  email?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Guid']>;
};

export type UserInput = {
  id?: InputMaybe<Scalars['ID']>;
};

export type UserPhoneNumber = {
  __typename?: 'UserPhoneNumber';
  audience?: Maybe<AudienceEnum>;
  id: Scalars['ID'];
  phoneNumber?: Maybe<Scalars['String']>;
  status?: Maybe<VerificationStatusEnum>;
  userId: Scalars['ID'];
  verificationCode?: Maybe<Scalars['String']>;
};

export type UserPhoneNumberDeleteDto = {
  __typename?: 'UserPhoneNumberDeleteDto';
  id?: Maybe<Scalars['Guid']>;
};

export type UserPhoneNumberDeleteDtoInput = {
  id?: InputMaybe<Scalars['Guid']>;
  password?: InputMaybe<Scalars['String']>;
};

export type UserPhoneNumberGetAllInput = {
  id?: InputMaybe<Scalars['Guid']>;
  status?: InputMaybe<VerificationStatusEnum>;
};

export type UserPhoneNumberInput = {
  audience?: InputMaybe<AudienceEnum>;
  id?: InputMaybe<Scalars['Guid']>;
  phoneNumber?: InputMaybe<Scalars['String']>;
};

export type UserReqDto = {
  id?: InputMaybe<Scalars['Guid']>;
  searchText?: InputMaybe<Scalars['String']>;
};

export type UserResDto = {
  __typename?: 'UserResDto';
  avatarUrl?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  fullName?: Maybe<Scalars['String']>;
  headLine?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  lastName?: Maybe<Scalars['String']>;
  userName?: Maybe<Scalars['String']>;
};

export type UserSocialMedia = {
  __typename?: 'UserSocialMedia';
  audience?: Maybe<AudienceEnum>;
  id: Scalars['ID'];
  socialMediaDto?: Maybe<SocialMedia>;
  userId?: Maybe<Scalars['Guid']>;
  userName?: Maybe<Scalars['String']>;
};

export type UserSocialMediaDeleteDto = {
  __typename?: 'UserSocialMediaDeleteDto';
  id?: Maybe<Scalars['Guid']>;
};

export type UserSocialMediaDeleteDtoInput = {
  id?: InputMaybe<Scalars['Guid']>;
};

export type UserSocialMediaGetAllInput = {
  id?: InputMaybe<Scalars['Guid']>;
};

export type UserSocialMediaInput = {
  audience?: InputMaybe<AudienceEnum>;
  id?: InputMaybe<Scalars['Guid']>;
  socialMediaId?: InputMaybe<Scalars['Guid']>;
  userName?: InputMaybe<Scalars['String']>;
};

export enum UserTypeEnum {
  Company = 'COMPANY',
  Ngo = 'NGO',
  Normal = 'NORMAL'
}

export type UserWebSite = {
  __typename?: 'UserWebSite';
  audience?: Maybe<AudienceEnum>;
  id: Scalars['ID'];
  userId: Scalars['ID'];
  webSiteUrl?: Maybe<Scalars['String']>;
};

export type UserWebSiteDeleteDto = {
  __typename?: 'UserWebSiteDeleteDto';
  id?: Maybe<Scalars['Guid']>;
};

export type UserWebSiteDeleteDtoInput = {
  id?: InputMaybe<Scalars['Guid']>;
};

export type UserWebSiteGetAllInput = {
  id?: InputMaybe<Scalars['Guid']>;
};

export type UserWebSiteInput = {
  audience?: InputMaybe<AudienceEnum>;
  id?: InputMaybe<Scalars['Guid']>;
  webSiteUrl?: InputMaybe<Scalars['String']>;
};

export enum VerificationStatusEnum {
  Confirmed = 'CONFIRMED',
  Pending = 'PENDING'
}

export type VerifyEmailRequestDto = {
  userName: Scalars['String'];
  verificationCode: Scalars['String'];
};

export type VerifyEmailResponseDto = {
  __typename?: 'VerifyEmailResponseDto';
  expiry: Scalars['DateTimeOffset'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  refreshToken: Scalars['String'];
  token: Scalars['String'];
};

export type VideoUrlInputType = {
  isDefault?: InputMaybe<Scalars['Boolean']>;
  url?: InputMaybe<Scalars['String']>;
};

export type City = {
  __typename?: 'city';
  countryId?: Maybe<Scalars['Guid']>;
  id?: Maybe<Scalars['Guid']>;
  name?: Maybe<Scalars['String']>;
  placeId?: Maybe<Scalars['String']>;
};
