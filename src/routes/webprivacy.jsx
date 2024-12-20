import styled from "styled-components";
import React from "react";

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  line-height: 1.6;
`;

const Title = styled.h1`
  font-size: 1.8rem;
  margin-bottom: 2rem;
  text-align: center;
`;

const Section = styled.section`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.4rem;
  margin: 1.5rem 0 1rem 0;
`;

const Paragraph = styled.p`
  margin-bottom: 1rem;
`;

const List = styled.ul`
  margin: 1rem 0;
  padding-left: 2rem;
`;

const WebPrivacy = () => {
  return (
    <>
      <Container>
        <Title>42SRR 개인 정보 처리 방침</Title>

        <Section>
          <Paragraph>
            42SRR(이하 '앱' 또는 '서비스')는 서비스 기획부터 종료까지
            개인정보보호법 등 국내의 개인정보 보호 법령을 철저히 준수합니다.
            <br />
            또한 OECD의 개인정보 보호 가이드라인 등 국제기준을 준수하여 서비스를
            제공합니다.
            <br />
            42SRR는 무료 앱 입니다. 본 서비스는 42GGS가 무료로 제공하며 있는
            그대로 사용하도록 되어 있습니다.
          </Paragraph>

          <SectionTitle>1. 개인정보처리방침의 의의</SectionTitle>
          <Paragraph>
            42SRR는 본 개인정보처리방침은 개인정보보호법 기준으로 작성하되, 앱
            내에서의 이용자 개인정보 처리 현황을 최대한 알기 쉽고 상세하게
            설명하기 위해 노력하였습니다.
            <br />
            이는 쉬운 용어를 사용한 개인정보처리방침 작성 원칙인{" "}
            <a
              href="https://centerforplainlanguage.org/learning-training/five-steps-plain-language/"
              target="_blank"
            >
              Language Privacy Policy(쉬운 용어를 사용한 개인정보처리방침)'
            </a>
            를 도입한 것입니다.
          </Paragraph>

          <Section>
            <SectionTitle>
              개인정보처리방침은 다음과 같은 중요한 의미를 가지고 있습니다.
            </SectionTitle>
            <Paragraph>
              1-1. 42SRR이 어떤 정보를 수집하고, 수집한 정보를 어떻게 사용하며,
              필요에 따라 누구와 이를 공유('위탁 또는 제공')하며, 이용목적을
              달성한 정보를 언제・어떻게 파기하는지 등 '개인정보의 한살이'와
              관련한 정보를 투명하게 제공합니다.
              <br />
              1-2. 정보주체로서 이용자는 자신의 개인정보에 대해 어떤 권리를
              가지고 있으며, 이를 어떤 방법과 절차로 행사할 수 있는지를
              알려드립니다. 또한, 법정대리인(부모 등)이 만14세 미만 아동의
              개인정보 보호를 위해 어떤 권리를 행사할 수 있는지도 함께
              안내합니다.
              <br />
              1-3. 개인정보 침해사고가 발생하는 경우, 추가적인 피해를 예방하고
              이미 발생한 피해를 복구하기 위해 누구에게 연락하여 어떤 도움을
              받을 수 있는지 알려드립니다.
              <br />
              1-4. 그 무엇보다도, 개인정보와 관련하여 B.Spot과 이용자간의 권리
              및 의무 관계를 규정하여 이용자의 '개인정보자기결정권'을 보장하는
              수단이 됩니다.
            </Paragraph>
          </Section>
        </Section>

        <Section>
          <SectionTitle>2. 수집하는 개인정보</SectionTitle>
          <Paragraph>
            이용자는 회원가입을 하지 않으면 42SRR의 어떠한 정보도 이용할 수
            없습니다.
            <br />
            이용자가 주변 공연정보, 아티스트 등록, 공연 등록 등과 같이 개인화
            혹은 회원제 서비스를 이용하기 위해 회원가입을 할 경우, 42SRR은
            서비스 이용을 위해 필요한 최소한의 개인정보를 수집합니다.
          </Paragraph>

          <SectionTitle>
            회원가입 시점에 42SRR이 이용자로부터 수집하는 개인정보는 아래와
            같습니다.
          </SectionTitle>
          <Paragraph>
            2-1. 42SRR은 42intra 데이터만을 수집합니다.
            <br />
            2-2. 42SRR은 17세 이상 사용가능한 앱으로 만 14세 미만의 아동의
            개인정보를 수집하지 않습니다.
          </Paragraph>

          <SectionTitle>
            서비스 이용 과정에서 이용자로부터 수집하는 개인정보는 아래와
            같습니다.
          </SectionTitle>
          <Paragraph>
            2-3. 회원정보 또는 개별 서비스에서 프로필 정보(별명, 프로필 사진)을
            설정할 수 있습니다.
            <br />
            2-4. 앱 내 지도 기능을 사용하기 위한 사용자 위치 정보를 수집합니다.
            <br />
            2-5. 42SRR은 차후 서비스 범위의 확장이전에 추가로 개인정보를
            수집하지 않습니다.
          </Paragraph>
          <SectionTitle>
            42SRR은 아래의 방법을 통해 개인정보를 수집합니다.
          </SectionTitle>
          <Paragraph>
            회원가입 및 서비스 이용 과정에서 이용자가 개인정보 수집에 대해
            동의를 하고 직접 정보를 입력하는 경우, 해당 개인정보를 수집합니다.
            기기정보와 같은 생성정보는 모바일 앱 이용 과정에서 자동으로 생성되어
            수집될 수 있습니다.
          </Paragraph>
        </Section>

        <Section>
          <SectionTitle>3. 수집한 개인정보의 이용</SectionTitle>
          <SectionTitle>
            42SRR 관련 제반 서비스(모바일 웹/앱 포함)의 회원관리, 서비스
            개발·제공 및 향상, 안전한 인터넷 이용환경 구축 등 아래의 목적으로만
            개인정보를 이용합니다.
          </SectionTitle>
          <Paragraph>
            3-1. 회원 가입 의사의 확인, 이용자 식별, 회원탈퇴 의사의 확인 등
            회원관리를 위하여 개인정보를 이용합니다.
            <br />
            3-2. 콘텐츠 등 기존 서비스 제공(광고 포함)에 더하여, 서비스 방문 및
            이용기록의 분석, 개인정보 및 관심에 기반한 이용자간 관계의 형성,
            지인 및 관심사 등에 기반한 맞춤형 서비스 제공 등 신규 서비스 요소의
            발굴 및 기존 서비스 개선 등을 위하여 개인정보를 이용합니다. 신규
            서비스 요소의 발굴 및 기존 서비스 개선 등에는 정보 검색, 다른
            이용자와의 커뮤니케이션, 콘텐츠 생성·제공·추천이 포함됩니다.
            <br />
            3-3. 법령 및 B.Spot 이용약관을 위반하는 회원에 대한 이용 제한 조치,
            부정 이용 행위를 포함하여 서비스의 원활한 운영에 지장을 주는 행위에
            대한 방지 및 제재, 계정도용 및 부정거래 방지, 약관 개정 등의
            고지사항 전달, 분쟁조정을 위한 기록 보존, 민원처리 등 이용자 보호 및
            서비스 운영을 위하여 개인정보를 이용합니다.
            <br />
            3-4. 서비스 이용기록과 접속 빈도 분석, 서비스 이용에 대한 통계,
            서비스 분석 및 통계에 따른 맞춤 서비스 제공 및 광고 게재 등에
            개인정보를 이용합니다.
            <br />
            3-5. 보안, 프라이버시, 안전 측면에서 이용자가 안심하고 이용할 수
            있는 서비스 이용환경 구축을 위해 개인정보를 이용합니다. 이 페이지는
            사용자가 앱 서비스를 사용하기로 결정한 경우 개인 정보 수집, 사용 및
            공개에 대한 정책을 알리는 데 사용됩니다.
          </Paragraph>
          <Paragraph>
            귀하가 앱 서비스를 사용하기로 선택한 경우 귀하는 본 정책과 관련된
            정보 수집 및 사용에 동의하는 것입니다. 수집한 개인정보는 서비스 제공
            및 개선을 위해 사용됩니다. 본 개인정보 보호정책에 설명된 경우를
            제외하고 누구와도 귀하의 정보를 사용하거나 공유하지 않습니다.
          </Paragraph>
          <Paragraph>
            본 개인정보 보호정책에 사용된 용어는 본 개인정보 보호정책에서 달리
            정의되지 않는 한 Street Dream에서 액세스할 수 있는 이용 약관과
            동일한 의미를 갖습니다.
          </Paragraph>
        </Section>

        <Section>
          <SectionTitle>정보 수집 및 사용</SectionTitle>
          <Paragraph>
            더 나은 경험을 위해 앱 서비스를 이용하는 동안 사용자 이름, 이메일,
            위치, 사용자 콘텐츠(이미지, 텍스트)를 포함하되 이에 국한되지 않는
            특정 개인 식별 정보를 제공하도록 요구할 수 있습니다. 요청한 정보는
            귀하의 장치에 보관되며 어떤 방식으로든 수집되지 않습니다.
          </Paragraph>
          <SectionTitle>기록 자료</SectionTitle>
          <Paragraph>
            귀하가 앱 서비스를 사용할 때마다 앱에 오류가 발생하는 경우 로그
            데이터라는 데이터와 정보를 귀하의 휴대전화에서 (제3자 제품을 통해)
            수집한다는 점을 알려드리고 싶습니다. 로그 데이터에는 귀하의 장치
            인터넷 프로토콜("IP") 주소, 장치 이름, 운영 체제 버전, 서비스 이용
            시 앱 구성, 서비스 사용 시간 및 날짜, 기타 통계 등의 정보가 포함될
            수 있습니다.
          </Paragraph>
          <SectionTitle>Cookies</SectionTitle>
          <Paragraph>
            쿠키는 일반적으로 익명의 고유 식별자로 사용되는 소량의 데이터가
            포함된 파일입니다. 이러한 정보는 귀하가 방문하는 웹사이트에서 귀하의
            브라우저로 전송되며 귀하 장치의 내부 메모리에 저장됩니다. 본
            서비스는 이러한 "쿠키"를 명시적으로 사용하지 않습니다.
            <br />
            그러나 앱은 정보를 수집하고 서비스를 개선하기 위해 "쿠키"를 사용하는
            타사 코드 및 라이브러리를 사용할 수 있습니다. 귀하는 이러한 쿠키를
            수락하거나 거부할 수 있으며 쿠키가 귀하의 장치로 전송되는 시기를 알
            수 있습니다. 귀하가 쿠키를 거부하기로 선택한 경우, 본 서비스의
            일부를 사용하지 못할 수도 있습니다.
          </Paragraph>
          <SectionTitle>서비스 제공자</SectionTitle>
          <Paragraph>
            다음과 같은 이유로 제3자 회사 및 개인을 고용할 수 있습니다.
            <li>앱 서비스를 용이하게 하기 위해</li>
            <li>현제 서비스 제공자를 대신하여 서비스를 제공하기 위해</li>
            <li>
              앱 서비스 관련 서비스를 수행하기 위해 또는 서비스가 어떻게
              사용되는지 분석하는 데 도움을 주기 위해
            </li>
            이 서비스 사용자에게 이러한 제3자가 개인정보에 접근할 수 있음을
            알리고 싶습니다. 그 이유는 우리를 대신하여 그들에게 할당된 임무를
            수행하기 위해서입니다. 그러나 해당 정보를 다른 목적으로 공개하거나
            사용해서는 안 됩니다.
          </Paragraph>
          <SectionTitle>보안</SectionTitle>
          <Paragraph>
            귀하의 개인정보 제공에 대한 귀하의 신뢰를 소중히 여기며, 따라서
            당사는 이를 보호하기 위해 상업적으로 허용되는 수단을 사용하기 위해
            노력하고 있습니다. 그러나 인터넷을 통한 전송 방법이나 전자 저장
            방법은 100% 안전하고 신뢰할 수 없으며 절대적인 보안을 보장할 수
            없다는 점을 기억하십시오.
          </Paragraph>
          <SectionTitle>다른 사이트에 대한 링크</SectionTitle>
          <Paragraph>
            본 서비스에는 다른 사이트에 대한 링크가 포함될 수 있습니다. 타사
            링크를 클릭하면 해당 사이트로 이동됩니다. 이러한 외부 사이트는 제가
            운영하는 것이 아닙니다. 따라서 이러한 웹사이트의 개인정보 보호정책을
            검토하시기 바랍니다. 나는 제3자 사이트나 서비스의 콘텐츠, 개인 정보
            보호 정책 또는 관행에 대해 통제권이 없으며 책임을 지지 않습니다.
          </Paragraph>
          <SectionTitle>아동의 개인정보 보호</SectionTitle>
          <Paragraph>
            앱은 고의로 어린이로부터 개인 식별 정보를 수집하지 않습니다. 모든
            어린이가 응용 프로그램 및/또는 서비스를 통해 개인 식별 정보를 절대
            제출하지 않을 것을 권장합니다. 부모와 법적 보호자가 자녀의 인터넷
            사용을 모니터링하고, 자녀가 허락 없이 애플리케이션 및/또는 서비스를
            통해 개인 식별 정보를 절대 제공하지 않도록 지시하여 이 정책을
            시행하는 데 도움을 줄 것을 권장합니다. 아동이 애플리케이션 및/또는
            서비스를 통해 당사에 개인 식별 정보를 제공했다고 믿을 만한 이유가
            있는 경우 당사에 문의하십시오. 또한 귀하의 국가에서 귀하의 개인 식별
            정보 처리에 동의하려면 16세 이상이어야 합니다(일부 국가에서는 귀하의
            부모 또는 보호자가 귀하를 대신하여 처리하도록 허용할 수 있습니다).
          </Paragraph>
          <SectionTitle>개인정보 보호정책의 변경</SectionTitle>
          <Paragraph>
            서비스 제공자는 수시로 당사의 개인정보 보호정책을 업데이트할 수
            있습니다. 따라서 이 페이지를 정기적으로 검토하여 변경 사항이 있는지
            확인하는 것이 좋습니다. 이 페이지에 새로운 개인정보 보호정책을
            게시하여 변경 사항을 알려드리겠습니다. 본 방침은 2023년 11월
            10일부터 시행됩니다.
          </Paragraph>
        </Section>

        <Section>
          <SectionTitle>문의하기</SectionTitle>
          <Paragraph>
            개인 정보 보호 정책에 대해 질문이나 제안 사항이 있으면 주저하지 말고
            neveradio@gmail.com으로 연락하십시오.
          </Paragraph>
          <Paragraph>
            이 개인정보 보호정책 페이지는 privacypolicytemplate.net 에 의해
            작성되어졌으며, 생성기에 의해 수정/생성 되었습니다.App Privacy
            Policy Generator
          </Paragraph>
        </Section>

        <Section>
          <Title>42SRR Privacy Policy</Title>
          <Paragraph>
            42SRR (hereinafter referred to as 'app' or 'service') strictly
            complies with domestic personal information protection laws,
            including the Personal Information Protection Act, from service
            planning to termination.
            <br />
            We also provide services in compliance with international standards
            such as the OECD Privacy Guidelines.
            <br />
            42SRR is a free app. This service is provided free of charge by
            42GGS and is intended to be used as is.
          </Paragraph>

          <SectionTitle>1. Purpose of Privacy Policy</SectionTitle>
          <Paragraph>
            42SRR's Privacy Policy is written based on the Personal Information
            Protection Act, and we have made efforts to explain the status of
            user's personal information processing within the app as clearly and
            in detail as possible.
            <br />
            This adopts the{" "}
            <a
              href="https://centerforplainlanguage.org/learning-training/five-steps-plain-language/"
              target="_blank"
            >
              'Language Privacy Policy'
            </a>
            , which is a principle of writing privacy policies using simple
            terms.
          </Paragraph>

          <Section>
            <SectionTitle>
              The Privacy Policy has the following important implications:
            </SectionTitle>
            <Paragraph>
              1-1. We transparently provide information about the 'lifecycle of
              personal information', including what information 42SRR collects,
              how we use the collected information, with whom we share it
              ('delegation or provision') as needed, and when and how we dispose
              of information once its purpose has been fulfilled.
              <br />
              1-2. We inform users, as data subjects, what rights they have
              regarding their personal information and how they can exercise
              these rights through specific methods and procedures.
              Additionally, we provide guidance on what rights legal
              representatives (such as parents) can exercise to protect the
              personal information of children under the age of 14.
              <br />
              1-3. In the event of a personal information breach, we inform you
              about whom to contact and what assistance you can receive to
              prevent additional damage and recover from damage that has already
              occurred.
              <br />
              1-4. Above all, this serves as a means to guarantee users' 'right
              to self-determination of personal information' by establishing the
              rights and obligations between 42SRR and users regarding personal
              information.
            </Paragraph>
          </Section>
        </Section>

        <Section>
          <SectionTitle>2. Collection of Personal Information</SectionTitle>
          <Paragraph>
            Users cannot access any information from 42SRR without signing up.
            <br />
            When users sign up to use personalized or membership services, 42SRR
            collects the minimum amount of personal information necessary for
            service use.
          </Paragraph>

          <SectionTitle>
            The following personal information is collected from users at the
            time of registration:
          </SectionTitle>
          <Paragraph>
            2-1. 42SRR only collects 42intra data.
            <br />
            2-2. 42SRR is an app available for users aged 17 and above, and does
            not collect personal information from children under the age of 14.
          </Paragraph>

          <SectionTitle>
            The following personal information is collected from users during
            service use:
          </SectionTitle>
          <Paragraph>
            2-3. Users can set profile information (nickname, profile picture)
            in member information or individual services.
            <br />
            2-4. We collect user location information for using the map feature
            within the app.
            <br />
            2-5. 42SRR will not collect additional personal information before
            expanding its service scope.
          </Paragraph>

          <SectionTitle>
            42SRR collects personal information through the following methods:
          </SectionTitle>
          <Paragraph>
            Personal information is collected when users consent to the
            collection and directly input their information during the sign-up
            and service use process. Generated information, such as device
            information, may be automatically collected during mobile app usage.
          </Paragraph>
        </Section>

        <Section>
          <SectionTitle>3. Use of Collected Personal Information</SectionTitle>
          <SectionTitle>
            Personal information is used only for the following purposes,
            including member management, service development, provision and
            improvement, and establishing a safe internet usage environment for
            all 42SRR-related services (including mobile web/app).
          </SectionTitle>
          <Paragraph>
            3-1. Personal information is used for member management, including
            verification of membership registration intent, user identification,
            and confirmation of membership withdrawal requests.
            <br />
            3-2. Personal information is used to provide existing services
            (including advertisements), analyze service visits and usage
            records, form relationships between users based on personal
            information and interests, and discover new service elements and
            improve existing services through personalized service provision
            based on acquaintances and interests. This includes information
            search, communication with other users, and content creation,
            provision, and recommendation.
            <br />
            3-3. Personal information is used to protect users and operate
            services, including implementing usage restrictions for members
            violating laws and 42SRR terms of service, preventing and
            sanctioning actions that interfere with smooth service operation
            including fraudulent usage, preventing account theft and fraudulent
            transactions, delivering notices such as terms revisions, preserving
            records for dispute resolution, and handling complaints.
            <br />
            3-4. Personal information is used for analyzing service usage
            records and access frequency, statistics on service usage, and
            providing customized services and advertisements based on service
            analysis and statistics.
            <br />
            3-5. Personal information is used to build a service environment
            where users can use services with confidence in terms of security,
            privacy, and safety. This page is used to inform users about
            policies regarding the collection, use, and disclosure of personal
            information when deciding to use the app service.
          </Paragraph>
          <Paragraph>
            By choosing to use our app service, you agree to the collection and
            use of information in relation to this policy. The personal
            information we collect is used for providing and improving the
            service. We will not use or share your information with anyone
            except as described in this Privacy Policy.
          </Paragraph>
          <Paragraph>
            The terms used in this Privacy Policy have the same meanings as in
            our Terms and Conditions, which are accessible at Street Dream,
            unless otherwise defined in this Privacy Policy.
          </Paragraph>
        </Section>

        <Section>
          <SectionTitle>Information Collection and Use</SectionTitle>
          <Paragraph>
            For a better experience while using our app service, we may require
            you to provide certain personally identifiable information,
            including but not limited to username, email, location, user content
            (images, text). The information that we request will be stored on
            your device and is not collected by us in any way.
          </Paragraph>

          <SectionTitle>Log Data</SectionTitle>
          <Paragraph>
            We want to inform you that whenever you use our app service, in case
            of an error in the app, we collect data and information (through
            third-party products) on your phone called Log Data. This Log Data
            may include information such as your device's Internet Protocol
            ("IP") address, device name, operating system version, the
            configuration of the app when utilizing our service, the time and
            date of your use of the service, and other statistics.
          </Paragraph>

          <SectionTitle>Cookies</SectionTitle>
          <Paragraph>
            Cookies are files with a small amount of data that are commonly used
            as anonymous unique identifiers. This information is sent to your
            browser from the websites you visit and is stored on your device's
            internal memory. This service does not explicitly use these
            "cookies".
            <br />
            However, the app may use third-party code and libraries that use
            "cookies" to collect information and improve their services. You
            have the option to either accept or refuse these cookies and know
            when a cookie is being sent to your device. If you choose to refuse
            our cookies, you may not be able to use some portions of this
            service.
          </Paragraph>

          <SectionTitle>Service Providers</SectionTitle>
          <Paragraph>
            We may employ third-party companies and individuals for the
            following reasons:
            <li>To facilitate our app service</li>
            <li>
              To provide the service on behalf of current service providers
            </li>
            <li>
              To perform service-related services or to help us analyze how our
              service is used
            </li>
            We want to inform users of this service that these third parties
            have access to their personal information. The reason is to perform
            the tasks assigned to them on our behalf. However, they are
            obligated not to disclose or use the information for any other
            purpose.
          </Paragraph>

          <SectionTitle>Security</SectionTitle>
          <Paragraph>
            We value your trust in providing us your personal information, thus
            we are striving to use commercially acceptable means of protecting
            it. But remember that no method of transmission over the internet,
            or method of electronic storage is 100% secure and reliable, and we
            cannot guarantee its absolute security.
          </Paragraph>

          <SectionTitle>Links to Other Sites</SectionTitle>
          <Paragraph>
            This service may contain links to other sites. If you click on a
            third-party link, you will be directed to that site. Note that these
            external sites are not operated by us. Therefore, we strongly advise
            you to review the Privacy Policy of these websites. We have no
            control over and assume no responsibility for the content, privacy
            policies, or practices of any third-party sites or services.
          </Paragraph>

          <SectionTitle>Children's Privacy</SectionTitle>
          <Paragraph>
            The app does not knowingly collect personally identifiable
            information from children. We encourage all children to never submit
            any personally identifiable information through the Application
            and/or Services. We encourage parents and legal guardians to monitor
            their children's Internet usage and to help enforce this Policy by
            instructing their children never to provide personally identifiable
            information through the Application and/or Services without their
            permission. If you have reason to believe that a child has provided
            personally identifiable information to us through the Application
            and/or Services, please contact us. You must also be at least 16
            years of age to consent to the processing of your personally
            identifiable information in your country (in some countries we may
            allow your parent or guardian to do so on your behalf).
          </Paragraph>

          <SectionTitle>Changes to This Privacy Policy</SectionTitle>
          <Paragraph>
            We may update our Privacy Policy from time to time. Thus, you are
            advised to review this page periodically for any changes. We will
            notify you of any changes by posting the new Privacy Policy on this
            page. This policy is effective as of November 10, 2023.
          </Paragraph>
        </Section>

        <Section>
          <SectionTitle>Contact Us</SectionTitle>
          <Paragraph>
            If you have any questions or suggestions about our Privacy Policy,
            do not hesitate to contact us at neveradio@gmail.com.
          </Paragraph>
          <Paragraph>
            This privacy policy page was created at privacypolicytemplate.net
            and modified/generated by App Privacy Policy Generator.
          </Paragraph>
        </Section>
      </Container>
    </>
  );
};

export default WebPrivacy;
