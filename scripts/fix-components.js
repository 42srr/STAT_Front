import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const srcDir = path.join(__dirname, "../src");

// 페이지별 Props 정의
const propsDefinitions = {
  "mainPage.tsx": `
interface MainPageProps {
  setAccessToken: React.Dispatch<React.SetStateAction<string>>;
  setRefreshToken: React.Dispatch<React.SetStateAction<string>>;
  accessToken: string;
  refreshToken: string;
  intraId: string;
}
`,
  "rankPage.tsx": `
interface RankPageProps {
  setAccessToken: React.Dispatch<React.SetStateAction<string>>;
  setRefreshToken: React.Dispatch<React.SetStateAction<string>>;
  accessToken: string;
  refreshToken: string;
}
`,
  "setPage.tsx": `
interface SetPageProps {
  accessToken: string;
  intraId: string;
}
`,
  "reservationPage.tsx": `
interface ReservationPageProps {
  accessToken: string;
  intraId: string;
}
`,
  "reservationDetail.tsx": `
interface ReservationDetailProps {
  accessToken: string;
  intraId: string;
}
`,
  "infoPage.tsx": `
interface InfoPageProps {
  accessToken: string;
  intraId: string;
}
`,
  "RollingImages.tsx": `
interface RollingImagesProps {
  stylenum: number;
  startIndex?: number;
}
`,
};

// 컴포넌트 수정 함수
function fixComponentFile(filePath) {
  console.log(`Processing file: ${filePath}`);
  const content = fs.readFileSync(filePath, "utf8");
  const fileName = path.basename(filePath);

  // Props 정의가 있는지 확인
  const hasPropsDefinition = propsDefinitions[fileName] !== undefined;

  let newContent = content;

  // 잘못된 React.FC<any> 선언 수정
  const badFunctionDefPattern =
    /function\s+([A-Za-z0-9_]+)\s*:\s*React\.FC<any>\s*\(/g;
  const badConstPattern =
    /const\s+([A-Za-z0-9_]+)\s*:\s*React\.FC<any>\s*=\s*\(/g;

  // 컴포넌트 이름 추출
  let componentName = "";
  const componentNameMatch =
    content.match(badFunctionDefPattern) ||
    content.match(badConstPattern) ||
    content.match(/function\s+([A-Za-z0-9_]+)/);

  if (componentNameMatch) {
    const namePart = componentNameMatch[0];
    const nameMatch = namePart.match(/([A-Za-z0-9_]+)/g);
    if (nameMatch && nameMatch.length > 1) {
      componentName = nameMatch[1];
    }
  } else {
    // 파일명에서 컴포넌트 이름 유추
    componentName = fileName.replace(/\.tsx$/, "");
    componentName =
      componentName.charAt(0).toUpperCase() + componentName.slice(1);
  }

  // Props 타입 정의 추가
  const propsType = hasPropsDefinition ? componentName + "Props" : "any";

  // 함수 선언 패턴 수정
  if (content.includes("export default function")) {
    // export default function Component 패턴
    newContent = newContent.replace(
      /export\s+default\s+function\s+([A-Za-z0-9_]+)(?:\s*:\s*React\.FC<any>)?\s*\(([^)]*)\)/g,
      (match, name, params) => {
        return `${hasPropsDefinition ? propsDefinitions[fileName] : ""}

const ${name}: React.FC<${propsType}> = (${params})`;
      }
    );

    // 함수 끝에 export default 추가
    if (!newContent.includes("export default " + componentName)) {
      newContent = newContent.replace(
        /}(\s*)$/,
        "}\n\nexport default " + componentName + ";$1"
      );
    }
  } else if (content.match(/const\s+[A-Za-z0-9_]+\s*:\s*React\.FC<any>/)) {
    // const Component: React.FC<any> 패턴
    newContent = newContent.replace(
      /const\s+([A-Za-z0-9_]+)\s*:\s*React\.FC<any>\s*=\s*\(([^)]*)\)/g,
      (match, name, params) => {
        return `${hasPropsDefinition ? propsDefinitions[fileName] : ""}

const ${name}: React.FC<${propsType}> = (${params})`;
      }
    );
  }

  // 수정된 내용이 있으면 파일 저장
  if (newContent !== content) {
    fs.writeFileSync(filePath, newContent);
    console.log(`Updated component in ${filePath}`);
    return true;
  }

  return false;
}

// 재귀적으로 디렉토리 순회하면서 .tsx 파일 찾기
function processDirectory(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      processDirectory(filePath);
    } else if (
      file.endsWith(".tsx") &&
      Object.keys(propsDefinitions).includes(file)
    ) {
      fixComponentFile(filePath);
    }
  }
}

// 수정 시작
console.log("Starting component fixes...");
processDirectory(srcDir);
console.log("Component fixes complete!");
