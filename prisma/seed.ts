import { PrismaClient, Language, Level } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Admin user
  const adminHash = await bcrypt.hash("Admin1234", 12);
  const admin = await prisma.user.upsert({
    where: { email: "admin@teachcode.dev" },
    update: {},
    create: {
      email: "admin@teachcode.dev",
      username: "admin",
      displayName: "Admin TeachCode",
      passwordHash: adminHash,
      role: "ADMIN",
      emailVerified: true,
    },
  });

  // Demo student
  const studentHash = await bcrypt.hash("Demo1234", 12);
  await prisma.user.upsert({
    where: { email: "student@demo.com" },
    update: {},
    create: {
      email: "student@demo.com",
      username: "demo_student",
      displayName: "Demo Student",
      passwordHash: studentHash,
      role: "STUDENT",
      emailVerified: true,
    },
  });

  // ---- COURSES ----
  const courses: { slug: string; title: string; description: string; language: Language; level: Level; order: number; isFeatured: boolean; isPublished: boolean; estimatedHours: number }[] = [
    {
      slug: "intro-programming",
      title: "Introduction to Programming",
      description: "เริ่มต้นเรียนรู้โปรแกรมมิ่งตั้งแต่ศูนย์ ทำความเข้าใจแนวคิดพื้นฐาน Algorithm และ Flowchart",
      language: "GENERAL",
      level: "BEGINNER",
      order: 1,
      isFeatured: true,
      isPublished: true,
      estimatedHours: 5,
    },
    {
      slug: "c-programming",
      title: "C Programming ตั้งแต่พื้นฐาน",
      description: "เรียนภาษา C จากศูนย์ ครอบคลุม Variables, Control Flow, Functions, Arrays, Pointers และ Memory Management",
      language: "C",
      level: "BEGINNER",
      order: 2,
      isFeatured: true,
      isPublished: true,
      estimatedHours: 20,
    },
    {
      slug: "cpp-programming",
      title: "C++ และ Object-Oriented Programming",
      description: "เรียนรู้ C++ และหลักการ OOP ครบถ้วน Classes, Inheritance, Polymorphism, Templates และ STL",
      language: "CPP",
      level: "INTERMEDIATE",
      order: 3,
      isFeatured: true,
      isPublished: true,
      estimatedHours: 25,
    },
    {
      slug: "python-programming",
      title: "Python Programming สำหรับทุกคน",
      description: "เรียน Python จากศูนย์ถึงระดับกลาง Data Structures, Functions, OOP, File I/O และ Popular Libraries",
      language: "PYTHON",
      level: "BEGINNER",
      order: 4,
      isFeatured: true,
      isPublished: true,
      estimatedHours: 18,
    },
    {
      slug: "javascript-fundamentals",
      title: "JavaScript Fundamentals",
      description: "ครอบคลุม JS ทุกด้าน Variables, Functions, DOM, Events, Async/Await, ES6+ และ Modern JavaScript",
      language: "JAVASCRIPT",
      level: "BEGINNER",
      order: 5,
      isFeatured: true,
      isPublished: true,
      estimatedHours: 22,
    },
    {
      slug: "java-programming",
      title: "Java Programming & OOP",
      description: "เรียน Java ตั้งแต่พื้นฐาน OOP, Collections, Generics, Exception Handling และ Multithreading",
      language: "JAVA",
      level: "BEGINNER",
      order: 6,
      isFeatured: false,
      isPublished: true,
      estimatedHours: 20,
    },
    {
      slug: "html-css-web-basics",
      title: "HTML & CSS — Web Development พื้นฐาน",
      description: "สร้างเว็บไซต์จากศูนย์ด้วย HTML5 และ CSS3 Flexbox, Grid, Responsive Design และ Modern CSS",
      language: "HTML_CSS",
      level: "BEGINNER",
      order: 7,
      isFeatured: true,
      isPublished: true,
      estimatedHours: 15,
    },
    {
      slug: "typescript-advanced-js",
      title: "TypeScript & Advanced JavaScript",
      description: "เรียน TypeScript อย่างละเอียด Types, Interfaces, Generics, Decorators และ Advanced JS Patterns",
      language: "TYPESCRIPT",
      level: "INTERMEDIATE",
      order: 8,
      isFeatured: false,
      isPublished: true,
      estimatedHours: 16,
    },
    {
      slug: "react-js",
      title: "React.js — Modern Frontend Development",
      description: "เรียน React ครบถ้วน Components, Hooks, State Management, React Router และ Best Practices",
      language: "REACT",
      level: "INTERMEDIATE",
      order: 9,
      isFeatured: true,
      isPublished: true,
      estimatedHours: 20,
    },
    {
      slug: "next-js",
      title: "Next.js Full Stack Development",
      description: "สร้างแอปพลิเคชัน Full Stack ด้วย Next.js App Router, Server Components, API Routes และ Deployment",
      language: "NEXTJS",
      level: "INTERMEDIATE",
      order: 10,
      isFeatured: true,
      isPublished: true,
      estimatedHours: 22,
    },
    {
      slug: "vue-js",
      title: "Vue.js — Progressive JavaScript Framework",
      description: "เรียน Vue.js ตั้งแต่ Basics ถึง Composition API, Pinia, Vue Router และ Nuxt.js",
      language: "VUE",
      level: "INTERMEDIATE",
      order: 11,
      isFeatured: false,
      isPublished: true,
      estimatedHours: 18,
    },
    {
      slug: "angular",
      title: "Angular — Enterprise Frontend Framework",
      description: "เรียน Angular ครบถ้วน Components, Services, RxJS, Angular Router, Forms และ Testing",
      language: "ANGULAR",
      level: "ADVANCED",
      order: 12,
      isFeatured: false,
      isPublished: true,
      estimatedHours: 24,
    },
    {
      slug: "nodejs-express",
      title: "Node.js & Express.js Backend Development",
      description: "สร้าง Backend ด้วย Node.js และ Express.js REST API, Middleware, Authentication และ Database",
      language: "EXPRESS",
      level: "INTERMEDIATE",
      order: 13,
      isFeatured: true,
      isPublished: true,
      estimatedHours: 20,
    },
    {
      slug: "sql-database",
      title: "SQL & Database Design",
      description: "เรียน SQL ตั้งแต่พื้นฐาน MySQL, Joins, Indexes, Transactions, Stored Procedures และ Database Design",
      language: "SQL",
      level: "BEGINNER",
      order: 14,
      isFeatured: false,
      isPublished: true,
      estimatedHours: 15,
    },
    {
      slug: "rest-api-design",
      title: "REST API Design & Best Practices",
      description: "ออกแบบและสร้าง REST API อย่างมืออาชีพ Authentication, Versioning, Documentation และ Security",
      language: "NODEJS",
      level: "INTERMEDIATE",
      order: 15,
      isFeatured: false,
      isPublished: true,
      estimatedHours: 12,
    },
    {
      slug: "flutter-mobile",
      title: "Flutter — Cross-Platform Mobile Development",
      description: "สร้างแอปมือถือ iOS/Android ด้วย Flutter และ Dart Widgets, State Management, Navigation และ APIs",
      language: "FLUTTER",
      level: "INTERMEDIATE",
      order: 16,
      isFeatured: true,
      isPublished: true,
      estimatedHours: 25,
    },
    {
      slug: "devops-deployment",
      title: "DevOps & Deployment",
      description: "เรียนรู้ Docker, CI/CD, GitHub Actions, Vercel, Railway และ Cloud Deployment อย่างครบถ้วน",
      language: "DEVOPS",
      level: "INTERMEDIATE",
      order: 17,
      isFeatured: false,
      isPublished: true,
      estimatedHours: 18,
    },
    {
      slug: "docker-mastery",
      title: "Docker Mastery: Basic to Advanced",
      description: "เรียนรู้ Docker ตั้งแต่พื้นฐาน Container, Image, Dockerfile, Docker Compose จนถึงระดับ Advanced อย่างละเอียด",
      language: "DEVOPS",
      level: "BEGINNER",
      order: 18,
      isFeatured: true,
      isPublished: true,
      estimatedHours: 20,
    },
    {
      slug: "kubernetes-mastery",
      title: "Kubernetes: Container Orchestration",
      description: "เรียนรู้ Kubernetes ตั้งแต่ Pods, Deployments, Services จนถึง Helm, RBAC และ Production Cluster",
      language: "DEVOPS",
      level: "INTERMEDIATE",
      order: 19,
      isFeatured: false,
      isPublished: true,
      estimatedHours: 25,
    },
    {
      slug: "network-fundamentals",
      title: "Computer Networking: Basic to Advanced",
      description: "เรียนรู้ระบบเครือข่ายคอมพิวเตอร์ตั้งแต่ OSI Model, TCP/IP, DNS, HTTP จนถึง Network Security และ VPN",
      language: "GENERAL",
      level: "BEGINNER",
      order: 20,
      isFeatured: false,
      isPublished: true,
      estimatedHours: 22,
    },
  ];

  for (const courseData of courses) {
    const course = await prisma.course.upsert({
      where: { slug: courseData.slug },
      update: { totalLessons: 0 },
      create: courseData,
    });
    console.log(`  ✅ Course: ${course.title}`);
  }

  // ---- SEED SECTIONS & LESSONS for C Programming (as full example) ----
  const cCourse = await prisma.course.findUnique({ where: { slug: "c-programming" } });
  if (cCourse) {
    await seedCCourse(cCourse.id);
  }

  const introCourse = await prisma.course.findUnique({ where: { slug: "intro-programming" } });
  if (introCourse) {
    await seedIntroCourse(introCourse.id);
  }

  const pythonCourse = await prisma.course.findUnique({ where: { slug: "python-programming" } });
  if (pythonCourse) {
    await seedPythonCourse(pythonCourse.id);
  }

  const jsCourse = await prisma.course.findUnique({ where: { slug: "javascript-fundamentals" } });
  if (jsCourse) {
    await seedJSCourse(jsCourse.id);
  }

  const reactCourse = await prisma.course.findUnique({ where: { slug: "react-js" } });
  if (reactCourse) {
    await seedReactCourse(reactCourse.id);
  }

  const htmlCssCourse = await prisma.course.findUnique({ where: { slug: "html-css-web-basics" } });
  if (htmlCssCourse) {
    await seedHTMLCSSMastery(htmlCssCourse.id);
  }

  const jsMasteryCourse = await prisma.course.findUnique({ where: { slug: "javascript-fundamentals" } });
  if (jsMasteryCourse) {
    await seedJSMastery(jsMasteryCourse.id);
  }

  const tsCourse = await prisma.course.findUnique({ where: { slug: "typescript-advanced-js" } });
  if (tsCourse) await seedTypeScriptCourse(tsCourse.id);

  const nextCourse = await prisma.course.findUnique({ where: { slug: "next-js" } });
  if (nextCourse) await seedNextJSCourse(nextCourse.id);

  const nodeCourse = await prisma.course.findUnique({ where: { slug: "nodejs-express" } });
  if (nodeCourse) await seedNodeJSCourse(nodeCourse.id);

  const sqlCourse = await prisma.course.findUnique({ where: { slug: "sql-database" } });
  if (sqlCourse) await seedSQLCourse(sqlCourse.id);

  const devopsCourse = await prisma.course.findUnique({ where: { slug: "devops-deployment" } });
  if (devopsCourse) await seedDevOpsCourse(devopsCourse.id);

  const cppCourse = await prisma.course.findUnique({ where: { slug: "cpp-programming" } });
  if (cppCourse) await seedCppCourse(cppCourse.id);

  const javaCourse = await prisma.course.findUnique({ where: { slug: "java-programming" } });
  if (javaCourse) await seedJavaCourse(javaCourse.id);

  const vueCourse = await prisma.course.findUnique({ where: { slug: "vue-js" } });
  if (vueCourse) await seedVueCourse(vueCourse.id);

  const angularCourse = await prisma.course.findUnique({ where: { slug: "angular" } });
  if (angularCourse) await seedAngularCourse(angularCourse.id);

  const restApiCourse = await prisma.course.findUnique({ where: { slug: "rest-api-design" } });
  if (restApiCourse) await seedRESTAPICourse(restApiCourse.id);

  const flutterCourse = await prisma.course.findUnique({ where: { slug: "flutter-mobile" } });
  if (flutterCourse) await seedFlutterCourse(flutterCourse.id);

  const dockerCourse = await prisma.course.findUnique({ where: { slug: "docker-mastery" } });
  if (dockerCourse) await seedDockerCourse(dockerCourse.id);

  const kubernetesCourse = await prisma.course.findUnique({ where: { slug: "kubernetes-mastery" } });
  if (kubernetesCourse) await seedKubernetesCourse(kubernetesCourse.id);

  const networkCourse = await prisma.course.findUnique({ where: { slug: "network-fundamentals" } });
  if (networkCourse) await seedNetworkCourse(networkCourse.id);

  // Quiz questions (real)
  await seedQuizzes();

  // Assignments
  await seedAssignments();

  // Achievements
  await prisma.achievement.upsert({
    where: { id: "first-lesson" },
    update: {},
    create: {
      id: "first-lesson",
      name: "เริ่มต้นแล้ว!",
      description: "เรียนบทเรียนแรกสำเร็จ",
      icon: "🌟",
      type: "LESSON_COMPLETE",
      condition: "lesson_count:1",
      points: 10,
    },
  });

  await prisma.achievement.upsert({
    where: { id: "first-quiz" },
    update: {},
    create: {
      id: "first-quiz",
      name: "ทดสอบแรก",
      description: "ทำ Quiz ครั้งแรกสำเร็จ",
      icon: "🎯",
      type: "QUIZ_PERFECT",
      condition: "quiz_count:1",
      points: 20,
    },
  });

  console.log("✅ Seed completed!");
}

async function seedIntroCourse(courseId: string) {
  const sections = [
    {
      title: "พื้นฐานโปรแกรมมิ่ง",
      description: "ทำความเข้าใจกับโปรแกรมมิ่งคืออะไร",
      order: 1,
      lessons: [
        {
          slug: "what-is-programming",
          title: "โปรแกรมมิ่งคืออะไร?",
          isFree: true,
          duration: 15,
          content: `# โปรแกรมมิ่งคืออะไร?

**โปรแกรมมิ่ง** (Programming) คือการเขียนชุดคำสั่งให้คอมพิวเตอร์ทำงานตามที่เราต้องการ

## คอมพิวเตอร์ทำงานอย่างไร?

คอมพิวเตอร์เป็นเครื่องจักรที่ฉลาดมากแต่ไม่มีความคิดเอง มันทำได้แค่สิ่งที่เราสั่ง ดังนั้น **โปรแกรมเมอร์** คือคนที่บอกคอมพิวเตอร์ว่าต้องทำอะไร

## ทำไมต้องเรียนโปรแกรมมิ่ง?

1. **สร้างซอฟต์แวร์** — แอป เกม เว็บไซต์
2. **แก้ปัญหาซับซ้อน** — ด้วยการคิดเป็นขั้นตอน
3. **อาชีพที่ดี** — ความต้องการนักพัฒนาสูงมาก
4. **สร้างสรรค์สิ่งใหม่** — เปลี่ยนความคิดเป็นความจริง

## ภาษาโปรแกรมมิ่งมีอะไรบ้าง?

| ภาษา | ใช้งาน |
|------|--------|
| **Python** | AI, Data Science, Backend |
| **JavaScript** | Web, Mobile, Backend |
| **C/C++** | ระบบ, เกม, Embedded |
| **Java** | Enterprise, Android |
| **Swift/Dart** | iOS, Mobile |

## Hello World แรก

ไม่ว่าภาษาไหน โปรแกรมแรกที่ทุกคนเขียนคือ **Hello World**

\`\`\`python
print("Hello, World!")
\`\`\`

\`\`\`javascript
console.log("Hello, World!");
\`\`\`

\`\`\`c
#include <stdio.h>
int main() {
    printf("Hello, World!\\n");
    return 0;
}
\`\`\`

> โปรแกรมมิ่งไม่ใช่เรื่องยาก — มันเป็นทักษะที่ฝึกได้ แค่เริ่มต้นและฝึกทุกวัน!`,
          codeExamples: [
            {
              title: "Hello World ในทุกภาษา",
              language: "python",
              code: `# Python
print("Hello, World!")
print("สวัสดีโลก!")

# แสดงตัวเลข
print(42)
print(3.14)`,
              explanation: "print() เป็นฟังก์ชันใน Python สำหรับแสดงข้อความ",
            },
          ],
          
        },
        {
          slug: "algorithms-and-flowcharts",
          title: "Algorithm และ Flowchart",
          isFree: true,
          duration: 20,
          content: `# Algorithm และ Flowchart

## Algorithm คืออะไร?

**Algorithm** คือลำดับขั้นตอนการทำงานที่ชัดเจนเพื่อแก้ปัญหาหนึ่งๆ

### คุณสมบัติของ Algorithm ที่ดี:
- **Input** — รับข้อมูลเข้า
- **Output** — ให้ผลลัพธ์
- **Definiteness** — ทุกขั้นตอนชัดเจน
- **Finiteness** — สิ้นสุดได้
- **Effectiveness** — ทำได้จริง

## ตัวอย่าง Algorithm: หาตัวเลขที่ใหญ่กว่า

\`\`\`
Algorithm FindMax(a, b):
1. รับค่า a และ b
2. ถ้า a > b
   3. แสดง "a คือตัวใหญ่กว่า"
4. มิฉะนั้น
   5. แสดง "b คือตัวใหญ่กว่า"
6. จบ
\`\`\`

## Flowchart คืออะไร?

**Flowchart** คือการแสดง Algorithm ด้วยรูปภาพสัญลักษณ์

### สัญลักษณ์พื้นฐาน:
- **วงรี** (Oval) = เริ่มต้น/สิ้นสุด
- **สี่เหลี่ยม** (Rectangle) = กระบวนการ
- **สี่เหลี่ยมขนมเปียกปูน** (Diamond) = การตัดสินใจ
- **ลูกศร** (Arrow) = ทิศทางการไหล

## Pseudocode

**Pseudocode** คือการเขียน Algorithm ในรูปแบบที่ใกล้เคียงภาษาอังกฤษ ก่อนเขียนโค้ดจริง

\`\`\`
BEGIN
  READ number
  IF number > 0 THEN
    PRINT "Positive"
  ELSE IF number < 0 THEN
    PRINT "Negative"
  ELSE
    PRINT "Zero"
  END IF
END
\`\`\`

## ตัวอย่าง: Algorithm หาค่า Factorial

\`\`\`
Algorithm Factorial(n):
1. ถ้า n = 0 หรือ n = 1 → คืนค่า 1
2. มิฉะนั้น → คืนค่า n × Factorial(n-1)
\`\`\`

Factorial(5) = 5 × 4 × 3 × 2 × 1 = **120**`,
          codeExamples: [
            {
              title: "Factorial Algorithm",
              language: "python",
              code: `def factorial(n):
    if n == 0 or n == 1:
        return 1
    return n * factorial(n - 1)

print(factorial(5))   # 120
print(factorial(10))  # 3628800`,
              explanation: "Factorial คือการคูณตัวเลขตั้งแต่ 1 ถึง n",
            },
          ],
        },
      ],
    },
    {
      title: "การคิดแบบโปรแกรมเมอร์",
      description: "Computational Thinking และการแก้ปัญหา",
      order: 2,
      lessons: [
        {
          slug: "computational-thinking",
          title: "Computational Thinking",
          isFree: false,
          duration: 20,
          content: `# Computational Thinking

**Computational Thinking** คือวิธีคิดแบบนักวิทยาศาสตร์คอมพิวเตอร์ในการแก้ปัญหา

## 4 องค์ประกอบหลัก

### 1. Decomposition (การแบ่งย่อย)
แบ่งปัญหาใหญ่เป็นปัญหาย่อยๆ ที่จัดการได้ง่ายขึ้น

**ตัวอย่าง:** สร้างเว็บไซต์ → แบ่งเป็น Header, Navigation, Content, Footer

### 2. Pattern Recognition (การรู้จำรูปแบบ)
หาความเหมือนกันระหว่างปัญหาต่างๆ

**ตัวอย่าง:** การเรียงลำดับรายการเหมือนกันไม่ว่าจะเป็น ตัวเลข, คำ หรือสิ่งของ

### 3. Abstraction (การนามธรรม)
เน้นสิ่งสำคัญ ละทิ้งรายละเอียดที่ไม่จำเป็น

**ตัวอย่าง:** แผนที่ไม่แสดงทุกต้นไม้ แต่แสดงถนนและสถานที่สำคัญ

### 4. Algorithm Design (การออกแบบขั้นตอน)
สร้างขั้นตอนการแก้ปัญหาที่ชัดเจน ทำซ้ำได้

## ฝึก Computational Thinking

**โจทย์:** จะทำ Toast (ขนมปังปิ้ง) อย่างไร?

\`\`\`
Decompose:
1. เตรียมวัตถุดิบ
2. ปิ้งขนมปัง
3. ทาเนย

Algorithm:
1. วางขนมปังในเครื่องปิ้ง
2. ตั้งเวลา 2 นาที
3. รอจนเครื่องดีดขนมปัง
4. ทาเนยขณะร้อน
5. เสิร์ฟ
\`\`\``,
          codeExamples: [
            {
              title: "ตัวอย่าง Decomposition",
              language: "python",
              code: `# แทนที่จะเขียนโค้ดใหญ่ๆ ก้อนเดียว
# แบ่งออกเป็น functions ย่อย

def get_user_input():
    return input("กรอกตัวเลข: ")

def validate_input(value):
    try:
        return int(value), True
    except ValueError:
        return 0, False

def process_number(n):
    return n * n  # หาค่ากำลังสอง

def display_result(result):
    print(f"ผลลัพธ์: {result}")

# Main program
raw = get_user_input()
num, valid = validate_input(raw)
if valid:
    result = process_number(num)
    display_result(result)
else:
    print("ข้อมูลไม่ถูกต้อง")`,
              explanation: "Decomposition ช่วยให้โค้ดอ่านง่ายและแก้ไขได้สะดวก",
            },
          ],
        },
        {
          slug: "problem-solving-techniques",
          title: "เทคนิคการแก้ปัญหาในโปรแกรมมิ่ง",
          isFree: false,
          duration: 25,
          content: `# เทคนิคการแก้ปัญหาในโปรแกรมมิ่ง

## กระบวนการแก้ปัญหา

\`\`\`
1. เข้าใจปัญหา
   → อ่านซ้ำหลายรอบ
   → ระบุ Input และ Output

2. วางแผน (Plan)
   → เขียน Pseudocode
   → วาด Flowchart

3. เขียนโค้ด (Code)
   → เริ่มจากส่วนง่ายก่อน
   → ทดสอบทีละส่วน

4. ทดสอบ (Test)
   → ทดสอบ Normal Case
   → ทดสอบ Edge Case

5. ปรับปรุง (Refine)
   → ทำให้โค้ดอ่านง่ายขึ้น
   → เพิ่มประสิทธิภาพ
\`\`\`

## วิธีคิดเมื่อติดปัญหา

### Rubber Duck Debugging
อธิบายโค้ดให้ตุ๊กตาเป็ดฟัง — เมื่ออธิบายออกมาดังๆ มักพบข้อผิดพลาด

### Divide and Conquer
แบ่งปัญหาเป็นส่วนย่อย แก้ทีละส่วน

### Trial and Error
ลองวิธีต่างๆ เรียนรู้จากความผิดพลาด

### Search for Patterns
ดูว่าปัญหานี้คล้ายกับอะไรที่เคยแก้แล้ว

## ตัวอย่าง: แก้โจทย์ FizzBuzz

**โจทย์:** พิมพ์ตัวเลข 1-100 แต่ถ้าหารด้วย 3 ลงตัว พิมพ์ "Fizz" ถ้าหารด้วย 5 ลงตัว พิมพ์ "Buzz" ถ้าทั้งสอง พิมพ์ "FizzBuzz"

\`\`\`python
for i in range(1, 101):
    if i % 15 == 0:
        print("FizzBuzz")
    elif i % 3 == 0:
        print("Fizz")
    elif i % 5 == 0:
        print("Buzz")
    else:
        print(i)
\`\`\``,
          codeExamples: [
            {
              title: "FizzBuzz",
              language: "python",
              code: `for i in range(1, 21):
    if i % 15 == 0:
        print("FizzBuzz")
    elif i % 3 == 0:
        print("Fizz")
    elif i % 5 == 0:
        print("Buzz")
    else:
        print(i)`,
              explanation: "FizzBuzz เป็นโจทย์สัมภาษณ์งานที่พบบ่อยมาก ฝึก Logic การแก้ปัญหา",
            },
          ],
        },
      ],
    },
  ];

  await prisma.section.deleteMany({ where: { courseId } });
  await prisma.course.update({ where: { id: courseId }, data: { totalLessons: 0 } });

  for (const sec of sections) {
    const section = await prisma.section.create({
      data: {
        courseId,
        title: sec.title,
        description: sec.description,
        order: sec.order,
      },
    });

    for (let li = 0; li < sec.lessons.length; li++) {
      const l = sec.lessons[li];
      const lesson = await prisma.lesson.create({
        data: {
          sectionId: section.id,
          slug: l.slug,
          title: l.title,
          content: l.content,
          isFree: l.isFree,
          duration: l.duration,
          order: li + 1,
          type: "TEXT",
          isPublished: true,
        },
      });

      if (l.codeExamples) {
        for (let ci = 0; ci < l.codeExamples.length; ci++) {
          const ex = l.codeExamples[ci];
          await prisma.codeExample.create({
            data: {
              lessonId: lesson.id,
              title: ex.title,
              code: ex.code,
              language: ex.language,
              explanation: ex.explanation,
              order: ci + 1,
            },
          });
        }
      }
    }
    await prisma.course.update({
      where: { id: courseId },
      data: { totalLessons: { increment: sec.lessons.length } },
    });
  }
  console.log("  ✅ Seeded: Introduction to Programming");
}

async function seedCCourse(courseId: string) {
  const sections = [
    {
      title: "เริ่มต้นกับ C",
      order: 1,
      lessons: [
        {
          slug: "c-intro-history",
          title: "ประวัติและภาพรวมของภาษา C",
          isFree: true,
          duration: 10,
          content: `# ภาษา C — รากฐานของโปรแกรมมิ่งสมัยใหม่

## ประวัติ

ภาษา **C** พัฒนาโดย **Dennis Ritchie** ที่ Bell Labs ระหว่างปี 1969-1973 เพื่อเขียนระบบปฏิบัติการ UNIX

## ทำไมต้องเรียน C?

- เป็น **รากฐาน** ของ C++, Java, C#, Python
- ใช้ในการพัฒนา **Operating System** (Linux, Windows kernel)
- **Embedded Systems** และ IoT
- เรียนรู้การจัดการ **Memory** โดยตรง
- **ประสิทธิภาพสูง** มาก

## โครงสร้างโปรแกรม C แรก

\`\`\`c
#include <stdio.h>    // Header file สำหรับ input/output

int main() {          // จุดเริ่มต้นของโปรแกรม
    printf("Hello, World!\\n");  // พิมพ์ข้อความ
    return 0;         // คืนค่า 0 = สำเร็จ
}
\`\`\`

## ขั้นตอนการทำงานของโปรแกรม C

\`\`\`
Source Code (.c)
    → Preprocessor (ประมวล #include, #define)
    → Compiler (แปลเป็น Object Code)
    → Linker (รวม Library)
    → Executable (ไฟล์รันได้)
\`\`\``,
          codeExamples: [
            {
              title: "Hello World ใน C",
              language: "c",
              code: `#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    printf("สวัสดีภาษา C!\\n");
    return 0;
}`,
              explanation: "#include <stdio.h> นำเข้า library สำหรับ printf และ scanf",
            },
          ],
        },
        {
          slug: "c-variables-datatypes",
          title: "Variables และ Data Types",
          isFree: true,
          duration: 25,
          content: `# Variables และ Data Types ใน C

## Data Types พื้นฐาน

| Type | ขนาด | ช่วงค่า | ตัวอย่าง |
|------|------|---------|---------|
| \`int\` | 4 bytes | -2,147,483,648 ถึง 2,147,483,647 | 42, -10 |
| \`float\` | 4 bytes | ±3.4e-38 ถึง ±3.4e+38 | 3.14f |
| \`double\` | 8 bytes | ±1.7e-308 ถึง ±1.7e+308 | 3.14159265 |
| \`char\` | 1 byte | -128 ถึง 127 | 'A', 'z' |
| \`long\` | 8 bytes | ใหญ่กว่า int | 1234567890L |

## การประกาศตัวแปร

\`\`\`c
// รูปแบบ: type variable_name = value;
int age = 20;
float price = 99.99f;
double pi = 3.14159265358979;
char grade = 'A';

// ประกาศหลายตัวพร้อมกัน
int x = 1, y = 2, z = 3;

// ประกาศก่อน กำหนดค่าทีหลัง
int score;
score = 100;
\`\`\`

## Format Specifiers

\`\`\`c
printf("%d", intVar);    // integer
printf("%f", floatVar);  // float/double
printf("%c", charVar);   // character
printf("%s", strVar);    // string
printf("%ld", longVar);  // long
\`\`\`

## Constants

\`\`\`c
#define MAX_SIZE 100    // Macro constant
const int DAYS = 7;     // Constant variable
\`\`\`

## Type Casting

\`\`\`c
int a = 5, b = 2;
float result = (float)a / b;  // = 2.5 ไม่ใช่ 2
\`\`\``,
          codeExamples: [
            {
              title: "ทดลองใช้ Data Types",
              language: "c",
              code: `#include <stdio.h>

int main() {
    int age = 20;
    float height = 175.5f;
    double weight = 65.123456789;
    char initial = 'T';

    printf("Age: %d\\n", age);
    printf("Height: %.1f cm\\n", height);
    printf("Weight: %.2f kg\\n", weight);
    printf("Initial: %c\\n", initial);

    // ขนาดของ data types
    printf("\\nขนาด int: %lu bytes\\n", sizeof(int));
    printf("ขนาด float: %lu bytes\\n", sizeof(float));
    printf("ขนาด double: %lu bytes\\n", sizeof(double));
    printf("ขนาด char: %lu bytes\\n", sizeof(char));

    return 0;
}`,
              explanation: "sizeof() ใช้ตรวจสอบขนาดของ data type ในหน่วย bytes",
            },
          ],
        },
        {
          slug: "c-operators",
          title: "Operators และนิพจน์",
          isFree: false,
          duration: 20,
          content: `# Operators ใน C

## Arithmetic Operators

\`\`\`c
int a = 10, b = 3;

printf("%d\\n", a + b);   // 13 - บวก
printf("%d\\n", a - b);   // 7  - ลบ
printf("%d\\n", a * b);   // 30 - คูณ
printf("%d\\n", a / b);   // 3  - หาร (ตัดทศนิยม)
printf("%d\\n", a % b);   // 1  - เศษ (Modulo)
\`\`\`

## Comparison Operators

\`\`\`c
printf("%d\\n", 5 == 5);   // 1 (true)
printf("%d\\n", 5 != 3);   // 1 (true)
printf("%d\\n", 5 > 3);    // 1 (true)
printf("%d\\n", 5 < 3);    // 0 (false)
printf("%d\\n", 5 >= 5);   // 1 (true)
printf("%d\\n", 5 <= 4);   // 0 (false)
\`\`\`

## Logical Operators

\`\`\`c
printf("%d\\n", 1 && 1);   // 1 - AND
printf("%d\\n", 1 || 0);   // 1 - OR
printf("%d\\n", !1);       // 0 - NOT
\`\`\`

## Increment / Decrement

\`\`\`c
int x = 5;
printf("%d\\n", x++);  // 5 (แสดงก่อน แล้วเพิ่ม)
printf("%d\\n", ++x);  // 7 (เพิ่มก่อน แล้วแสดง)
printf("%d\\n", x--);  // 7 (แสดงก่อน แล้วลด)
printf("%d\\n", --x);  // 5 (ลดก่อน แล้วแสดง)
\`\`\`

## Assignment Operators

\`\`\`c
int n = 10;
n += 5;   // n = n + 5 = 15
n -= 3;   // n = n - 3 = 12
n *= 2;   // n = n * 2 = 24
n /= 4;   // n = n / 4 = 6
n %= 4;   // n = n % 4 = 2
\`\`\``,
          codeExamples: [
            {
              title: "ทดลอง Operators",
              language: "c",
              code: `#include <stdio.h>

int main() {
    int a = 17, b = 5;

    printf("a = %d, b = %d\\n", a, b);
    printf("a + b = %d\\n", a + b);
    printf("a - b = %d\\n", a - b);
    printf("a * b = %d\\n", a * b);
    printf("a / b = %d\\n", a / b);    // Integer division
    printf("a %% b = %d\\n", a % b);   // Modulo

    // เช็คว่าเลขคู่หรือคี่
    if (a % 2 == 0)
        printf("%d เป็นเลขคู่\\n", a);
    else
        printf("%d เป็นเลขคี่\\n", a);

    return 0;
}`,
              explanation: "% (modulo) ใช้บ่อยมากในการเช็คเลขคู่/คี่ และการหมุนเวียน",
            },
          ],
        },
      ],
    },
    {
      title: "Control Flow",
      order: 2,
      lessons: [
        {
          slug: "c-if-else",
          title: "if-else Statement",
          isFree: false,
          duration: 20,
          content: `# if-else Statement ใน C

## รูปแบบพื้นฐาน

\`\`\`c
if (condition) {
    // ทำเมื่อ condition เป็น true
}

if (condition) {
    // ทำเมื่อ condition เป็น true
} else {
    // ทำเมื่อ condition เป็น false
}
\`\`\`

## if-else if-else

\`\`\`c
int score = 75;

if (score >= 80) {
    printf("A\\n");
} else if (score >= 70) {
    printf("B\\n");
} else if (score >= 60) {
    printf("C\\n");
} else if (score >= 50) {
    printf("D\\n");
} else {
    printf("F\\n");
}
// Output: B
\`\`\`

## Ternary Operator

\`\`\`c
// condition ? value_if_true : value_if_false
int age = 20;
char* status = (age >= 18) ? "ผู้ใหญ่" : "เด็ก";
printf("%s\\n", status);  // ผู้ใหญ่
\`\`\`

## Nested if

\`\`\`c
int age = 25;
int hasLicense = 1;

if (age >= 18) {
    if (hasLicense) {
        printf("ขับรถได้\\n");
    } else {
        printf("ต้องมีใบขับขี่\\n");
    }
} else {
    printf("อายุไม่ถึง\\n");
}
\`\`\``,
          codeExamples: [
            {
              title: "Grade Calculator",
              language: "c",
              code: `#include <stdio.h>

int main() {
    int score;
    printf("กรอกคะแนน (0-100): ");
    scanf("%d", &score);

    char grade;
    if (score >= 80) grade = 'A';
    else if (score >= 70) grade = 'B';
    else if (score >= 60) grade = 'C';
    else if (score >= 50) grade = 'D';
    else grade = 'F';

    printf("เกรด: %c\\n", grade);

    if (grade == 'F')
        printf("ต้องสอบซ่อม\\n");
    else
        printf("ผ่าน!\\n");

    return 0;
}`,
              explanation: "การใช้ if-else if สร้าง Grade Calculator อย่างง่าย",
            },
          ],
        },
        {
          slug: "c-loops",
          title: "Loops — for, while, do-while",
          isFree: false,
          duration: 30,
          content: `# Loops ใน C

## for Loop

\`\`\`c
// for (init; condition; update)
for (int i = 0; i < 5; i++) {
    printf("%d\\n", i);  // 0 1 2 3 4
}
\`\`\`

## while Loop

\`\`\`c
int i = 0;
while (i < 5) {
    printf("%d\\n", i);
    i++;
}
\`\`\`

## do-while Loop

\`\`\`c
// ทำอย่างน้อย 1 ครั้งเสมอ
int i = 0;
do {
    printf("%d\\n", i);
    i++;
} while (i < 5);
\`\`\`

## break และ continue

\`\`\`c
// break — หยุด loop ทันที
for (int i = 0; i < 10; i++) {
    if (i == 5) break;
    printf("%d ", i);  // 0 1 2 3 4
}

// continue — ข้ามรอบนี้
for (int i = 0; i < 10; i++) {
    if (i % 2 == 0) continue;
    printf("%d ", i);  // 1 3 5 7 9
}
\`\`\`

## Nested Loops

\`\`\`c
// สร้างตารางสูตรคูณ
for (int i = 1; i <= 5; i++) {
    for (int j = 1; j <= 5; j++) {
        printf("%3d", i * j);
    }
    printf("\\n");
}
\`\`\``,
          codeExamples: [
            {
              title: "สูตรคูณและ Pattern",
              language: "c",
              code: `#include <stdio.h>

int main() {
    // สูตรคูณแม่ 3
    printf("=== สูตรคูณแม่ 3 ===\\n");
    for (int i = 1; i <= 10; i++) {
        printf("3 x %2d = %2d\\n", i, 3 * i);
    }

    // ผลรวม 1 ถึง 100
    int sum = 0;
    for (int i = 1; i <= 100; i++) {
        sum += i;
    }
    printf("\\n1+2+...+100 = %d\\n", sum);

    // Triangle Pattern
    printf("\\nTriangle:\\n");
    for (int i = 1; i <= 5; i++) {
        for (int j = 0; j < i; j++) {
            printf("* ");
        }
        printf("\\n");
    }

    return 0;
}`,
              explanation: "ฝึกใช้ Nested loops สร้าง Pattern และคำนวณผลรวม",
            },
          ],
        },
        {
          slug: "c-switch",
          title: "switch Statement",
          isFree: false,
          duration: 15,
          content: `# switch Statement ใน C

**switch** ใช้เมื่อต้องการเปรียบเทียบตัวแปรกับหลายค่าคงที่

## รูปแบบ

\`\`\`c
switch (expression) {
    case value1:
        // code
        break;
    case value2:
        // code
        break;
    default:
        // code เมื่อไม่ตรงกับ case ไหนเลย
}
\`\`\`

## ตัวอย่าง: เมนู

\`\`\`c
int choice = 2;

switch (choice) {
    case 1:
        printf("เพิ่มข้อมูล\\n");
        break;
    case 2:
        printf("แสดงข้อมูล\\n");
        break;
    case 3:
        printf("ลบข้อมูล\\n");
        break;
    default:
        printf("ตัวเลือกไม่ถูกต้อง\\n");
}
\`\`\`

## Fall-through (ไม่มี break)

\`\`\`c
int day = 3;
switch (day) {
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
        printf("วันทำงาน\\n");
        break;
    case 6:
    case 7:
        printf("วันหยุด\\n");
        break;
}
\`\`\``,
          codeExamples: [
            {
              title: "Calculator ด้วย switch",
              language: "c",
              code: `#include <stdio.h>

int main() {
    double a, b, result;
    char op;

    printf("กรอก: num1 operator num2\\n");
    printf("ตัวอย่าง: 10 + 5\\n");
    scanf("%lf %c %lf", &a, &op, &b);

    switch (op) {
        case '+': result = a + b; break;
        case '-': result = a - b; break;
        case '*': result = a * b; break;
        case '/':
            if (b == 0) {
                printf("หารด้วยศูนย์ไม่ได้!\\n");
                return 1;
            }
            result = a / b;
            break;
        default:
            printf("Operator ไม่ถูกต้อง\\n");
            return 1;
    }

    printf("%.2lf %c %.2lf = %.2lf\\n", a, op, b, result);
    return 0;
}`,
              explanation: "เครื่องคิดเลขพื้นฐานโดยใช้ switch กับ operator",
            },
          ],
        },
      ],
    },
    {
      title: "Functions",
      order: 3,
      lessons: [
        {
          slug: "c-functions-basics",
          title: "Functions พื้นฐาน",
          isFree: false,
          duration: 30,
          content: `# Functions ใน C

**Function** คือกลุ่มโค้ดที่ทำงานเฉพาะอย่าง เรียกใช้ซ้ำได้

## การประกาศและนิยาม

\`\`\`c
// Declaration (prototype) - ประกาศก่อน main
int add(int a, int b);

// Definition - นิยามการทำงาน
int add(int a, int b) {
    return a + b;
}

int main() {
    int result = add(5, 3);  // เรียกใช้
    printf("%d\\n", result);  // 8
    return 0;
}
\`\`\`

## ประเภทของ Function

\`\`\`c
// 1. ไม่รับ ไม่คืน
void greet() {
    printf("Hello!\\n");
}

// 2. รับแต่ไม่คืน
void printSquare(int n) {
    printf("%d\\n", n * n);
}

// 3. ไม่รับแต่คืน
int getRandom() {
    return rand() % 100;
}

// 4. รับและคืน
double power(double base, int exp) {
    double result = 1.0;
    for (int i = 0; i < exp; i++) {
        result *= base;
    }
    return result;
}
\`\`\`

## Scope ของตัวแปร

\`\`\`c
int globalVar = 100;  // Global

void func() {
    int localVar = 50;  // Local — ใช้ได้แค่ใน func
    printf("%d\\n", globalVar);  // ใช้ global ได้
    printf("%d\\n", localVar);
}

int main() {
    func();
    // printf("%d\\n", localVar);  // ERROR!
    return 0;
}
\`\`\`

## Recursive Function

\`\`\`c
int factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}
// factorial(5) = 5*4*3*2*1 = 120
\`\`\``,
          codeExamples: [
            {
              title: "ฟังก์ชันคณิตศาสตร์",
              language: "c",
              code: `#include <stdio.h>

int gcd(int a, int b) {
    while (b != 0) {
        int temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

int lcm(int a, int b) {
    return (a / gcd(a, b)) * b;
}

int isPrime(int n) {
    if (n < 2) return 0;
    for (int i = 2; i * i <= n; i++) {
        if (n % i == 0) return 0;
    }
    return 1;
}

int main() {
    printf("GCD(12, 18) = %d\\n", gcd(12, 18));
    printf("LCM(4, 6) = %d\\n", lcm(4, 6));

    printf("\\nPrime numbers 1-30: ");
    for (int i = 2; i <= 30; i++) {
        if (isPrime(i)) printf("%d ", i);
    }
    printf("\\n");

    return 0;
}`,
              explanation: "GCD, LCM และ Prime Number เป็นตัวอย่างฟังก์ชันที่ใช้บ่อย",
            },
          ],
        },
      ],
    },
    {
      title: "Arrays และ Strings",
      order: 4,
      lessons: [
        {
          slug: "c-arrays",
          title: "Arrays (อาร์เรย์)",
          isFree: false,
          duration: 30,
          content: `# Arrays ใน C

**Array** คือตัวแปรที่เก็บข้อมูลหลายค่าของประเภทเดียวกัน

## การประกาศ Array

\`\`\`c
// รูปแบบ: type arrayName[size];
int scores[5];                         // ไม่กำหนดค่าเริ่มต้น
int nums[5] = {10, 20, 30, 40, 50};   // กำหนดค่า
int zeros[10] = {0};                   // ทุกช่องเป็น 0
int auto_size[] = {1, 2, 3};           // กำหนดขนาดอัตโนมัติ
\`\`\`

## การเข้าถึง Array

\`\`\`c
int arr[5] = {10, 20, 30, 40, 50};
//  Index:     0   1   2   3   4

arr[0] = 100;            // เปลี่ยนค่า
printf("%d\\n", arr[2]);  // 30
\`\`\`

## วนลูปกับ Array

\`\`\`c
int arr[] = {5, 2, 8, 1, 9, 3};
int size = sizeof(arr) / sizeof(arr[0]);

// หาค่าสูงสุด
int max = arr[0];
for (int i = 1; i < size; i++) {
    if (arr[i] > max) max = arr[i];
}
printf("Max = %d\\n", max);  // 9
\`\`\`

## 2D Array (ตาราง)

\`\`\`c
int matrix[3][3] = {
    {1, 2, 3},
    {4, 5, 6},
    {7, 8, 9}
};

// แสดงตาราง
for (int i = 0; i < 3; i++) {
    for (int j = 0; j < 3; j++) {
        printf("%d ", matrix[i][j]);
    }
    printf("\\n");
}
\`\`\``,
          codeExamples: [
            {
              title: "Array Operations",
              language: "c",
              code: `#include <stdio.h>

int main() {
    int arr[] = {64, 34, 25, 12, 22, 11, 90};
    int n = sizeof(arr) / sizeof(arr[0]);

    // หาค่าสูงสุด ต่ำสุด และผลรวม
    int max = arr[0], min = arr[0], sum = 0;
    for (int i = 0; i < n; i++) {
        if (arr[i] > max) max = arr[i];
        if (arr[i] < min) min = arr[i];
        sum += arr[i];
    }

    printf("Max = %d\\n", max);
    printf("Min = %d\\n", min);
    printf("Sum = %d\\n", sum);
    printf("Average = %.2f\\n", (double)sum / n);

    // Bubble Sort
    for (int i = 0; i < n-1; i++) {
        for (int j = 0; j < n-i-1; j++) {
            if (arr[j] > arr[j+1]) {
                int temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp;
            }
        }
    }

    printf("Sorted: ");
    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    printf("\\n");

    return 0;
}`,
              explanation: "Bubble Sort เป็น Algorithm การเรียงลำดับพื้นฐาน O(n²)",
            },
          ],
        },
        {
          slug: "c-strings",
          title: "Strings ในภาษา C",
          isFree: false,
          duration: 25,
          content: `# Strings ใน C

**String** ใน C คือ Array ของ \`char\` ที่จบด้วย \`'\\0'\` (null terminator)

## การประกาศ String

\`\`\`c
char str1[] = "Hello";        // {'H','e','l','l','o','\\0'}
char str2[10] = "World";      // กำหนดขนาด 10
char str3[10];                // ว่าง
\`\`\`

## String Functions (string.h)

\`\`\`c
#include <string.h>

strlen(str)          // ความยาว string
strcpy(dest, src)    // คัดลอก string
strcat(dest, src)    // ต่อ string
strcmp(s1, s2)       // เปรียบเทียบ (0=เท่ากัน)
strstr(str, sub)     // หา substring
\`\`\`

## ตัวอย่างการใช้งาน

\`\`\`c
char name[20];
strcpy(name, "Alice");
printf("Name: %s\\n", name);
printf("Length: %lu\\n", strlen(name));

char greeting[50] = "Hello, ";
strcat(greeting, name);
printf("%s!\\n", greeting);  // Hello, Alice!
\`\`\`

## อ่านและแสดง String

\`\`\`c
char line[100];
fgets(line, sizeof(line), stdin);  // อ่านทั้งบรรทัด
printf("%s", line);
\`\`\``,
          codeExamples: [
            {
              title: "String Manipulation",
              language: "c",
              code: `#include <stdio.h>
#include <string.h>
#include <ctype.h>

int main() {
    char str[] = "Hello, World!";

    printf("Original: %s\\n", str);
    printf("Length: %lu\\n", strlen(str));

    // แปลงเป็น uppercase
    char upper[50];
    strcpy(upper, str);
    for (int i = 0; upper[i]; i++) {
        upper[i] = toupper(upper[i]);
    }
    printf("Upper: %s\\n", upper);

    // นับตัวอักษร
    int letters = 0, spaces = 0;
    for (int i = 0; str[i]; i++) {
        if (isalpha(str[i])) letters++;
        if (str[i] == ' ') spaces++;
    }
    printf("Letters: %d, Spaces: %d\\n", letters, spaces);

    // กลับด้าน string
    int len = strlen(str);
    char reversed[50];
    for (int i = 0; i < len; i++) {
        reversed[i] = str[len - 1 - i];
    }
    reversed[len] = '\\0';
    printf("Reversed: %s\\n", reversed);

    return 0;
}`,
              explanation: "string.h และ ctype.h มีฟังก์ชันช่วยจัดการ string มากมาย",
            },
          ],
        },
      ],
    },
    {
      title: "Pointers และ Memory",
      order: 5,
      lessons: [
        {
          slug: "c-pointers",
          title: "Pointers — หัวใจของภาษา C",
          isFree: false,
          duration: 35,
          content: `# Pointers ใน C

**Pointer** คือตัวแปรที่เก็บ **ที่อยู่หน่วยความจำ** ของตัวแปรอื่น

## พื้นฐาน Pointer

\`\`\`c
int x = 10;
int *ptr = &x;    // ptr เก็บที่อยู่ของ x

printf("x = %d\\n", x);        // 10
printf("&x = %p\\n", &x);      // ที่อยู่ของ x
printf("ptr = %p\\n", ptr);    // ที่อยู่เดียวกับ &x
printf("*ptr = %d\\n", *ptr);  // 10 (dereference)
\`\`\`

## การใช้ Pointer กับ Function

\`\`\`c
// ส่ง pointer เพื่อเปลี่ยนค่าตัวแปรภายนอก
void increment(int *n) {
    (*n)++;  // เพิ่มค่าที่ pointer ชี้
}

int main() {
    int val = 5;
    increment(&val);
    printf("%d\\n", val);  // 6
    return 0;
}
\`\`\`

## Pointer กับ Array

\`\`\`c
int arr[] = {10, 20, 30, 40, 50};
int *p = arr;  // pointer ชี้ที่ arr[0]

printf("%d\\n", *p);      // 10
printf("%d\\n", *(p+1));  // 20
printf("%d\\n", *(p+2));  // 30

p++;  // เลื่อน pointer ไปข้างหน้า
printf("%d\\n", *p);  // 20
\`\`\`

## Dynamic Memory Allocation

\`\`\`c
#include <stdlib.h>

// จอง memory
int *arr = (int*)malloc(5 * sizeof(int));
if (arr == NULL) { /* การจองล้มเหลว */ }

// ใช้งาน
for (int i = 0; i < 5; i++) {
    arr[i] = i * 10;
}

// คืน memory — สำคัญมาก!
free(arr);
\`\`\``,
          codeExamples: [
            {
              title: "Pointer Fundamentals",
              language: "c",
              code: `#include <stdio.h>
#include <stdlib.h>

void swap(int *a, int *b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

int main() {
    int x = 100, y = 200;
    printf("Before: x=%d, y=%d\\n", x, y);

    swap(&x, &y);
    printf("After:  x=%d, y=%d\\n", x, y);

    // Dynamic array
    int n = 5;
    int *dynamic = (int*)malloc(n * sizeof(int));

    for (int i = 0; i < n; i++) {
        dynamic[i] = (i + 1) * 10;
    }

    printf("Dynamic array: ");
    for (int i = 0; i < n; i++) {
        printf("%d ", dynamic[i]);
    }
    printf("\\n");

    free(dynamic);
    return 0;
}`,
              explanation: "swap ด้วย pointer คือการใช้ pointer กับ function ที่พบบ่อยที่สุด",
            },
          ],
        },
      ],
    },
    {
      title: "Structures และ File I/O",
      order: 6,
      lessons: [
        {
          slug: "c-structs",
          title: "Structures (struct)",
          isFree: false,
          duration: 25,
          content: `# Structures ใน C

**struct** ช่วยให้เราสร้าง data type ที่มีหลาย field รวมกัน

## การประกาศ struct

\`\`\`c
struct Student {
    char name[50];
    int age;
    float gpa;
};

// typedef ทำให้ใช้งานง่ายขึ้น
typedef struct {
    char name[50];
    int age;
    float gpa;
} Student;
\`\`\`

## การใช้งาน

\`\`\`c
Student s1;
strcpy(s1.name, "Alice");
s1.age = 20;
s1.gpa = 3.75;

// หรือ
Student s2 = {"Bob", 21, 3.50};

printf("%s - %d - %.2f\\n", s1.name, s1.age, s1.gpa);
\`\`\`

## Array of Structs

\`\`\`c
Student class[3] = {
    {"Alice", 20, 3.75},
    {"Bob", 21, 3.50},
    {"Carol", 19, 3.90}
};

for (int i = 0; i < 3; i++) {
    printf("%s: %.2f\\n", class[i].name, class[i].gpa);
}
\`\`\`

## Pointer กับ Struct

\`\`\`c
Student *ptr = &s1;
printf("%s\\n", ptr->name);  // ใช้ -> แทน .
ptr->age = 22;
\`\`\``,
          codeExamples: [
            {
              title: "Student Database",
              language: "c",
              code: `#include <stdio.h>
#include <string.h>

typedef struct {
    int id;
    char name[50];
    float gpa;
} Student;

void printStudent(Student s) {
    printf("[%d] %s - GPA: %.2f\\n", s.id, s.name, s.gpa);
}

Student findTopStudent(Student arr[], int n) {
    Student top = arr[0];
    for (int i = 1; i < n; i++) {
        if (arr[i].gpa > top.gpa) top = arr[i];
    }
    return top;
}

int main() {
    Student students[4] = {
        {1, "สมชาย", 3.50},
        {2, "สมหญิง", 3.75},
        {3, "สมศรี", 3.90},
        {4, "สมศักดิ์", 3.20}
    };

    printf("=== รายชื่อนักศึกษา ===\\n");
    for (int i = 0; i < 4; i++) {
        printStudent(students[i]);
    }

    Student top = findTopStudent(students, 4);
    printf("\\nGPA สูงสุด: ");
    printStudent(top);

    return 0;
}`,
              explanation: "struct เหมาะสำหรับเก็บข้อมูลที่เกี่ยวข้องกันในรูปแบบ record",
            },
          ],
        },
        {
          slug: "c-file-io",
          title: "File I/O — อ่านและเขียนไฟล์",
          isFree: false,
          duration: 25,
          content: `# File I/O ใน C

ใช้ \`stdio.h\` สำหรับการอ่านเขียนไฟล์

## เปิดและปิดไฟล์

\`\`\`c
FILE *fp;

// เปิดไฟล์
fp = fopen("data.txt", "w");  // write
fp = fopen("data.txt", "r");  // read
fp = fopen("data.txt", "a");  // append

// ปิดไฟล์
fclose(fp);
\`\`\`

## เขียนไฟล์

\`\`\`c
FILE *fp = fopen("output.txt", "w");
if (fp == NULL) {
    printf("ไม่สามารถเปิดไฟล์ได้\\n");
    return 1;
}

fprintf(fp, "Hello, File!\\n");
fprintf(fp, "Number: %d\\n", 42);

fclose(fp);
\`\`\`

## อ่านไฟล์

\`\`\`c
FILE *fp = fopen("input.txt", "r");
char line[100];

while (fgets(line, sizeof(line), fp)) {
    printf("%s", line);
}

fclose(fp);
\`\`\`

## เขียน/อ่าน Binary

\`\`\`c
// เขียน struct ลงไฟล์
FILE *fp = fopen("students.bin", "wb");
fwrite(&student, sizeof(Student), 1, fp);
fclose(fp);

// อ่าน struct จากไฟล์
Student s;
FILE *fp2 = fopen("students.bin", "rb");
fread(&s, sizeof(Student), 1, fp2);
fclose(fp2);
\`\`\``,
          codeExamples: [
            {
              title: "บันทึกและอ่านข้อมูล",
              language: "c",
              code: `#include <stdio.h>
#include <string.h>

typedef struct {
    char name[30];
    int score;
} Record;

int main() {
    // เขียนไฟล์
    FILE *fp = fopen("scores.txt", "w");
    if (!fp) { printf("Error!\\n"); return 1; }

    Record records[] = {
        {"Alice", 95},
        {"Bob", 87},
        {"Carol", 92}
    };

    for (int i = 0; i < 3; i++) {
        fprintf(fp, "%s %d\\n", records[i].name, records[i].score);
    }
    fclose(fp);
    printf("บันทึกข้อมูลแล้ว\\n");

    // อ่านไฟล์กลับ
    FILE *fp2 = fopen("scores.txt", "r");
    char name[30];
    int score;

    printf("\\nอ่านจากไฟล์:\\n");
    while (fscanf(fp2, "%s %d", name, &score) == 2) {
        printf("%s: %d\\n", name, score);
    }
    fclose(fp2);

    return 0;
}`,
              explanation: "ฝึกเขียนและอ่านไฟล์ text ด้วย fprintf และ fscanf",
            },
          ],
        },
      ],
    },
  ];

  // Idempotent: clear existing sections (cascades to lessons/quizzes)
  await prisma.section.deleteMany({ where: { courseId } });
  await prisma.course.update({ where: { id: courseId }, data: { totalLessons: 0 } });

  for (const sec of sections) {
    const section = await prisma.section.create({
      data: { courseId, title: sec.title, order: sec.order },
    });

    for (let li = 0; li < sec.lessons.length; li++) {
      const l = sec.lessons[li];
      const lesson = await prisma.lesson.create({
        data: {
          sectionId: section.id, slug: l.slug, title: l.title,
          content: l.content, isFree: l.isFree, duration: l.duration,
          order: li + 1, type: "TEXT", isPublished: true,
        },
      });
      for (let ci = 0; ci < l.codeExamples.length; ci++) {
        const ex = l.codeExamples[ci];
        await prisma.codeExample.create({
          data: { lessonId: lesson.id, title: ex.title, code: ex.code, language: ex.language, explanation: ex.explanation, order: ci + 1 },
        });
      }
    }

    await prisma.course.update({
      where: { id: courseId },
      data: { totalLessons: { increment: sec.lessons.length } },
    });
  }
  console.log("  ✅ Seeded: C Programming");
}

async function seedPythonCourse(courseId: string) {
  const pythonSections = [
    { title: "Python Basics", order: 1, lessons: [
      { slug: "python-intro", title: "แนะนำ Python", isFree: true, duration: 15, content: `# Python Programming\n\nPython สร้างโดย **Guido van Rossum** ปี 1991 ใช้งานง่าย อ่านได้ชัดเจน\n\n## ทำไม Python?\n- Syntax เรียบง่าย คล้ายภาษาอังกฤษ\n- Library มากมาย (AI, Data Science, Web)\n- Community ใหญ่\n- ทำงานได้ทุก Platform\n\n## Hello World\n\n\`\`\`python\nprint("Hello, World!")\n\`\`\`\n\n## Variables\n\`\`\`python\nname = "Alice"   # ไม่ต้องประกาศ type\nage = 25\nheight = 165.5\nis_student = True\n\nprint(f"ชื่อ: {name}, อายุ: {age}")\n\`\`\``, codeExamples: [{ title: "Python Basics", language: "python", code: `# ตัวแปรใน Python\nname = "สมชาย"\nage = 25\ngpa = 3.75\n\nprint(f"ชื่อ: {name}")\nprint(f"อายุ: {age} ปี")\nprint(f"เกรด: {gpa}")\n\n# ตรวจสอบประเภท\nprint(type(name))   # <class 'str'>\nprint(type(age))    # <class 'int'>\nprint(type(gpa))    # <class 'float'>`, explanation: "Python ไม่ต้องประกาศ type ของตัวแปร" }] },
      { slug: "python-data-structures", title: "Lists, Tuples, Dicts, Sets", isFree: true, duration: 30, content: `# Data Structures ใน Python\n\n## List\n\`\`\`python\nfruits = ["apple", "banana", "orange"]\nfruits.append("mango")  # เพิ่ม\nfruits.remove("banana") # ลบ\nprint(fruits[0])         # apple\nprint(len(fruits))       # 3\n\`\`\`\n\n## Tuple (ไม่เปลี่ยนได้)\n\`\`\`python\ncoords = (10.5, 20.3)\nx, y = coords  # Unpacking\n\`\`\`\n\n## Dictionary\n\`\`\`python\nperson = {"name": "Alice", "age": 25, "city": "Bangkok"}\nperson["email"] = "alice@email.com"\nprint(person["name"])  # Alice\nprint(person.keys())\nprint(person.values())\n\`\`\`\n\n## Set\n\`\`\`python\nunique = {1, 2, 3, 2, 1}  # {1, 2, 3}\na = {1, 2, 3}\nb = {2, 3, 4}\nprint(a | b)  # Union: {1, 2, 3, 4}\nprint(a & b)  # Intersection: {2, 3}\n\`\`\``, codeExamples: [{ title: "List Operations", language: "python", code: `# List comprehension\nnumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]\nevens = [n for n in numbers if n % 2 == 0]\nsquares = [n**2 for n in numbers]\n\nprint("Evens:", evens)\nprint("Squares:", squares)\n\n# Dictionary comprehension\nword_len = {word: len(word) for word in ["python", "java", "c++"]}\nprint(word_len)`, explanation: "List/Dict comprehension เป็น feature เด่นของ Python" }] },
      { slug: "python-functions", title: "Functions และ Lambda", isFree: false, duration: 25, content: `# Functions ใน Python\n\n## การสร้าง Function\n\`\`\`python\ndef greet(name, greeting="Hello"):\n    return f"{greeting}, {name}!"\n\nprint(greet("Alice"))           # Hello, Alice!\nprint(greet("Bob", "สวัสดี")) # สวัสดี, Bob!\n\`\`\`\n\n## *args และ **kwargs\n\`\`\`python\ndef sum_all(*nums):\n    return sum(nums)\n\ndef display(**info):\n    for k, v in info.items():\n        print(f"{k}: {v}")\n\nprint(sum_all(1, 2, 3, 4, 5))  # 15\ndisplay(name="Alice", age=25)\n\`\`\`\n\n## Lambda Function\n\`\`\`python\nsquare = lambda x: x ** 2\ndouble = lambda x: x * 2\n\nprint(square(5))  # 25\n\nnums = [3, 1, 4, 1, 5, 9, 2, 6]\nnums.sort(key=lambda x: -x)  # เรียงมากไปน้อย\nprint(nums)\n\`\`\``, codeExamples: [{ title: "Decorators", language: "python", code: `import time\n\ndef timer(func):\n    def wrapper(*args, **kwargs):\n        start = time.time()\n        result = func(*args, **kwargs)\n        end = time.time()\n        print(f"{func.__name__} ใช้เวลา {end-start:.4f}s")\n        return result\n    return wrapper\n\n@timer\ndef slow_sum(n):\n    return sum(range(n))\n\nresult = slow_sum(1000000)\nprint(f"ผลลัพธ์: {result}")`, explanation: "Decorator เป็น Higher-order function ที่ใช้บ่อยใน Python" }] },
    ]},
    { title: "OOP in Python", order: 2, lessons: [
      { slug: "python-oop-classes", title: "Classes และ Objects", isFree: false, duration: 30, content: `# OOP ใน Python\n\n## Class พื้นฐาน\n\`\`\`python\nclass Animal:\n    species = "Unknown"  # Class attribute\n    \n    def __init__(self, name, sound):\n        self.name = name      # Instance attribute\n        self.sound = sound\n    \n    def speak(self):\n        return f"{self.name} พูดว่า {self.sound}!"\n    \n    def __str__(self):\n        return f"Animal({self.name})"\n\ndog = Animal("Rex", "Woof")\ncat = Animal("Whiskers", "Meow")\nprint(dog.speak())\nprint(cat)\n\`\`\`\n\n## Inheritance\n\`\`\`python\nclass Dog(Animal):\n    def __init__(self, name, breed):\n        super().__init__(name, "Woof")\n        self.breed = breed\n    \n    def fetch(self, item):\n        return f"{self.name} fetches the {item}!"\n\nrex = Dog("Rex", "Labrador")\nprint(rex.speak())         # Rex พูดว่า Woof!\nprint(rex.fetch("ball"))\n\`\`\``, codeExamples: [{ title: "BankAccount Class", language: "python", code: `class BankAccount:\n    def __init__(self, owner, balance=0):\n        self.owner = owner\n        self.__balance = balance  # Private\n    \n    def deposit(self, amount):\n        if amount > 0:\n            self.__balance += amount\n            return f"ฝาก {amount}. ยอด: {self.__balance}"\n        return "จำนวนไม่ถูกต้อง"\n    \n    def withdraw(self, amount):\n        if 0 < amount <= self.__balance:\n            self.__balance -= amount\n            return f"ถอน {amount}. ยอด: {self.__balance}"\n        return "ยอดไม่พอ"\n    \n    @property\n    def balance(self):\n        return self.__balance\n\nacc = BankAccount("สมชาย", 1000)\nprint(acc.deposit(500))\nprint(acc.withdraw(200))\nprint(f"ยอดคงเหลือ: {acc.balance}")`, explanation: "Encapsulation ด้วย private attribute (__balance) และ @property" }] },
    ]},
  ];

  await prisma.section.deleteMany({ where: { courseId } });
  await prisma.course.update({ where: { id: courseId }, data: { totalLessons: 0 } });

  for (const sec of pythonSections) {
    const section = await prisma.section.create({ data: { courseId, title: sec.title, order: sec.order } });
    for (let li = 0; li < sec.lessons.length; li++) {
      const l = sec.lessons[li];
      const lesson = await prisma.lesson.create({
        data: { sectionId: section.id, slug: l.slug, title: l.title, content: l.content, isFree: l.isFree, duration: l.duration, order: li + 1, type: "TEXT", isPublished: true },
      });
      for (let ci = 0; ci < l.codeExamples.length; ci++) {
        const ex = l.codeExamples[ci];
        await prisma.codeExample.create({ data: { lessonId: lesson.id, title: ex.title, code: ex.code, language: ex.language, explanation: ex.explanation, order: ci + 1 } });
      }
    }
    await prisma.course.update({ where: { id: courseId }, data: { totalLessons: { increment: sec.lessons.length } } });
  }
  console.log("  ✅ Seeded: Python Programming");
}

async function seedJSCourse(courseId: string) {
  const jsSections = [
    { title: "JavaScript Fundamentals", order: 1, lessons: [
      { slug: "js-intro-basics", title: "แนะนำ JavaScript", isFree: true, duration: 15, content: `# JavaScript — ภาษาของเว็บ\n\nJS ทำงานในเบราว์เซอร์ ควบคุม HTML/CSS ได้ และยังทำ Backend ได้ด้วย Node.js\n\n## ตัวแปรและ Types\n\`\`\`javascript\n// let, const, var\nlet name = "Alice";\nconst PI = 3.14159;\nvar old = "avoid";\n\n// Types\nconsole.log(typeof 42);        // number\nconsole.log(typeof "hello");   // string\nconsole.log(typeof true);      // boolean\nconsole.log(typeof undefined); // undefined\nconsole.log(typeof null);      // object (quirk!)\nconsole.log(typeof {});        // object\nconsole.log(typeof []);        // object\n\`\`\`\n\n## Template Literals\n\`\`\`javascript\nconst name = "Bob";\nconst age = 25;\nconsole.log(\`ชื่อ: \${name}, อายุ: \${age}\`);\n\`\`\``, codeExamples: [{ title: "JS Variables", language: "javascript", code: `// Destructuring\nconst [a, b, c] = [1, 2, 3];\nconst { name, age } = { name: "Alice", age: 25 };\n\nconsole.log(a, b, c);   // 1 2 3\nconsole.log(name, age); // Alice 25\n\n// Spread operator\nconst arr1 = [1, 2, 3];\nconst arr2 = [...arr1, 4, 5];\nconsole.log(arr2); // [1, 2, 3, 4, 5]\n\nconst obj1 = { x: 1, y: 2 };\nconst obj2 = { ...obj1, z: 3 };\nconsole.log(obj2); // {x:1, y:2, z:3}`, explanation: "ES6+ features ที่ใช้บ่อยมากในการพัฒนา JavaScript สมัยใหม่" }] },
      { slug: "js-functions-scope", title: "Functions, Arrow Functions, Scope", isFree: true, duration: 25, content: `# Functions ใน JavaScript\n\n## Function Declarations\n\`\`\`javascript\nfunction greet(name) {\n    return \`Hello, \${name}!\`;\n}\n\`\`\`\n\n## Arrow Functions\n\`\`\`javascript\nconst greet = (name) => \`Hello, \${name}!\`;\nconst double = n => n * 2;\nconst add = (a, b) => a + b;\n\`\`\`\n\n## Closures\n\`\`\`javascript\nfunction makeCounter() {\n    let count = 0;\n    return {\n        increment: () => ++count,\n        decrement: () => --count,\n        value: () => count\n    };\n}\n\nconst counter = makeCounter();\nconsole.log(counter.increment()); // 1\nconsole.log(counter.increment()); // 2\nconsole.log(counter.decrement()); // 1\n\`\`\`\n\n## Higher-Order Functions\n\`\`\`javascript\nconst nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];\n\nconst evens = nums.filter(n => n % 2 === 0);\nconst doubled = nums.map(n => n * 2);\nconst sum = nums.reduce((acc, n) => acc + n, 0);\n\nconsole.log(evens);   // [2,4,6,8,10]\nconsole.log(doubled); // [2,4,6,...,20]\nconsole.log(sum);     // 55\n\`\`\``, codeExamples: [{ title: "Array Methods", language: "javascript", code: `const students = [\n    { name: "Alice", gpa: 3.8, major: "CS" },\n    { name: "Bob", gpa: 3.2, major: "Math" },\n    { name: "Carol", gpa: 3.9, major: "CS" },\n    { name: "David", gpa: 2.8, major: "CS" }\n];\n\n// กรองนักศึกษา CS ที่ GPA >= 3.5\nconst top_cs = students\n    .filter(s => s.major === "CS" && s.gpa >= 3.5)\n    .sort((a, b) => b.gpa - a.gpa)\n    .map(s => \`\${s.name}: \${s.gpa}\`);\n\nconsole.log(top_cs);`, explanation: "Method chaining กับ filter, sort, map เป็น pattern ที่ใช้บ่อยมากใน JS" }] },
      { slug: "js-async-promises", title: "Async/Await และ Promises", isFree: false, duration: 30, content: `# Asynchronous JavaScript\n\n## Promise\n\`\`\`javascript\nconst fetchData = () => new Promise((resolve, reject) => {\n    setTimeout(() => resolve("Data received!"), 1000);\n});\n\nfetchData()\n    .then(data => console.log(data))\n    .catch(err => console.error(err));\n\`\`\`\n\n## Async/Await\n\`\`\`javascript\nasync function loadUser(id) {\n    try {\n        const res = await fetch(\`/api/users/\${id}\`);\n        if (!res.ok) throw new Error("Not found");\n        const user = await res.json();\n        return user;\n    } catch (error) {\n        console.error("Error:", error);\n    }\n}\n\n// เรียกใช้\nconst user = await loadUser(1);\nconsole.log(user);\n\`\`\`\n\n## Promise.all — ทำงานพร้อมกัน\n\`\`\`javascript\nconst [users, posts] = await Promise.all([\n    fetch("/api/users").then(r => r.json()),\n    fetch("/api/posts").then(r => r.json()),\n]);\n\`\`\``, codeExamples: [{ title: "Async Data Fetching", language: "javascript", code: `// จำลอง API call\nconst delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));\n\nasync function fetchUser(id) {\n    await delay(500); // จำลอง network delay\n    return { id, name: "Alice", email: "alice@email.com" };\n}\n\nasync function main() {\n    console.log("กำลังโหลด...");\n    \n    const user = await fetchUser(1);\n    console.log("User:", user);\n    \n    // Promise.all - ทำพร้อมกัน\n    const [u1, u2] = await Promise.all([fetchUser(1), fetchUser(2)]);\n    console.log("Users:", u1, u2);\n}\n\nmain();`, explanation: "async/await ทำให้โค้ด Async อ่านง่ายเหมือน Synchronous" }] },
    ]},
    { title: "DOM และ Events", order: 2, lessons: [
      { slug: "js-dom-manipulation", title: "DOM Manipulation", isFree: false, duration: 30, content: `# DOM Manipulation\n\n## เลือก Elements\n\`\`\`javascript\nconst h1 = document.querySelector("h1");\nconst items = document.querySelectorAll(".item");\nconst btn = document.getElementById("myBtn");\n\`\`\`\n\n## เปลี่ยน Content\n\`\`\`javascript\nh1.textContent = "Hello World";\nh1.innerHTML = "<strong>Bold</strong> text";\n\`\`\`\n\n## เปลี่ยน Style\n\`\`\`javascript\nh1.style.color = "red";\nh1.classList.add("active");\nh1.classList.remove("hidden");\nh1.classList.toggle("dark");\n\`\`\`\n\n## สร้าง Element\n\`\`\`javascript\nconst div = document.createElement("div");\ndiv.textContent = "New element";\ndiv.className = "card";\ndocument.body.appendChild(div);\n\`\`\`\n\n## Events\n\`\`\`javascript\nbtn.addEventListener("click", (e) => {\n    console.log("Clicked!", e.target);\n});\n\ndocument.addEventListener("keydown", (e) => {\n    if (e.key === "Escape") closeModal();\n});\n\`\`\``, codeExamples: [{ title: "Interactive Counter", language: "javascript", code: `// HTML: <div id="app"></div>\nconst app = document.getElementById("app") || document.body;\n\nlet count = 0;\n\napp.innerHTML = \`\n    <h2 id="display">Count: 0</h2>\n    <button id="dec">-</button>\n    <button id="inc">+</button>\n    <button id="reset">Reset</button>\n\`;\n\nconst display = document.getElementById("display");\n\nconst updateDisplay = () => {\n    display.textContent = \`Count: \${count}\`;\n    display.style.color = count < 0 ? "red" : count > 0 ? "green" : "black";\n};\n\ndocument.getElementById("inc").onclick = () => { count++; updateDisplay(); };\ndocument.getElementById("dec").onclick = () => { count--; updateDisplay(); };\ndocument.getElementById("reset").onclick = () => { count = 0; updateDisplay(); };`, explanation: "Interactive Counter แสดงการใช้ DOM + Events ร่วมกัน" }] },
    ]},
  ];

  await prisma.section.deleteMany({ where: { courseId } });
  await prisma.course.update({ where: { id: courseId }, data: { totalLessons: 0 } });

  for (const sec of jsSections) {
    const section = await prisma.section.create({ data: { courseId, title: sec.title, order: sec.order } });
    for (let li = 0; li < sec.lessons.length; li++) {
      const l = sec.lessons[li];
      const lesson = await prisma.lesson.create({ data: { sectionId: section.id, slug: l.slug, title: l.title, content: l.content, isFree: l.isFree, duration: l.duration, order: li + 1, type: "TEXT", isPublished: true } });
      for (let ci = 0; ci < l.codeExamples.length; ci++) {
        const ex = l.codeExamples[ci];
        await prisma.codeExample.create({ data: { lessonId: lesson.id, title: ex.title, code: ex.code, language: ex.language, explanation: ex.explanation, order: ci + 1 } });
      }
    }
    await prisma.course.update({ where: { id: courseId }, data: { totalLessons: { increment: sec.lessons.length } } });
  }
  console.log("  ✅ Seeded: JavaScript Fundamentals");
}

async function seedReactCourse(courseId: string) {
  const reactSections = [
    { title: "React Fundamentals", order: 1, lessons: [
      { slug: "react-intro-setup", title: "แนะนำ React และการ Setup", isFree: true, duration: 20, content: `# React.js — Library สำหรับสร้าง UI\n\n**React** พัฒนาโดย Facebook (Meta) ปี 2013 ใช้สำหรับสร้าง User Interface แบบ Component-based\n\n## ทำไมต้อง React?\n- **Component-based** — แบ่ง UI เป็นชิ้นเล็กๆ\n- **Virtual DOM** — อัปเดตเฉพาะส่วนที่เปลี่ยน\n- **Unidirectional Data Flow** — ข้อมูลไหลทางเดียว\n- **Ecosystem** — Next.js, React Native, etc.\n\n## Setup ด้วย Vite\n\`\`\`bash\nnpm create vite@latest my-app -- --template react-ts\ncd my-app\nnpm install\nnpm run dev\n\`\`\`\n\n## JSX\n\`\`\`jsx\nfunction Welcome({ name }) {\n    return (\n        <div className="card">\n            <h1>Hello, {name}!</h1>\n            <p>ยินดีต้อนรับสู่ React</p>\n        </div>\n    );\n}\n\`\`\``, codeExamples: [{ title: "First React Component", language: "javascript", code: `// Component คือ function ที่ return JSX\nfunction Button({ text, onClick, color = "blue" }) {\n    return (\n        <button\n            onClick={onClick}\n            style={{\n                backgroundColor: color,\n                color: "white",\n                padding: "8px 16px",\n                border: "none",\n                borderRadius: "8px",\n                cursor: "pointer"\n            }}\n        >\n            {text}\n        </button>\n    );\n}\n\nfunction App() {\n    return (\n        <div>\n            <Button text="Click me!" onClick={() => alert("Hello!")} />\n            <Button text="Danger" color="red" onClick={() => alert("Danger!")} />\n        </div>\n    );\n}`, explanation: "Component ที่รับ props และ render JSX — พื้นฐานสำคัญของ React" }] },
      { slug: "react-hooks-usestate", title: "useState และ useEffect Hooks", isFree: true, duration: 30, content: `# React Hooks\n\n## useState\n\`\`\`jsx\nimport { useState } from "react";\n\nfunction Counter() {\n    const [count, setCount] = useState(0);\n    \n    return (\n        <div>\n            <p>Count: {count}</p>\n            <button onClick={() => setCount(count + 1)}>+</button>\n            <button onClick={() => setCount(count - 1)}>-</button>\n            <button onClick={() => setCount(0)}>Reset</button>\n        </div>\n    );\n}\n\`\`\`\n\n## useEffect\n\`\`\`jsx\nimport { useState, useEffect } from "react";\n\nfunction UserProfile({ userId }) {\n    const [user, setUser] = useState(null);\n    const [loading, setLoading] = useState(true);\n    \n    useEffect(() => {\n        fetch(\`/api/users/\${userId}\`)\n            .then(r => r.json())\n            .then(data => {\n                setUser(data);\n                setLoading(false);\n            });\n    }, [userId]); // เรียกใหม่เมื่อ userId เปลี่ยน\n    \n    if (loading) return <div>Loading...</div>;\n    return <div>{user?.name}</div>;\n}\n\`\`\`\n\n## useCallback และ useMemo\n\`\`\`jsx\nconst memoizedCalc = useMemo(() => {\n    return heavyComputation(data);\n}, [data]);\n\nconst handleClick = useCallback(() => {\n    doSomething(id);\n}, [id]);\n\`\`\``, codeExamples: [{ title: "Todo App with Hooks", language: "javascript", code: `import { useState } from "react";\n\nfunction TodoApp() {\n    const [todos, setTodos] = useState([]);\n    const [input, setInput] = useState("");\n    \n    const addTodo = () => {\n        if (!input.trim()) return;\n        setTodos([...todos, { id: Date.now(), text: input, done: false }]);\n        setInput("");\n    };\n    \n    const toggleTodo = (id) => {\n        setTodos(todos.map(t => t.id === id ? {...t, done: !t.done} : t));\n    };\n    \n    const deleteTodo = (id) => {\n        setTodos(todos.filter(t => t.id !== id));\n    };\n    \n    return (\n        <div>\n            <h2>Todo ({todos.filter(t => !t.done).length} remaining)</h2>\n            <div>\n                <input value={input} onChange={e => setInput(e.target.value)}\n                    onKeyDown={e => e.key === "Enter" && addTodo()} />\n                <button onClick={addTodo}>Add</button>\n            </div>\n            {todos.map(todo => (\n                <div key={todo.id} style={{textDecoration: todo.done ? "line-through" : "none"}}>\n                    <input type="checkbox" checked={todo.done} onChange={() => toggleTodo(todo.id)} />\n                    {todo.text}\n                    <button onClick={() => deleteTodo(todo.id)}>🗑</button>\n                </div>\n            ))}\n        </div>\n    );\n}`, explanation: "Todo App แสดงการใช้ useState อย่างครบถ้วน" }] },
      { slug: "react-context-api", title: "Context API และ State Management", isFree: false, duration: 25, content: `# React Context API\n\nใช้สำหรับ Global State ที่ต้องใช้ข้ามหลาย Component\n\n## สร้าง Context\n\`\`\`jsx\nimport { createContext, useContext, useState } from "react";\n\nconst ThemeContext = createContext(null);\n\nexport function ThemeProvider({ children }) {\n    const [theme, setTheme] = useState("light");\n    \n    const toggle = () => setTheme(t => t === "light" ? "dark" : "light");\n    \n    return (\n        <ThemeContext.Provider value={{ theme, toggle }}>\n            {children}\n        </ThemeContext.Provider>\n    );\n}\n\nexport const useTheme = () => useContext(ThemeContext);\n\`\`\`\n\n## ใช้งาน Context\n\`\`\`jsx\nfunction NavBar() {\n    const { theme, toggle } = useTheme();\n    return (\n        <nav style={{ background: theme === "dark" ? "#333" : "#fff" }}>\n            <button onClick={toggle}>Toggle Theme</button>\n        </nav>\n    );\n}\n\nfunction App() {\n    return (\n        <ThemeProvider>\n            <NavBar />\n            <Main />\n        </ThemeProvider>\n    );\n}\n\`\`\`\n\n## Custom Hooks\n\`\`\`jsx\nfunction useFetch(url) {\n    const [data, setData] = useState(null);\n    const [loading, setLoading] = useState(true);\n    const [error, setError] = useState(null);\n    \n    useEffect(() => {\n        fetch(url)\n            .then(r => r.json())\n            .then(setData)\n            .catch(setError)\n            .finally(() => setLoading(false));\n    }, [url]);\n    \n    return { data, loading, error };\n}\n\`\`\``, codeExamples: [{ title: "Custom Hook: useLocalStorage", language: "javascript", code: `import { useState, useEffect } from "react";\n\nfunction useLocalStorage(key, initialValue) {\n    const [value, setValue] = useState(() => {\n        try {\n            const stored = localStorage.getItem(key);\n            return stored ? JSON.parse(stored) : initialValue;\n        } catch {\n            return initialValue;\n        }\n    });\n    \n    useEffect(() => {\n        localStorage.setItem(key, JSON.stringify(value));\n    }, [key, value]);\n    \n    return [value, setValue];\n}\n\n// ใช้งาน\nfunction App() {\n    const [name, setName] = useLocalStorage("username", "");\n    return (\n        <input value={name} onChange={e => setName(e.target.value)}\n            placeholder="ชื่อจะถูกบันทึกอัตโนมัติ" />\n    );\n}`, explanation: "Custom Hook สำหรับจัดการ LocalStorage อัตโนมัติ" }] },
    ]},
  ];

  await prisma.section.deleteMany({ where: { courseId } });
  await prisma.course.update({ where: { id: courseId }, data: { totalLessons: 0 } });

  for (const sec of reactSections) {
    const section = await prisma.section.create({ data: { courseId, title: sec.title, order: sec.order } });
    for (let li = 0; li < sec.lessons.length; li++) {
      const l = sec.lessons[li];
      const lesson = await prisma.lesson.create({ data: { sectionId: section.id, slug: l.slug, title: l.title, content: l.content, isFree: l.isFree, duration: l.duration, order: li + 1, type: "TEXT", isPublished: true } });
      for (let ci = 0; ci < l.codeExamples.length; ci++) {
        const ex = l.codeExamples[ci];
        await prisma.codeExample.create({ data: { lessonId: lesson.id, title: ex.title, code: ex.code, language: ex.language, explanation: ex.explanation, order: ci + 1 } });
      }
    }
    await prisma.course.update({ where: { id: courseId }, data: { totalLessons: { increment: sec.lessons.length } } });
  }
  console.log("  ✅ Seeded: React.js");
}

async function seedQuizzes() {
  console.log("  🎯 Seeding real quiz questions...");

  const quizData: Record<string, { title: string; passingScore: number; questions: { text: string; explanation: string; choices: { text: string; isCorrect: boolean }[] }[] }[]> = {
    "what-is-programming": [{
      title: "ทดสอบ: โปรแกรมมิ่งคืออะไร?",
      passingScore: 60,
      questions: [
        {
          text: "โปรแกรมมิ่งคืออะไร?",
          explanation: "โปรแกรมมิ่งคือการเขียนชุดคำสั่งให้คอมพิวเตอร์ทำงานตามที่เราต้องการ",
          choices: [
            { text: "การเขียนชุดคำสั่งให้คอมพิวเตอร์ทำงาน", isCorrect: true },
            { text: "การซ่อมคอมพิวเตอร์", isCorrect: false },
            { text: "การออกแบบวงจรไฟฟ้า", isCorrect: false },
            { text: "การติดตั้งซอฟต์แวร์", isCorrect: false },
          ],
        },
        {
          text: "ภาษา Python นิยมใช้ในด้านใดมากที่สุด?",
          explanation: "Python เป็นภาษายอดนิยมสำหรับ AI, Data Science, และ Machine Learning",
          choices: [
            { text: "AI และ Data Science", isCorrect: true },
            { text: "การพัฒนาเกม 3D เท่านั้น", isCorrect: false },
            { text: "ระบบ Embedded เท่านั้น", isCorrect: false },
            { text: "การออกแบบกราฟิก", isCorrect: false },
          ],
        },
        {
          text: "Hello World คืออะไร?",
          explanation: "Hello World เป็นโปรแกรมแรกที่นักเรียนทุกคนเขียนเพื่อทดสอบว่า environment ทำงานได้",
          choices: [
            { text: "โปรแกรมแรกที่แสดงข้อความออกหน้าจอ", isCorrect: true },
            { text: "ภาษาโปรแกรมใหม่", isCorrect: false },
            { text: "ฟังก์ชันพิเศษของ Python", isCorrect: false },
            { text: "ชื่อของ compiler", isCorrect: false },
          ],
        },
      ],
    }],
    "js-intro-basics": [{
      title: "Quiz: JavaScript พื้นฐาน",
      passingScore: 60,
      questions: [
        {
          text: "คำสงวน (keyword) ใดใน JavaScript ที่ประกาศตัวแปรที่ไม่สามารถ reassign ได้?",
          explanation: "const ใช้สำหรับตัวแปรที่ไม่ต้องการ reassign ในขณะที่ let สามารถ reassign ได้",
          choices: [
            { text: "const", isCorrect: true },
            { text: "let", isCorrect: false },
            { text: "var", isCorrect: false },
            { text: "def", isCorrect: false },
          ],
        },
        {
          text: "typeof null ใน JavaScript คืนค่าอะไร?",
          explanation: "typeof null คืนค่า 'object' ซึ่งเป็น bug ที่รู้จักกันดีใน JavaScript ตั้งแต่แรก",
          choices: [
            { text: '"object"', isCorrect: true },
            { text: '"null"', isCorrect: false },
            { text: '"undefined"', isCorrect: false },
            { text: '"boolean"', isCorrect: false },
          ],
        },
        {
          text: "Template literal ใช้สัญลักษณ์ใด?",
          explanation: "Template literal ใช้ backtick (`) และแทรกตัวแปรด้วย ${expression}",
          choices: [
            { text: "Backtick (`)", isCorrect: true },
            { text: "Single quote (')", isCorrect: false },
            { text: "Double quote (\")", isCorrect: false },
            { text: "Tilde (~)", isCorrect: false },
          ],
        },
        {
          text: "Array method ใดที่สร้าง Array ใหม่โดยกรองเฉพาะ element ที่ผ่านเงื่อนไข?",
          explanation: "filter() สร้าง Array ใหม่ที่มีเฉพาะ element ที่ callback return true",
          choices: [
            { text: "filter()", isCorrect: true },
            { text: "map()", isCorrect: false },
            { text: "reduce()", isCorrect: false },
            { text: "find()", isCorrect: false },
          ],
        },
      ],
    }],
    "python-intro": [{
      title: "Quiz: Python เบื้องต้น",
      passingScore: 60,
      questions: [
        {
          text: "ฟังก์ชันใดใน Python ใช้สำหรับแสดงข้อมูลออกหน้าจอ?",
          explanation: "print() เป็นฟังก์ชัน built-in ของ Python สำหรับแสดงข้อมูล",
          choices: [
            { text: "print()", isCorrect: true },
            { text: "console.log()", isCorrect: false },
            { text: "System.out.println()", isCorrect: false },
            { text: "printf()", isCorrect: false },
          ],
        },
        {
          text: "ข้อใดถูกต้องเกี่ยวกับตัวแปรใน Python?",
          explanation: "Python เป็น dynamically typed language ไม่ต้องระบุ type ของตัวแปร",
          choices: [
            { text: "ไม่ต้องระบุประเภทข้อมูล (dynamically typed)", isCorrect: true },
            { text: "ต้องระบุประเภทข้อมูลเสมอ", isCorrect: false },
            { text: "ตัวแปรต้องเริ่มด้วยตัวพิมพ์ใหญ่", isCorrect: false },
            { text: "ต้องใช้คำว่า var ก่อนชื่อตัวแปร", isCorrect: false },
          ],
        },
        {
          text: "f-string ใน Python คืออะไร?",
          explanation: "f-string คือ format string ที่ใช้ f'...' หรือ f\"...\" เพื่อแทรกตัวแปรใน string",
          choices: [
            { text: "วิธีแทรกตัวแปรใน string ด้วย f'...'", isCorrect: true },
            { text: "ฟังก์ชันสำหรับอ่านไฟล์", isCorrect: false },
            { text: "ประเภทข้อมูลชนิดใหม่", isCorrect: false },
            { text: "Loop พิเศษสำหรับตัวเลข", isCorrect: false },
          ],
        },
      ],
    }],
    "react-intro-setup": [{
      title: "Quiz: React พื้นฐาน",
      passingScore: 60,
      questions: [
        {
          text: "React ถูกพัฒนาโดยบริษัทใด?",
          explanation: "React พัฒนาโดย Facebook (Meta) และปล่อยเป็น Open Source ในปี 2013",
          choices: [
            { text: "Facebook (Meta)", isCorrect: true },
            { text: "Google", isCorrect: false },
            { text: "Microsoft", isCorrect: false },
            { text: "Netflix", isCorrect: false },
          ],
        },
        {
          text: "JSX คืออะไร?",
          explanation: "JSX คือ syntax extension ของ JavaScript ที่ทำให้เขียน HTML-like syntax ใน JS ได้",
          choices: [
            { text: "Syntax ที่ผสม JavaScript กับ HTML", isCorrect: true },
            { text: "ภาษาโปรแกรมใหม่แยกต่างหาก", isCorrect: false },
            { text: "ฐานข้อมูลสำหรับ React", isCorrect: false },
            { text: "เครื่องมือ build สำหรับ React", isCorrect: false },
          ],
        },
        {
          text: "ใน React การส่งข้อมูลจาก Component พ่อไปลูกทำผ่านอะไร?",
          explanation: "Props (properties) ใช้ส่งข้อมูลจาก Parent Component ลงมาสู่ Child Component",
          choices: [
            { text: "Props", isCorrect: true },
            { text: "State", isCorrect: false },
            { text: "Context เท่านั้น", isCorrect: false },
            { text: "Global Variables", isCorrect: false },
          ],
        },
        {
          text: "Hook ใดที่ใช้จัดการ Local State ใน Functional Component?",
          explanation: "useState เป็น Hook สำหรับสร้างและอัปเดต state ใน Functional Component",
          choices: [
            { text: "useState", isCorrect: true },
            { text: "useEffect", isCorrect: false },
            { text: "useContext", isCorrect: false },
            { text: "useReducer", isCorrect: false },
          ],
        },
      ],
    }],
    // HTML Mastery
    "html-document-structure": [{
      title: "Quiz: โครงสร้าง HTML",
      passingScore: 60,
      questions: [
        { text: "Tag ใดใช้สำหรับหัวข้อหลักที่สำคัญที่สุดในหน้าเว็บ?", explanation: "<h1> คือหัวข้อใหญ่สุด ควรมีแค่ 1 ต่อหน้า ส่วน h2-h6 เป็นหัวข้อรอง", choices: [{ text: "<h1>", isCorrect: true }, { text: "<header>", isCorrect: false }, { text: "<title>", isCorrect: false }, { text: "<main>", isCorrect: false }] },
        { text: "DOCTYPE ใน HTML5 เขียนอย่างไร?", explanation: "<!DOCTYPE html> บอก browser ว่าเป็น HTML5 ต้องอยู่บรรทัดแรกสุด", choices: [{ text: "<!DOCTYPE html>", isCorrect: true }, { text: "<!DOCTYPE HTML5>", isCorrect: false }, { text: "<html version='5'>", isCorrect: false }, { text: "<!HTML>", isCorrect: false }] },
        { text: "Attribute ใดใช้กำหนด unique identifier ให้ element?", explanation: "id attribute ต้องไม่ซ้ำกันในหน้าเดียว ใช้ใน CSS เป็น #id และ JS เป็น getElementById", choices: [{ text: "id", isCorrect: true }, { text: "class", isCorrect: false }, { text: "name", isCorrect: false }, { text: "key", isCorrect: false }] },
        { text: "Tag ใดที่เป็น Self-closing (ไม่ต้องมี closing tag)?", explanation: "<img> เป็น void element ไม่ต้องมี closing tag เขียน <img src='' alt=''> หรือ <img ... />", choices: [{ text: "<img>", isCorrect: true }, { text: "<div>", isCorrect: false }, { text: "<p>", isCorrect: false }, { text: "<span>", isCorrect: false }] },
      ],
    }],
    "html-forms": [{
      title: "Quiz: HTML Forms",
      passingScore: 60,
      questions: [
        { text: "Attribute ใดใน <form> กำหนด URL ที่จะส่งข้อมูลไป?", explanation: "action กำหนด URL ปลายทาง ส่วน method กำหนดวิธีส่ง (GET/POST)", choices: [{ text: "action", isCorrect: true }, { text: "href", isCorrect: false }, { text: "src", isCorrect: false }, { text: "target", isCorrect: false }] },
        { text: "<input type='?'> ใดที่ซ่อนข้อความที่พิมพ์ (เหมาะกับรหัสผ่าน)?", explanation: "type='password' ซ่อนตัวอักษรที่พิมพ์เป็น *** ป้องกันคนมองเห็น", choices: [{ text: "password", isCorrect: true }, { text: "hidden", isCorrect: false }, { text: "secret", isCorrect: false }, { text: "text", isCorrect: false }] },
        { text: "Tag ใดใช้สร้าง dropdown menu?", explanation: "<select> ใช้สร้าง dropdown และใส่ <option> เป็น item แต่ละรายการ", choices: [{ text: "<select>", isCorrect: true }, { text: "<dropdown>", isCorrect: false }, { text: "<menu>", isCorrect: false }, { text: "<list>", isCorrect: false }] },
      ],
    }],
    "html-semantic": [{
      title: "Quiz: Semantic HTML",
      passingScore: 60,
      questions: [
        { text: "ข้อดีหลักของ Semantic HTML คืออะไร?", explanation: "Semantic tags บอกความหมายของเนื้อหา ทำให้ SEO ดีขึ้น และ screen reader อ่านได้", choices: [{ text: "SEO ดีขึ้นและ Accessibility ดีขึ้น", isCorrect: true }, { text: "หน้าเว็บโหลดเร็วขึ้น", isCorrect: false }, { text: "CSS เขียนง่ายขึ้น", isCorrect: false }, { text: "JavaScript ทำงานเร็วขึ้น", isCorrect: false }] },
        { text: "Tag ใดเหมาะสมที่สุดสำหรับเนื้อหาหลักของหน้าเว็บ?", explanation: "<main> ควรมีแค่ 1 ต่อหน้า บอก browser ว่านี่คือเนื้อหาหลัก", choices: [{ text: "<main>", isCorrect: true }, { text: "<body>", isCorrect: false }, { text: "<div id='content'>", isCorrect: false }, { text: "<content>", isCorrect: false }] },
        { text: "Tag ใดใช้สำหรับบทความอิสระที่สามารถอ่านได้ด้วยตัวเอง?", explanation: "<article> เหมาะกับเนื้อหาที่ complete ในตัวเอง เช่น blog post, news article", choices: [{ text: "<article>", isCorrect: true }, { text: "<section>", isCorrect: false }, { text: "<div>", isCorrect: false }, { text: "<post>", isCorrect: false }] },
      ],
    }],
    // CSS Mastery
    "css-fundamentals": [{
      title: "Quiz: CSS เบื้องต้น",
      passingScore: 60,
      questions: [
        { text: "วิธีใดในการเพิ่ม CSS มีลำดับความสำคัญสูงสุด (specificity สูงสุด)?", explanation: "Inline style มี specificity สูงสุด แต่ไม่แนะนำให้ใช้เยอะเพราะ override ยาก", choices: [{ text: "Inline style", isCorrect: true }, { text: "Internal CSS (<style>)", isCorrect: false }, { text: "External CSS (<link>)", isCorrect: false }, { text: "ทั้งหมดเท่ากัน", isCorrect: false }] },
        { text: "Selector ใดที่เลือก element ที่มี class 'btn'?", explanation: ".btn ใช้เลือก element ทุกตัวที่มี class='btn' สังเกตว่าขึ้นต้นด้วยจุด", choices: [{ text: ".btn", isCorrect: true }, { text: "#btn", isCorrect: false }, { text: "btn", isCorrect: false }, { text: "[btn]", isCorrect: false }] },
        { text: "Property ใดใช้กำหนดสีข้อความ?", explanation: "color ใช้กำหนดสีข้อความ ส่วน background-color กำหนดสีพื้นหลัง", choices: [{ text: "color", isCorrect: true }, { text: "text-color", isCorrect: false }, { text: "font-color", isCorrect: false }, { text: "text-style", isCorrect: false }] },
        { text: "ค่าใดของ display ทำให้ element แสดงในบรรทัดเดียวกับ element อื่น แต่มีขนาดได้?", explanation: "inline-block แสดงในบรรทัดเดียวกัน แต่สามารถกำหนด width/height ได้ต่างจาก inline", choices: [{ text: "inline-block", isCorrect: true }, { text: "inline", isCorrect: false }, { text: "block", isCorrect: false }, { text: "flex", isCorrect: false }] },
      ],
    }],
    "css-box-model": [{
      title: "Quiz: CSS Box Model",
      passingScore: 60,
      questions: [
        { text: "Box Model ประกอบด้วยส่วนใดบ้าง (จากในสุดไปนอกสุด)?", explanation: "Box model: content → padding → border → margin เรียงจากในสุดไปนอกสุด", choices: [{ text: "Content, Padding, Border, Margin", isCorrect: true }, { text: "Margin, Border, Padding, Content", isCorrect: false }, { text: "Content, Border, Padding, Margin", isCorrect: false }, { text: "Padding, Content, Margin, Border", isCorrect: false }] },
        { text: "box-sizing: border-box; มีผลอย่างไร?", explanation: "border-box ทำให้ width/height รวม padding และ border แล้ว ทำให้คำนวณขนาดง่ายขึ้น", choices: [{ text: "width รวม padding และ border แล้ว", isCorrect: true }, { text: "ไม่มี border", isCorrect: false }, { text: "ไม่มี padding", isCorrect: false }, { text: "width เฉพาะ content อย่างเดียว", isCorrect: false }] },
        { text: "ต้องการให้ element กว้างเต็ม container แต่มี padding ด้านซ้าย-ขวา 20px ควรใช้อะไร?", explanation: "box-sizing: border-box ทำให้ width: 100% รวม padding แล้ว element จะพอดีกับ container", choices: [{ text: "box-sizing: border-box", isCorrect: true }, { text: "width: calc(100% + 40px)", isCorrect: false }, { text: "overflow: hidden", isCorrect: false }, { text: "position: relative", isCorrect: false }] },
      ],
    }],
    "css-flexbox": [{
      title: "Quiz: CSS Flexbox",
      passingScore: 60,
      questions: [
        { text: "Property ใดกำหนดทิศทางหลักของ flex items?", explanation: "flex-direction กำหนดทิศทาง: row (แนวนอน, default) หรือ column (แนวตั้ง)", choices: [{ text: "flex-direction", isCorrect: true }, { text: "flex-flow", isCorrect: false }, { text: "align-items", isCorrect: false }, { text: "justify-content", isCorrect: false }] },
        { text: "justify-content: center; จัดวาง items อย่างไร?", explanation: "justify-content จัดวางตาม main axis เมื่อเป็น center items จะอยู่ตรงกลาง", choices: [{ text: "จัดอยู่ตรงกลางแนวนอน (main axis)", isCorrect: true }, { text: "จัดอยู่ตรงกลางแนวตั้ง", isCorrect: false }, { text: "กระจายเท่ากัน", isCorrect: false }, { text: "ชิดขวา", isCorrect: false }] },
        { text: "align-items: center; ทำงานบน axis ใด?", explanation: "align-items จัดวางบน cross axis (แนวตั้งเมื่อ flex-direction เป็น row)", choices: [{ text: "Cross axis (แนวตั้งเมื่อ row)", isCorrect: true }, { text: "Main axis (แนวนอน)", isCorrect: false }, { text: "Z-axis (ความลึก)", isCorrect: false }, { text: "ทั้งสองแกน", isCorrect: false }] },
        { text: "flex: 1 หมายความว่าอะไร?", explanation: "flex: 1 คือ flex-grow: 1, flex-shrink: 1, flex-basis: 0% — item จะขยายเต็มพื้นที่ที่เหลือ", choices: [{ text: "item ขยายเต็มพื้นที่ที่เหลือ", isCorrect: true }, { text: "item มีขนาด 1px", isCorrect: false }, { text: "item หดตัวไม่ได้", isCorrect: false }, { text: "item ซ่อนอยู่", isCorrect: false }] },
      ],
    }],
    "css-grid": [{
      title: "Quiz: CSS Grid",
      passingScore: 60,
      questions: [
        { text: "Property ใดกำหนดจำนวนและขนาดของคอลัมน์ใน Grid?", explanation: "grid-template-columns กำหนดคอลัมน์ เช่น grid-template-columns: repeat(3, 1fr) = 3 คอลัมน์เท่ากัน", choices: [{ text: "grid-template-columns", isCorrect: true }, { text: "grid-columns", isCorrect: false }, { text: "column-template", isCorrect: false }, { text: "grid-areas", isCorrect: false }] },
        { text: "หน่วย fr ใน CSS Grid คืออะไร?", explanation: "fr (fraction) คือหน่วยสำหรับแบ่งพื้นที่ที่เหลือ เช่น 1fr 2fr หมายถึงแบ่ง 1:2", choices: [{ text: "สัดส่วนของพื้นที่ที่เหลือ", isCorrect: true }, { text: "Fixed pixel", isCorrect: false }, { text: "Font-relative unit", isCorrect: false }, { text: "Percentage", isCorrect: false }] },
        { text: "gap: 16px ใน Grid ทำอะไร?", explanation: "gap กำหนดระยะห่างระหว่าง grid items ทั้งแนวตั้งและแนวนอน", choices: [{ text: "กำหนดระยะห่างระหว่าง grid items", isCorrect: true }, { text: "กำหนด padding ของ container", isCorrect: false }, { text: "กำหนดขนาด minimum ของ item", isCorrect: false }, { text: "กำหนด border ระหว่าง item", isCorrect: false }] },
      ],
    }],
    "css-responsive": [{
      title: "Quiz: Responsive Design",
      passingScore: 60,
      questions: [
        { text: "Media query ใดที่ apply styles เมื่อหน้าจอกว้างอย่างน้อย 768px?", explanation: "@media (min-width: 768px) ใช้ Mobile First — เริ่มจาก mobile แล้ว override ตอนหน้าจอใหญ่ขึ้น", choices: [{ text: "@media (min-width: 768px)", isCorrect: true }, { text: "@media (max-width: 768px)", isCorrect: false }, { text: "@media screen > 768px", isCorrect: false }, { text: "@screen min-width: 768px", isCorrect: false }] },
        { text: "Viewport meta tag สำคัญอย่างไร?", explanation: "<meta name='viewport' content='width=device-width, initial-scale=1'> บอก mobile browser ให้แสดงผลตามขนาดจริงของ device", choices: [{ text: "บอก mobile browser ให้แสดงผลตามขนาด device จริง", isCorrect: true }, { text: "กำหนดขนาดฟอนต์เริ่มต้น", isCorrect: false }, { text: "ซ่อน scrollbar บน mobile", isCorrect: false }, { text: "เปิดใช้งาน GPU rendering", isCorrect: false }] },
        { text: "Mobile-first approach หมายความว่าอะไร?", explanation: "Mobile-first: เขียน CSS สำหรับ mobile ก่อน แล้วใช้ min-width media query ขยายสำหรับหน้าจอใหญ่", choices: [{ text: "เขียน CSS สำหรับ mobile ก่อน แล้วค่อย override สำหรับ desktop", isCorrect: true }, { text: "ออกแบบ desktop ก่อนแล้วย่อลงมา mobile", isCorrect: false }, { text: "สร้างแอปแยกสำหรับ mobile", isCorrect: false }, { text: "ใช้ max-width เสมอ", isCorrect: false }] },
      ],
    }],
    // JS Mastery
    "js-fundamentals": [{
      title: "Quiz: JS Variables & Types",
      passingScore: 60,
      questions: [
        { text: "ความแตกต่างหลักระหว่าง let และ const คืออะไร?", explanation: "let สามารถ reassign ได้ แต่ const ไม่สามารถ reassign ได้ (แต่ object/array ยัง mutate ได้)", choices: [{ text: "const ไม่สามารถ reassign ได้", isCorrect: true }, { text: "let มี block scope แต่ const ไม่มี", isCorrect: false }, { text: "const เร็วกว่า let", isCorrect: false }, { text: "ไม่มีความแตกต่าง", isCorrect: false }] },
        { text: "0 == '0' ใน JavaScript ผลลัพธ์คืออะไร?", explanation: "== ทำ type coercion ก่อนเปรียบเทียบ ทำให้ 0 == '0' เป็น true แต่ 0 === '0' เป็น false", choices: [{ text: "true (เพราะ == ทำ type coercion)", isCorrect: true }, { text: "false", isCorrect: false }, { text: "Error", isCorrect: false }, { text: "undefined", isCorrect: false }] },
        { text: "NaN === NaN ใน JavaScript คืออะไร?", explanation: "NaN เป็นค่าพิเศษที่ไม่เท่ากับอะไรเลย แม้แต่ตัวเอง ใช้ Number.isNaN() แทน", choices: [{ text: "false (NaN ไม่เท่ากับอะไรเลย)", isCorrect: true }, { text: "true", isCorrect: false }, { text: "undefined", isCorrect: false }, { text: "Error", isCorrect: false }] },
      ],
    }],
    "js-functions": [{
      title: "Quiz: JS Functions",
      passingScore: 60,
      questions: [
        { text: "Arrow function ต่างจาก regular function อย่างไรในเรื่อง 'this'?", explanation: "Arrow function ไม่มี this ของตัวเอง ใช้ this จาก lexical scope (context รอบข้าง) แทน", choices: [{ text: "Arrow function ใช้ this จาก lexical scope", isCorrect: true }, { text: "Arrow function มี this แบบเดียวกัน", isCorrect: false }, { text: "Arrow function ไม่สามารถใช้ this ได้เลย", isCorrect: false }, { text: "Arrow function มี this ที่ดีกว่า regular function", isCorrect: false }] },
        { text: "Closure คืออะไร?", explanation: "Closure คือ function ที่จำ environment (variables) จาก lexical scope ที่มันถูกสร้างขึ้น", choices: [{ text: "Function ที่จำ variables จาก scope ที่มันถูกสร้าง", isCorrect: true }, { text: "Function ที่ไม่มี return value", isCorrect: false }, { text: "Function ที่เรียกตัวเองซ้ำ", isCorrect: false }, { text: "Function ที่มีแค่ parameter เดียว", isCorrect: false }] },
        { text: "Higher-order function คืออะไร?", explanation: "Higher-order function คือ function ที่รับ function เป็น argument หรือ return function เช่น map, filter, reduce", choices: [{ text: "Function ที่รับหรือ return function อื่น", isCorrect: true }, { text: "Function ที่ทำงานเร็วกว่า", isCorrect: false }, { text: "Function ที่อยู่ใน class", isCorrect: false }, { text: "Function ที่มีหลาย parameters", isCorrect: false }] },
      ],
    }],
    "js-arrays": [{
      title: "Quiz: JS Arrays",
      passingScore: 60,
      questions: [
        { text: "Array method ใดที่แปลง Array เป็น Array ใหม่โดยใช้ callback?", explanation: "map() สร้าง Array ใหม่ที่มีขนาดเท่าเดิม โดย transform ทุก element ด้วย callback", choices: [{ text: "map()", isCorrect: true }, { text: "forEach()", isCorrect: false }, { text: "filter()", isCorrect: false }, { text: "reduce()", isCorrect: false }] },
        { text: "spread operator (...) ใช้ทำอะไร?", explanation: "spread operator แผ่ Array/Object ออกมา เหมาะสำหรับ copy หรือรวม Arrays/Objects", choices: [{ text: "แผ่ elements ของ Array/Object ออกมา", isCorrect: true }, { text: "ลบ element จาก Array", isCorrect: false }, { text: "Sort Array", isCorrect: false }, { text: "ค้นหา element ใน Array", isCorrect: false }] },
        { text: "Array.from() ใช้ทำอะไร?", explanation: "Array.from() สร้าง Array จาก iterable เช่น string, Set, NodeList หรือ array-like objects", choices: [{ text: "สร้าง Array จาก iterable หรือ array-like object", isCorrect: true }, { text: "Copy Array", isCorrect: false }, { text: "Flatten nested Array", isCorrect: false }, { text: "ตรวจสอบว่าเป็น Array หรือไม่", isCorrect: false }] },
      ],
    }],
    "js-async": [{
      title: "Quiz: Async JavaScript",
      passingScore: 60,
      questions: [
        { text: "async/await เป็น syntax sugar ของอะไร?", explanation: "async/await ทำให้เขียน Promise code ดูเหมือน synchronous code อ่านง่ายขึ้นมาก", choices: [{ text: "Promise", isCorrect: true }, { text: "Callback", isCorrect: false }, { text: "setTimeout", isCorrect: false }, { text: "Generator", isCorrect: false }] },
        { text: "try/catch ใช้กับ async/await อย่างไร?", explanation: "ใส่ await ไว้ใน try block เพื่อ catch error จาก rejected Promise", choices: [{ text: "ใส่ await ใน try เพื่อ catch rejected Promise", isCorrect: true }, { text: "ใส่ await ใน catch เสมอ", isCorrect: false }, { text: "ไม่สามารถใช้ try/catch กับ async/await ได้", isCorrect: false }, { text: "try/catch จัดการได้แค่ synchronous error", isCorrect: false }] },
        { text: "Promise.all() vs Promise.race() ต่างกันอย่างไร?", explanation: "Promise.all รอทุกตัวสำเร็จ, Promise.race เสร็จเมื่อตัวแรก resolve หรือ reject", choices: [{ text: "all รอทุกตัว, race เสร็จเมื่อตัวแรก", isCorrect: true }, { text: "ทั้งคู่รอทุกตัว แต่ race เร็วกว่า", isCorrect: false }, { text: "all ทำงานพร้อมกัน, race ทำงานทีละตัว", isCorrect: false }, { text: "ไม่มีความแตกต่าง", isCorrect: false }] },
      ],
    }],
    "js-dom": [{
      title: "Quiz: DOM Manipulation",
      passingScore: 60,
      questions: [
        { text: "document.querySelector('#menu') เลือก element ใด?", explanation: "querySelector('#menu') เลือก element แรกที่มี id='menu' เทียบเท่ากับ getElementById('menu')", choices: [{ text: "element ที่มี id='menu'", isCorrect: true }, { text: "ทุก element ที่มี class='menu'", isCorrect: false }, { text: "tag <menu>", isCorrect: false }, { text: "element แรกที่มี name='menu'", isCorrect: false }] },
        { text: "addEventListener ใช้ทำอะไร?", explanation: "addEventListener ผูก event handler กับ element เพื่อ respond เมื่อ event นั้นเกิดขึ้น", choices: [{ text: "ผูก event handler กับ element", isCorrect: true }, { text: "สร้าง element ใหม่", isCorrect: false }, { text: "ลบ event ออกจาก element", isCorrect: false }, { text: "Dispatch event ไปยัง element", isCorrect: false }] },
        { text: "event.preventDefault() ทำอะไร?", explanation: "preventDefault() ยกเลิก default behavior ของ browser เช่น ป้องกันหน้า reload เมื่อ submit form", choices: [{ text: "ยกเลิก default behavior ของ browser", isCorrect: true }, { text: "หยุดการ propagation ของ event", isCorrect: false }, { text: "ลบ event listener", isCorrect: false }, { text: "สร้าง event ใหม่", isCorrect: false }] },
      ],
    }],
    "c-intro": [{
      title: "Quiz: C Programming พื้นฐาน",
      passingScore: 60,
      questions: [
        {
          text: "ฟังก์ชัน printf() อยู่ใน header file ใด?",
          explanation: "printf() อยู่ใน <stdio.h> ซึ่งย่อมาจาก Standard Input/Output",
          choices: [
            { text: "<stdio.h>", isCorrect: true },
            { text: "<stdlib.h>", isCorrect: false },
            { text: "<string.h>", isCorrect: false },
            { text: "<math.h>", isCorrect: false },
          ],
        },
        {
          text: "ประเภทข้อมูล int ใน C เก็บข้อมูลประเภทใด?",
          explanation: "int เก็บตัวเลขจำนวนเต็ม ปกติมีขนาด 4 bytes",
          choices: [
            { text: "จำนวนเต็ม (integer)", isCorrect: true },
            { text: "ทศนิยม (decimal)", isCorrect: false },
            { text: "ข้อความ (string)", isCorrect: false },
            { text: "ตัวอักษร (character)", isCorrect: false },
          ],
        },
        {
          text: "ทุก program ภาษา C ต้องมีฟังก์ชันอะไร?",
          explanation: "main() คือจุดเริ่มต้นของทุก C program การทำงานเริ่มจาก main()",
          choices: [
            { text: "main()", isCorrect: true },
            { text: "start()", isCorrect: false },
            { text: "begin()", isCorrect: false },
            { text: "init()", isCorrect: false },
          ],
        },
      ],
    }],
  };

  for (const [lessonSlug, quizzes] of Object.entries(quizData)) {
    const lesson = await prisma.lesson.findUnique({ where: { slug: lessonSlug } });
    if (!lesson) continue;

    // Delete old placeholder quizzes
    await prisma.quiz.deleteMany({ where: { lessonId: lesson.id } });

    for (const q of quizzes) {
      await prisma.quiz.create({
        data: {
          lessonId: lesson.id,
          title: q.title,
          passingScore: q.passingScore,
          questions: {
            create: q.questions.map((ques, qi) => ({
              text: ques.text,
              type: "MULTIPLE_CHOICE" as const,
              order: qi + 1,
              points: 1,
              explanation: ques.explanation,
              choices: {
                create: ques.choices.map((c, ci) => ({
                  text: c.text,
                  isCorrect: c.isCorrect,
                  order: ci + 1,
                })),
              },
            })),
          },
        },
      });
    }
    console.log(`    ✅ Quiz: ${lessonSlug}`);
  }
  console.log("  ✅ Seeded: Quiz questions");
}

async function seedHTMLCSSMastery(courseId: string) {
  console.log("  📘 Seeding: HTML & CSS Mastery...");
  await prisma.section.deleteMany({ where: { courseId } });
  await prisma.course.update({ where: { id: courseId }, data: { totalLessons: 0 } });

  const sections = [
    {
      title: "HTML Mastery",
      order: 1,
      lessons: [
        {
          slug: "html-what-is",
          title: "HTML คืออะไร?",
          isFree: true,
          duration: 15,
          content: `# HTML คืออะไร?

## สิ่งที่คุณจะเรียนรู้
- HTML คืออะไร และทำงานอย่างไร
- ความแตกต่างระหว่าง HTML, CSS และ JavaScript
- โครงสร้างพื้นฐานของ tag และ element
- ประวัติและวิวัฒนาการของ HTML
- ทำไม HTML ถึงสำคัญมากสำหรับนักพัฒนาเว็บ

---

## HTML คืออะไร?

**HTML** ย่อมาจาก **HyperText Markup Language** — มันไม่ใช่ภาษาโปรแกรม แต่เป็น **ภาษาสำหรับกำหนดโครงสร้าง** ของหน้าเว็บ

ลองนึกภาพว่าคุณกำลังสร้างบ้าน:
- **HTML** = โครงสร้างบ้าน (ผนัง, หลังคา, ประตู, หน้าต่าง)
- **CSS** = การตกแต่ง (สีทา, วอลเปเปอร์, เฟอร์นิเจอร์)
- **JavaScript** = ระบบไฟฟ้า น้ำประปา (ทำให้บ้านใช้งานได้จริง)

ทุกหน้าเว็บที่คุณเคยเห็นบนอินเทอร์เน็ต ไม่ว่าจะเป็น Google, Facebook, หรือ YouTube ล้วนมี HTML เป็นพื้นฐานทั้งสิ้น

---

## Tag คืออะไร?

HTML ทำงานด้วย **tag** (เรียกว่า "แท็ก") ซึ่งห่อหุ้มเนื้อหาเพื่อบอก browser ว่าเนื้อหานั้นคืออะไร

\`\`\`
<tagname>เนื้อหา</tagname>
  ↑                  ↑
opening tag       closing tag
\`\`\`

ตัวอย่างเช่น:
- \`<h1>สวัสดี</h1>\` — บอกว่า "สวัสดี" คือหัวข้อหลัก
- \`<p>ข้อความ</p>\` — บอกว่านี่คือย่อหน้า
- \`<img src="photo.jpg">\` — แสดงรูปภาพ (บาง tag ไม่มี closing tag)

> 💡 **Tip:** Browser อ่าน HTML จากบนลงล่าง ซ้ายไปขวา แล้วแปลง tag เหล่านี้ให้เป็นหน้าเว็บที่เราเห็น

---

## วิวัฒนาการของ HTML

| เวอร์ชัน | ปี | สิ่งสำคัญ |
|---|---|---|
| HTML 1.0 | 1993 | เวอร์ชันแรก สร้างโดย Tim Berners-Lee |
| HTML 4.01 | 1999 | มาตรฐานหลักที่ใช้กันหลายปี |
| XHTML | 2000 | HTML ที่เข้มงวดขึ้น (ต้องปิด tag ทุกตัว) |
| HTML5 | 2014 | มาตรฐานปัจจุบัน รองรับ video, audio, canvas โดยตรง |

HTML5 คือเวอร์ชันที่เราใช้ในปัจจุบัน ซึ่งเพิ่มความสามารถมากมาย เช่น เล่นวิดีโอได้โดยไม่ต้องลง Flash, วาดรูปด้วย Canvas, และ semantic elements ที่ช่วย SEO

---

## องค์กรที่ดูแล HTML

- **W3C (World Wide Web Consortium)** — ออก specification อย่างเป็นทางการ
- **WHATWG (Web Hypertext Application Technology Working Group)** — ดูแล HTML Living Standard ที่อัปเดตต่อเนื่อง (ส่วนใหญ่ browser ใช้ standard นี้)

---

## HTML, CSS, JavaScript ต่างกันอย่างไร?

สมมติคุณอยากทำปุ่ม "สมัครสมาชิก":

- **HTML** เขียน \`<button>สมัครสมาชิก</button>\` — ทำให้มีปุ่มขึ้นมา (แต่ดูไม่สวย)
- **CSS** ตกแต่งสีสัน ขนาด รูปทรง ให้ปุ่มดูสวยงาม
- **JavaScript** ทำให้เมื่อกดปุ่มแล้วส่งข้อมูลไปยัง server ได้จริง

> ⚠️ **ข้อควรระวัง:** ผู้เริ่มต้นหลายคนสับสนว่า HTML เป็นภาษาโปรแกรม — จริงๆ แล้ว HTML คือ **markup language** ที่ใช้อธิบายโครงสร้าง ไม่ใช่สั่งให้คอมพิวเตอร์คำนวณอะไร

---

## กระบวนการทำงานของ Browser

เมื่อคุณเปิดเว็บไซต์:

1. Browser ส่งคำขอ (request) ไปยัง server
2. Server ส่ง HTML กลับมา
3. Browser อ่าน HTML และสร้าง **DOM (Document Object Model)** — โครงสร้างต้นไม้ของ elements
4. Browser โหลด CSS และปรับแต่งรูปลักษณ์
5. Browser โหลด JavaScript และทำให้เว็บโต้ตอบได้
6. หน้าเว็บปรากฏให้คุณเห็น

---

## สรุป

HTML คือรากฐานของทุกเว็บไซต์ การเรียนรู้ HTML อย่างแน่นหนาจะทำให้คุณเข้าใจว่าเว็บทำงานอย่างไร และเป็นพื้นฐานสำคัญก่อนเรียน CSS และ JavaScript ต่อไป`,
          codeExamples: [
            {
              title: "หน้าเว็บ HTML อย่างง่าย",
              language: "html",
              code: `<!DOCTYPE html>
<html>
<head>
  <title>หน้าแรกของฉัน</title>
</head>
<body>
  <h1>สวัสดี โลก!</h1>
  <p>นี่คือหน้าเว็บแรกของฉัน</p>
</body>
</html>`,
              explanation: "โครงสร้างพื้นฐานของทุกหน้าเว็บ ประกอบด้วย DOCTYPE, html, head, และ body",
            },
          ],
        },
        {
          slug: "html-document-structure",
          title: "โครงสร้าง HTML Document",
          isFree: true,
          duration: 15,
          content: `# โครงสร้าง HTML Document

## สิ่งที่คุณจะเรียนรู้
- 4 ส่วนหลักของทุก HTML Document
- ความแตกต่างระหว่าง \`<head>\` และ \`<body>\`
- บทบาทของ \`<!DOCTYPE html>\` และทำไมต้องมี
- การใช้ \`lang\` attribute เพื่อช่วย accessibility และ SEO
- มาตรฐาน HTML5 Document ที่ถูกต้อง

---

## ภาพรวม: ทุก HTML Document มีโครงสร้างเดียวกัน

ไม่ว่าจะเป็นเว็บเล็กหรือใหญ่ ทุก HTML Document จะมีโครงสร้างเหมือนกันเสมอ — เหมือนจดหมายที่ต้องมีหัวจดหมาย, ชื่อผู้รับ, เนื้อหา, และลายเซ็นตามลำดับ

---

## ส่วนที่ 1: \`<!DOCTYPE html>\`

\`\`\`html
<!DOCTYPE html>
\`\`\`

**DOCTYPE** บอก browser ว่า "ไฟล์นี้เป็น HTML5 นะ" ต้องอยู่บรรทัดแรกสุดเสมอ ก่อนทุกอย่าง

**ทำไมต้องมี?** ถ้าไม่มี DOCTYPE browser จะเข้าสู่โหมด "Quirks Mode" ซึ่งแสดงผลแบบเก่าไม่สอดคล้องกับมาตรฐาน ทำให้หน้าเว็บดูผิดพลาดได้

> 💡 **Tip:** \`<!DOCTYPE html>\` ไม่ใช่ HTML tag ธรรมดา มันคือ "declaration" ที่บอก browser เวอร์ชันของภาษา

---

## ส่วนที่ 2: \`<html lang="th">\`

\`\`\`html
<html lang="th">
  ...ทุกอย่างอยู่ในนี้...
</html>
\`\`\`

\`<html>\` คือ **root element** ที่ห่อหุ้มทุกอย่างในหน้าเว็บ

**attribute \`lang\`** สำคัญมากเพราะ:
- บอก screen reader (โปรแกรมอ่านหน้าจอสำหรับผู้พิการทางสายตา) ให้ออกเสียงภาษาที่ถูกต้อง
- ช่วย browser แปลภาษาได้แม่นยำขึ้น
- ช่วย search engine เข้าใจว่าเว็บนี้เนื้อหาภาษาอะไร

ค่าที่ใช้บ่อย: \`lang="th"\` (ไทย), \`lang="en"\` (อังกฤษ), \`lang="ja"\` (ญี่ปุ่น)

---

## ส่วนที่ 3: \`<head>\` — สมองของหน้าเว็บ

\`\`\`html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ชื่อหน้าเว็บ</title>
  <link rel="stylesheet" href="style.css">
</head>
\`\`\`

\`<head>\` คือส่วนที่ **ไม่แสดงในหน้าเว็บ** แต่มีข้อมูลสำคัญมาก เปรียบได้กับ "สมอง" ที่ควบคุมการทำงาน

สิ่งที่อยู่ใน \`<head>\`:
- **\`<title>\`** — ชื่อที่แสดงในแท็บ browser และผลการค้นหา Google
- **\`<meta charset="UTF-8">\`** — กำหนด encoding ให้รองรับภาษาไทยและทุกภาษา
- **\`<meta name="viewport">\`** — ทำให้หน้าเว็บแสดงผลถูกต้องบนมือถือ
- **\`<link>\`** — เชื่อมต่อไฟล์ CSS ภายนอก
- **\`<script>\`** — เชื่อมต่อไฟล์ JavaScript

> ⚠️ **ข้อควรระวัง:** ถ้าไม่ใส่ \`<meta charset="UTF-8">\` ภาษาไทยอาจแสดงเป็นอักขระแปลกๆ เช่น "à¸ à¸²à¸©à¸²à¹„à¸—à¸¢" แทน "ภาษาไทย"

---

## ส่วนที่ 4: \`<body>\` — เนื้อหาของหน้าเว็บ

\`\`\`html
<body>
  <h1>สวัสดี โลก!</h1>
  <p>ทุกอย่างที่ผู้ใช้เห็นอยู่ที่นี่</p>
</body>
\`\`\`

\`<body>\` คือส่วนที่ผู้ใช้มองเห็นและโต้ตอบด้วย ทุก tag ที่แสดงผลในหน้าเว็บต้องอยู่ใน \`<body>\`

---

## เคล็ดลับสำคัญ: ลำดับการวาง \`<script>\`

\`\`\`html
<body>
  <h1>เนื้อหา</h1>

  <!-- วาง script ไว้ท้าย body เสมอ -->
  <script src="app.js"></script>
</body>
\`\`\`

**ทำไม?** เพราะถ้าวาง \`<script>\` ไว้ใน \`<head>\` browser จะหยุดโหลด HTML เพื่อรอ JS ก่อน ทำให้หน้าเว็บช้าลง วิธีที่ดีกว่าคือวาง script ท้าย body หรือใช้ attribute \`defer\`

---

## สรุป

โครงสร้าง HTML Document ที่ถูกต้องคือรากฐานของทุกอย่าง การจำโครงสร้างนี้ให้ขึ้นใจจะทำให้คุณเขียนเว็บได้อย่างมั่นใจและถูกต้องตามมาตรฐาน`,
          codeExamples: [
            {
              title: "โครงสร้าง HTML Document สมบูรณ์",
              language: "html",
              code: `<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ชื่อหน้าเว็บ</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <h1>เนื้อหาอยู่ใน body</h1>
  <p>ทุกอย่างที่ต้องการให้แสดงผล ให้วางใน body</p>
  <script src="app.js"></script>
</body>
</html>`,
              explanation: "โครงสร้างมาตรฐาน HTML5 พร้อม charset, viewport meta และ lang attribute",
            },
          ],
        },
        {
          slug: "html-metadata",
          title: "Metadata Tags",
          isFree: true,
          duration: 12,
          content: `# Metadata Tags และ Head Elements

## สิ่งที่คุณจะเรียนรู้
- Meta tags คืออะไร และทำไมถึงสำคัญ
- Meta tags ที่ต้องมีในทุกหน้าเว็บ
- วิธีทำให้เว็บแสดงผลถูกต้องบนมือถือด้วย viewport
- Meta tags สำหรับ SEO และ Social Media
- ความแตกต่างระหว่าง meta tags ต่างๆ

---

## Meta Tags คืออะไร?

\`<meta>\` tag อยู่ใน \`<head>\` และทำหน้าที่ **ให้ข้อมูลเพิ่มเติม** แก่ browser, search engine, และ social media — ผู้ใช้มองไม่เห็น meta tags แต่มันส่งผลต่อประสบการณ์และ SEO อย่างมาก

เปรียบได้กับ "ป้ายข้อมูล" ที่ติดหลังกล่องสินค้า — ผู้ซื้อไม่เห็น แต่ระบบโลจิสติกส์ใช้ข้อมูลนั้นในการจัดการสินค้า

---

## 1. charset — การเข้ารหัสตัวอักษร (จำเป็นมากที่สุด)

\`\`\`html
<meta charset="UTF-8">
\`\`\`

**UTF-8** คือ encoding ที่รองรับทุกภาษาในโลก รวมถึงภาษาไทย, ญี่ปุ่น, อาหรับ, emoji และอีกกว่า 140,000 อักขระ

ต้องวางเป็นอันดับแรกสุดใน \`<head>\` เพื่อให้ browser อ่านก่อนที่จะ render เนื้อหา

> ⚠️ **ข้อควรระวัง:** ถ้าลืมใส่ charset หรือใช้ encoding ผิด ภาษาไทยจะกลายเป็นอักขระแปลกๆ ที่อ่านไม่ออก

---

## 2. viewport — สำคัญมากสำหรับมือถือ

\`\`\`html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
\`\`\`

- **\`width=device-width\`** — ให้ความกว้างของหน้าเว็บเท่ากับความกว้างของหน้าจออุปกรณ์
- **\`initial-scale=1.0\`** — เริ่มต้น zoom 100% (ไม่ zoom in หรือ zoom out)

**ทำไมสำคัญ?** ถ้าไม่มี viewport meta tag browser บนมือถือจะแสดงหน้าเว็บเหมือน desktop แล้วย่อส่วนทั้งหมด ทำให้อักษรเล็กมากจนอ่านไม่ออก

---

## 3. description — สำหรับ Google Search

\`\`\`html
<meta name="description" content="เรียน HTML CSS JavaScript ฟรี พร้อมตัวอย่างโค้ดทุกบท เหมาะสำหรับมือใหม่ไม่มีพื้นฐาน">
\`\`\`

ข้อความนี้จะแสดงใต้ชื่อเว็บใน Google Search Results ความยาวที่เหมาะสมคือ **120-160 ตัวอักษร**

> 💡 **Tip:** เขียน description ให้น่าคลิก บอกประโยชน์ที่ผู้ใช้จะได้รับ เพราะมันส่งผลต่อ Click-Through Rate (CTR) โดยตรง

---

## 4. robots — ควบคุม Search Engine

\`\`\`html
<meta name="robots" content="index, follow">
\`\`\`

| ค่า | ความหมาย |
|---|---|
| \`index\` | ให้ Google index หน้านี้ |
| \`noindex\` | ไม่ให้ Google index |
| \`follow\` | ให้ Google ติดตามลิงก์ในหน้านี้ |
| \`nofollow\` | ไม่ให้ติดตามลิงก์ |

ใช้ \`noindex\` สำหรับหน้าที่ไม่ต้องการให้คนอื่นเจอ เช่น หน้า admin, หน้า thank you

---

## 5. Open Graph — สำหรับ Social Media

\`\`\`html
<meta property="og:title" content="TeachCode — เรียนโค้ดออนไลน์">
<meta property="og:description" content="เรียน HTML CSS JavaScript ฟรี">
<meta property="og:image" content="https://teachcode.dev/og-image.jpg">
<meta property="og:url" content="https://teachcode.dev">
\`\`\`

เมื่อแชร์ลิงก์บน Facebook, LINE, Twitter — platform เหล่านี้จะอ่าน Open Graph tags เพื่อสร้าง preview card ที่สวยงาม

---

## สรุป

Meta tags เหมือน "นามบัตร" ของหน้าเว็บ ทั้ง browser, Google, และ social media ต่างใช้ข้อมูลเหล่านี้ในการแสดงผล การตั้งค่า meta tags อย่างถูกต้องช่วยให้เว็บติด Google ง่ายขึ้นและดูดีเมื่อแชร์ใน social media`,
          codeExamples: [
            {
              title: "Meta Tags ครบชุด",
              language: "html",
              code: `<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="เรียนโปรแกรมมิ่งออนไลน์ฟรี">
  <meta name="keywords" content="HTML, CSS, JavaScript, โปรแกรมมิ่ง">
  <meta name="author" content="TeachCode">
  <meta name="robots" content="index, follow">
  <title>TeachCode — เรียนโค้ดฟรี</title>
</head>`,
              explanation: "ตัวอย่าง meta tags ครบชุดที่ควรมีในทุกหน้าเว็บ",
            },
          ],
        },
        {
          slug: "html-text-elements",
          title: "Text Elements",
          isFree: false,
          duration: 20,
          content: `# Text Elements — ข้อความใน HTML

## สิ่งที่คุณจะเรียนรู้
- Headings 6 ระดับ และหลักการใช้อย่างถูกต้อง
- ความแตกต่างระหว่าง \`<strong>\` กับ \`<b>\` และ \`<em>\` กับ \`<i>\`
- Text tags พิเศษสำหรับสถานการณ์ต่างๆ
- ทำไม semantic HTML ถึงสำคัญกว่าแค่ทำให้ดูสวย
- หลักการจัด heading hierarchy ที่ถูกต้อง

---

## Headings — หัวข้อ 6 ระดับ

HTML มี heading 6 ระดับ ตั้งแต่ \`<h1>\` (ใหญ่ที่สุด) ถึง \`<h6>\` (เล็กที่สุด)

\`\`\`html
<h1>หัวข้อหลัก</h1>     <!-- ใหญ่สุด, สำคัญที่สุด -->
<h2>หัวข้อรอง</h2>
<h3>หัวข้อย่อย</h3>
<h4>หัวข้อระดับ 4</h4>
<h5>หัวข้อระดับ 5</h5>
<h6>หัวข้อระดับ 6</h6>  <!-- เล็กสุด -->
\`\`\`

**กฎสำคัญ:**
- **\`<h1>\` ควรมีแค่ 1 อันต่อหน้า** — Google ใช้ h1 เพื่อเข้าใจว่าหน้านี้เกี่ยวกับอะไร
- อย่าข้ามระดับ เช่น จาก h1 ไป h3 โดยไม่มี h2 — มันเหมือนหนังสือที่ข้ามบทไปเลย
- ใช้ heading เพื่อ **โครงสร้าง** ไม่ใช่เพื่อขนาดตัวอักษร (ถ้าอยากใหญ่ใช้ CSS แทน)

> 💡 **Tip:** นึกภาพ headings เหมือน **สารบัญหนังสือ** — h1 คือชื่อหนังสือ, h2 คือบท, h3 คือหัวข้อย่อยในบท

---

## Paragraph — ย่อหน้า

\`\`\`html
<p>นี่คือย่อหน้าแรก Browser จะเว้นบรรทัดก่อนและหลังโดยอัตโนมัติ</p>
<p>นี่คือย่อหน้าที่สอง มีช่องว่างระหว่างย่อหน้า</p>
\`\`\`

> ⚠️ **ข้อควรระวัง:** การกด Enter ใน HTML ไม่ได้ขึ้นบรรทัดใหม่ในหน้าเว็บ ต้องใช้ \`<br>\` หรือ \`<p>\` แยกย่อหน้า

---

## ตัวหนาและตัวเอียง — Semantic vs Style

นี่คือความแตกต่างที่นักพัฒนาหลายคนสับสน:

| Tag | ประเภท | ความหมาย | แสดงผล |
|---|---|---|---|
| \`<strong>\` | Semantic | "ข้อความนี้สำคัญมาก" | **ตัวหนา** |
| \`<b>\` | Style เท่านั้น | "แค่ทำให้หนา" | **ตัวหนา** |
| \`<em>\` | Semantic | "เน้นย้ำข้อความนี้" | *ตัวเอียง* |
| \`<i>\` | Style เท่านั้น | "แค่ทำให้เอียง" | *ตัวเอียง* |

**ทำไมต้องแยก?** Screen reader (โปรแกรมสำหรับผู้พิการทางสายตา) จะ**ออกเสียงต่างกัน** เมื่อเจอ \`<strong>\` และ \`<em>\` — ให้ใช้ \`<strong>\` และ \`<em>\` เสมอเมื่อต้องการ semantic meaning

---

## Text Tags พิเศษ

### \`<mark>\` — ไฮไลต์
\`\`\`html
<p>สิ่งสำคัญที่สุดคือ <mark>การฝึกเขียนโค้ดทุกวัน</mark></p>
\`\`\`

### \`<sub>\` และ \`<sup>\` — ตัวห้อยและตัวยก
\`\`\`html
<p>น้ำคือ H<sub>2</sub>O และ x<sup>2</sup> คือ x ยกกำลัง 2</p>
\`\`\`

### \`<del>\` และ \`<ins>\` — ขีดฆ่าและเพิ่มใหม่
\`\`\`html
<p>ราคา <del>1,000 บาท</del> <ins>799 บาท</ins></p>
\`\`\`
ใช้บ่อยในหน้าสินค้าเพื่อแสดงราคาลด

### \`<blockquote>\` — อ้างอิง
\`\`\`html
<blockquote cite="https://example.com">
  "การเขียนโค้ดคือทักษะที่เรียนรู้ได้ทุกคน"
</blockquote>
\`\`\`

### \`<code>\` — โค้ด
\`\`\`html
<p>ใช้ <code>console.log()</code> เพื่อ debug</p>
\`\`\`

### \`<br>\` — ขึ้นบรรทัดใหม่
\`\`\`html
<p>บรรทัดแรก<br>บรรทัดที่สอง</p>
\`\`\`

> ⚠️ **ข้อควรระวัง:** อย่าใช้ \`<br>\` เพื่อสร้างช่องว่างระหว่างย่อหน้า ให้ใช้ \`<p>\` แทน และใช้ CSS สำหรับ spacing

---

## สรุป

HTML text elements ไม่ได้มีแค่เรื่องหน้าตา แต่มีความหมาย (semantic) ที่ส่งผลต่อ SEO และ accessibility การเลือก tag ที่ถูกต้องทำให้เว็บของคุณดีทั้งสำหรับผู้ใช้และ Google`,
          codeExamples: [
            {
              title: "Text Elements ทุกประเภท",
              language: "html",
              code: `<h1>หัวข้อระดับ 1</h1>
<h2>หัวข้อระดับ 2</h2>
<h3>หัวข้อระดับ 3</h3>

<p>นี่คือย่อหน้าปกติ <strong>ข้อความสำคัญ</strong> และ <em>ข้อความเน้น</em></p>

<p>H<sub>2</sub>O คือน้ำ และ x<sup>2</sup> คือ x ยกกำลัง 2</p>

<p><mark>ไฮไลต์สีเหลือง</mark> และ <small>ข้อความเล็ก</small></p>

<p><del>ราคาเก่า 500 บาท</del> <ins>ราคาใหม่ 350 บาท</ins></p>

<blockquote>
  "การเขียนโค้ดคือศิลปะ" — ไม่รู้ใครพูด
</blockquote>`,
              explanation: "รวม text tags ทุกประเภทในตัวอย่างเดียว",
            },
          ],
        },
        {
          slug: "html-lists",
          title: "Lists",
          isFree: false,
          duration: 12,
          content: `# Lists — รายการใน HTML

## สิ่งที่คุณจะเรียนรู้
- 3 ประเภทของ list ใน HTML และใช้เมื่อไหร่
- วิธีสร้าง Unordered List, Ordered List, และ Description List
- การทำ nested list (รายการซ้อนกัน)
- Attributes พิเศษของ \`<ol>\` เช่น \`type\`, \`start\`, \`reversed\`
- ตัวอย่างการใช้งานจริงในเว็บไซต์

---

## ทำไมต้องใช้ List Tags?

หลายคนอาจคิดว่าจะใช้ \`<div>\` + \`<br>\` แทน List ก็ได้ แต่ List Tags มีข้อดีที่ชัดเจน:
- **Semantic** — screen reader รู้ว่านี่คือ "รายการ" มีกี่รายการ
- **Styling** — CSS target ได้ง่ายด้วย \`li\`, \`ul\`, \`ol\`
- **SEO** — Google เข้าใจโครงสร้างข้อมูลดีขึ้น

---

## 1. Unordered List — รายการไม่มีลำดับ

ใช้เมื่อลำดับไม่สำคัญ เช่น รายการวัตถุดิบ, คุณสมบัติสินค้า, เมนู navigation

\`\`\`html
<ul>
  <li>HTML</li>
  <li>CSS</li>
  <li>JavaScript</li>
</ul>
\`\`\`

Browser แสดงเป็นจุด (•) หน้าแต่ละรายการ สามารถเปลี่ยนสไตล์ด้วย CSS property \`list-style-type\`

---

## 2. Ordered List — รายการมีลำดับ

ใช้เมื่อลำดับสำคัญ เช่น ขั้นตอนการติดตั้ง, อันดับ Top 10, สูตรอาหาร

\`\`\`html
<ol>
  <li>เปิด Text Editor</li>
  <li>สร้างไฟล์ index.html</li>
  <li>เขียน HTML</li>
  <li>เปิดใน Browser</li>
</ol>
\`\`\`

### Attributes พิเศษของ \`<ol>\`

\`\`\`html
<!-- เริ่มนับจาก 5 -->
<ol start="5">
  <li>รายการที่ 5</li>
  <li>รายการที่ 6</li>
</ol>

<!-- นับถอยหลัง -->
<ol reversed>
  <li>อันดับ 3</li>
  <li>อันดับ 2</li>
  <li>อันดับ 1</li>
</ol>

<!-- ใช้ตัวอักษรแทนตัวเลข -->
<ol type="A">
  <li>ตัวเลือก A</li>
  <li>ตัวเลือก B</li>
</ol>
\`\`\`

---

## 3. Description List — รายการคำอธิบาย

ใช้สำหรับคำศัพท์ + คำอธิบาย, Q&A, glossary

\`\`\`html
<dl>
  <dt>HTML</dt>
  <dd>ภาษาสำหรับกำหนดโครงสร้างเว็บ</dd>

  <dt>CSS</dt>
  <dd>ภาษาสำหรับตกแต่งหน้าตาเว็บ</dd>

  <dt>JavaScript</dt>
  <dd>ภาษาโปรแกรมที่ทำให้เว็บโต้ตอบได้</dd>
</dl>
\`\`\`

- \`<dl>\` = Description List (container)
- \`<dt>\` = Description Term (คำ/หัวข้อ)
- \`<dd>\` = Description Details (คำอธิบาย)

---

## 4. Nested List — รายการซ้อนกัน

วาง \`<ul>\` หรือ \`<ol>\` ไว้ใน \`<li>\` ได้เลย สร้างได้หลายระดับ

\`\`\`html
<ul>
  <li>Frontend Development
    <ul>
      <li>HTML</li>
      <li>CSS
        <ul>
          <li>Flexbox</li>
          <li>Grid</li>
        </ul>
      </li>
      <li>JavaScript</li>
    </ul>
  </li>
  <li>Backend Development</li>
</ul>
\`\`\`

> ⚠️ **ข้อควรระวัง:** อย่าซ้อน list เกิน 3 ระดับ เพราะจะอ่านยากและ UX ไม่ดี

---

## การใช้งานในชีวิตจริง

List ใช้บ่อยมากในเว็บ เช่น:
- **Navigation menu** — ใช้ \`<ul>\` + \`<li>\` + \`<a>\`
- **Breadcrumb** — ใช้ \`<ol>\` เพราะมีลำดับ (หน้าแรก > หมวด > บทความ)
- **Feature list** — ใช้ \`<ul>\` แสดงคุณสมบัติสินค้า
- **FAQ** — ใช้ \`<dl>\` คู่ถาม-ตอบ

---

## สรุป

List tags ใน HTML มีมากกว่าแค่ "จุดกลม" และ "ตัวเลข" — มันมี semantic ที่สำคัญ และมี attributes ที่ยืดหยุ่น การเลือกใช้ list ประเภทที่ถูกต้องทำให้โค้ดมีความหมายและดูแลรักษาง่ายขึ้น`,
          codeExamples: [
            {
              title: "Lists ทุกประเภท",
              language: "html",
              code: `<!-- Unordered List -->
<ul>
  <li>HTML</li>
  <li>CSS</li>
  <li>JavaScript</li>
</ul>

<!-- Ordered List -->
<ol>
  <li>เปิด editor</li>
  <li>เขียนโค้ด</li>
  <li>บันทึกไฟล์</li>
  <li>เปิดใน browser</li>
</ol>

<!-- Description List -->
<dl>
  <dt>HTML</dt>
  <dd>ภาษาสำหรับโครงสร้างเว็บ</dd>
  <dt>CSS</dt>
  <dd>ภาษาสำหรับตกแต่งเว็บ</dd>
</dl>

<!-- Nested List -->
<ul>
  <li>Frontend
    <ul>
      <li>HTML</li>
      <li>CSS</li>
    </ul>
  </li>
  <li>Backend</li>
</ul>`,
              explanation: "ตัวอย่าง ul, ol, dl และ nested list",
            },
          ],
        },
        {
          slug: "html-links",
          title: "Links — การเชื่อมโยง",
          isFree: false,
          duration: 12,
          content: `# Links และ Navigation

## สิ่งที่คุณจะเรียนรู้
- \`<a>\` tag ทำงานอย่างไรและ attributes สำคัญ
- ความแตกต่างระหว่าง absolute URL, relative URL, และ anchor link
- ทำไมต้องใช้ \`rel="noopener noreferrer"\` กับ \`target="_blank"\`
- Link พิเศษ: email, โทรศัพท์, ดาวน์โหลดไฟล์
- หลักการ accessibility สำหรับ links

---

## Anchor Tag คืออะไร?

\`<a>\` (ย่อจาก anchor) คือ tag สำหรับสร้าง **hyperlink** — จุดที่ผู้ใช้คลิกแล้วไปยังที่อื่น Internet ทำงานได้เพราะ link เชื่อมโยงหน้าเว็บถึงกัน

\`\`\`html
<a href="URL">ข้อความที่แสดง</a>
\`\`\`

---

## href — กำหนดปลายทาง

### Absolute URL — ที่อยู่เต็ม

\`\`\`html
<a href="https://www.google.com">ไปที่ Google</a>
\`\`\`

ใช้เมื่อลิงก์ไปเว็บอื่น ต้องใส่ \`https://\` เสมอ

### Relative URL — ที่อยู่สัมพัทธ์

\`\`\`html
<a href="/about">เกี่ยวกับเรา</a>         <!-- จาก root ของ domain -->
<a href="contact.html">ติดต่อเรา</a>       <!-- ไฟล์ในโฟลเดอร์เดียวกัน -->
<a href="../index.html">กลับหน้าแรก</a>   <!-- ขึ้นไปโฟลเดอร์บน -->
\`\`\`

ใช้เมื่อลิงก์ไปหน้าอื่นในเว็บเดียวกัน ดีกว่า absolute URL เพราะย้าย server ได้โดยไม่ต้องแก้ลิงก์

### Anchor Link — ไปยังส่วนในหน้าเดียวกัน

\`\`\`html
<!-- ลิงก์ -->
<a href="#section-3">ไปที่ส่วนที่ 3</a>

<!-- เป้าหมาย (ต้องมี id ตรงกัน) -->
<section id="section-3">
  <h2>ส่วนที่ 3</h2>
</section>
\`\`\`

---

## target — การเปิด Link

\`\`\`html
<!-- เปิดในแท็บเดิม (default) -->
<a href="/about" target="_self">เกี่ยวกับเรา</a>

<!-- เปิดแท็บใหม่ -->
<a href="https://google.com" target="_blank">Google</a>
\`\`\`

---

## rel — และเรื่องความปลอดภัยสำคัญมาก!

\`\`\`html
<!-- ✅ ถูกต้องและปลอดภัย -->
<a href="https://external.com" target="_blank" rel="noopener noreferrer">
  ลิงก์ภายนอก
</a>
\`\`\`

**ทำไมต้องใส่ \`rel="noopener noreferrer"\`?**

เมื่อใช้ \`target="_blank"\` หน้าเว็บใหม่จะมีสิทธิ์เข้าถึง \`window.opener\` ของหน้าเดิมได้ ซึ่งอาจถูกแฮกเกอร์ใช้เปลี่ยน URL ของหน้าเดิมให้ผู้ใช้ไม่รู้ตัว (Reverse Tabnapping attack)

- \`noopener\` — ป้องกันการเข้าถึง window.opener
- \`noreferrer\` — ไม่ส่งข้อมูล referrer ไปให้เว็บปลายทาง

> ⚠️ **ข้อควรระวัง:** ทุกครั้งที่ใช้ \`target="_blank"\` ต้องใส่ \`rel="noopener noreferrer"\` เสมอ

---

## Link พิเศษ

### Email Link
\`\`\`html
<a href="mailto:hello@teachcode.dev">ส่งอีเมลหาเรา</a>
<!-- เปิด email client อัตโนมัติ -->
\`\`\`

### โทรศัพท์
\`\`\`html
<a href="tel:+6681234567">โทร 081-234-5678</a>
<!-- บนมือถือจะโทรออกอัตโนมัติ -->
\`\`\`

### ดาวน์โหลดไฟล์
\`\`\`html
<a href="/files/resume.pdf" download="resume-john.pdf">ดาวน์โหลด CV</a>
<!-- download attribute บอกให้ browser ดาวน์โหลดแทนที่จะเปิด -->
\`\`\`

---

## Accessibility สำหรับ Links

\`\`\`html
<!-- ❌ ไม่ดี — screen reader จะอ่านว่า "คลิกที่นี่" ไม่รู้ไปไหน -->
<a href="/courses">คลิกที่นี่</a>

<!-- ✅ ดี — อธิบายปลายทางชัดเจน -->
<a href="/courses">ดูคอร์สทั้งหมด</a>

<!-- ✅ ดี — link ที่เป็นไอคอน ต้องมี aria-label -->
<a href="/cart" aria-label="ดูตะกร้าสินค้า">
  <svg>...</svg>
</a>
\`\`\`

---

## สรุป

\`<a>\` tag คือหัวใจของ internet — มันเชื่อมทุกอย่างเข้าด้วยกัน การใช้ href, target, และ rel อย่างถูกต้องทำให้เว็บของคุณทั้งใช้งานง่ายและปลอดภัย`,
          codeExamples: [
            {
              title: "Links ทุกรูปแบบ",
              language: "html",
              code: `<!-- ลิงก์ภายนอก -->
<a href="https://teachcode.dev">TeachCode</a>

<!-- เปิดแท็บใหม่ (ปลอดภัย) -->
<a href="https://google.com" target="_blank" rel="noopener noreferrer">
  Google (แท็บใหม่)
</a>

<!-- ลิงก์ภายใน -->
<a href="/courses">ดูคอร์สทั้งหมด</a>

<!-- Anchor link -->
<a href="#top">กลับด้านบน</a>

<!-- Email -->
<a href="mailto:hello@teachcode.dev">ส่งอีเมล</a>

<!-- ดาวน์โหลด -->
<a href="/docs/guide.pdf" download>ดาวน์โหลดคู่มือ</a>`,
              explanation: "ตัวอย่าง a tag ทุกรูปแบบ พร้อม rel สำหรับ external links",
            },
          ],
        },
        {
          slug: "html-images",
          title: "Images",
          isFree: false,
          duration: 15,
          content: `# Images และ Accessibility

## สิ่งที่คุณจะเรียนรู้
- \`<img>\` tag และ attributes ที่จำเป็น
- ทำไม \`alt\` text ถึงสำคัญมากทั้งสำหรับ accessibility และ SEO
- Lazy loading คืออะไร และช่วยได้อย่างไร
- Responsive images ด้วย srcset และ sizes
- \`<picture>\` element สำหรับ Art Direction

---

## Image Tag พื้นฐาน

\`<img>\` เป็น **self-closing tag** (ไม่มี closing tag) ใช้แสดงรูปภาพ

\`\`\`html
<img src="cat.jpg" alt="แมวสีส้มนอนบนโซฟา">
\`\`\`

---

## Attributes สำคัญ

### src — ที่อยู่ของรูป
\`\`\`html
<!-- รูปในโฟลเดอร์เดียวกัน -->
<img src="photo.jpg" alt="ภาพ">

<!-- รูปใน subfolder -->
<img src="images/hero.jpg" alt="Hero image">

<!-- รูปจาก URL ภายนอก -->
<img src="https://example.com/image.jpg" alt="ภาพจากอินเทอร์เน็ต">
\`\`\`

### alt — ข้อความแทนรูป (จำเป็นมาก!)

\`alt\` attribute คือข้อความที่แสดงเมื่อรูปโหลดไม่ได้ และที่ **screen reader ใช้อ่าน** ให้ผู้พิการทางสายตา

\`\`\`html
<!-- ✅ alt ที่ดี — อธิบายเนื้อหาของรูป -->
<img src="team.jpg" alt="ทีมงาน TeachCode 10 คนถ่ายรูปร่วมกันในออฟฟิศ">

<!-- ✅ รูปตกแต่ง — ใช้ alt="" เพื่อให้ screen reader ข้ามไป -->
<img src="divider.png" alt="">

<!-- ❌ alt ที่ไม่ดี — ไม่มีความหมาย -->
<img src="photo.jpg" alt="image1">
\`\`\`

> 💡 **Tip:** เขียน alt ราวกับคุณกำลังอธิบายรูปให้คนที่มองไม่เห็นฟัง ควรอธิบายว่ารูปแสดงอะไร ไม่ใช่แค่ "รูปภาพ"

### width และ height — ป้องกัน Layout Shift

\`\`\`html
<img src="hero.jpg" alt="Hero" width="800" height="450">
\`\`\`

การระบุขนาดล่วงหน้าทำให้ browser "จองพื้นที่" สำหรับรูปก่อนที่มันจะโหลดเสร็จ ป้องกัน CLS (Cumulative Layout Shift) ที่ทำให้หน้าเว็บกระโดดเมื่อรูปโหลด — ส่งผลดีต่อ Core Web Vitals และ SEO

### loading — Lazy Loading

\`\`\`html
<!-- โหลดเมื่อผู้ใช้เลื่อนหน้าถึงรูปนี้ -->
<img src="product.jpg" alt="สินค้า" loading="lazy">

<!-- โหลดทันที (default, สำหรับรูปที่เห็นทันที) -->
<img src="hero.jpg" alt="Hero" loading="eager">
\`\`\`

**Lazy loading** ช่วยประหยัด bandwidth และทำให้หน้าเว็บโหลดเร็วขึ้น เพราะรูปที่อยู่ด้านล่างจะโหลดเฉพาะเมื่อใกล้จะมองเห็น

> ⚠️ **ข้อควรระวัง:** ไม่ควรใช้ \`loading="lazy"\` กับรูปที่แสดงทันทีเมื่อโหลดหน้า (above the fold) เพราะจะทำให้ช้าลงแทน

---

## Responsive Images

### srcset — รูปหลายขนาด

\`\`\`html
<img
  src="photo-800.jpg"
  srcset="
    photo-480.jpg  480w,
    photo-800.jpg  800w,
    photo-1200.jpg 1200w
  "
  sizes="(max-width: 600px) 480px, 800px"
  alt="Responsive photo"
>
\`\`\`

- \`srcset\` — บอก browser ว่ามีรูปขนาดไหนบ้าง
- \`sizes\` — บอก browser ว่าที่หน้าจอแต่ละขนาดจะแสดงรูปกว้างเท่าไหร่
- Browser เลือกรูปที่เหมาะสมเองอัตโนมัติตามขนาดหน้าจอและ resolution

---

## \`<picture>\` Element — Art Direction

ใช้เมื่อต้องการแสดง**รูปที่ต่างออกไปเลย** (ไม่ใช่แค่ขนาดต่างกัน) ตามหน้าจอ

\`\`\`html
<picture>
  <!-- บนมือถือ: รูปตั้ง (portrait) -->
  <source media="(max-width: 768px)" srcset="hero-mobile.jpg">
  <!-- บน desktop: รูปนอน (landscape) -->
  <source media="(min-width: 769px)" srcset="hero-desktop.jpg">
  <!-- Fallback -->
  <img src="hero-desktop.jpg" alt="Hero banner">
</picture>
\`\`\`

---

## สรุป

รูปภาพมีผลต่อ performance, SEO, และ accessibility ของเว็บมาก การใส่ \`alt\` ที่ดี, กำหนด width/height, และใช้ lazy loading จะทำให้เว็บของคุณดีขึ้นอย่างมีนัยสำคัญ`,
          codeExamples: [
            {
              title: "Images พร้อม lazy loading และ responsive",
              language: "html",
              code: `<!-- รูปพื้นฐาน -->
<img src="cat.jpg" alt="แมวน่ารัก" width="400" height="300">

<!-- Lazy loading -->
<img src="hero.jpg" alt="Hero image" loading="lazy">

<!-- Responsive image -->
<img
  src="photo-800.jpg"
  srcset="photo-480.jpg 480w, photo-800.jpg 800w, photo-1200.jpg 1200w"
  sizes="(max-width: 600px) 480px, 800px"
  alt="Responsive photo"
>

<!-- Picture element -->
<picture>
  <source media="(max-width: 600px)" srcset="mobile.jpg">
  <source media="(min-width: 601px)" srcset="desktop.jpg">
  <img src="desktop.jpg" alt="Responsive picture">
</picture>`,
              explanation: "รูปภาพพร้อม lazy loading, srcset สำหรับ responsive, และ picture element",
            },
          ],
        },
        {
          slug: "html-tables",
          title: "Tables",
          isFree: false,
          duration: 15,
          content: `# Tables — ตาราง HTML

## สิ่งที่คุณจะเรียนรู้
- โครงสร้างตารางที่ถูกต้อง: thead, tbody, tfoot
- ความแตกต่างระหว่าง \`<th>\` และ \`<td>\`
- colspan และ rowspan สำหรับรวม cells
- \`scope\` attribute สำหรับ accessibility
- เมื่อไหร่ควรใช้ตาราง และเมื่อไหร่ไม่ควรใช้

---

## ตารางใช้ทำอะไร?

ตาราง HTML เหมาะสำหรับ **แสดงข้อมูลที่มีความสัมพันธ์แบบ rows และ columns** เช่น:
- ตารางเปรียบเทียบราคา plan
- ตารางข้อมูลนักเรียน/พนักงาน
- ตารางเวลาเรียน/ทำงาน
- รายงานทางการเงิน

> ⚠️ **ข้อควรระวัง:** ห้ามใช้ตารางสำหรับ layout หน้าเว็บ! นั่นเป็นวิธีเก่าที่ล้าสมัย ให้ใช้ CSS Flexbox หรือ Grid แทน

---

## โครงสร้างตาราง

\`\`\`
<table>
  ├── <caption>  ← ชื่อตาราง (optional แต่ดี)
  ├── <thead>    ← ส่วนหัวตาราง
  │     └── <tr> → <th> <th> <th>
  ├── <tbody>    ← เนื้อหาหลัก
  │     ├── <tr> → <td> <td> <td>
  │     └── <tr> → <td> <td> <td>
  └── <tfoot>    ← ส่วนท้าย (สรุป/รวม)
        └── <tr> → <td> <td> <td>
\`\`\`

---

## Tags ที่ต้องรู้

### \`<table>\` — Container หลัก
\`\`\`html
<table>
  <!-- เนื้อหาทั้งหมดอยู่ที่นี่ -->
</table>
\`\`\`

### \`<thead>\`, \`<tbody>\`, \`<tfoot>\`
ช่วย browser และ screen reader เข้าใจโครงสร้าง และยังช่วยในการ print (header ตารางแสดงซ้ำทุกหน้า)

### \`<tr>\` — Table Row (แถว)
### \`<th>\` — Table Header Cell
แสดงเป็น **ตัวหนาและกึ่งกลาง** โดยอัตโนมัติ มี semantic ว่าเป็น "ส่วนหัว"

### \`<td>\` — Table Data Cell
ข้อมูลจริงในตาราง

---

## scope Attribute — สำหรับ Accessibility

\`\`\`html
<thead>
  <tr>
    <th scope="col">ชื่อ</th>      <!-- หัวคอลัมน์ -->
    <th scope="col">อายุ</th>
    <th scope="col">แผนก</th>
  </tr>
</thead>
<tbody>
  <tr>
    <th scope="row">สมชาย</th>    <!-- หัวแถว -->
    <td>28</td>
    <td>Engineering</td>
  </tr>
</tbody>
\`\`\`

\`scope\` บอก screen reader ว่า \`<th>\` นี้เป็นหัวของ column หรือ row ทำให้ผู้พิการทางสายตาเข้าใจตารางได้

---

## colspan และ rowspan — รวม Cells

### colspan — รวมหลายคอลัมน์
\`\`\`html
<tr>
  <td colspan="3">ข้อมูลนี้กินพื้นที่ 3 คอลัมน์</td>
</tr>
\`\`\`

### rowspan — รวมหลายแถว
\`\`\`html
<tr>
  <td rowspan="2">ข้อมูลนี้กินพื้นที่ 2 แถว</td>
  <td>แถวที่ 1</td>
</tr>
<tr>
  <!-- ไม่ต้องมี td แรก เพราะถูก rowspan ข้างบนครอบแล้ว -->
  <td>แถวที่ 2</td>
</tr>
\`\`\`

---

## \`<caption>\` — ชื่อตาราง

\`\`\`html
<table>
  <caption>รายชื่อนักเรียนในห้อง 1/1 ปีการศึกษา 2568</caption>
  ...
</table>
\`\`\`

\`<caption>\` ช่วย accessibility มาก เพราะ screen reader จะอ่าน caption ก่อนเข้าตาราง

---

## สรุป

ตาราง HTML เมื่อเขียนถูกต้อง (พร้อม thead, tbody, th, scope, caption) จะทั้ง semantic, accessible, และ SEO-friendly ใช้ตารางเมื่อข้อมูลมีความสัมพันธ์แบบ 2 มิติ และใช้ Flexbox/Grid สำหรับ layout`,
          codeExamples: [
            {
              title: "ตารางข้อมูลภาษาโปรแกรม",
              language: "html",
              code: `<table border="1">
  <thead>
    <tr>
      <th>ภาษา</th>
      <th>ใช้ทำอะไร</th>
      <th>ความยาก</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>HTML</td>
      <td>โครงสร้างเว็บ</td>
      <td>ง่าย</td>
    </tr>
    <tr>
      <td>JavaScript</td>
      <td>ทำ Interactive</td>
      <td>ปานกลาง</td>
    </tr>
    <tr>
      <td>Python</td>
      <td>AI, Data Science</td>
      <td>ง่าย–ปานกลาง</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td colspan="3">ข้อมูล ณ ปี 2025</td>
    </tr>
  </tfoot>
</table>`,
              explanation: "ตารางครบทุก section พร้อม thead, tbody, tfoot และ colspan",
            },
          ],
        },
        {
          slug: "html-forms",
          title: "Forms",
          isFree: false,
          duration: 20,
          content: `# Forms — แบบฟอร์ม HTML

## สิ่งที่คุณจะเรียนรู้
- โครงสร้างของ form และ attributes สำคัญ
- Form elements ทุกประเภทและการใช้งาน
- ทำไม \`<label>\` ถึงสำคัญมาก
- ความแตกต่างระหว่าง GET และ POST
- การจัดกลุ่ม fields ด้วย fieldset และ legend

---

## Form คืออะไร?

Form คือ "ช่องทางสื่อสาร" ระหว่างผู้ใช้กับ server ทุกเว็บไซต์มี form ทั้งนั้น:
- หน้า Login / Register
- ช่อง Search
- แบบฟอร์มติดต่อ
- ตะกร้าสินค้าและการชำระเงิน

---

## \`<form>\` Element

\`\`\`html
<form action="/submit" method="POST">
  <!-- form elements อยู่ที่นี่ -->
</form>
\`\`\`

### action — URL ปลายทาง
URL ที่ browser จะส่งข้อมูล form ไปเมื่อกด submit ถ้าไม่ระบุ จะส่งไปที่ URL ปัจจุบัน

### method — วิธีส่งข้อมูล

| Method | เมื่อไหร่ใช้ | ข้อมูลอยู่ที่ไหน |
|---|---|---|
| \`GET\` | ค้นหา, filter, ดึงข้อมูล | URL query string |
| \`POST\` | ส่งข้อมูล, สร้าง, login | Request body (ไม่เห็นใน URL) |

> 💡 **Tip:** ใช้ GET สำหรับ search (ผู้ใช้ bookmark ได้), ใช้ POST สำหรับข้อมูลสำคัญ (รหัสผ่าน, ข้อมูลส่วนตัว)

---

## \`<label>\` — สำคัญมากที่สุด!

\`\`\`html
<!-- ✅ วิธีที่ถูกต้อง: ใช้ for ชี้ไป id -->
<label for="email">อีเมล:</label>
<input type="email" id="email" name="email">

<!-- ✅ วิธีอื่น: ครอบ input ไว้ใน label -->
<label>
  อีเมล:
  <input type="email" name="email">
</label>
\`\`\`

**ทำไม label สำคัญ?**
1. **Accessibility** — screen reader อ่านชื่อ field ให้ผู้ใช้
2. **UX** — คลิกที่ label แล้ว input รับ focus อัตโนมัติ (ง่ายกว่าการคลิก input เล็กๆ)
3. **เขียนถูกต้อง** — สำคัญสำหรับ form บนมือถือที่ input เล็ก

> ⚠️ **ข้อควรระวัง:** อย่าลืมเชื่อม label กับ input ด้วย \`for\` และ \`id\` ที่ตรงกัน ถ้าไม่ตรง label จะไม่ทำงาน

---

## Input Types หลัก

\`\`\`html
<input type="text">      <!-- ข้อความทั่วไป -->
<input type="email">     <!-- validate รูปแบบ email -->
<input type="password">  <!-- ซ่อนอักขระ -->
<input type="number">    <!-- ตัวเลขเท่านั้น -->
<input type="checkbox">  <!-- เลือกได้หลายอย่าง -->
<input type="radio">     <!-- เลือกได้อย่างเดียว -->
<input type="submit">    <!-- ปุ่ม submit -->
\`\`\`

---

## Form Elements อื่นๆ

### \`<textarea>\` — ข้อความหลายบรรทัด
\`\`\`html
<label for="message">ข้อความ:</label>
<textarea id="message" name="message" rows="5" cols="40">
  ข้อความเริ่มต้น
</textarea>
\`\`\`

### \`<select>\` — Dropdown
\`\`\`html
<label for="course">เลือกคอร์ส:</label>
<select id="course" name="course">
  <option value="">-- เลือกคอร์ส --</option>
  <option value="html">HTML & CSS</option>
  <option value="js">JavaScript</option>
  <option value="react" selected>React (เลือกไว้แล้ว)</option>
</select>
\`\`\`

### \`<button>\`
\`\`\`html
<button type="submit">ส่งข้อมูล</button>
<button type="reset">ล้างข้อมูล</button>
<button type="button">ปุ่มทั่วไป (JavaScript)</button>
\`\`\`

---

## \`<fieldset>\` และ \`<legend>\` — จัดกลุ่ม Fields

\`\`\`html
<form>
  <fieldset>
    <legend>ข้อมูลส่วนตัว</legend>
    <label for="name">ชื่อ:</label>
    <input type="text" id="name" name="name">
    <label for="age">อายุ:</label>
    <input type="number" id="age" name="age">
  </fieldset>

  <fieldset>
    <legend>ที่อยู่</legend>
    <label for="city">จังหวัด:</label>
    <input type="text" id="city" name="city">
  </fieldset>
</form>
\`\`\`

\`<fieldset>\` ช่วยจัดกลุ่ม fields ที่เกี่ยวข้องกัน ทำให้ form ซับซ้อนอ่านง่ายขึ้นและ accessible

---

## สรุป

Form ที่ดีต้องมี: label ทุก field, method ที่เหมาะสม, fieldset สำหรับจัดกลุ่ม และ validation ที่ถูกต้อง Forms เป็นจุดที่ผู้ใช้โต้ตอบกับเว็บมากที่สุด จึงต้องทำให้ใช้งานง่ายและ accessible`,
          codeExamples: [
            {
              title: "Registration Form",
              language: "html",
              code: `<form action="/register" method="POST">
  <fieldset>
    <legend>ข้อมูลส่วนตัว</legend>

    <label for="name">ชื่อ:</label>
    <input type="text" id="name" name="name" placeholder="ชื่อของคุณ">

    <label for="email">อีเมล:</label>
    <input type="email" id="email" name="email">

    <label for="password">รหัสผ่าน:</label>
    <input type="password" id="password" name="password">
  </fieldset>

  <fieldset>
    <legend>ความสนใจ</legend>

    <label for="course">คอร์สที่สนใจ:</label>
    <select id="course" name="course">
      <option value="">-- เลือกคอร์ส --</option>
      <option value="html">HTML</option>
      <option value="js">JavaScript</option>
      <option value="python">Python</option>
    </select>

    <label for="message">ข้อความ:</label>
    <textarea id="message" name="message" rows="4"></textarea>
  </fieldset>

  <button type="submit">สมัครสมาชิก</button>
</form>`,
              explanation: "Form ครบชุดพร้อม fieldset, label, input ทุกประเภท",
            },
          ],
        },
        {
          slug: "html-input-types",
          title: "Input Types",
          isFree: false,
          duration: 15,
          content: `# Input Types — ทุกประเภท Input ใน HTML

## สิ่งที่คุณจะเรียนรู้
- Input types ทุกประเภทและใช้เมื่อไหร่
- Browser UI ที่แตกต่างกันตาม type (โดยเฉพาะบนมือถือ)
- Attributes ประกอบ เช่น placeholder, min, max, step, accept
- checkbox vs radio — ความแตกต่างและการใช้งาน
- Hidden input — ใช้ส่งข้อมูลที่ซ่อน

---

## ทำไม Input Type ถึงสำคัญ?

การระบุ \`type\` ที่ถูกต้องมีประโยชน์หลายอย่าง:
1. **Browser validation** — บาง type มี validation อัตโนมัติ (เช่น email ตรวจว่ามี @ ไหม)
2. **Mobile keyboard** — บนมือถือจะแสดง keyboard ที่เหมาะสม (เช่น number แสดงแป้นตัวเลข)
3. **UI component** — บาง type แสดง date picker, color picker, หรือ slider อัตโนมัติ

---

## ประเภทข้อความ

\`\`\`html
<!-- ข้อความทั่วไป -->
<input type="text" placeholder="ชื่อของคุณ">

<!-- อีเมล: validate รูปแบบ, mobile แสดง @ ด้วย -->
<input type="email" placeholder="email@example.com">

<!-- รหัสผ่าน: ซ่อนอักขระ -->
<input type="password" placeholder="รหัสผ่านอย่างน้อย 8 ตัว">

<!-- ค้นหา: มีปุ่ม clear บน browser บางตัว -->
<input type="search" placeholder="ค้นหา...">

<!-- URL: validate รูปแบบ URL -->
<input type="url" placeholder="https://example.com">

<!-- เบอร์โทร: mobile แสดงแป้นโทรศัพท์ -->
<input type="tel" placeholder="081-234-5678">
\`\`\`

---

## ประเภทตัวเลข

\`\`\`html
<!-- Number: มีลูกศรเพิ่มลด, กรอกได้แค่ตัวเลข -->
<input type="number" min="0" max="100" step="5" value="50">

<!-- Range: slider ลาก -->
<input type="range" min="0" max="100" value="30" step="10">
\`\`\`

- \`min\` / \`max\` — ค่าต่ำสุดและสูงสุด
- \`step\` — กระโดดทีละเท่าไหร่ (ค่าเริ่มต้น = 1)

---

## วันที่และเวลา

\`\`\`html
<!-- วันที่: แสดง date picker -->
<input type="date" min="2024-01-01" max="2030-12-31">

<!-- เวลา -->
<input type="time">

<!-- วันที่ + เวลา -->
<input type="datetime-local">

<!-- เดือน -->
<input type="month">

<!-- สัปดาห์ -->
<input type="week">
\`\`\`

---

## ประเภทการเลือก

### Checkbox — เลือกได้หลายอย่าง
\`\`\`html
<p>ทักษะที่มี:</p>
<input type="checkbox" id="html" name="skills" value="html">
<label for="html">HTML</label>

<input type="checkbox" id="css" name="skills" value="css" checked>
<label for="css">CSS (เลือกไว้แล้ว)</label>

<input type="checkbox" id="js" name="skills" value="js">
<label for="js">JavaScript</label>
\`\`\`

### Radio — เลือกได้อย่างเดียว (ต้อง name เดียวกัน)
\`\`\`html
<p>ระดับความสามารถ:</p>
<input type="radio" id="beginner" name="level" value="beginner">
<label for="beginner">มือใหม่</label>

<input type="radio" id="intermediate" name="level" value="intermediate">
<label for="intermediate">ปานกลาง</label>

<input type="radio" id="advanced" name="level" value="advanced">
<label for="advanced">ขั้นสูง</label>
\`\`\`

> 💡 **Tip:** Radio buttons ที่มี \`name\` เดียวกันจะอยู่ใน "กลุ่ม" เดียวกัน เลือกได้แค่ 1 ตัวต่อกลุ่ม

---

## Input พิเศษ

### File Upload
\`\`\`html
<!-- รับไฟล์รูปทุกประเภท -->
<input type="file" accept="image/*">

<!-- รับเฉพาะ PDF และ Word -->
<input type="file" accept=".pdf,.doc,.docx">

<!-- เลือกได้หลายไฟล์ -->
<input type="file" multiple>
\`\`\`

### Color Picker
\`\`\`html
<input type="color" value="#3b82f6">
\`\`\`

### Hidden — ซ่อนข้อมูล
\`\`\`html
<!-- ส่งข้อมูลไปพร้อม form โดยผู้ใช้ไม่เห็น -->
<input type="hidden" name="userId" value="12345">
<input type="hidden" name="csrfToken" value="abc123xyz">
\`\`\`

ใช้สำหรับส่งข้อมูลที่จำเป็นแต่ผู้ใช้ไม่ควรแก้ไข เช่น user ID, CSRF token

---

## สรุป

การเลือก input type ที่ถูกต้องทำให้ form ของคุณ: ใช้งานง่ายขึ้น (โดยเฉพาะบนมือถือ), มี validation อัตโนมัติ, และ accessible มากขึ้น ไม่ต้องเขียน JavaScript เพิ่มสำหรับงานพื้นฐาน`,
          codeExamples: [
            {
              title: "Input Types ทุกประเภท",
              language: "html",
              code: `<form>
  <input type="text" placeholder="ข้อความทั่วไป"><br>
  <input type="email" placeholder="email@example.com"><br>
  <input type="password" placeholder="รหัสผ่าน"><br>
  <input type="number" min="0" max="100" value="50"><br>
  <input type="range" min="0" max="100" value="30"><br>
  <input type="date"><br>
  <input type="time"><br>
  <input type="color" value="#3b82f6"><br>

  <!-- Checkbox -->
  <input type="checkbox" id="html" name="skill" value="html">
  <label for="html">HTML</label>
  <input type="checkbox" id="css" name="skill" value="css">
  <label for="css">CSS</label>

  <!-- Radio -->
  <input type="radio" id="beginner" name="level" value="beginner">
  <label for="beginner">มือใหม่</label>
  <input type="radio" id="pro" name="level" value="pro">
  <label for="pro">มือโปร</label>

  <!-- File -->
  <input type="file" accept=".jpg,.png">

  <!-- Hidden -->
  <input type="hidden" name="userId" value="12345">
</form>`,
              explanation: "ตัวอย่าง input types ทุกประเภทในฟอร์มเดียว",
            },
          ],
        },
        {
          slug: "html-form-validation",
          title: "Form Validation",
          isFree: false,
          duration: 12,
          content: `# Form Validation — ตรวจสอบข้อมูล HTML5

## สิ่งที่คุณจะเรียนรู้
- Validation attributes ที่ HTML5 มีให้ในตัว
- ทำ validation โดยไม่ต้องใช้ JavaScript เลย
- Regular expression (pattern) สำหรับรูปแบบเฉพาะ
- วิธีแสดงข้อความ error ที่เป็นประโยชน์
- ข้อจำกัดของ HTML validation และเมื่อไหร่ต้องใช้ JS

---

## ทำไมต้อง Validate?

Form validation ช่วย:
1. **ป้องกันข้อมูลผิดพลาด** — ผู้ใช้กรอกข้อมูลถูกรูปแบบ
2. **UX ที่ดีขึ้น** — แจ้งเตือนทันทีก่อนส่งข้อมูล
3. **ลด server load** — ไม่ต้องส่งข้อมูลไปตรวจที่ server ให้เปลือง

> ⚠️ **ข้อควรระวัง:** HTML validation เป็น "convenience" สำหรับผู้ใช้ แต่ไม่ปลอดภัย! ต้องทำ validation ที่ server เสมอ เพราะผู้ใช้สามารถ bypass HTML validation ได้

---

## Validation Attributes

### \`required\` — บังคับกรอก

\`\`\`html
<label for="email">อีเมล (จำเป็น):</label>
<input type="email" id="email" name="email" required>
\`\`\`

ถ้ากด submit โดยไม่กรอก browser จะแสดง error message อัตโนมัติ

### \`minlength\` และ \`maxlength\` — จำกัดความยาว

\`\`\`html
<label for="username">ชื่อผู้ใช้ (4-20 ตัวอักษร):</label>
<input
  type="text"
  id="username"
  name="username"
  required
  minlength="4"
  maxlength="20"
>
\`\`\`

### \`min\` และ \`max\` — จำกัดค่า (สำหรับตัวเลขและวันที่)

\`\`\`html
<!-- อายุ 13-100 -->
<input type="number" name="age" min="13" max="100">

<!-- วันที่ในปีนี้เท่านั้น -->
<input type="date" name="birthday" min="2024-01-01" max="2024-12-31">
\`\`\`

### \`pattern\` — Regular Expression

\`pattern\` คือ regex ที่ค่าต้อง match ทั้งหมด

\`\`\`html
<!-- เฉพาะตัวอักษร ตัวเลข และ _ (ชื่อผู้ใช้) -->
<input
  type="text"
  name="username"
  pattern="[a-zA-Z0-9_]+"
  title="ตัวอักษร ตัวเลข และ _ เท่านั้น"
>

<!-- เบอร์โทรศัพท์ไทย (10 หลัก) -->
<input
  type="tel"
  name="phone"
  pattern="0[0-9]{9}"
  title="เบอร์โทร 10 หลัก เริ่มด้วย 0 เช่น 0812345678"
>

<!-- รหัสไปรษณีย์ไทย (5 หลัก) -->
<input
  type="text"
  name="zipcode"
  pattern="[0-9]{5}"
  title="รหัสไปรษณีย์ 5 หลัก"
>
\`\`\`

> 💡 **Tip:** \`title\` attribute จะแสดงเป็น tooltip error message เมื่อ validation ไม่ผ่าน เขียนให้เข้าใจง่าย อธิบายว่าต้องกรอกรูปแบบไหน

---

## Validation Table สรุป

| Attribute | ใช้กับ type | ความหมาย |
|---|---|---|
| \`required\` | ทุก type | ต้องกรอก (ห้ามว่าง) |
| \`minlength\` | text, email, password | ความยาวขั้นต่ำ |
| \`maxlength\` | text, email, password | ความยาวสูงสุด |
| \`min\` | number, date, range | ค่าต่ำสุด |
| \`max\` | number, date, range | ค่าสูงสุด |
| \`step\` | number, range | กระโดดทีละเท่าไหร่ |
| \`pattern\` | text, tel, url | regex pattern |

---

## Custom Validation ด้วย CSS

\`\`\`css
/* input ที่ผ่าน validation */
input:valid {
  border-color: #10b981;
}

/* input ที่ไม่ผ่าน (และผู้ใช้เคยโต้ตอบแล้ว) */
input:invalid:not(:focus):not(:placeholder-shown) {
  border-color: #ef4444;
}
\`\`\`

---

## novalidate — ปิด Browser Validation

\`\`\`html
<form novalidate>
  <!-- ปิด HTML validation ทั้งหมด ใช้เมื่อจะทำ validation ด้วย JavaScript เอง -->
</form>
\`\`\`

---

## สรุป

HTML5 Validation ทำให้เขียน form validation พื้นฐานได้โดยไม่ต้องใช้ JavaScript เลย ใช้ \`required\`, \`minlength\`, \`max\`, และ \`pattern\` ให้เต็มที่ แต่จำไว้ว่าต้องทำ validation ที่ server ด้วยเสมอ เพราะ HTML validation ป้องกัน hacker ไม่ได้`,
          codeExamples: [
            {
              title: "Form Validation ครบชุด",
              language: "html",
              code: `<form>
  <label for="username">ชื่อผู้ใช้ (4-20 ตัวอักษร):</label>
  <input
    type="text"
    id="username"
    required
    minlength="4"
    maxlength="20"
    pattern="[a-zA-Z0-9_]+"
    title="ตัวอักษร ตัวเลข และ _ เท่านั้น"
  >

  <label for="age">อายุ (13-100):</label>
  <input type="number" id="age" required min="13" max="100">

  <label for="phone">เบอร์โทร:</label>
  <input type="tel" id="phone" pattern="[0-9]{10}" title="ตัวเลข 10 หลัก">

  <label for="email">อีเมล:</label>
  <input type="email" id="email" required>

  <button type="submit">ส่งข้อมูล</button>
</form>`,
              explanation: "Form validation ด้วย HTML5 attributes ล้วน ไม่ต้องใช้ JavaScript",
            },
          ],
        },
        {
          slug: "html-semantic",
          title: "Semantic HTML",
          isFree: false,
          duration: 18,
          content: `# Semantic HTML — ภาษา HTML ที่มีความหมาย

## สิ่งที่คุณจะเรียนรู้
- Semantic HTML คืออะไร และต่างจาก \`<div>\` อย่างไร
- Semantic tags ทุกตัวและใช้เมื่อไหร่
- ผลต่อ SEO, accessibility, และ maintainability
- Layout หน้าเว็บทั้งหน้าด้วย semantic HTML
- ความแตกต่างระหว่าง \`<article>\` vs \`<section>\` vs \`<div>\`

---

## Semantic vs. Non-Semantic

**Non-Semantic (ไม่แนะนำ):**
\`\`\`html
<div id="header">
  <div id="nav">...</div>
</div>
<div id="content">
  <div class="post">...</div>
</div>
<div id="footer">...</div>
\`\`\`

**Semantic (แนะนำ):**
\`\`\`html
<header>
  <nav>...</nav>
</header>
<main>
  <article>...</article>
</main>
<footer>...</footer>
\`\`\`

Code ทั้งสองดูเหมือนกันในหน้าเว็บ แต่ semantic version บอก browser, Google, และ screen reader ว่าแต่ละส่วนคืออะไร

---

## ทำไมต้องใช้ Semantic HTML?

### 1. SEO — ช่วย Google เข้าใจเนื้อหา
Google ให้ความสำคัญกับ \`<h1>\` ใน \`<main>\` มากกว่า \`<div class="big-text">\` เพราะรู้ว่ามันคือเนื้อหาหลัก

### 2. Accessibility — Screen Reader
Screen reader ประกาศ "navigation" เมื่อเจอ \`<nav>\` และ "main content" เมื่อเจอ \`<main>\` ช่วยให้ผู้พิการทางสายตา navigate ได้

### 3. Code Maintainability
นักพัฒนาคนอื่น (รวมถึงตัวคุณเอง 6 เดือนต่อมา) เข้าใจโค้ดได้ทันทีโดยไม่ต้องอ่าน CSS

---

## Semantic Tags ทั้งหมด

### \`<header>\` — ส่วนหัว
\`\`\`html
<!-- Header ของทั้งหน้า -->
<header>
  <logo>
  <nav>
</header>

<!-- Header ของ article ก็ได้ -->
<article>
  <header>
    <h2>ชื่อบทความ</h2>
    <p>เขียนโดย: สมชาย | 1 ม.ค. 2568</p>
  </header>
</article>
\`\`\`

### \`<nav>\` — Navigation
\`\`\`html
<nav aria-label="เมนูหลัก">
  <ul>
    <li><a href="/">หน้าแรก</a></li>
    <li><a href="/courses">คอร์ส</a></li>
    <li><a href="/about">เกี่ยวกับ</a></li>
  </ul>
</nav>
\`\`\`

ใช้เฉพาะกลุ่ม links ที่เป็น navigation จริงๆ ไม่ใช่ทุก link ในหน้า

### \`<main>\` — เนื้อหาหลัก
\`\`\`html
<main>
  <!-- เนื้อหาหลักของหน้า มีได้แค่ 1 ต่อหน้า -->
</main>
\`\`\`

### \`<section>\` vs \`<article>\`

**\`<article>\`** — เนื้อหาที่ standalone ได้ (อ่านได้ด้วยตัวเองโดยไม่ต้องมี context)
- บทความ blog
- โพสต์ใน feed
- ความคิดเห็น
- Widget

**\`<section>\`** — กลุ่มเนื้อหาที่เกี่ยวข้องกัน แต่ต้องการ context ของหน้า
- ส่วน Hero
- ส่วน Features
- ส่วน Testimonials

\`\`\`html
<main>
  <section id="hero">
    <h1>เรียนโค้ดออนไลน์</h1>
  </section>

  <section id="courses">
    <h2>คอร์สยอดนิยม</h2>
    <article>
      <h3>HTML & CSS Mastery</h3>
      <p>เรียนรู้การสร้างเว็บจากศูนย์</p>
    </article>
  </section>
</main>
\`\`\`

### \`<aside>\` — เนื้อหาข้างเคียง
\`\`\`html
<aside>
  <!-- Sidebar, related articles, ads, author bio -->
  <h3>บทความที่เกี่ยวข้อง</h3>
</aside>
\`\`\`

### \`<footer>\` — ส่วนท้าย
\`\`\`html
<footer>
  <p>&copy; 2568 TeachCode. สงวนลิขสิทธิ์</p>
  <nav aria-label="footer navigation">
    <a href="/privacy">นโยบายความเป็นส่วนตัว</a>
  </nav>
</footer>
\`\`\`

### \`<figure>\` และ \`<figcaption>\`
\`\`\`html
<figure>
  <img src="diagram.png" alt="แผนภาพแสดงโครงสร้าง HTML">
  <figcaption>รูปที่ 1: โครงสร้าง HTML Document</figcaption>
</figure>
\`\`\`

### \`<time>\` — วันและเวลา
\`\`\`html
<p>เผยแพร่เมื่อ <time datetime="2025-01-01">1 มกราคม 2568</time></p>
\`\`\`

---

## สรุป

Semantic HTML ไม่ได้แค่ทำให้โค้ดดูดี — มันส่งผลจริงต่อ SEO, accessibility, และประสบการณ์ผู้ใช้ เริ่มจากแทนที่ \`<div>\` ด้วย semantic tags ที่เหมาะสมในโปรเจกต์ถัดไปของคุณ`,
          codeExamples: [
            {
              title: "Layout ด้วย Semantic HTML",
              language: "html",
              code: `<!DOCTYPE html>
<html lang="th">
<body>
  <header>
    <nav>
      <a href="/">หน้าแรก</a>
      <a href="/courses">คอร์ส</a>
      <a href="/about">เกี่ยวกับ</a>
    </nav>
  </header>

  <main>
    <section id="hero">
      <h1>เรียนโค้ดออนไลน์</h1>
      <p>เริ่มต้นได้ฟรี ไม่ต้องมีพื้นฐาน</p>
    </section>

    <section id="courses">
      <h2>คอร์สยอดนิยม</h2>
      <article>
        <h3>HTML & CSS</h3>
        <p>เรียนรู้การสร้างเว็บจากศูนย์</p>
        <figure>
          <img src="html-thumb.jpg" alt="HTML Course">
          <figcaption>คอร์ส HTML & CSS สำหรับมือใหม่</figcaption>
        </figure>
      </article>
    </section>

    <aside>
      <h3>บทความแนะนำ</h3>
      <p>5 เหตุผลที่ควรเรียน JavaScript</p>
    </aside>
  </main>

  <footer>
    <p>&copy; 2025 TeachCode</p>
  </footer>
</body>
</html>`,
              explanation: "Layout เว็บครบด้วย semantic HTML ทุก tag สำคัญ",
            },
          ],
        },
        {
          slug: "html-multimedia",
          title: "Multimedia",
          isFree: false,
          duration: 12,
          content: `# HTML Multimedia — Audio และ Video

## สิ่งที่คุณจะเรียนรู้
- เล่น video ด้วย HTML5 โดยไม่ต้องใช้ Flash
- \`<video>\` attributes: controls, autoplay, muted, loop, poster
- เล่น audio ด้วย \`<audio>\` element
- รองรับหลาย format ด้วย \`<source>\` และ fallback
- Embedding YouTube และ Google Maps ด้วย \`<iframe>\`

---

## ยุคก่อน HTML5: Flash ที่ตายแล้ว

ก่อน HTML5 การเล่น video บนเว็บต้องใช้ Adobe Flash Plugin ซึ่งช้า, ไม่ปลอดภัย, และทำงานบนมือถือไม่ได้ HTML5 แก้ปัญหานี้ด้วยการรองรับ video และ audio โดยตรงใน browser

---

## Video Element

\`\`\`html
<video
  src="tutorial.mp4"
  width="640"
  height="360"
  controls
  poster="thumbnail.jpg"
>
  <!-- Fallback สำหรับ browser เก่า -->
  Browser ของคุณไม่รองรับ HTML5 video
</video>
\`\`\`

### Attributes ของ \`<video>\`

| Attribute | ความหมาย |
|---|---|
| \`controls\` | แสดง play/pause, volume, fullscreen |
| \`autoplay\` | เล่นอัตโนมัติเมื่อโหลดหน้า |
| \`muted\` | ปิดเสียง (ต้องใช้คู่กับ autoplay บน Chrome) |
| \`loop\` | เล่นวนซ้ำ |
| \`poster\` | รูป thumbnail ที่แสดงก่อนเล่น |
| \`preload\` | \`none\`, \`metadata\`, \`auto\` — วิธีโหลด |
| \`playsinline\` | บนมือถือ iOS เล่น inline ไม่ขึ้น fullscreen |

> ⚠️ **ข้อควรระวัง:** \`autoplay\` บน Chrome จะทำงานได้เฉพาะเมื่อ video ถูก \`muted\` ไว้ เพราะ Chrome บล็อก autoplay ที่มีเสียง (ป้องกันประสบการณ์น่ารำคาญ)

---

## Audio Element

\`\`\`html
<audio controls preload="metadata">
  <source src="podcast.mp3" type="audio/mpeg">
  <source src="podcast.ogg" type="audio/ogg">
  <p>Browser ของคุณไม่รองรับ HTML5 audio</p>
</audio>
\`\`\`

Attributes เหมือนกับ video: controls, autoplay, muted, loop, preload

---

## \`<source>\` — รองรับหลาย Format

browser ต่างๆ รองรับ video/audio format ต่างกัน การใส่ \`<source>\` หลายตัวให้ browser เลือก format ที่รองรับได้เอง:

\`\`\`html
<video controls>
  <!-- MP4 รองรับทุก browser -->
  <source src="video.mp4" type="video/mp4">
  <!-- WebM: ขนาดเล็กกว่า, รองรับ Chrome/Firefox/Edge -->
  <source src="video.webm" type="video/webm">
  <!-- Fallback message -->
  <p>Browser ของคุณไม่รองรับ video tag
    <a href="video.mp4">ดาวน์โหลดแทน</a>
  </p>
</video>
\`\`\`

Browser อ่าน \`<source>\` ตามลำดับ และใช้ตัวแรกที่รองรับได้

---

## \`<iframe>\` — Embed เนื้อหาจากเว็บอื่น

\`\`\`html
<!-- YouTube -->
<iframe
  width="560"
  height="315"
  src="https://www.youtube.com/embed/VIDEO_ID"
  title="ชื่อวิดีโอ"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media"
  allowfullscreen
></iframe>

<!-- Google Maps -->
<iframe
  src="https://www.google.com/maps/embed?pb=..."
  width="600"
  height="450"
  style="border:0"
  allowfullscreen
  loading="lazy"
  title="แผนที่ร้าน TeachCode"
></iframe>
\`\`\`

> 💡 **Tip:** ใส่ \`title\` attribute ใน iframe เสมอ screen reader จะใช้อ่านให้ผู้ใช้รู้ว่า iframe มีเนื้อหาอะไร

---

## สรุป

HTML5 Multimedia ทำให้เว็บเล่น video และ audio ได้โดยไม่ต้องพึ่ง plugin ใดๆ การใช้ \`<source>\` หลายตัว, \`poster\` thumbnail, และ \`controls\` ที่เหมาะสมทำให้ multimedia experience ของผู้ใช้ดีขึ้น`,
          codeExamples: [
            {
              title: "Video และ Audio พร้อม fallback",
              language: "html",
              code: `<!-- Video -->
<video
  width="640"
  height="360"
  controls
  poster="thumbnail.jpg"
  preload="metadata"
>
  <source src="video.mp4" type="video/mp4">
  <source src="video.webm" type="video/webm">
  <p>Browser ของคุณไม่รองรับ video</p>
</video>

<!-- Audio -->
<audio controls preload="none">
  <source src="podcast.mp3" type="audio/mpeg">
  <source src="podcast.ogg" type="audio/ogg">
  <p>Browser ของคุณไม่รองรับ audio</p>
</audio>`,
              explanation: "Video และ audio พร้อม source หลายรูปแบบและ fallback text",
            },
          ],
        },
        {
          slug: "html-svg",
          title: "SVG",
          isFree: false,
          duration: 15,
          content: `# SVG — Scalable Vector Graphics

## สิ่งที่คุณจะเรียนรู้
- SVG คืออะไร และต่างจากรูป PNG/JPG อย่างไร
- SVG Shapes พื้นฐาน: circle, rect, path, line, text
- Attributes สำหรับกำหนดสี, ขนาด, ตำแหน่ง
- วิธีใช้ SVG inline ใน HTML และ style ด้วย CSS
- SVG Animations ง่ายๆ ด้วย CSS

---

## SVG vs Raster Images

| | SVG (Vector) | PNG/JPG (Raster) |
|---|---|---|
| ขยาย | ไม่แตก เสมอ | แตกเมื่อขยาย |
| ไฟล์ขนาด | เล็กสำหรับ icons/logos | เล็กสำหรับรูปถ่าย |
| Edit | แก้ด้วย CSS/JS ได้ | ต้องใช้โปรแกรมรูป |
| Animate | ได้ | ไม่ได้ |
| Text in image | index ได้โดย Google | ไม่ได้ |

SVG เหมาะสำหรับ: icons, logos, illustrations, charts, animations
PNG/JPG เหมาะสำหรับ: รูปถ่าย, รูปที่ซับซ้อนมาก

---

## วิธีใส่ SVG ใน HTML

### 1. Inline SVG (ยืดหยุ่นที่สุด)
\`\`\`html
<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="40" fill="#3b82f6" />
</svg>
\`\`\`

### 2. ใช้เป็น img
\`\`\`html
<img src="logo.svg" alt="TeachCode Logo" width="120">
\`\`\`

### 3. CSS Background
\`\`\`css
.icon { background-image: url("icon.svg"); }
\`\`\`

> 💡 **Tip:** ถ้าต้องการ style SVG ด้วย CSS (เปลี่ยนสีตาม theme) ใช้ inline SVG ถ้าแค่แสดงรูปใช้ \`<img>\`

---

## SVG Shapes พื้นฐาน

### Circle — วงกลม
\`\`\`html
<circle cx="50" cy="50" r="40" fill="#3b82f6" stroke="#1d4ed8" stroke-width="2" />
\`\`\`
- \`cx\`, \`cy\` — ตำแหน่ง center (x, y)
- \`r\` — รัศมี

### Rectangle — สี่เหลี่ยม
\`\`\`html
<rect x="10" y="10" width="120" height="80" fill="#10b981" rx="8" ry="8" />
\`\`\`
- \`x\`, \`y\` — ตำแหน่งมุมบนซ้าย
- \`rx\`, \`ry\` — ความโค้งมน (border-radius)

### Line — เส้นตรง
\`\`\`html
<line x1="0" y1="50" x2="200" y2="50" stroke="#6b7280" stroke-width="2" />
\`\`\`

### Text — ข้อความ
\`\`\`html
<text x="50" y="100" font-size="20" fill="#1f2937" text-anchor="middle">
  สวัสดี SVG!
</text>
\`\`\`

### Path — เส้นทางอิสระ (ทรงพลังที่สุด)
\`\`\`html
<!-- สามเหลี่ยม -->
<path d="M 50,10 L 90,90 L 10,90 Z" fill="#f59e0b" />
\`\`\`

Path commands:
- \`M x,y\` — Move to (เริ่มที่จุด)
- \`L x,y\` — Line to (ลากเส้น)
- \`Z\` — Close path (ปิดรูป)

---

## Style SVG ด้วย CSS

\`\`\`css
/* Style inline SVG elements */
.my-svg circle {
  fill: var(--color-primary);
  transition: fill 0.2s ease;
}
.my-svg:hover circle {
  fill: var(--color-primary-dark);
}

/* Icon size */
.icon {
  width: 24px;
  height: 24px;
}
\`\`\`

---

## SVG Animation

\`\`\`html
<svg width="200" height="200">
  <circle cx="100" cy="100" r="80" fill="none" stroke="#3b82f6" stroke-width="4"
    stroke-dasharray="502"
    stroke-dashoffset="502">
    <!-- วาดวงกลมแบบ animate -->
    <animate attributeName="stroke-dashoffset"
      from="502" to="0"
      dur="2s" fill="freeze" />
  </circle>
</svg>
\`\`\`

---

## สรุป

SVG เป็นเครื่องมือทรงพลังสำหรับ graphics บนเว็บ ขยายได้ไม่แตก style ด้วย CSS ได้ animate ได้ และแก้ไขด้วย JavaScript ได้ เหมาะมากสำหรับ icons และ logos ที่ต้องใช้หลายขนาด

| Tag | รูปร่าง |
|---|---|
| \`<circle>\` | วงกลม |
| \`<rect>\` | สี่เหลี่ยม |
| \`<path>\` | เส้นทางอิสระ |
| \`<line>\` | เส้นตรง |
| \`<text>\` | ข้อความ |`,
          codeExamples: [
            {
              title: "SVG Shapes พื้นฐาน",
              language: "html",
              code: `<svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
  <!-- วงกลม -->
  <circle cx="60" cy="60" r="40" fill="#3b82f6" />

  <!-- สี่เหลี่ยม -->
  <rect x="130" y="20" width="80" height="80" fill="#10b981" rx="8" />

  <!-- สามเหลี่ยม (path) -->
  <path d="M240,100 L280,20 L320,100 Z" fill="#f59e0b" />

  <!-- เส้น -->
  <line x1="0" y1="130" x2="300" y2="130" stroke="#6b7280" stroke-width="2" />

  <!-- ข้อความ -->
  <text x="60" y="180" font-size="16" fill="#1f2937">SVG คือ Vector!</text>
</svg>`,
              explanation: "SVG shapes พื้นฐาน: circle, rect, path, line, text",
            },
          ],
        },
        {
          slug: "html-canvas",
          title: "Canvas",
          isFree: false,
          duration: 15,
          content: `# Canvas API — วาดรูปด้วย JavaScript

## สิ่งที่คุณจะเรียนรู้
- Canvas คืออะไร และต่างจาก SVG อย่างไร
- การ setup canvas และรับ 2D context
- วาดรูปพื้นฐาน: สี่เหลี่ยม, วงกลม, เส้น, ข้อความ
- สี, gradient, และ shadow
- เมื่อไหร่ควรใช้ Canvas แทน SVG

---

## Canvas คืออะไร?

\`<canvas>\` คือ "กระดานวาดรูป" บนเว็บที่ควบคุมด้วย JavaScript ทุก pixel ถูกวาดด้วยโค้ด

### Canvas vs SVG

| | Canvas | SVG |
|---|---|---|
| ประเภท | Raster (pixel) | Vector |
| ขยาย | แตกเมื่อขยาย | ไม่แตก |
| Performance | ดีกว่าสำหรับ animation จำนวนมาก | ดีกว่าสำหรับ static shapes |
| Interaction | ต้องเขียน JS เอง | รองรับ DOM events |
| ใช้เมื่อ | เกม, animation ซับซ้อน | icons, charts, logos |

---

## Setup Canvas

\`\`\`html
<!-- กำหนดขนาดใน HTML attribute เท่านั้น ห้ามใช้ CSS! -->
<canvas id="myCanvas" width="600" height="400"></canvas>
\`\`\`

\`\`\`javascript
// JavaScript setup
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');  // รับ 2D context

// ตอนนี้วาดได้แล้ว!
ctx.fillStyle = '#3b82f6';
ctx.fillRect(10, 10, 100, 80);
\`\`\`

> ⚠️ **ข้อควรระวัง:** อย่าตั้งขนาด canvas ด้วย CSS (width/height ใน CSS จะยืด/หดรูปที่วาดแล้ว) ต้องตั้งด้วย HTML attributes หรือ \`canvas.width\` / \`canvas.height\` ใน JavaScript

---

## วาดรูปพื้นฐาน

### สี่เหลี่ยม
\`\`\`javascript
// เต็ม (filled)
ctx.fillStyle = '#3b82f6';
ctx.fillRect(x, y, width, height);

// เส้นขอบเท่านั้น (stroke)
ctx.strokeStyle = '#ef4444';
ctx.lineWidth = 2;
ctx.strokeRect(x, y, width, height);

// ล้าง (clear)
ctx.clearRect(x, y, width, height);
\`\`\`

### วงกลมและ Arc
\`\`\`javascript
ctx.beginPath();
ctx.arc(centerX, centerY, radius, startAngle, endAngle);
ctx.fillStyle = '#10b981';
ctx.fill();

// ตัวอย่าง: วงกลมเต็ม
ctx.beginPath();
ctx.arc(100, 100, 50, 0, Math.PI * 2);  // 0 ถึง 2π = วงกลมสมบูรณ์
ctx.fill();

// ตัวอย่าง: ครึ่งวงกลม
ctx.beginPath();
ctx.arc(100, 100, 50, 0, Math.PI);  // 0 ถึง π = ครึ่งล่าง
ctx.fill();
\`\`\`

### เส้น
\`\`\`javascript
ctx.beginPath();
ctx.moveTo(0, 0);      // เริ่มที่จุดนี้
ctx.lineTo(200, 100);  // ลากไปจุดนี้
ctx.lineTo(400, 0);    // ลากต่อ
ctx.strokeStyle = '#f59e0b';
ctx.lineWidth = 3;
ctx.stroke();
\`\`\`

### ข้อความ
\`\`\`javascript
ctx.font = '24px Sarabun, sans-serif';
ctx.fillStyle = '#1f2937';
ctx.textAlign = 'center';
ctx.fillText('สวัสดี Canvas!', canvas.width / 2, 50);
\`\`\`

---

## สี และ Gradient

\`\`\`javascript
// Solid color
ctx.fillStyle = '#3b82f6';
ctx.fillStyle = 'rgba(59, 130, 246, 0.5)';

// Linear gradient
const gradient = ctx.createLinearGradient(0, 0, 400, 0);
gradient.addColorStop(0, '#3b82f6');
gradient.addColorStop(0.5, '#8b5cf6');
gradient.addColorStop(1, '#ec4899');
ctx.fillStyle = gradient;
ctx.fillRect(0, 0, 400, 200);
\`\`\`

---

## Game Loop — Animation พื้นฐาน

\`\`\`javascript
let x = 0;

function draw() {
  // ล้าง canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // วาดวัตถุ
  ctx.fillStyle = '#3b82f6';
  ctx.fillRect(x, 50, 50, 50);

  // อัปเดตตำแหน่ง
  x += 2;
  if (x > canvas.width) x = -50;

  // วนซ้ำ 60fps
  requestAnimationFrame(draw);
}

draw();  // เริ่ม loop
\`\`\`

---

## สรุป

Canvas API เหมาะมากสำหรับงานที่ต้องวาดหลายพัน objects หรือ animation ที่ซับซ้อน เช่น เกม, visualizations, chart ที่ custom มาก ส่วน icons และ shapes ทั่วไปควรใช้ SVG แทน เพราะ SVG scale ได้ดีกว่าและ accessible กว่า`,
          codeExamples: [
            {
              title: "วาดรูปด้วย Canvas",
              language: "html",
              code: `<canvas id="myCanvas" width="400" height="200" style="border:1px solid #ccc"></canvas>

<script>
  const canvas = document.getElementById('myCanvas');
  const ctx = canvas.getContext('2d');

  // วาดสี่เหลี่ยมเต็ม
  ctx.fillStyle = '#3b82f6';
  ctx.fillRect(20, 20, 120, 80);

  // วาดสี่เหลี่ยมเส้น
  ctx.strokeStyle = '#ef4444';
  ctx.lineWidth = 3;
  ctx.strokeRect(160, 20, 120, 80);

  // วาดวงกลม
  ctx.beginPath();
  ctx.arc(320, 60, 40, 0, Math.PI * 2);
  ctx.fillStyle = '#10b981';
  ctx.fill();

  // เขียนข้อความ
  ctx.fillStyle = '#1f2937';
  ctx.font = '18px Arial';
  ctx.fillText('Canvas API', 140, 160);
</script>`,
              explanation: "Canvas 2D context: fillRect, strokeRect, arc (วงกลม), และ text",
            },
          ],
        },
        {
          slug: "html-accessibility",
          title: "Accessibility",
          isFree: false,
          duration: 18,
          content: `# Accessibility (a11y) — เว็บสำหรับทุกคน

## สิ่งที่คุณจะเรียนรู้
- Accessibility คืออะไร และสำคัญอย่างไร
- WCAG มาตรฐาน accessibility สากล
- ARIA attributes ที่ใช้บ่อย
- Keyboard navigation และ focus management
- ข้อผิดพลาด accessibility ที่พบบ่อยและวิธีแก้

---

## Accessibility คืออะไร?

**Accessibility (a11y)** คือการออกแบบเว็บให้ **ทุกคนใช้ได้** รวมถึงผู้ที่มีความพิการ:
- **ตาบอดหรือสายตาเลือน** — ใช้ screen reader เช่น NVDA, VoiceOver
- **หูหนวก** — ต้องการ subtitle/caption สำหรับ video
- **มือสั่น/ควบคุมยาก** — ต้องการ keyboard navigation
- **Dyslexia** — ต้องการ font และ spacing ที่ดี

> 💡 **Tip:** ในหลายประเทศ (รวมถึง EU และ US) มีกฎหมายบังคับให้เว็บราชการและเว็บธุรกิจต้องผ่านมาตรฐาน accessibility (WCAG 2.1 AA)

---

## WCAG — มาตรฐาน Accessibility

**WCAG (Web Content Accessibility Guidelines)** แบ่งเป็น 4 หลักการ (POUR):

- **Perceivable** — เนื้อหาต้องรับรู้ได้ (เช่น รูปต้องมี alt text)
- **Operable** — ใช้งานด้วย keyboard ได้ทุกอย่าง
- **Understandable** — เข้าใจง่าย ไม่สับสน
- **Robust** — ทำงานได้กับ assistive technologies ต่างๆ

ระดับ: **A** (ขั้นต่ำ) → **AA** (มาตรฐานทั่วไป) → **AAA** (สูงสุด)

---

## ปัญหาพื้นฐานที่พบบ่อย

### 1. รูปภาพไม่มี alt text
\`\`\`html
<!-- ❌ ไม่ดี -->
<img src="team.jpg">

<!-- ✅ ดี -->
<img src="team.jpg" alt="ทีมงาน TeachCode 5 คนยิ้มในออฟฟิศ">

<!-- ✅ รูปตกแต่ง ใช้ alt ว่าง -->
<img src="decorative-wave.svg" alt="">
\`\`\`

### 2. ปุ่มที่ไม่ใช่ปุ่ม
\`\`\`html
<!-- ❌ ไม่ดี: ใช้ keyboard ไม่ได้, screen reader ไม่รู้ว่าคลิกได้ -->
<div onclick="submit()">ส่ง</div>

<!-- ✅ ดี: keyboard ได้, screen reader รู้ว่าเป็นปุ่ม -->
<button type="button" onclick="submit()">ส่ง</button>
\`\`\`

### 3. Color Contrast ต่ำเกินไป
ข้อความต้องมี contrast ratio อย่างน้อย 4.5:1 กับพื้นหลัง (WCAG AA)
- ❌ สีเทาอ่อนบนพื้นขาว (#999 บน #fff = 2.8:1 — ไม่ผ่าน)
- ✅ สีเทาเข้มบนพื้นขาว (#374151 บน #fff = 7.4:1 — ผ่าน AA)

---

## ARIA Attributes

ARIA (Accessible Rich Internet Applications) เพิ่มข้อมูล semantic ให้ screen reader

### \`aria-label\` — อธิบาย element
\`\`\`html
<!-- icon button ที่ไม่มีข้อความ -->
<button aria-label="ค้นหา">
  <svg aria-hidden="true">...</svg>
</button>
\`\`\`

### \`aria-hidden="true"\` — ซ่อนจาก screen reader
\`\`\`html
<!-- ไอคอนตกแต่งที่ไม่มีความหมาย -->
<span aria-hidden="true">✨</span>ยินดีต้อนรับ
\`\`\`

### \`aria-expanded\` — สถานะ dropdown
\`\`\`html
<button aria-expanded="false" aria-controls="dropdown-menu">
  เมนู
</button>
<ul id="dropdown-menu" hidden>...</ul>
\`\`\`

### \`role\` — กำหนดบทบาท
\`\`\`html
<div role="alert" aria-live="polite">
  ส่งข้อมูลสำเร็จแล้ว!
</div>
\`\`\`

---

## Keyboard Navigation

ทุก interactive element ต้องสามารถใช้ keyboard ได้:
- **Tab** — เดินไปข้างหน้า
- **Shift+Tab** — เดินกลับ
- **Enter/Space** — activate ปุ่ม
- **Arrow keys** — navigation ใน list/menu

\`\`\`html
<!-- Focus styling ต้องชัดเจน (ห้าม outline: none เฉยๆ) -->
<style>
:focus-visible {
  outline: 3px solid #3b82f6;
  outline-offset: 2px;
}
</style>
\`\`\`

---

## Skip Navigation Link

\`\`\`html
<!-- ลิงก์แรกในหน้า ให้ keyboard users ข้ามเมนูไปเนื้อหาได้ทันที -->
<a href="#main-content" class="skip-link">ข้ามไปเนื้อหาหลัก</a>

<nav>... (เมนู) ...</nav>
<main id="main-content">
  ...
</main>

<style>
.skip-link {
  position: absolute;
  top: -100%;
  left: 0;
}
.skip-link:focus {
  top: 0;  /* แสดงเมื่อ focus */
}
</style>
\`\`\`

---

## สรุป

Accessibility ไม่ใช่แค่เพื่อผู้พิการ — มันช่วยทุกคน รวมถึงผู้ใช้บนมือถือ, คนที่อยู่ในที่แสงสว่างมาก, และ SEO การทำ accessibility ตั้งแต่ต้นง่ายกว่าการแก้ทีหลังมาก`,
          codeExamples: [
            {
              title: "Accessible Navigation และ Form",
              language: "html",
              code: `<!-- Skip navigation link -->
<a href="#main-content" class="skip-link">ข้ามไปเนื้อหาหลัก</a>

<!-- Accessible navigation -->
<nav aria-label="เมนูหลัก">
  <ul role="list">
    <li><a href="/">หน้าแรก</a></li>
    <li><a href="/courses" aria-current="page">คอร์ส</a></li>
  </ul>
</nav>

<!-- Accessible form -->
<main id="main-content">
  <form>
    <div role="group" aria-labelledby="name-group">
      <span id="name-group">ข้อมูลส่วนตัว</span>
      <label for="fname">ชื่อจริง (จำเป็น):</label>
      <input type="text" id="fname" aria-required="true" autocomplete="given-name">
    </div>

    <!-- Icon button ต้องมี aria-label -->
    <button type="button" aria-label="ค้นหา">
      <svg aria-hidden="true">...</svg>
    </button>
  </form>
</main>`,
              explanation: "Accessible HTML พร้อม ARIA attributes, skip link, และ role",
            },
          ],
        },
        {
          slug: "html-seo",
          title: "SEO",
          isFree: false,
          duration: 15,
          content: `# SEO Basics — Search Engine Optimization

## สิ่งที่คุณจะเรียนรู้
- SEO คืออะไร และ HTML ช่วย SEO ได้อย่างไร
- Title tag, meta description — ส่วนสำคัญที่สุด
- HTML structure ที่ Google ชอบ
- Open Graph สำหรับ social media sharing
- Schema Markup (Structured Data) เบื้องต้น

---

## SEO คืออะไร?

**SEO (Search Engine Optimization)** คือการทำให้เว็บของคุณปรากฏใน Google (หรือ search engine อื่น) เมื่อผู้ใช้ค้นหาคำที่เกี่ยวข้อง

Google ใช้ algorithm ซับซ้อนในการจัดอันดับเว็บ แต่ HTML structure ที่ถูกต้องเป็นรากฐานสำคัญ

---

## 1. Title Tag — สำคัญที่สุด

\`\`\`html
<title>เรียน HTML ฟรีสำหรับมือใหม่ | TeachCode</title>
\`\`\`

Title tag คือสิ่งที่ Google แสดงเป็น **ชื่อสีน้ำเงิน** ใน search results

**หลักการเขียน title ที่ดี:**
- ความยาว **50-60 ตัวอักษร** (ถ้ายาวกว่า Google จะตัด)
- ใส่ **keyword หลัก** ที่ต้องการ rank ไว้ต้น title
- มี **ชื่อแบรนด์** ต่อท้าย
- แต่ละหน้าต้องมี title **ไม่ซ้ำกัน**

\`\`\`html
<!-- ✅ ดี -->
<title>เรียน HTML ฟรีสำหรับมือใหม่ | TeachCode</title>

<!-- ❌ ไม่ดี: ไม่มี keyword, ยาวเกิน -->
<title>TeachCode เป็นเว็บสอนโปรแกรมมิ่งออนไลน์ที่ดีที่สุดในประเทศไทย</title>
\`\`\`

---

## 2. Meta Description

\`\`\`html
<meta name="description" content="เรียน HTML CSS JavaScript ฟรี พร้อมตัวอย่างโค้ดทุกบทเรียน เหมาะสำหรับมือใหม่ไม่มีพื้นฐาน เริ่มเรียนได้เลย">
\`\`\`

Meta description แสดงใต้ title ใน search results ความยาวที่เหมาะ **120-160 ตัวอักษร**

> 💡 **Tip:** Meta description ไม่ส่งผลโดยตรงต่ออันดับ Google แต่ส่งผลต่อ Click-Through Rate (CTR) — ถ้าคนคลิกมาก Google อาจขึ้นอันดับให้

---

## 3. HTML Structure ที่ Google ชอบ

\`\`\`html
<!-- ✅ โครงสร้างที่ดี -->
<body>
  <header>
    <nav><!-- navigation --></nav>
  </header>

  <main>
    <h1>เรียน HTML สำหรับมือใหม่</h1>  <!-- keyword หลักใน h1 -->

    <article>
      <h2>HTML คืออะไร?</h2>          <!-- h2 สำหรับ subtopic -->
      <p>HTML ย่อมาจาก...</p>
    </article>
  </main>

  <footer><!-- footer --></footer>
</body>
\`\`\`

สิ่งที่ Google ดู:
- \`<h1>\` — หัวข้อหลักของหน้า (มีแค่ 1 ตัว)
- \`<h2>\`-\`<h6>\` — โครงสร้างเนื้อหา
- Semantic HTML — บอก Google ว่าแต่ละส่วนคืออะไร
- \`alt\` text ในรูปภาพ — Google index ข้อความนี้
- Internal linking — ลิงก์ระหว่างหน้าในเว็บ

---

## 4. Open Graph — สำหรับ Social Media

เมื่อแชร์ URL ใน Facebook, LINE, Twitter — platform จะอ่าน Open Graph tags เพื่อสร้าง preview card

\`\`\`html
<meta property="og:title" content="เรียน HTML ฟรี | TeachCode">
<meta property="og:description" content="เรียนรู้ HTML จากศูนย์ พร้อมตัวอย่างโค้ด">
<meta property="og:image" content="https://teachcode.dev/og-html.jpg">
<meta property="og:url" content="https://teachcode.dev/courses/html">
<meta property="og:type" content="website">
\`\`\`

รูป og:image ควรขนาด **1200x630 pixels** เพื่อแสดงผลสวยทุก platform

---

## 5. Schema Markup — ข้อมูลโครงสร้าง

Schema markup บอก Google ข้อมูลเฉพาะเจาะจง ทำให้ Google แสดง **Rich Snippets** ในผลการค้นหา

\`\`\`html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "HTML & CSS Mastery",
  "description": "เรียน HTML CSS ครบตั้งแต่พื้นฐานถึงขั้นสูง",
  "provider": {
    "@type": "Organization",
    "name": "TeachCode"
  },
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "THB"
  }
}
</script>
\`\`\`

---

## Canonical URL — ป้องกัน Duplicate Content

\`\`\`html
<!-- บอก Google ว่าหน้าไหนคือ "ต้นฉบับ" -->
<link rel="canonical" href="https://teachcode.dev/courses/html-css">
\`\`\`

ใช้เมื่อหน้าเดียวกันเข้าถึงได้จาก URL หลายรูปแบบ

---

## สรุป

SEO ด้วย HTML เริ่มจากพื้นฐาน: title ที่ดี, meta description ที่น่าคลิก, semantic HTML ที่ถูกต้อง, รูปมี alt text, และ Open Graph สำหรับ social sharing การทำ HTML ถูกต้องตั้งแต่ต้นเป็นรากฐาน SEO ที่ดีที่สุด`,
          codeExamples: [
            {
              title: "SEO Meta Tags ครบชุด",
              language: "html",
              code: `<head>
  <!-- SEO พื้นฐาน -->
  <title>เรียน HTML ฟรี สำหรับมือใหม่ | TeachCode</title>
  <meta name="description" content="เรียน HTML CSS JavaScript ฟรี พร้อม code ตัวอย่างทุกบท รองรับมือใหม่ไม่มีพื้นฐาน">
  <link rel="canonical" href="https://teachcode.dev/courses/html-css">

  <!-- Open Graph -->
  <meta property="og:title" content="เรียน HTML ฟรี | TeachCode">
  <meta property="og:description" content="เรียนรู้ HTML CSS JavaScript ฟรี">
  <meta property="og:image" content="https://teachcode.dev/og-image.jpg">
  <meta property="og:url" content="https://teachcode.dev">
  <meta property="og:type" content="website">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="เรียน HTML ฟรี | TeachCode">
</head>

<!-- Schema: Breadcrumb -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "หน้าแรก", "item": "https://teachcode.dev" },
    { "@type": "ListItem", "position": 2, "name": "คอร์ส HTML", "item": "https://teachcode.dev/courses/html" }
  ]
}
</script>`,
              explanation: "SEO meta tags ครบชุด + Open Graph + Structured Data",
            },
          ],
        },
      ],
    },
    {
      title: "CSS Mastery",
      order: 2,
      lessons: [
        {
          slug: "css-fundamentals",
          title: "CSS Fundamentals",
          isFree: true,
          duration: 15,
          content: `# CSS Fundamentals — พื้นฐาน CSS

## สิ่งที่คุณจะเรียนรู้
- CSS คืออะไร และทำงานร่วมกับ HTML อย่างไร
- Syntax พื้นฐาน: selector, property, value
- 3 วิธีใส่ CSS และควรใช้วิธีไหน
- Cascade — กฎลำดับความสำคัญ CSS
- Inheritance — การสืบทอด property

---

## CSS คืออะไร?

**CSS (Cascading Style Sheets)** คือภาษาสำหรับ **ตกแต่ง** หน้าเว็บ ควบคุมสี, ขนาด, font, layout, animation และอีกมากมาย

ถ้า HTML คือ "โครงกระดูก" ของเว็บ CSS ก็คือ "เสื้อผ้าและเครื่องสำอาง" ที่ทำให้หน้าเว็บดูสวยงาม

---

## CSS Syntax

\`\`\`css
/* คำอธิบาย: selector { property: value; } */

h1 {
  color: #3b82f6;       /* สีข้อความ */
  font-size: 2rem;      /* ขนาดตัวอักษร */
  margin-bottom: 16px;  /* ระยะห่างด้านล่าง */
}
\`\`\`

- **Selector** — เลือก element ที่ต้องการ style (เช่น \`h1\`, \`.btn\`, \`#header\`)
- **Property** — สิ่งที่ต้องการเปลี่ยน (เช่น \`color\`, \`font-size\`)
- **Value** — ค่าที่ต้องการให้ property มี (เช่น \`red\`, \`16px\`)
- **Declaration** — คู่ property:value หนึ่งคู่
- **Rule** — selector + block {} ทั้งหมด

---

## 3 วิธีใส่ CSS

### วิธีที่ 1: Inline CSS
\`\`\`html
<p style="color: red; font-size: 18px;">ข้อความสีแดง</p>
\`\`\`

❌ **ไม่แนะนำ** เพราะ: ดูแลยาก, ไม่ reuse ได้, priority สูงเกินไป
✅ ใช้ได้เมื่อ: ต้องการ override CSS เฉพาะ element นั้น, dynamic style จาก JavaScript

### วิธีที่ 2: Internal CSS (ใน \`<style>\`)
\`\`\`html
<head>
  <style>
    p { color: blue; line-height: 1.7; }
    h1 { color: #3b82f6; }
  </style>
</head>
\`\`\`

✅ ใช้ได้สำหรับ: หน้าเดียว, prototype เร็ว
❌ ไม่ดีสำหรับ: เว็บหลายหน้า (ต้อง copy CSS ไปทุกหน้า)

### วิธีที่ 3: External CSS (แนะนำที่สุด)
\`\`\`html
<head>
  <link rel="stylesheet" href="style.css">
</head>
\`\`\`

✅ **แนะนำเสมอ** เพราะ: แก้ที่เดียว ส่งผลทุกหน้า, browser cache ไฟล์ CSS, แยก concern ระหว่าง HTML และ CSS

---

## Cascade — ลำดับความสำคัญ

"Cascading" ใน CSS หมายถึงกฎที่หลายๆ อย่างส่งผลต่อ element เดียวกัน ต้องมีการตัดสินว่าค่าไหนชนะ

ลำดับจากแรงที่สุดไปอ่อนที่สุด:

1. **\`!important\`** (หลีกเลี่ยงการใช้!)
2. **Inline style** (\`style="..."\` ใน HTML)
3. **ID selector** (\`#navbar\`)
4. **Class, attribute, pseudo-class** (\`.btn\`, \`[type]\`, \`:hover\`)
5. **Type selector** (\`p\`, \`h1\`)
6. **Browser default stylesheet**

\`\`\`css
/* ทั้ง 3 บรรทัดนี้ style p element เดียวกัน */
p { color: blue; }          /* type selector */
.text { color: green; }     /* class selector */
#intro { color: red; }      /* id selector — ชนะ! */
\`\`\`

> ⚠️ **ข้อควรระวัง:** หลีกเลี่ยง \`!important\` เพราะมันทำให้ debug ยากมาก ถ้าต้องใช้ แสดงว่ามีปัญหา specificity ที่ควรแก้ให้ถูกวิธี

---

## Inheritance — การสืบทอด

CSS บางค่าสืบทอดจาก parent ไป child อัตโนมัติ

\`\`\`css
body {
  font-family: 'Sarabun', sans-serif;  /* ทุก element ในหน้าได้รับสิ่งนี้ */
  color: #1f2937;                       /* สืบทอดให้ทุก element */
  font-size: 16px;                      /* สืบทอด */
}
\`\`\`

**Properties ที่สืบทอด (inherited):** color, font-family, font-size, font-weight, line-height, letter-spacing, text-align

**Properties ที่ไม่สืบทอด:** width, height, padding, margin, border, background, display, position

---

## CSS Reset

Browser ต่างๆ มี default style ที่แตกต่างกัน ต้อง reset ก่อน:

\`\`\`css
/* Modern CSS Reset */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
\`\`\`

---

## สรุป

CSS เป็นภาษาที่เรียนรู้ได้จากพื้นฐานง่ายๆ แต่มีความลึกมาก การเข้าใจ cascade และ specificity จะช่วยให้ debug CSS ได้รวดเร็ว เริ่มต้นด้วย external CSS เสมอ และหลีกเลี่ยง !important`,
          codeExamples: [
            {
              title: "CSS ครั้งแรก",
              language: "css",
              code: `/* ตกแต่ง body */
body {
  font-family: 'Sarabun', sans-serif;
  color: #1f2937;
  background-color: #f9fafb;
  margin: 0;
  padding: 20px;
}

/* ตกแต่ง heading */
h1 {
  color: #3b82f6;
  font-size: 2rem;
  border-bottom: 2px solid #e5e7eb;
  padding-bottom: 8px;
}

/* ตกแต่ง paragraph */
p {
  line-height: 1.7;
  color: #4b5563;
}`,
              explanation: "CSS พื้นฐาน: ตกแต่ง body, heading, paragraph",
            },
          ],
        },
        {
          slug: "css-selectors",
          title: "Selectors",
          isFree: true,
          duration: 15,
          content: `# CSS Selectors — การเลือก Element

## สิ่งที่คุณจะเรียนรู้
- Basic selectors: universal, type, class, id, attribute
- Combinator selectors: descendant, child, adjacent, sibling
- Pseudo-class selectors (:hover, :focus, :nth-child)
- Specificity — กฎน้ำหนัก selector
- เมื่อไหร่ควรใช้ class และเมื่อไหร่ใช้ id

---

## Selector คืออะไร?

Selector คือ "ที่อยู่" ที่บอก CSS ว่าจะ style element ไหน เหมือนการส่งจดหมายที่ต้องระบุผู้รับให้ถูกต้อง

---

## 1. Basic Selectors

### Universal Selector — เลือกทุกอย่าง
\`\`\`css
* {
  box-sizing: border-box;
  margin: 0;
}
\`\`\`

### Type Selector — เลือกตาม tag name
\`\`\`css
p { line-height: 1.7; }
h1 { font-size: 2.5rem; }
a { color: #3b82f6; }
\`\`\`

### Class Selector — เลือกตาม class (ใช้บ่อยที่สุด)
\`\`\`css
/* HTML: <div class="card"></div> */
.card { background: white; border-radius: 8px; }
.card-title { font-size: 1.2rem; font-weight: 600; }

/* หลาย class บน element เดียว */
/* HTML: <button class="btn btn-primary btn-lg"></button> */
.btn { padding: 10px 20px; border: none; cursor: pointer; }
.btn-primary { background: #3b82f6; color: white; }
.btn-lg { font-size: 1.125rem; padding: 14px 28px; }
\`\`\`

### ID Selector — เลือกตาม id (ใช้น้อย)
\`\`\`css
/* HTML: <nav id="main-nav"></nav> */
#main-nav { position: sticky; top: 0; z-index: 100; }
\`\`\`

> 💡 **Tip:** ใช้ \`class\` สำหรับ styling เกือบทุกกรณี \`id\` มีความเฉพาะเจาะจงสูงเกินไปและ reuse ไม่ได้ สงวน \`id\` ไว้สำหรับ anchor links และ JavaScript

---

## 2. Attribute Selectors

\`\`\`css
/* มี attribute นี้ */
input[required] { border-color: #ef4444; }

/* attribute มีค่าตรงกัน */
input[type="email"] { padding-left: 40px; }

/* attribute เริ่มด้วย */
a[href^="https"] { color: #10b981; }

/* attribute ลงท้ายด้วย */
a[href$=".pdf"]::after { content: " (PDF)"; }

/* attribute มีค่านี้อยู่ */
[class*="btn"] { cursor: pointer; }
\`\`\`

---

## 3. Combinator Selectors

### Descendant — ลูกหลานทุกระดับ (เว้นวรรค)
\`\`\`css
/* p ที่อยู่ใน .card ไม่ว่าจะลึกแค่ไหน */
.card p { color: #6b7280; }
\`\`\`

### Child — ลูกตรงๆ เท่านั้น (>)
\`\`\`css
/* li ที่เป็นลูกโดยตรงของ nav (ไม่รวม nested li) */
nav > ul > li { display: inline-block; }
\`\`\`

### Adjacent Sibling — element ถัดไปทันที (+)
\`\`\`css
/* p ที่อยู่ถัดจาก h2 ทันที */
h2 + p { font-size: 1.1rem; color: #4b5563; }
\`\`\`

### General Sibling — ทุก element ที่ตามหลัง (~)
\`\`\`css
/* p ทุกตัวที่อยู่หลัง h2 ในระดับเดียวกัน */
h2 ~ p { margin-top: 8px; }
\`\`\`

---

## 4. Pseudo-class Selectors

\`\`\`css
/* สถานะ */
a:hover { color: #1d4ed8; }
input:focus { outline: 2px solid #3b82f6; }
button:active { transform: scale(0.98); }
a:visited { color: #7c3aed; }

/* ตำแหน่ง */
li:first-child { border-top: none; }
li:last-child { border-bottom: none; }
li:nth-child(odd) { background: #f9fafb; }
li:nth-child(3n) { background: #eff6ff; } /* ทุกที่ 3 */

/* ตรรกะ */
input:not([type="submit"]) { border: 1px solid #d1d5db; }
p:not(.highlight) { color: #6b7280; }
\`\`\`

---

## 5. Specificity — น้ำหนัก Selector

ถ้า 2 rules ขัดกัน rule ที่มี specificity สูงกว่าชนะ:

\`\`\`
Inline style:   1,0,0,0
ID:             0,1,0,0
Class/attr/:    0,0,1,0
Type selector:  0,0,0,1
\`\`\`

\`\`\`css
p { color: blue; }           /* 0,0,0,1 */
.text { color: green; }      /* 0,0,1,0 — ชนะ p */
#content p { color: red; }   /* 0,1,0,1 — ชนะ .text */
\`\`\`

---

## สรุป

Selector คือหัวใจของ CSS ยิ่งเข้าใจ selector ดีเท่าไหร่ ยิ่ง style ได้ precise และ code สะอาดขึ้น ใช้ class selector เป็นหลัก หลีกเลี่ยง id selector สำหรับ styling และเข้าใจ specificity เพื่อ debug ได้รวดเร็ว

## Basic Selectors

| Selector | ตัวอย่าง | เลือกอะไร |
|---|---|---|
| Universal | \`*\` | ทุก element |
| Type | \`div\` | ทุก \`<div>\` |
| Class | \`.btn\` | element ที่มี class="btn" |
| ID | \`#header\` | element ที่มี id="header" |
| Attribute | \`[type="text"]\` | input ที่มี type="text" |

## Combinators

| Combinator | ตัวอย่าง | ความหมาย |
|---|---|---|
| Descendant | \`div p\` | \`<p>\` ที่อยู่ใน \`<div>\` |
| Child | \`ul > li\` | \`<li>\` ที่เป็นลูกตรงๆ ของ \`<ul>\` |
| Adjacent | \`h2 + p\` | \`<p>\` ที่อยู่ถัดจาก \`<h2>\` ทันที |
| General sibling | \`h2 ~ p\` | \`<p>\` ทุกอันที่อยู่หลัง \`<h2>\` |

## Specificity (น้ำหนัก)
\`#id\` (0,1,0,0) > \`.class\` (0,0,1,0) > \`tag\` (0,0,0,1)`,
          codeExamples: [
            {
              title: "CSS Selectors ทุกประเภท",
              language: "css",
              code: `/* Universal */
* { box-sizing: border-box; }

/* Type selector */
p { margin-bottom: 16px; }

/* Class selector */
.card { background: white; border-radius: 8px; }
.btn-primary { background: #3b82f6; color: white; }

/* ID selector */
#navbar { position: sticky; top: 0; }

/* Attribute selector */
input[type="email"] { border: 2px solid #3b82f6; }
a[href^="https"] { color: green; }  /* href เริ่มด้วย https */

/* Descendant */
.card p { color: #6b7280; }

/* Child */
nav > ul { list-style: none; }

/* Pseudo-class */
a:hover { color: #1d4ed8; }
li:first-child { font-weight: bold; }
li:nth-child(even) { background: #f3f4f6; }`,
              explanation: "CSS selectors ครบทุกประเภท พร้อม specificity",
            },
          ],
        },
        {
          slug: "css-units",
          title: "Units — หน่วยวัด",
          isFree: true,
          duration: 12,
          content: `# CSS Units — หน่วยวัดใน CSS

## สิ่งที่คุณจะเรียนรู้
- Absolute units (px, pt, cm) และใช้เมื่อไหร่
- Relative units (em, rem, %, vw, vh) และความแตกต่าง
- ทำไม rem ถึงดีกว่า px สำหรับ font-size
- em vs rem — ความสับสนที่พบบ่อยมาก
- หน่วยใหม่: svh, dvh สำหรับมือถือ

---

## Absolute Units — ค่าคงที่

| Unit | ใช้เมื่อ |
|---|---|
| \`px\` | border, shadow, icon size, สิ่งที่ต้องการขนาดคงที่ |
| \`pt\` | CSS สำหรับ print เท่านั้น |
| \`cm\`, \`mm\` | CSS สำหรับ print เท่านั้น |

**px** คือหน่วยที่ใช้บ่อยที่สุด 1px ≈ 1 dot บนหน้าจอ (แต่บน Retina display อาจใช้ 2-3 physical pixels)

---

## Relative Units — ค่าสัมพัทธ์

### \`rem\` — สัมพัทธ์กับ root (html)

\`\`\`css
html { font-size: 16px; }  /* root font-size */

h1 { font-size: 2rem; }    /* 2 × 16 = 32px */
h2 { font-size: 1.5rem; }  /* 1.5 × 16 = 24px */
p  { font-size: 1rem; }    /* 1 × 16 = 16px */
\`\`\`

**ทำไม rem ดีกว่า px สำหรับ font-size?**

เมื่อผู้ใช้ตั้ง browser font size ที่ 20px (สำหรับผู้มีปัญหาสายตา):
- ถ้าใช้ px: ตัวอักษรยังคง 16px — ไม่ responsive กับ user preference
- ถ้าใช้ rem: ตัวอักษรขยายตามที่ผู้ใช้ตั้ง — **accessible!**

### \`em\` — สัมพัทธ์กับ parent element

\`\`\`css
.card {
  font-size: 18px;    /* กำหนด font-size ของ .card */
  padding: 1.5em;     /* 1.5 × 18 = 27px */
  gap: 0.5em;         /* 0.5 × 18 = 9px */
}

.card h3 {
  font-size: 1.2em;   /* 1.2 × 18 = 21.6px */
}
\`\`\`

**ข้อควรระวัง:** em ซ้อนกันทำให้คำนวณยาก!

\`\`\`css
body { font-size: 16px; }
.outer { font-size: 1.5em; }  /* 24px */
.inner { font-size: 1.5em; }  /* 1.5 × 24 = 36px! */
\`\`\`

> 💡 **Tip:** ใช้ **rem** สำหรับ font-size (ง่ายกว่า, predictable) และ **em** สำหรับ padding/margin ที่ต้องการให้ scale ตาม component's font-size

---

### \`%\` — สัมพัทธ์กับ parent

\`\`\`css
.container {
  width: 90%;           /* 90% ของ parent width */
  max-width: 1200px;    /* ไม่เกิน 1200px */
  margin: 0 auto;       /* จัดกลาง */
}

.half-column {
  width: 50%;           /* ครึ่งหนึ่งของ parent */
}
\`\`\`

### \`vw\` และ \`vh\` — สัมพัทธ์กับ Viewport

\`\`\`css
/* 1vw = 1% ของ viewport width */
/* 1vh = 1% ของ viewport height */

.hero {
  height: 100vh;   /* เต็มความสูงของหน้าจอ */
  width: 100vw;    /* เต็มความกว้างของหน้าจอ */
}

/* Fluid typography */
h1 { font-size: clamp(1.5rem, 5vw, 3rem); }
\`\`\`

---

### \`svh\` และ \`dvh\` — สำหรับมือถือ

\`\`\`css
/* vh บนมือถือมีปัญหากับ address bar ที่ขึ้นๆ ลงๆ */

/* svh = Small Viewport Height (ขนาดเล็กสุด) */
/* dvh = Dynamic Viewport Height (ตาม address bar จริง) */
/* lvh = Large Viewport Height (ขนาดใหญ่สุด) */

.hero {
  height: 100svh;  /* ปลอดภัยบนมือถือ */
}
\`\`\`

---

## สรุปการใช้งาน

| สิ่งที่จะ style | Unit แนะนำ | เหตุผล |
|---|---|---|
| font-size | rem | Accessible, predictable |
| padding/margin component | em | Scale ตาม font-size |
| layout width | % หรือ fr | Responsive |
| border, shadow | px | ต้องการความชัดเจน |
| hero section height | 100vh / 100svh | เต็มหน้าจอ |
| icon size | px หรือ rem | คงที่หรือ scale ตาม font |

---

## สรุป

การเลือก unit ที่ถูกต้องทำให้เว็บ responsive และ accessible ขึ้นมาก rem เป็นตัวเลือกที่ดีที่สุดสำหรับ typography ในปัจจุบัน ส่วน % และ fr ใช้สำหรับ layout`,
          codeExamples: [
            {
              title: "Units เปรียบเทียบ",
              language: "css",
              code: `html { font-size: 16px; }  /* 1rem = 16px */

/* rem — แนะนำสำหรับ font */
h1 { font-size: 2rem; }      /* 32px */
h2 { font-size: 1.5rem; }    /* 24px */
p  { font-size: 1rem; }      /* 16px */

/* em — สัมพัทธ์กับ parent */
.card {
  font-size: 18px;
  padding: 1em;    /* 18px (เท่ากับ font-size ของ .card) */
}

/* % — responsive width */
.container { width: 90%; max-width: 1200px; }
.half { width: 50%; }

/* viewport units */
.hero { height: 100vh; width: 100vw; }
.sidebar { width: 25vw; min-width: 200px; }`,
              explanation: "เปรียบเทียบการใช้ px, rem, em, %, vw/vh ในสถานการณ์จริง",
            },
          ],
        },
        {
          slug: "css-colors",
          title: "Colors",
          isFree: false,
          duration: 10,
          content: `# CSS Colors และ Backgrounds

## สิ่งที่คุณจะเรียนรู้
- รูปแบบสี 4 แบบ: HEX, RGB, HSL, Named
- Alpha transparency ด้วย rgba และ hsla
- CSS Gradients: linear, radial, conic
- Background properties: image, size, position, repeat
- CSS Variables สำหรับ color system

---

## รูปแบบสีใน CSS

### 1. HEX — ที่ใช้กันมากที่สุด

\`\`\`css
color: #3b82f6;      /* 6 หลัก: RR GG BB */
color: #3b82f6cc;    /* 8 หลัก: RR GG BB AA (alpha) */
color: #fff;         /* 3 หลัก shorthand (#fff = #ffffff) */
color: #fff8;        /* 4 หลัก shorthand (#fff8 = #ffff8888) */
\`\`\`

แต่ละคู่เป็น hexadecimal (0-9, A-F) ของ Red, Green, Blue

### 2. RGB / RGBA

\`\`\`css
color: rgb(59, 130, 246);              /* R G B, ค่า 0-255 */
color: rgba(59, 130, 246, 0.5);       /* + Alpha 0-1 (0=โปร่งใส, 1=ทึบ) */

/* Modern syntax (CSS 4) */
color: rgb(59 130 246);               /* ไม่ต้องใช้ comma */
color: rgb(59 130 246 / 50%);         /* alpha เป็น % */
\`\`\`

### 3. HSL / HSLA — ง่ายต่อการเข้าใจ

\`\`\`css
color: hsl(217, 91%, 60%);            /* Hue Saturation Lightness */
color: hsla(217, 91%, 60%, 0.8);      /* + Alpha */
\`\`\`

- **Hue (0-360)** — องศาบน color wheel (0=แดง, 120=เขียว, 240=น้ำเงิน)
- **Saturation (0-100%)** — ความเข้มของสี (0%=เทา, 100%=สดมาก)
- **Lightness (0-100%)** — ความสว่าง (0%=ดำ, 50%=ปกติ, 100%=ขาว)

> 💡 **Tip:** HSL ง่ายต่อการสร้าง color variations — เพิ่ม/ลด Lightness ได้ hover state, เพิ่ม/ลด Saturation สำหรับ disabled state

\`\`\`css
:root {
  --primary: hsl(217, 91%, 60%);        /* ปกติ */
  --primary-dark: hsl(217, 91%, 45%);   /* เข้มขึ้น (hover) */
  --primary-light: hsl(217, 91%, 95%);  /* อ่อนมาก (background) */
}
\`\`\`

### 4. Named Colors

\`\`\`css
color: red;         /* #ff0000 */
color: transparent; /* rgba(0,0,0,0) */
color: currentColor; /* ใช้สีปัจจุบัน (inheritance) */
\`\`\`

---

## CSS Gradients

### Linear Gradient
\`\`\`css
/* ทิศทางขึ้นล่าง (default) */
background: linear-gradient(#3b82f6, #8b5cf6);

/* กำหนดทิศทาง */
background: linear-gradient(to right, #3b82f6, #8b5cf6);
background: linear-gradient(135deg, #3b82f6, #ec4899);

/* หลายสี */
background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%);
\`\`\`

### Radial Gradient
\`\`\`css
background: radial-gradient(circle, #3b82f6, #1e1b4b);
background: radial-gradient(ellipse at top, #eff6ff, transparent);
\`\`\`

### Conic Gradient (Modern)
\`\`\`css
/* เหมือน pie chart */
background: conic-gradient(#ef4444 0% 30%, #3b82f6 30% 70%, #10b981 70% 100%);
\`\`\`

---

## Background Properties

\`\`\`css
.hero {
  background-image: url('hero.jpg');
  background-size: cover;        /* ครอบคลุมทั้งหมด */
  background-position: center;   /* จัดกลาง */
  background-repeat: no-repeat;  /* ไม่ tile */
  background-attachment: fixed;  /* parallax effect */

  /* หรือ shorthand */
  background: url('hero.jpg') center/cover no-repeat;
}
\`\`\`

---

## สรุป

สีใน CSS มีหลายรูปแบบ แต่ละแบบเหมาะกับสถานการณ์ต่างกัน HEX ใช้กันมากที่สุด แต่ HSL ง่ายกว่าในการสร้าง color system ส่วน gradient เพิ่มความสวยงามโดยไม่ต้องใช้รูปภาพ`,
          codeExamples: [
            {
              title: "Color ทุกรูปแบบ",
              language: "css",
              code: `/* HEX */
.text-blue { color: #3b82f6; }
.bg-transparent-blue { background: #3b82f640; } /* 25% opacity */

/* RGB */
.overlay { background: rgba(0, 0, 0, 0.5); }

/* HSL */
.success { color: hsl(145, 63%, 42%); }
.warning { color: hsl(38, 92%, 50%); }

/* Gradient */
.hero {
  background: linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899);
}
.card-hover:hover {
  background: radial-gradient(circle, #eff6ff, #fff);
}

/* CSS Variables */
:root {
  --color-primary: #3b82f6;
  --color-text: #1f2937;
  --color-bg: #f9fafb;
}

body {
  color: var(--color-text);
  background: var(--color-bg);
}`,
              explanation: "CSS colors ทุกรูปแบบ รวม gradient และ CSS variables",
            },
          ],
        },
        {
          slug: "css-typography",
          title: "Typography",
          isFree: false,
          duration: 15,
          content: `# Typography — การจัดการตัวอักษร

## สิ่งที่คุณจะเรียนรู้
- font-family และระบบ fallback fonts
- font-size ที่ responsive ด้วย clamp()
- font-weight, font-style, และ text-decoration
- line-height — ทำไมไม่ควรใส่ unit
- Google Fonts และวิธีใช้ custom fonts
- หลักการ Typography ที่ดีสำหรับ readability

---

## Typography คืออะไร?

Typography คือศาสตร์การจัดการตัวอักษร — ครอบคลุม font ที่เลือก, ขนาด, น้ำหนัก, ระยะห่างบรรทัด และอื่นๆ Typography ที่ดีทำให้ผู้ใช้อ่านเนื้อหาได้สบายตาและเพลิดเพลิน

---

## font-family — เลือก Font

\`\`\`css
body {
  font-family: 'Sarabun', 'Inter', system-ui, sans-serif;
}
\`\`\`

CSS อ่าน font ตามลำดับ ถ้าหา 'Sarabun' ไม่เจอจะลองถัดไป นี่คือ **font stack** ที่ควรมี fallback เสมอ

**Font categories:**
- \`sans-serif\` — ไม่มีหัวขีด (อ่านง่ายบนหน้าจอ) เช่น Sarabun, Inter
- \`serif\` — มีหัวขีด (ดูคลาสสิก) เช่น Georgia, Times
- \`monospace\` — ทุกตัวอักษรกว้างเท่ากัน (สำหรับโค้ด) เช่น Fira Code
- \`system-ui\` — font ของ OS ผู้ใช้

### Google Fonts
\`\`\`html
<!-- ใส่ใน <head> -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Sarabun:wght@400;600;700&family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
\`\`\`

\`\`\`css
body { font-family: 'Sarabun', sans-serif; }
.code { font-family: 'Fira Code', monospace; }
\`\`\`

---

## font-size — ขนาดตัวอักษร

\`\`\`css
/* Base size */
html { font-size: 16px; }   /* 1rem = 16px */

/* Static sizes */
h1 { font-size: 3rem; }     /* 48px */
h2 { font-size: 2rem; }     /* 32px */
p  { font-size: 1rem; }     /* 16px */

/* Fluid typography — ปรับขนาดตาม viewport */
h1 { font-size: clamp(1.75rem, 5vw, 3.5rem); }
/* clamp(ขั้นต่ำ, preferred, สูงสุด) */
/* บนมือถือ: 1.75rem (28px) */
/* บน desktop กว้างๆ: 3.5rem (56px) */
/* ระหว่างนั้น: 5vw */
\`\`\`

> 💡 **Tip:** \`clamp()\` เป็น "media query ในตัวเอง" สำหรับ font-size — ไม่ต้องเขียน media query แยก

---

## font-weight — น้ำหนัก

\`\`\`css
.thin       { font-weight: 100; }
.extralight { font-weight: 200; }
.light      { font-weight: 300; }
.normal     { font-weight: 400; }  /* = normal */
.medium     { font-weight: 500; }
.semibold   { font-weight: 600; }
.bold       { font-weight: 700; }  /* = bold */
.extrabold  { font-weight: 800; }
.black      { font-weight: 900; }
\`\`\`

> ⚠️ **ข้อควรระวัง:** ถ้าใช้ Google Fonts ต้องโหลด weight ที่ต้องการไว้ด้วย ถ้า font ไม่มี weight 300 browser จะ synthesize ซึ่งดูไม่ดี

---

## line-height — ระยะห่างบรรทัด

\`\`\`css
/* ✅ ไม่ใส่ unit (unitless) — สัมพัทธ์กับ font-size ปัจจุบัน */
body { line-height: 1.7; }   /* 1.7 × font-size = ระยะบรรทัด */
h1   { line-height: 1.2; }   /* heading ชิดกว่า */

/* ❌ ใส่ unit ทำให้ไม่ responsive */
p { line-height: 24px; }  /* ถ้า font เปลี่ยน line-height ไม่ตาม */
\`\`\`

**ค่าที่เหมาะสม:**
- Heading: 1.1 - 1.3 (ชิด เพราะตัวใหญ่)
- Body text: 1.6 - 1.8 (ห่าง เพราะต้องอ่านยาว)
- Code: 1.5

---

## letter-spacing และ word-spacing

\`\`\`css
/* letter-spacing: ระยะห่างระหว่างตัวอักษร */
h1 { letter-spacing: -0.02em; }     /* ชิดขึ้นนิดหน่อย (สำหรับ heading ใหญ่) */
.caption { letter-spacing: 0.08em; } /* เว้นห่าง (สำหรับ uppercase text) */

/* word-spacing: ระยะห่างระหว่างคำ */
p { word-spacing: 0.05em; }
\`\`\`

---

## text-* Properties อื่นๆ

\`\`\`css
p { text-align: left | center | right | justify; }
h1 { text-decoration: none | underline | line-through; }
.uppercase { text-transform: uppercase | lowercase | capitalize; }
.truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;  /* "..." เมื่อข้อความยาวเกิน */
}
\`\`\`

---

## สรุป

Typography ที่ดีคือการอ่านได้สบาย ไม่ล้าตา ใช้ font ที่มี character ชัดเจน, line-height เพียงพอสำหรับ body text, และ fluid typography ด้วย clamp() เพื่อดูดีทุกขนาดหน้าจอ`,
          codeExamples: [
            {
              title: "Typography System",
              language: "css",
              code: `/* Import Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Sarabun:wght@400;600;700&display=swap');

/* Base typography */
html { font-size: 16px; }

body {
  font-family: 'Sarabun', system-ui, sans-serif;
  font-size: 1rem;
  line-height: 1.7;
  color: #1f2937;
}

/* Heading scale */
h1 { font-size: clamp(1.8rem, 4vw, 3rem); font-weight: 700; line-height: 1.2; letter-spacing: -0.02em; }
h2 { font-size: clamp(1.4rem, 3vw, 2rem); font-weight: 600; line-height: 1.3; }
h3 { font-size: 1.25rem; font-weight: 600; }

/* Paragraph */
p { margin-bottom: 1.25em; color: #4b5563; }

/* Special text */
.lead { font-size: 1.2rem; color: #374151; line-height: 1.8; }
.caption { font-size: 0.875rem; color: #9ca3af; letter-spacing: 0.05em; }
.code { font-family: 'JetBrains Mono', monospace; font-size: 0.9em; }`,
              explanation: "Typography system สมบูรณ์พร้อม heading scale, line-height, และ responsive font size",
            },
          ],
        },
        {
          slug: "css-box-model",
          title: "Box Model",
          isFree: false,
          duration: 15,
          content: `# Box Model — กล่องที่ทุก Element เป็น

## สิ่งที่คุณจะเรียนรู้
- Box Model คืออะไร — content, padding, border, margin
- ความแตกต่างระหว่าง padding และ margin
- box-sizing: content-box vs border-box (สำคัญมาก!)
- Shorthand property สำหรับ margin และ padding
- Margin collapsing — ปัญหาที่สร้างความสับสนมาก

---

## Box Model คืออะไร?

ทุก HTML element เป็น "กล่อง" ที่ประกอบด้วย 4 ชั้น:

\`\`\`
┌──────────────────── margin ──────────────────────┐
│  ┌──────────────── border ────────────────────┐  │
│  │  ┌──────────── padding ───────────────┐   │  │
│  │  │                                    │   │  │
│  │  │          content area              │   │  │
│  │  │       (width × height)             │   │  │
│  │  │                                    │   │  │
│  │  └────────────────────────────────────┘   │  │
│  └────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────┘
\`\`\`

- **Content** — เนื้อหาจริง (ข้อความ, รูป) กำหนดด้วย width/height
- **Padding** — ช่องว่างด้านใน (มีสีพื้นหลังเหมือน element)
- **Border** — เส้นขอบ
- **Margin** — ช่องว่างด้านนอก (โปร่งใส เห็นพื้นหลัง)

---

## Padding — ช่องว่างด้านใน

\`\`\`css
/* 4 ด้านเท่ากัน */
padding: 16px;

/* บน-ล่าง | ซ้าย-ขวา */
padding: 20px 40px;

/* บน | ซ้าย-ขวา | ล่าง */
padding: 10px 20px 15px;

/* บน | ขวา | ล่าง | ซ้าย (clockwise) */
padding: 10px 20px 15px 5px;

/* แยกด้าน */
padding-top: 20px;
padding-right: 40px;
padding-bottom: 20px;
padding-left: 40px;
\`\`\`

> 💡 **Tip:** จำ shorthand ด้วย "TRBL" (Top Right Bottom Left) หรือ "TRouBLe"

---

## Margin — ช่องว่างด้านนอก

\`\`\`css
margin: 16px;       /* 4 ด้าน */
margin: 20px 0;     /* บน-ล่าง: 20px, ซ้าย-ขวา: 0 */
margin: 0 auto;     /* จัดกลาง element (ต้องมี width กำหนดไว้) */
\`\`\`

### ⚡ Margin Collapsing — ปัญหาที่ทำให้งง!

\`\`\`css
.box1 { margin-bottom: 30px; }
.box2 { margin-top: 20px; }

/* ระยะห่างจริงระหว่าง box1 และ box2 = 30px (ไม่ใช่ 50px!) */
/* Margin ที่ใหญ่กว่าชนะ */
\`\`\`

Margin collapsing เกิดขึ้นเมื่อ margin ด้านบนและล่างของ elements บรรจบกัน — CSS รวมเป็นค่าเดียว (ค่าที่ใหญ่กว่า) แทนที่จะบวกกัน

> ⚠️ **ข้อควรระวัง:** Margin collapsing เกิดเฉพาะกับ block elements แนวตั้ง (top/bottom) ไม่เกิดกับ padding และไม่เกิดใน Flexbox หรือ Grid

---

## box-sizing: border-box — สำคัญมากที่สุด!

\`\`\`css
/* DEFAULT: content-box */
.box {
  width: 200px;
  padding: 20px;
  border: 2px solid black;
}
/* ขนาดจริง = 200 + 20 + 20 + 2 + 2 = 244px !! */
/* ทำให้คำนวณขนาดยาก มักทำให้ layout แตก */

/* RECOMMENDED: border-box */
* {
  box-sizing: border-box;
}
.box {
  width: 200px;
  padding: 20px;
  border: 2px solid black;
}
/* ขนาดจริง = 200px (padding และ border อยู่ภายใน width แล้ว) */
\`\`\`

ด้วย \`border-box\` ค่า width ที่คุณตั้งคือขนาดจริง ไม่ต้องคำนวณเพิ่ม

**ใส่ไว้ใน CSS Reset เสมอ:**
\`\`\`css
*, *::before, *::after {
  box-sizing: border-box;
}
\`\`\`

---

## margin vs padding — ใช้อันไหน?

| สถานการณ์ | ใช้อะไร |
|---|---|
| ช่องว่างระหว่าง elements | margin |
| ช่องว่างภายใน element (card, button) | padding |
| ต้องการ background color ครอบคลุมด้วย | padding |
| จัดกลาง block element | margin: 0 auto |

---

## สรุป

Box Model คือพื้นฐานที่สำคัญที่สุดของ CSS layout ต้องตั้ง \`box-sizing: border-box\` ทุกครั้ง และเข้าใจ margin collapsing เพื่อไม่งงเมื่อ spacing ไม่เป็นอย่างที่คาด

## margin vs padding
- **padding** — ช่องว่างด้านใน (มีสีพื้นหลัง)
- **margin** — ช่องว่างด้านนอก (โปร่งใส)`,
          codeExamples: [
            {
              title: "Box Model ในทางปฏิบัติ",
              language: "css",
              code: `/* Reset ที่ดีที่สุด */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* Card component */
.card {
  width: 320px;
  padding: 24px;          /* ช่องว่างด้านใน */
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  margin-bottom: 16px;    /* ช่องว่างด้านนอก */
  background: white;
}

/* Shorthand: top right bottom left */
.section { padding: 80px 24px; }   /* top-bottom: 80px, left-right: 24px */
.btn { margin: 0 auto; }            /* top-bottom: 0, left-right: auto (จัดกลาง) */

/* Negative margin */
.overlap { margin-top: -20px; }     /* ซ้อนทับ element ก่อนหน้า */`,
              explanation: "Box model พร้อม box-sizing, shorthand, และ negative margin",
            },
          ],
        },
        {
          slug: "css-display",
          title: "Display",
          isFree: false,
          duration: 12,
          content: `# Display Property — ควบคุมการแสดงผล Element

## สิ่งที่คุณจะเรียนรู้
- display values หลัก: block, inline, inline-block, none
- ความแตกต่างระหว่าง block และ inline อย่างชัดเจน
- display: none vs visibility: hidden
- การเปลี่ยน display เพื่อสร้าง layout
- display: flex และ display: grid (preview)

---

## display คืออะไร?

\`display\` property ควบคุม "วิธีที่ element วางตัว" ในหน้าเว็บ — เป็นหนึ่งใน properties ที่สำคัญที่สุดของ CSS

---

## display: block

\`\`\`css
div, p, h1, h2, section, article { display: block; }
/* ↑ เหล่านี้เป็น block โดยธรรมชาติ */
\`\`\`

**พฤติกรรม Block:**
- ขึ้นบรรทัดใหม่เสมอ (element ถัดไปไปบรรทัดต่อไป)
- กว้างเต็ม parent โดยอัตโนมัติ
- ตั้ง \`width\`, \`height\`, \`margin\`, \`padding\` ได้ทุกด้าน

\`\`\`css
/* เปลี่ยน inline เป็น block */
a { display: block; }     /* ลิงก์กว้างเต็ม parent */
span { display: block; }  /* span กว้างเต็มบรรทัด */
\`\`\`

---

## display: inline

\`\`\`css
span, a, strong, em, img { display: inline; }
/* ↑ เหล่านี้เป็น inline โดยธรรมชาติ */
\`\`\`

**พฤติกรรม Inline:**
- อยู่ในบรรทัดเดียวกับ content รอบข้าง
- กว้างตามเนื้อหา (ไม่กว้างเต็มบรรทัด)
- **ตั้ง width, height ไม่ได้!**
- margin/padding ด้านซ้าย-ขวาทำงาน แต่ด้านบน-ล่างไม่กระทบ layout

\`\`\`css
/* ✅ ใช้ได้กับ inline */
span { color: red; padding-left: 8px; }

/* ❌ ไม่มีผล */
span { width: 200px; height: 50px; margin-top: 20px; }
\`\`\`

---

## display: inline-block

ผสมข้อดีของทั้งสองแบบ:
- อยู่ในบรรทัดเดียวกัน (เหมือน inline)
- ตั้ง width, height, margin, padding ได้ (เหมือน block)

\`\`\`css
.badge {
  display: inline-block;
  width: 80px;
  height: 24px;
  line-height: 24px;
  text-align: center;
  background: #3b82f6;
  color: white;
  border-radius: 12px;
  font-size: 0.75rem;
}
\`\`\`

---

## display: none vs visibility: hidden

\`\`\`css
/* ซ่อนและไม่ใช้พื้นที่เลย — element หายออกจาก layout */
.hidden { display: none; }

/* ซ่อน แต่ยังใช้พื้นที่อยู่ — มีช่องว่างค้างไว้ */
.invisible { visibility: hidden; }

/* ซ่อนทางสายตา แต่ screen reader ยังอ่านได้ (สำหรับ accessibility) */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
\`\`\`

---

## display: flex และ display: grid

\`\`\`css
/* Flexbox: layout 1 มิติ (แถวหรือคอลัมน์) */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Grid: layout 2 มิติ (แถวและคอลัมน์พร้อมกัน) */
.page {
  display: grid;
  grid-template-columns: 260px 1fr;
}
\`\`\`

---

## สรุปเปรียบเทียบ

| | block | inline | inline-block |
|---|---|---|---|
| ขึ้นบรรทัดใหม่ | ✅ | ❌ | ❌ |
| กว้างเต็ม parent | ✅ | ❌ | ❌ |
| width/height | ✅ | ❌ | ✅ |
| margin ทุกด้าน | ✅ | ซ้าย-ขวาเท่านั้น | ✅ |

---

## สรุป

\`display\` property เป็นหนึ่งในสิ่งแรกที่ต้องรู้ใน CSS การเข้าใจว่า element ไหนเป็น block ไหนเป็น inline และจะเปลี่ยนได้อย่างไรจะช่วยแก้ปัญหา layout ได้มากมาย`,
          codeExamples: [
            {
              title: "Display ทุกประเภท",
              language: "css",
              code: `/* Block */
.container { display: block; width: 100%; }

/* Inline */
.highlight { display: inline; background: yellow; }

/* Inline-block */
.badge {
  display: inline-block;
  width: 80px;
  height: 24px;
  text-align: center;
  background: #3b82f6;
  color: white;
  border-radius: 12px;
}

/* None — ซ่อน */
.hidden { display: none; }

/* Flex */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Grid */
.grid-3 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}`,
              explanation: "Display values: block, inline, inline-block, none, flex, grid",
            },
          ],
        },
        {
          slug: "css-position",
          title: "Position",
          isFree: false,
          duration: 15,
          content: `# CSS Position — ควบคุมตำแหน่ง Element

## สิ่งที่คุณจะเรียนรู้
- Position 5 ค่า: static, relative, absolute, fixed, sticky
- Document Flow คืออะไรและเมื่อไหร่ออกจาก flow
- Containing block — parent ที่ absolute วางตำแหน่งสัมพัทธ์
- z-index — ควบคุมการซ้อนทับ
- เทคนิคการจัดกลาง absolute element

---

## Document Flow คืออะไร?

"Document flow" คือลำดับปกติที่ browser วาง elements ตามลำดับใน HTML จากบนลงล่าง บางค่าของ position ทำให้ element "ออกจาก flow" ซึ่งทำให้ elements อื่นวางตัวราวกับมันไม่มีอยู่

---

## position: static (Default)

\`\`\`css
/* ทุก element เริ่มต้นด้วย static */
div { position: static; }

/* top, right, bottom, left ไม่มีผลกับ static! */
\`\`\`

---

## position: relative

\`\`\`css
.shifted {
  position: relative;
  top: 20px;     /* ขยับลงจากตำแหน่งปกติ 20px */
  left: 10px;    /* ขยับขวาจากตำแหน่งปกติ 10px */
}
\`\`\`

- Element **ยังอยู่ใน document flow** (ไม่หายไป)
- ขยับจากตำแหน่งปกติด้วย top/right/bottom/left
- สำคัญ: **ใช้เป็น "containing block" สำหรับ absolute children**

---

## position: absolute

\`\`\`css
/* Parent ต้องมี position ที่ไม่ใช่ static */
.card {
  position: relative;   /* ← กำหนด containing block */
}

/* Badge วางสัมพัทธ์กับ .card */
.card .badge {
  position: absolute;
  top: 12px;
  right: 12px;
}
\`\`\`

- **ออกจาก document flow** — elements อื่นวางตัวราวกับ badge ไม่มี
- วางตำแหน่งสัมพัทธ์กับ **ancestor ที่ใกล้ที่สุดที่ position ≠ static**
- ถ้าไม่มี positioned ancestor → วางสัมพัทธ์กับ \`<html>\`

---

## position: fixed

\`\`\`css
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 64px;
  z-index: 100;
  background: white;
}

/* ต้องเพิ่ม padding-top ให้ body ไม่ให้เนื้อหาซ่อนอยู่ใต้ navbar */
body { padding-top: 64px; }
\`\`\`

- **ออกจาก document flow**
- ติดหน้าจอ — ไม่ scroll ตามหน้า
- วางตำแหน่งสัมพัทธ์กับ **viewport**

---

## position: sticky

\`\`\`css
.sidebar {
  position: sticky;
  top: 80px;    /* ค้างห่างจากด้านบนของ viewport 80px */
  height: fit-content;  /* สูงตามเนื้อหา */
}

.table-header th {
  position: sticky;
  top: 0;       /* header ตารางค้างเมื่อ scroll */
  background: white;
  z-index: 10;
}
\`\`\`

- **อยู่ใน document flow** (เหมือน relative ตอนปกติ)
- เมื่อ scroll ถึงค่า top ที่กำหนด จะ "ค้าง" อยู่ (เหมือน fixed ชั่วคราว)
- ต้องมี overflow ที่ scroll ได้ใน parent

> ⚠️ **ข้อควรระวัง:** sticky ใช้ไม่ได้ถ้า parent มี \`overflow: hidden\` หรือ \`overflow: auto\`

---

## z-index — ควบคุมการซ้อนทับ

\`\`\`css
/* z-index ทำงานเฉพาะกับ positioned elements */
.modal { position: fixed; z-index: 1000; }
.overlay { position: fixed; z-index: 999; }
.navbar { position: sticky; z-index: 100; }
.dropdown { position: absolute; z-index: 50; }
.card { position: relative; z-index: 1; }
\`\`\`

ค่าสูงกว่า = อยู่บน ใช้ตัวเลขที่มีระยะห่าง (เช่น 10, 50, 100, 1000) ไม่ใช่ 1, 2, 3 เพื่อให้แทรกได้ง่าย

---

## เทคนิคการจัดกลาง

\`\`\`css
/* Center absolute element — เทคนิค classic */
.parent {
  position: relative;
  width: 400px;
  height: 300px;
}

.child {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* top: 50% ขยับ top-edge ไปกึ่งกลาง */
  /* transform: translate(-50%, -50%) ขยับกลับครึ่งขนาดตัวเอง */
}
\`\`\`

---

## สรุป

Position property ทรงพลังมากสำหรับสร้าง UI เฉพาะ เช่น navbar ติดบน, modal overlay, badge ที่มุมรูป, dropdown menu เข้าใจ "containing block" และ document flow จะทำให้ใช้ position ได้อย่างถูกต้อง`,
          codeExamples: [
            {
              title: "Position ทุกประเภท",
              language: "css",
              code: `/* Parent สำหรับ absolute children */
.card {
  position: relative;
  width: 300px;
  height: 200px;
}

/* Badge ที่มุมบนขวาของ card */
.badge {
  position: absolute;
  top: 12px;
  right: 12px;
  background: #ef4444;
  color: white;
  padding: 2px 8px;
  border-radius: 9999px;
}

/* Navbar ติดด้านบน */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: white;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

/* Sidebar sticky */
.sidebar {
  position: sticky;
  top: 80px;    /* ค้างห่างจากบนสุด 80px */
}`,
              explanation: "Position: relative parent + absolute badge, fixed navbar, sticky sidebar",
            },
          ],
        },
        {
          slug: "css-flexbox",
          title: "Flexbox",
          isFree: false,
          duration: 20,
          content: `# CSS Flexbox — Layout ที่ยืดหยุ่น

## สิ่งที่คุณจะเรียนรู้
- Flexbox คืออะไร และแตกต่างจาก Grid อย่างไร
- Main axis vs Cross axis
- Container properties: flex-direction, justify-content, align-items, gap
- Item properties: flex-grow, flex-shrink, flex-basis
- Flex patterns ที่ใช้บ่อยในชีวิตจริง

---

## Flexbox คืออะไร?

Flexbox (Flexible Box Layout) คือระบบ layout ที่ออกแบบมาสำหรับ **1 มิติ** — จัด items ในแถวหรือคอลัมน์ได้อย่างยืดหยุ่น

ก่อน Flexbox การจัดกลางหรือสร้าง layout ต้องใช้ trick ซับซ้อน เช่น float, negative margin Flexbox แก้ปัญหาเหล่านั้นได้หมด

---

## เปิดใช้ Flexbox

\`\`\`css
.container {
  display: flex;
  /* ลูกทุกตัวของ .container กลายเป็น flex items */
}
\`\`\`

---

## Main Axis vs Cross Axis

\`\`\`
flex-direction: row (default)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━▶ Main Axis (ซ้ายไปขวา)
┌────┐ ┌────┐ ┌────┐
│ A  │ │ B  │ │ C  │
└────┘ └────┘ └────┘
   ↕ Cross Axis (บนลงล่าง)

flex-direction: column
   ↕ Main Axis (บนลงล่าง)
┌────┐
│ A  │
└────┘
┌────┐
│ B  │
└────┘
\`\`\`

- **Main Axis** — ทิศทางหลักที่ items เรียง กำหนดโดย \`flex-direction\`
- **Cross Axis** — ตั้งฉากกับ main axis

---

## Container Properties

### flex-direction — ทิศทาง
\`\`\`css
.container {
  flex-direction: row;         /* ซ้ายไปขวา (default) */
  flex-direction: row-reverse; /* ขวาไปซ้าย */
  flex-direction: column;      /* บนลงล่าง */
  flex-direction: column-reverse; /* ล่างขึ้นบน */
}
\`\`\`

### justify-content — จัด items บน Main Axis
\`\`\`css
.container {
  justify-content: flex-start;   /* ชิดต้น (default) */
  justify-content: flex-end;     /* ชิดท้าย */
  justify-content: center;       /* กลาง */
  justify-content: space-between; /* เว้นระหว่าง items เท่ากัน */
  justify-content: space-around;  /* เว้นรอบ items เท่ากัน */
  justify-content: space-evenly;  /* เว้นทุกช่องเท่ากัน */
}
\`\`\`

### align-items — จัด items บน Cross Axis
\`\`\`css
.container {
  align-items: stretch;    /* ยืดเต็มความสูง (default) */
  align-items: flex-start; /* ชิดบน */
  align-items: flex-end;   /* ชิดล่าง */
  align-items: center;     /* กลาง */
  align-items: baseline;   /* เรียงตาม text baseline */
}
\`\`\`

### gap — ช่องว่างระหว่าง items
\`\`\`css
.container {
  gap: 16px;         /* ทุกทิศทาง */
  gap: 16px 24px;    /* row-gap column-gap */
  row-gap: 16px;
  column-gap: 24px;
}
\`\`\`

### flex-wrap — ตัดบรรทัด
\`\`\`css
.container {
  flex-wrap: nowrap;  /* ไม่ตัด (default) — items อัดกัน */
  flex-wrap: wrap;    /* ตัดไปบรรทัดถัดไปเมื่อเต็ม */
}
\`\`\`

---

## Item Properties

### flex — shorthand สำคัญ
\`\`\`css
/* flex: grow shrink basis */
.item { flex: 1; }           /* flex: 1 1 0% — ขยายเต็มที่เท่ากัน */
.item { flex: 0 0 200px; }   /* ขนาดคงที่ 200px ไม่ขยายไม่ย่อ */
.item { flex: 2; }           /* ขยายเป็น 2 เท่าของ flex: 1 */
\`\`\`

### align-self — override align-items สำหรับ item เดียว
\`\`\`css
.special-item { align-self: flex-end; }
\`\`\`

### order — เปลี่ยนลำดับ
\`\`\`css
.first  { order: -1; }  /* ขึ้นก่อน */
.last   { order: 1; }   /* ลงหลัง */
\`\`\`

---

## Flex Patterns ที่ใช้บ่อย

\`\`\`css
/* Perfect center */
.center-everything {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

/* Navbar: logo ซ้าย, menu ขวา */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Sidebar layout */
.layout { display: flex; gap: 24px; }
.sidebar { flex: 0 0 260px; }  /* คงที่ 260px */
.main { flex: 1; }              /* กินพื้นที่ที่เหลือ */
\`\`\`

---

## สรุป

Flexbox ทำให้ layout งานง่ายขึ้นมาก เหมาะสำหรับ navbar, card row, centering, และ sidebar layout ให้ท่องจำ: \`justify-content\` = แนวนอน (main axis), \`align-items\` = แนวตั้ง (cross axis)`,
          codeExamples: [
            {
              title: "Flexbox Patterns ที่ใช้บ่อย",
              language: "css",
              code: `/* Navbar */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  height: 64px;
}

/* จัดกลาง perfect center */
.hero {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

/* Card row ที่ responsive */
.cards {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}
.card { flex: 1 1 280px; }  /* grow, shrink, basis */

/* Sidebar layout */
.layout {
  display: flex;
  gap: 24px;
}
.sidebar { flex: 0 0 240px; }   /* ไม่ขยาย ไม่ย่อ ขนาด 240px */
.main { flex: 1; }               /* กินพื้นที่ที่เหลือ */

/* Button group */
.btn-group {
  display: flex;
  gap: 8px;
  align-items: center;
}`,
              explanation: "Flexbox patterns ที่ใช้บ่อย: navbar, center, cards, sidebar layout",
            },
          ],
        },
        {
          slug: "css-grid",
          title: "CSS Grid",
          isFree: false,
          duration: 20,
          content: `# CSS Grid — Layout 2 มิติ

## สิ่งที่คุณจะเรียนรู้
- Grid คืออะไร และต่างจาก Flexbox อย่างไร
- grid-template-columns และ grid-template-rows
- fr unit — fractional unit ที่ทรงพลัง
- auto-fill vs auto-fit สำหรับ responsive grid
- Named areas ด้วย grid-template-areas
- Grid item placement ด้วย grid-column และ grid-row

---

## Grid vs Flexbox

| | Flexbox | CSS Grid |
|---|---|---|
| มิติ | 1 มิติ (แถว OR คอลัมน์) | 2 มิติ (แถว AND คอลัมน์) |
| เหมาะสำหรับ | Component layout, navigation | Page layout, card grids |
| Control | จาก items | จาก container |

> 💡 **Tip:** ใช้ Grid สำหรับ macro layout (โครงสร้างหน้า) และ Flexbox สำหรับ micro layout (ภายใน component)

---

## เปิดใช้ Grid

\`\`\`css
.container {
  display: grid;
}
\`\`\`

---

## grid-template-columns

\`\`\`css
/* 3 คอลัมน์ขนาดคงที่ */
grid-template-columns: 200px 200px 200px;

/* fr unit: fractional — แบ่งพื้นที่ที่เหลือ */
grid-template-columns: 1fr 1fr 1fr;    /* 3 คอลัมน์เท่ากัน */
grid-template-columns: repeat(3, 1fr); /* เหมือนกัน */

/* ผสม: sidebar + content */
grid-template-columns: 260px 1fr;

/* ผสม: sidebar + content + right panel */
grid-template-columns: 240px 1fr 300px;
\`\`\`

### fr Unit คืออะไร?

\`fr\` = fraction of available space หลังจากหักพื้นที่คงที่แล้ว

\`\`\`css
/* 260px สำหรับ sidebar, ส่วนที่เหลือ (ทั้งหมด) สำหรับ content */
grid-template-columns: 260px 1fr;

/* content ได้ 2 เท่าของ sidebar */
grid-template-columns: 1fr 2fr;
\`\`\`

---

## Responsive Grid ด้วย auto-fill และ minmax

\`\`\`css
/* auto-fill: ใส่ให้ได้มากที่สุด */
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  /* minmax(280px, 1fr) = แต่ละ column อย่างน้อย 280px แต่ขยายได้ */
  gap: 24px;
}
\`\`\`

นี่คือ "magic one-liner" ที่ทำให้ grid responsive โดยไม่ต้องเขียน media query!

- เมื่อหน้าจอแคบ: 1 คอลัมน์
- เมื่อกว้างขึ้น: 2, 3, 4 คอลัมน์อัตโนมัติ

### auto-fill vs auto-fit

\`\`\`css
/* auto-fill: เติมช่องว่างแม้จะไม่มี item */
grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));

/* auto-fit: ขยาย items ที่มีอยู่ให้เต็ม */
grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
\`\`\`

---

## grid-template-rows

\`\`\`css
/* กำหนดความสูงของแถว */
grid-template-rows: 60px 1fr 80px;
/* แถวที่ 1 = 60px (header) */
/* แถวที่ 2 = ที่เหลือ (content) */
/* แถวที่ 3 = 80px (footer) */
\`\`\`

---

## Named Grid Areas

\`\`\`css
.layout {
  display: grid;
  grid-template-columns: 260px 1fr;
  grid-template-rows: 64px 1fr 60px;
  grid-template-areas:
    "sidebar header"
    "sidebar main"
    "sidebar footer";
  min-height: 100vh;
}

/* กำหนด area ให้แต่ละ element */
.sidebar { grid-area: sidebar; }
.header  { grid-area: header; }
.main    { grid-area: main; }
.footer  { grid-area: footer; }
\`\`\`

---

## Grid Item Placement

\`\`\`css
/* span: กินพื้นที่กี่ track */
.hero { grid-column: span 3; }    /* กินทั้ง 3 คอลัมน์ */
.wide { grid-column: 1 / -1; }   /* จากคอลัมน์แรกถึงสุดท้าย */

/* กำหนดตำแหน่งเจาะจง */
.special { grid-column: 2 / 4; grid-row: 1 / 3; }
\`\`\`

---

## สรุป

CSS Grid เป็นเครื่องมือ layout ที่ทรงพลังที่สุดใน CSS ปัจจุบัน \`repeat(auto-fill, minmax())\` ทำให้สร้าง responsive grid ได้ง่ายมาก และ named areas ทำให้โค้ด layout อ่านง่ายเข้าใจได้ทันที`,
          codeExamples: [
            {
              title: "Grid Layouts ที่ใช้บ่อย",
              language: "css",
              code: `/* Course card grid responsive */
.courses-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
}

/* Page layout: sidebar + content */
.page-layout {
  display: grid;
  grid-template-columns: 240px 1fr;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
  gap: 0;
}

/* Named areas */
.dashboard {
  display: grid;
  grid-template-areas:
    "sidebar header"
    "sidebar main"
    "sidebar footer";
  grid-template-columns: 260px 1fr;
}
.sidebar  { grid-area: sidebar; }
.header   { grid-area: header; }
.main     { grid-area: main; }

/* 12-column grid */
.container {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 16px;
}
.full-width { grid-column: 1 / -1; }
.half { grid-column: span 6; }`,
              explanation: "CSS Grid: auto-fill responsive, named areas, 12-column system",
            },
          ],
        },
        {
          slug: "css-responsive",
          title: "Responsive Design",
          isFree: false,
          duration: 18,
          content: `# Responsive Design — เว็บที่ดีทุกขนาดหน้าจอ

## สิ่งที่คุณจะเรียนรู้
- Responsive Design คืออะไรและทำไมสำคัญ
- Media Query syntax และ breakpoints
- Mobile First vs Desktop First — และควรใช้อะไร
- Responsive Typography ด้วย clamp()
- Responsive Images
- ทดสอบ responsive ใน browser

---

## Responsive Design คืออะไร?

ในปี 2024 มากกว่า **60%** ของ traffic เว็บมาจากมือถือ เว็บที่ดูดีบน desktop แต่ไม่ดีบนมือถือสูญเสียผู้ใช้จำนวนมาก

Responsive Design คือแนวทางออกแบบที่เว็บ "ตอบสนอง" ต่อขนาดหน้าจอ แสดงผลดีทุกอุปกรณ์

---

## Media Query Syntax

\`\`\`css
/* เงื่อนไขพื้นฐาน */
@media (min-width: 768px) {
  /* CSS ที่ใช้เมื่อ viewport กว้าง >= 768px */
}

/* หลายเงื่อนไข */
@media (min-width: 768px) and (max-width: 1024px) {
  /* เฉพาะ tablet */
}

/* Media type */
@media print {
  /* CSS สำหรับพิมพ์ */
  .navbar { display: none; }
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
  body { background: #0f172a; color: #f1f5f9; }
}

/* ลด motion สำหรับผู้ที่ไวต่อ animation */
@media (prefers-reduced-motion: reduce) {
  * { animation: none !important; transition: none !important; }
}
\`\`\`

---

## Breakpoints — จุดเปลี่ยน Layout

ไม่มี breakpoint "มาตรฐาน" ที่ตายตัว แต่ที่ใช้กันทั่วไปคือ:

| ชื่อ | ขนาด | อุปกรณ์ |
|---|---|---|
| xs | < 480px | มือถือเล็ก |
| sm | 640px+ | มือถือ |
| md | 768px+ | Tablet |
| lg | 1024px+ | Desktop เล็ก |
| xl | 1280px+ | Desktop |
| 2xl | 1536px+ | Desktop ใหญ่ |

> 💡 **Tip:** ออกแบบ breakpoint ตาม content ของเว็บ ไม่ใช่ขนาดอุปกรณ์ เพราะอุปกรณ์มีหลายขนาดมาก

---

## Mobile First vs Desktop First

### ❌ Desktop First (เก่า, ไม่แนะนำ)
\`\`\`css
/* เริ่มจาก desktop */
.grid { grid-template-columns: repeat(3, 1fr); }

/* ลดสำหรับมือถือ */
@media (max-width: 768px) {
  .grid { grid-template-columns: 1fr; }
}
\`\`\`

### ✅ Mobile First (แนะนำ)
\`\`\`css
/* เริ่มจากมือถือ (เล็กสุด) */
.grid { grid-template-columns: 1fr; }

/* เพิ่มสำหรับหน้าจอใหญ่ขึ้น */
@media (min-width: 640px) {
  .grid { grid-template-columns: repeat(2, 1fr); }
}
@media (min-width: 1024px) {
  .grid { grid-template-columns: repeat(3, 1fr); }
}
\`\`\`

**ทำไม Mobile First ดีกว่า?**
1. **Performance** — CSS ที่โหลดบนมือถือน้อยที่สุด
2. **Priority** — บังคับให้คิดถึงเนื้อหาหลักก่อน
3. **Progressive Enhancement** — เพิ่มความซับซ้อนเมื่อหน้าจอใหญ่ขึ้น

---

## Responsive Typography

\`\`\`css
/* ❌ Static — ใหญ่เกินบนมือถือ */
h1 { font-size: 3rem; }

/* ✅ Fluid — ปรับตาม viewport */
h1 { font-size: clamp(1.75rem, 5vw, 3.5rem); }
/* มือถือ: 1.75rem | desktop: 3.5rem | ระหว่างนั้น: 5vw */
\`\`\`

---

## Responsive Images

\`\`\`html
<!-- ใช้ CSS max-width -->
<style>
img { max-width: 100%; height: auto; }
</style>

<!-- หรือ srcset สำหรับหลายขนาด -->
<img
  src="image-800.jpg"
  srcset="image-480.jpg 480w, image-800.jpg 800w, image-1200.jpg 1200w"
  sizes="(max-width: 600px) 480px, 100vw"
  alt="Responsive image"
>
\`\`\`

---

## CSS Container Queries (Modern)

\`\`\`css
/* Style ตาม container ไม่ใช่ viewport */
.card-wrapper {
  container-type: inline-size;
  container-name: card;
}

@container card (min-width: 400px) {
  .card { flex-direction: row; }
}
\`\`\`

---

## สรุป

Responsive Design เริ่มด้วย viewport meta tag, ใช้ Mobile First, เขียน breakpoint ด้วย min-width และใช้ fluid units (rem, %, fr, vw) ให้มากที่สุดเพื่อลด media queries ที่ต้องเขียน`,
          codeExamples: [
            {
              title: "Responsive Layout Mobile First",
              language: "css",
              code: `/* Mobile first */

/* Navigation */
.navbar {
  padding: 0 16px;
}
.nav-links {
  display: none;  /* ซ่อนบนมือถือ */
}
@media (min-width: 768px) {
  .navbar { padding: 0 24px; }
  .nav-links { display: flex; gap: 24px; }
  .hamburger { display: none; }
}

/* Cards grid */
.courses-grid {
  display: grid;
  grid-template-columns: 1fr;  /* 1 คอลัมน์บนมือถือ */
  gap: 16px;
}
@media (min-width: 640px) {
  .courses-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (min-width: 1024px) {
  .courses-grid { grid-template-columns: repeat(3, 1fr); gap: 24px; }
}
@media (min-width: 1280px) {
  .courses-grid { grid-template-columns: repeat(4, 1fr); }
}

/* Typography responsive */
h1 { font-size: 1.75rem; }
@media (min-width: 768px) { h1 { font-size: 2.5rem; } }
@media (min-width: 1024px) { h1 { font-size: 3.5rem; } }`,
              explanation: "Mobile-first responsive: navigation, grid, typography",
            },
          ],
        },
        {
          slug: "css-transform",
          title: "Transform",
          isFree: false,
          duration: 12,
          content: `# CSS Transform — เปลี่ยนรูปร่างและตำแหน่ง

## สิ่งที่คุณจะเรียนรู้
- Transform functions: translate, rotate, scale, skew
- transform-origin — จุดหมุน
- รวม transform หลายอย่างในครั้งเดียว
- 3D transforms: rotateX, rotateY, perspective
- ทำไม transform ไม่กระทบ layout (เร็วกว่า position)

---

## Transform คืออะไร?

Transform เปลี่ยน **รูปร่าง, ขนาด, และตำแหน่ง** ของ element **โดยไม่กระทบ document flow** — elements อื่นไม่ขยับตาม

นี่ทำให้ transform เหมาะสำหรับ animation และ hover effects เพราะ:
1. **ไม่กระทบ layout** — elements อื่นไม่ขยับ
2. **GPU Accelerated** — browser ใช้ GPU วาด ทำให้ smooth 60fps
3. **ไม่ trigger reflow** — เร็วกว่าการเปลี่ยน width, left, top

---

## translate — ขยับตำแหน่ง

\`\`\`css
/* แนวนอน */
transform: translateX(20px);   /* ขยับขวา 20px */
transform: translateX(-20px);  /* ขยับซ้าย 20px */

/* แนวตั้ง */
transform: translateY(10px);   /* ขยับลง 10px */
transform: translateY(-10px);  /* ขยับขึ้น 10px */

/* ทั้งสองแกน */
transform: translate(20px, -10px);  /* ขวา 20px, ขึ้น 10px */

/* % ของขนาดตัวเอง */
transform: translate(-50%, -50%);   /* เทคนิคจัดกลาง */
\`\`\`

**Use case ยอดนิยม:**
\`\`\`css
/* Card ยกขึ้นเมื่อ hover */
.card { transition: transform 0.2s ease; }
.card:hover { transform: translateY(-4px); }

/* Center element */
.centered {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
\`\`\`

---

## rotate — หมุน

\`\`\`css
transform: rotate(45deg);    /* หมุนตามเข็มนาฬิกา 45° */
transform: rotate(-90deg);   /* หมุนทวนเข็ม 90° */
transform: rotate(0.5turn);  /* หมุน 180° (0.5 รอบ) */
transform: rotate(1rad);     /* หน่วย radian */

/* 3D rotate */
transform: rotateX(45deg);   /* หมุนแนวนอน (flip) */
transform: rotateY(45deg);   /* หมุนแนวตั้ง (turn) */
\`\`\`

**Use case ยอดนิยม:**
\`\`\`css
/* Chevron หมุนเมื่อ dropdown เปิด */
.chevron { transition: transform 0.3s ease; }
.open .chevron { transform: rotate(180deg); }

/* Loader spinner */
@keyframes spin { to { transform: rotate(360deg); } }
.spinner { animation: spin 1s linear infinite; }
\`\`\`

---

## scale — ขยาย/ย่อ

\`\`\`css
transform: scale(1.1);     /* ขยาย 10% */
transform: scale(0.9);     /* ย่อ 10% */
transform: scaleX(1.5);    /* ขยายแนวนอน */
transform: scaleY(0.5);    /* ย่อแนวตั้ง */
transform: scale(1.2, 0.8); /* ขยายแนวนอน, ย่อแนวตั้ง */
\`\`\`

---

## skew — เอียง

\`\`\`css
transform: skewX(15deg);   /* เอียงแนวนอน */
transform: skewY(10deg);   /* เอียงแนวตั้ง */
transform: skew(15deg, 5deg);
\`\`\`

---

## transform-origin — จุดหมุน

\`\`\`css
.element { transform-origin: center; }     /* default */
.element { transform-origin: top left; }   /* มุมบนซ้าย */
.element { transform-origin: 0 0; }        /* เหมือนกัน */
.element { transform-origin: 50% 100%; }   /* กลาง ล่างสุด */

/* ตัวอย่าง: flip card จากมุมบนซ้าย */
.card {
  transform-origin: top left;
  transform: scale(1.05);
}
\`\`\`

---

## รวม Transform หลายอย่าง

\`\`\`css
/* ลำดับสำคัญมาก! */
transform: translateX(50px) rotate(45deg) scale(1.2);
/* ทำจากขวาไปซ้าย: scale ก่อน แล้ว rotate แล้ว translate */

/* ตัวอย่าง card hover สมจริง */
.card {
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.card:hover {
  transform: translateY(-8px) scale(1.02);
}
\`\`\`

---

## สรุป

Transform เป็นเครื่องมือสำคัญสำหรับ animation และ hover effects ใช้ translate แทนการเปลี่ยน top/left เพราะเร็วกว่ามาก และรวม scale เพื่อ feedback เมื่อ hover/click`,
          codeExamples: [
            {
              title: "Transform Hover Effects",
              language: "css",
              code: `/* Card hover: ยกขึ้น */
.card {
  transition: transform 0.2s ease;
}
.card:hover {
  transform: translateY(-4px);
}

/* Button hover: ขยาย */
.btn {
  transition: transform 0.15s ease;
}
.btn:hover { transform: scale(1.05); }
.btn:active { transform: scale(0.97); }

/* Icon rotate */
.arrow {
  transition: transform 0.3s ease;
}
.open .arrow {
  transform: rotate(180deg);
}

/* Loading spinner */
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.spinner {
  animation: spin 1s linear infinite;
}

/* Center trick */
.centered {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}`,
              explanation: "Transform ใน hover effects, loading spinner, และ centering",
            },
          ],
        },
        {
          slug: "css-transition",
          title: "Transition",
          isFree: false,
          duration: 12,
          content: `# CSS Transitions — ความเรียบเนียนของ UI

## สิ่งที่คุณจะเรียนรู้
- Transition คืออะไร และทำงานอย่างไร
- Transition properties: property, duration, timing-function, delay
- Timing functions และความหมาย
- Properties ที่ควร (และไม่ควร) animate
- Transition patterns ที่ใช้บ่อย

---

## Transition คืออะไร?

Transition ทำให้การเปลี่ยนค่า CSS เกิดขึ้นแบบ **smooth** แทนที่จะเปลี่ยนทันที

\`\`\`css
/* ❌ ไม่มี transition — เปลี่ยนทันที */
.btn:hover { background: #1d4ed8; }

/* ✅ มี transition — เปลี่ยนแบบ smooth 0.2 วินาที */
.btn {
  background: #3b82f6;
  transition: background-color 0.2s ease;
}
.btn:hover { background: #1d4ed8; }
\`\`\`

---

## Syntax

\`\`\`css
transition: property duration timing-function delay;
\`\`\`

ตัวอย่าง:
\`\`\`css
transition: background-color 0.2s ease;
transition: transform 0.3s ease-out;
transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
\`\`\`

---

## transition-property

\`\`\`css
/* Specific property */
transition-property: background-color;
transition-property: transform, opacity;

/* ทุก property (ระวัง: ช้ากว่าเพราะ animate ทุกอย่าง) */
transition-property: all;
\`\`\`

> ⚠️ **ข้อควรระวัง:** หลีกเลี่ยง \`transition: all\` เพราะ animate properties บางตัว (เช่น width, height) ทำให้ browser reflow บ่อย ส่งผลต่อ performance

---

## transition-duration

\`\`\`css
transition-duration: 0.2s;    /* 200ms */
transition-duration: 300ms;   /* 300ms */
transition-duration: 0.5s;    /* 500ms */
\`\`\`

**หลักเกณฑ์ทั่วไป:**
- Hover effects: **150-200ms** (เร็ว, ตอบสนองทันที)
- Element appear/disappear: **200-300ms**
- Complex animations: **300-500ms**
- อย่าใช้เกิน 500ms — รู้สึกช้าและน่าหงุดหงิด

---

## Timing Functions

\`\`\`css
transition-timing-function: ease;         /* เร็วต้น, ช้าลงท้าย (default) */
transition-timing-function: linear;       /* สม่ำเสมอ */
transition-timing-function: ease-in;      /* ช้าต้น, เร็วขึ้น */
transition-timing-function: ease-out;     /* เร็วต้น, ช้าลงท้าย (smooth stop) */
transition-timing-function: ease-in-out;  /* ช้าต้นและท้าย */
transition-timing-function: cubic-bezier(x1, y1, x2, y2); /* custom */
\`\`\`

**เมื่อใช้อะไร:**
- **ease** — ทั่วไป เหมาะกับ hover effects
- **ease-out** — สิ่งที่ "เข้ามา" บนหน้าจอ (modal, dropdown ปรากฏ)
- **ease-in** — สิ่งที่ "ออกไป" จากหน้าจอ (modal ปิด)
- **linear** — spinner, progress bar

---

## transition-delay

\`\`\`css
/* เริ่ม transition หลังจาก 0.1s */
transition-delay: 0.1s;

/* Stagger animation: items ปรากฏทีละอัน */
.item:nth-child(1) { transition-delay: 0s; }
.item:nth-child(2) { transition-delay: 0.1s; }
.item:nth-child(3) { transition-delay: 0.2s; }
\`\`\`

---

## Multiple Transitions

\`\`\`css
.btn {
  transition:
    background-color 0.2s ease,
    transform 0.15s ease,
    box-shadow 0.2s ease;
}
\`\`\`

---

## Properties ที่ควร Animate

✅ **Animate ได้ดี (GPU accelerated):**
- \`transform\` (translate, rotate, scale)
- \`opacity\`

⚠️ **Animate ได้แต่ช้ากว่า (triggers layout):**
- \`width\`, \`height\`
- \`padding\`, \`margin\`
- \`font-size\`

---

## สรุป

Transition ทำให้ UI รู้สึกมีชีวิตชีวาและ professional ใช้ transition กับ transform และ opacity เพื่อ performance ที่ดีที่สุด และเลือก timing function ที่เหมาะสมกับการเคลื่อนไหว`,
          codeExamples: [
            {
              title: "Transition Patterns",
              language: "css",
              code: `/* Button transitions */
.btn {
  background: #3b82f6;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    transform 0.15s ease,
    box-shadow 0.2s ease;
}
.btn:hover {
  background: #1d4ed8;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);
}
.btn:active {
  transform: translateY(0);
}

/* Link color transition */
a {
  color: #3b82f6;
  text-decoration: none;
  transition: color 0.2s ease;
}
a:hover { color: #1d4ed8; }

/* Dropdown reveal */
.dropdown-menu {
  opacity: 0;
  transform: translateY(-8px);
  transition: opacity 0.2s ease, transform 0.2s ease;
  pointer-events: none;
}
.dropdown:hover .dropdown-menu {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}`,
              explanation: "Transition: button, link, dropdown reveal — patterns ที่ใช้ในการทำเว็บจริง",
            },
          ],
        },
        {
          slug: "css-animation",
          title: "Animation",
          isFree: false,
          duration: 15,
          content: `# CSS Keyframe Animations — Animation อัตโนมัติ

## สิ่งที่คุณจะเรียนรู้
- ความแตกต่างระหว่าง Animation และ Transition
- @keyframes syntax และการกำหนดสถานะ
- animation properties ทุกตัว
- animation-fill-mode — สำคัญมากที่มักลืม
- Staggered animations และ performance tips

---

## Animation vs Transition

| | Transition | Animation |
|---|---|---|
| Trigger | ต้องมี event (hover, click) | เริ่มอัตโนมัติ หรือ trigger ได้ |
| รอบ | 1 ครั้ง | กำหนด iteration ได้ (รวม infinite) |
| Keyframes | แค่ start และ end | ได้หลาย keyframes |
| ใช้เมื่อ | hover effects, state change | loading, greeting, ongoing animation |

---

## @keyframes — กำหนด Animation

\`\`\`css
/* แบบ from/to (2 สถานะ) */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* แบบ percentage (หลายสถานะ) */
@keyframes pulse {
  0%   { transform: scale(1); }
  50%  { transform: scale(1.08); }
  100% { transform: scale(1); }
}

/* หลาย keyframe ที่ค่าเดียวกัน */
@keyframes bounce {
  0%, 20%, 53%, 80%, 100% { transform: translateY(0); }
  40%, 43% { transform: translateY(-30px); }
  70%      { transform: translateY(-15px); }
  90%      { transform: translateY(-4px); }
}
\`\`\`

---

## animation Syntax

\`\`\`css
animation: name duration timing-function delay iteration-count direction fill-mode;
\`\`\`

\`\`\`css
/* ตัวอย่าง */
.hero-title {
  animation: fadeIn 0.6s ease-out 0.2s 1 normal forwards;
}

/* แบบแยก properties (อ่านง่ายกว่า) */
.hero-title {
  animation-name: fadeIn;
  animation-duration: 0.6s;
  animation-timing-function: ease-out;
  animation-delay: 0.2s;
  animation-iteration-count: 1;
  animation-direction: normal;
  animation-fill-mode: forwards;
}
\`\`\`

---

## animation-iteration-count

\`\`\`css
animation-iteration-count: 1;        /* 1 ครั้ง (default) */
animation-iteration-count: 3;        /* 3 ครั้ง */
animation-iteration-count: infinite; /* วนตลอด */
animation-iteration-count: 2.5;      /* 2.5 รอบ */
\`\`\`

---

## animation-direction

\`\`\`css
animation-direction: normal;     /* ไปข้างหน้า (default) */
animation-direction: reverse;    /* ย้อนกลับ */
animation-direction: alternate;  /* ไปกลับ (ping-pong) */
animation-direction: alternate-reverse;
\`\`\`

---

## animation-fill-mode — สำคัญมาก!

\`\`\`css
/* none (default): กลับค่าเริ่มต้นเมื่อจบ */
animation-fill-mode: none;

/* forwards: ค้างสถานะสุดท้าย (ใช้บ่อยที่สุด) */
animation-fill-mode: forwards;
/* ถ้าทำ fade in แล้วไม่ใส่ forwards element จะกลับไปมองไม่เห็น! */

/* backwards: ใช้ค่า keyframe แรกในช่วง delay */
animation-fill-mode: backwards;

/* both: ทั้ง forwards และ backwards */
animation-fill-mode: both;
\`\`\`

> ⚠️ **ข้อควรระวัง:** ถ้าทำ animation \`fadeIn\` (opacity: 0 → 1) และไม่ใส่ \`animation-fill-mode: forwards\` เมื่อ animation จบ element จะกลับไป opacity: 0 อีกครั้ง!

---

## Staggered Animations

\`\`\`css
/* Cards ปรากฏทีละอัน */
.card {
  opacity: 0;
  animation: fadeIn 0.5s ease forwards;
}

.card:nth-child(1) { animation-delay: 0s; }
.card:nth-child(2) { animation-delay: 0.1s; }
.card:nth-child(3) { animation-delay: 0.2s; }
.card:nth-child(4) { animation-delay: 0.3s; }
\`\`\`

---

## Animations ที่ใช้บ่อย

\`\`\`css
/* Skeleton loading */
@keyframes shimmer {
  0%   { background-position: -200px 0; }
  100% { background-position: calc(200px + 100%) 0; }
}
.skeleton {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200px 100%;
  animation: shimmer 1.5s infinite;
}

/* Notification pop */
@keyframes popIn {
  0%   { transform: scale(0.8); opacity: 0; }
  70%  { transform: scale(1.05); }
  100% { transform: scale(1); opacity: 1; }
}
\`\`\`

---

## สรุป

CSS Animations ทรงพลังมากสำหรับสร้าง UI ที่มีชีวิตชีวา จำไว้: ใช้ \`animation-fill-mode: forwards\` เสมอเมื่อต้องการให้ animation ค้างอยู่, animate เฉพาะ transform และ opacity เพื่อ performance, และเคารพ prefers-reduced-motion`,
          codeExamples: [
            {
              title: "CSS Animations",
              language: "css",
              code: `/* Fade in */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Slide up */
@keyframes slideUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Pulse */
@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.08); }
}

/* Spin */
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Bounce */
@keyframes bounce {
  0%, 100% { transform: translateY(0); animation-timing-function: ease-in; }
  50% { transform: translateY(-20px); animation-timing-function: ease-out; }
}

/* การใช้งาน */
.hero-title {
  animation: slideUp 0.6s ease forwards;
}
.badge {
  animation: pulse 2s ease infinite;
}
.spinner {
  animation: spin 1s linear infinite;
}
.loading-dot {
  animation: bounce 1s ease infinite;
}`,
              explanation: "@keyframes animations: fadeIn, slideUp, pulse, spin, bounce",
            },
          ],
        },
        {
          slug: "css-pseudo-classes",
          title: "Pseudo Classes",
          isFree: false,
          duration: 15,
          content: `# CSS Pseudo-classes — เลือก Element ตามสถานะ

## สิ่งที่คุณจะเรียนรู้
- State pseudo-classes: :hover, :focus, :active, :disabled, :checked
- Structural pseudo-classes: :first-child, :last-child, :nth-child
- :not() และ :is() สำหรับ logic selectors
- :focus-visible vs :focus — ความแตกต่างสำคัญ
- Practical patterns ที่ใช้บ่อยในงานจริง

---

## Pseudo-class คืออะไร?

Pseudo-class เป็น selector ที่เลือก element ตาม "สถานะ" หรือ "ตำแหน่ง" ที่ไม่สามารถระบุด้วย attribute ธรรมดาได้

\`\`\`css
/* รูปแบบ */
selector:pseudo-class { ... }
a:hover { color: red; }
\`\`\`

---

## State Pseudo-classes

### :hover — เมาส์อยู่บน element
\`\`\`css
.btn:hover {
  background: #1d4ed8;
  transform: translateY(-2px);
}

.card:hover {
  box-shadow: 0 20px 40px rgba(0,0,0,0.15);
}
\`\`\`

### :focus — element ถูก focus
\`\`\`css
/* ⚠️ อย่าลบ outline เฉยๆ! */
input:focus {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
  border-color: #3b82f6;
}
\`\`\`

### :focus-visible — focus จาก keyboard เท่านั้น
\`\`\`css
/* ไม่แสดง outline เมื่อ click (เฉพาะ keyboard navigation) */
.btn:focus { outline: none; }
.btn:focus-visible {
  outline: 3px solid #3b82f6;
  outline-offset: 2px;
}
\`\`\`

> 💡 **Tip:** ใช้ \`:focus-visible\` แทน \`:focus\` เพื่อ accessibility ที่ดีกว่า — แสดง focus ring เมื่อใช้ keyboard แต่ไม่แสดงเมื่อ click ด้วยเมาส์

### :active — กำลังกด
\`\`\`css
.btn:active {
  transform: scale(0.97);
  box-shadow: none;
}
\`\`\`

### :disabled — element ที่ปิดใช้งาน
\`\`\`css
.btn:disabled,
.btn[disabled] {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

input:disabled {
  background: #f3f4f6;
  color: #9ca3af;
}
\`\`\`

### :checked — checkbox/radio ที่ถูกเลือก
\`\`\`css
/* Custom checkbox */
input[type="checkbox"]:checked {
  background: #3b82f6;
  border-color: #3b82f6;
}

/* Style label เมื่อ checked */
input[type="checkbox"]:checked + label {
  color: #3b82f6;
  font-weight: 600;
  text-decoration: line-through;
}
\`\`\`

---

## Structural Pseudo-classes

### :first-child และ :last-child
\`\`\`css
/* ลบ border บนของรายการแรก */
.list-item:first-child { border-top: none; }

/* ลบ border ล่างของรายการสุดท้าย */
.list-item:last-child { border-bottom: none; }
\`\`\`

### :nth-child()
\`\`\`css
/* Striped table */
tr:nth-child(even) { background: #f9fafb; }
tr:nth-child(odd)  { background: white; }

/* ทุกที่ 3 */
li:nth-child(3n) { background: #eff6ff; }

/* ตั้งแต่ item ที่ 4 เป็นต้นไป */
li:nth-child(n+4) { color: #9ca3af; }

/* เฉพาะ 3 ตัวแรก */
li:nth-child(-n+3) { font-weight: 600; }
\`\`\`

### :not() — logic negation
\`\`\`css
/* ทุก input ยกเว้น submit */
input:not([type="submit"]):not([type="checkbox"]) {
  border: 1px solid #d1d5db;
  padding: 8px 12px;
}

/* ทุก p ยกเว้น .intro */
p:not(.intro) { color: #6b7280; }
\`\`\`

### :is() — match หลาย selectors
\`\`\`css
/* ก่อนหน้า: ต้องเขียนซ้ำ */
h1, h2, h3, h4, h5, h6 { font-weight: 700; }

/* ด้วย :is() */
:is(h1, h2, h3, h4, h5, h6) { font-weight: 700; }

/* ใช้ใน nested context */
article :is(h2, h3, h4) { color: #1f2937; }
\`\`\`

---

## สรุป

Pseudo-classes ทำให้ CSS มีความสามารถสูงมาก สามารถ style ตามสถานะ interaction และตำแหน่งของ element ได้โดยไม่ต้องใช้ JavaScript :focus-visible สำคัญมากสำหรับ accessibility ส่วน :nth-child() ช่วยสร้าง pattern ที่ไม่ต้องเพิ่ม class ใน HTML`,
          codeExamples: [
            {
              title: "Pseudo Classes ในทางปฏิบัติ",
              language: "css",
              code: `/* Hover effects */
.btn:hover { background: #1d4ed8; }
.card:hover { box-shadow: 0 20px 40px rgba(0,0,0,0.15); }

/* Focus styles (accessibility) */
input:focus {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
  border-color: #3b82f6;
}

/* Active state */
.btn:active { transform: scale(0.97); }

/* Disabled */
.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Checked checkbox */
input[type="checkbox"]:checked + label {
  color: #3b82f6;
  font-weight: 600;
}

/* Table striped rows */
table tr:nth-child(even) { background: #f9fafb; }
table tr:hover { background: #eff6ff; }

/* First and last */
li:first-child { border-top: none; }
li:last-child { border-bottom: none; }

/* Not selector */
.btn:not(:disabled):hover { transform: translateY(-2px); }`,
              explanation: "Pseudo classes: hover, focus, active, disabled, nth-child, not",
            },
          ],
        },
        {
          slug: "css-pseudo-elements",
          title: "Pseudo Elements",
          isFree: false,
          duration: 12,
          content: `# CSS Pseudo-elements — Style ส่วนเฉพาะของ Element

## สิ่งที่คุณจะเรียนรู้
- ::before และ ::after — content: "" property สำคัญ
- ::first-letter, ::first-line, ::selection
- ::placeholder, ::marker
- เทคนิค decorative effects ด้วย pseudo-elements
- เมื่อไหร่ใช้ pseudo-elements แทน HTML element จริง

---

## Pseudo-element vs Pseudo-class

- **Pseudo-class** (:hover, :focus) — เลือก element ตาม **สถานะ**
- **Pseudo-element** (::before, ::after) — เลือก **ส่วน** ของ element หรือ **สร้างส่วนใหม่**

---

## ::before และ ::after

สร้าง "เนื้อหาเสมือน" ก่อนและหลัง element โดยไม่ต้องแก้ HTML

**กฎสำคัญ: ต้องมี \`content\` property เสมอ!**

\`\`\`css
.label::before {
  content: "★ ";    /* ข้อความ */
}

.price::after {
  content: " บาท";
}

/* content ว่าง (สำหรับ decorative elements) */
.card::before {
  content: "";
  display: block;
  width: 4px;
  height: 100%;
  background: #3b82f6;
  position: absolute;
  left: 0;
  top: 0;
}
\`\`\`

---

## Use Cases ที่ใช้บ่อย

### 1. Required Field Asterisk
\`\`\`css
label.required::after {
  content: " *";
  color: #ef4444;
  font-size: 0.875rem;
}
\`\`\`

### 2. Underline Animation เมื่อ Hover
\`\`\`css
.nav-link {
  position: relative;
  text-decoration: none;
}

.nav-link::after {
  content: "";
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 2px;
  background: #3b82f6;
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.3s ease;
}

.nav-link:hover::after {
  transform: scaleX(1);
  transform-origin: left;
}
\`\`\`

### 3. Decorative Quote Marks
\`\`\`css
blockquote {
  position: relative;
  padding: 24px 24px 24px 64px;
}

blockquote::before {
  content: '"';
  position: absolute;
  left: 16px;
  top: -10px;
  font-size: 80px;
  color: #3b82f6;
  opacity: 0.3;
  font-family: Georgia, serif;
  line-height: 1;
}
\`\`\`

### 4. Clearfix (Legacy)
\`\`\`css
.clearfix::after {
  content: "";
  display: table;
  clear: both;
}
\`\`\`

### 5. Overlay สำหรับรูป
\`\`\`css
.card-image {
  position: relative;
}

.card-image::after {
  content: "";
  position: absolute;
  inset: 0;  /* top:0; right:0; bottom:0; left:0; */
  background: linear-gradient(to top, rgba(0,0,0,0.7), transparent);
}
\`\`\`

---

## ::first-letter — ตัวอักษรแรก

\`\`\`css
/* Drop cap effect */
article p:first-of-type::first-letter {
  font-size: 4rem;
  font-weight: 700;
  float: left;
  line-height: 0.8;
  margin-right: 8px;
  color: #3b82f6;
}
\`\`\`

---

## ::placeholder — Placeholder ใน Input

\`\`\`css
input::placeholder {
  color: #9ca3af;
  font-style: italic;
}

input:focus::placeholder {
  opacity: 0;      /* ซ่อนเมื่อ focus */
  transition: opacity 0.2s;
}
\`\`\`

---

## ::selection — ข้อความที่ถูกเลือก

\`\`\`css
::selection {
  background: #dbeafe;
  color: #1e40af;
}

/* เฉพาะใน element นี้ */
.code-block::selection {
  background: #1e1b4b;
  color: #a5b4fc;
}
\`\`\`

---

## ::marker — ลูกปืนใน List

\`\`\`css
/* Custom list marker */
li::marker {
  color: #3b82f6;
  font-size: 1.2em;
}

/* Ordered list marker */
ol li::marker {
  font-weight: 700;
  color: #3b82f6;
}
\`\`\`

---

## สรุป

Pseudo-elements ช่วยเพิ่ม decorative elements และ effects โดยไม่ต้องเพิ่ม HTML ทำให้ HTML สะอาดและ maintainable มากขึ้น ::before และ ::after เป็นเครื่องมือทรงพลังที่ designer นิยมใช้ เพียงแค่จำว่าต้องมี content: "" เสมอ`,
          codeExamples: [
            {
              title: "Pseudo Elements Use Cases",
              language: "css",
              code: `/* Decorative quote marks */
blockquote::before {
  content: '"';
  font-size: 4rem;
  color: #3b82f6;
  opacity: 0.3;
  line-height: 0;
  vertical-align: -0.4em;
}

/* Required field asterisk */
label.required::after {
  content: " *";
  color: #ef4444;
}

/* Clearfix */
.clearfix::after {
  content: "";
  display: table;
  clear: both;
}

/* Underline animation */
.nav-link::after {
  content: "";
  display: block;
  height: 2px;
  background: #3b82f6;
  transform: scaleX(0);
  transition: transform 0.2s ease;
}
.nav-link:hover::after {
  transform: scaleX(1);
}

/* Placeholder styling */
input::placeholder { color: #9ca3af; font-style: italic; }

/* Text selection */
::selection { background: #dbeafe; color: #1e40af; }`,
              explanation: "::before/::after สำหรับ decorative content, underline animation, clearfix",
            },
          ],
        },
        {
          slug: "css-variables",
          title: "CSS Variables",
          isFree: false,
          duration: 12,
          content: `# CSS Custom Properties — Variables ใน CSS

## สิ่งที่คุณจะเรียนรู้
- CSS Variables คืออะไร และต่างจาก Sass variables อย่างไร
- การประกาศและใช้งาน custom properties
- Scope ของ CSS variables และ cascade
- Fallback values
- Dark mode ด้วย CSS variables
- สร้าง Design System ด้วย variables

---

## CSS Variables คืออะไร?

CSS Custom Properties (CSS Variables) ช่วยให้เก็บค่าไว้ที่เดียวและ reuse ได้ทั่วทั้งไฟล์ CSS

**ทำไมดีกว่า Sass/LESS variables:**
- ทำงานใน browser runtime (เปลี่ยนได้ด้วย JavaScript)
- Scope ตาม CSS cascade และ inheritance
- ทำ dark mode ได้โดยไม่ต้องใช้ preprocessor

---

## Syntax พื้นฐาน

### ประกาศ (ต้องขึ้นต้นด้วย --)
\`\`\`css
:root {
  --color-primary: #3b82f6;
  --color-primary-dark: #1d4ed8;
  --spacing-md: 16px;
  --border-radius: 8px;
  --font-sans: 'Sarabun', system-ui, sans-serif;
}
\`\`\`

\`:root\` คือ pseudo-class ที่ match \`<html>\` element ทำให้ variable ใช้ได้ทุกที่ในหน้า

### ใช้งานด้วย var()
\`\`\`css
.btn {
  background: var(--color-primary);
  padding: var(--spacing-md);
  border-radius: var(--border-radius);
  font-family: var(--font-sans);
}

.btn:hover {
  background: var(--color-primary-dark);
}
\`\`\`

---

## Fallback Value

\`\`\`css
/* ถ้า --color-accent ไม่ได้ประกาศ ใช้ #3b82f6 แทน */
color: var(--color-accent, #3b82f6);

/* Fallback ซ้อนกัน */
color: var(--color-accent, var(--color-primary, blue));
\`\`\`

---

## Scope ของ CSS Variables

\`\`\`css
/* Global scope */
:root {
  --color-primary: #3b82f6;
}

/* Local scope — ใช้ได้เฉพาะใน .card */
.card {
  --card-padding: 24px;
  padding: var(--card-padding);
}

/* Override เฉพาะ context นี้ */
.sidebar {
  --color-primary: #8b5cf6;  /* sidebar มีสี primary อื่น */
}
\`\`\`

---

## Dark Mode ด้วย CSS Variables

\`\`\`css
/* Light mode (default) */
:root {
  --bg-primary: #ffffff;
  --bg-secondary: #f9fafb;
  --text-primary: #1f2937;
  --text-secondary: #6b7280;
  --border-color: #e5e7eb;
}

/* Dark mode */
[data-theme="dark"] {
  --bg-primary: #0f172a;
  --bg-secondary: #1e293b;
  --text-primary: #f1f5f9;
  --text-secondary: #94a3b8;
  --border-color: #334155;
}

/* ใช้ตามปกติ — ปรับตาม theme อัตโนมัติ */
body {
  background: var(--bg-primary);
  color: var(--text-primary);
}
\`\`\`

\`\`\`javascript
// Toggle dark mode
document.documentElement.setAttribute('data-theme', 'dark');
document.documentElement.removeAttribute('data-theme');
\`\`\`

---

## JavaScript + CSS Variables

\`\`\`javascript
// อ่านค่า variable
const style = getComputedStyle(document.documentElement);
const primary = style.getPropertyValue('--color-primary').trim();

// เปลี่ยนค่า variable (ส่งผลทั่วทั้งหน้า!)
document.documentElement.style.setProperty('--color-primary', '#ef4444');

// เปลี่ยนเฉพาะ element
const card = document.querySelector('.card');
card.style.setProperty('--card-padding', '32px');
\`\`\`

---

## Design System ด้วย CSS Variables

\`\`\`css
:root {
  /* Colors */
  --c-primary-50: #eff6ff;
  --c-primary-500: #3b82f6;
  --c-primary-900: #1e3a8a;

  /* Semantic colors */
  --color-brand: var(--c-primary-500);
  --color-success: #10b981;
  --color-warning: #f59e0b;
  --color-error: #ef4444;

  /* Spacing scale */
  --space-1: 4px;
  --space-2: 8px;
  --space-4: 16px;
  --space-6: 24px;
  --space-8: 32px;

  /* Typography */
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;
  --text-2xl: 1.5rem;

  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
  --shadow-md: 0 4px 6px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.06);
  --shadow-lg: 0 20px 25px rgba(0,0,0,0.1), 0 10px 10px rgba(0,0,0,0.04);
}
\`\`\`

---

## สรุป

CSS Variables เปลี่ยนวิธีการเขียน CSS ให้ maintainable ขึ้นมาก แทนที่จะ copy สีหรือค่าไปทุกที่ ประกาศครั้งเดียวแล้วใช้ได้ทั่วไป และเปลี่ยนได้ทีเดียวทั้งหมด Dark mode ด้วย CSS variables นี่คือ modern approach ที่แนะนำสำหรับทุกโปรเจกต์`,
          codeExamples: [
            {
              title: "Design System ด้วย CSS Variables",
              language: "css",
              code: `:root {
  /* Colors */
  --color-primary: #3b82f6;
  --color-primary-dark: #1d4ed8;
  --color-success: #10b981;
  --color-warning: #f59e0b;
  --color-danger: #ef4444;

  /* Typography */
  --font-sans: 'Sarabun', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;

  /* Spacing */
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;

  /* Radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-full: 9999px;

  /* Shadows */
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.1);
  --shadow-md: 0 4px 16px rgba(0,0,0,0.1);
  --shadow-lg: 0 20px 60px rgba(0,0,0,0.15);
}

/* Dark mode */
[data-theme="dark"] {
  --color-bg: #0f172a;
  --color-surface: #1e293b;
  --color-text: #f1f5f9;
  --color-text-muted: #94a3b8;
}

/* Usage */
.card {
  background: var(--color-surface, white);
  padding: var(--space-lg);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
}`,
              explanation: "Design system ครบด้วย CSS variables: colors, typography, spacing, radius, shadows",
            },
          ],
        },
        {
          slug: "css-architecture",
          title: "CSS Architecture",
          isFree: false,
          duration: 15,
          content: `# CSS Architecture — โครงสร้าง CSS ที่ดี

## สิ่งที่คุณจะเรียนรู้
- ทำไม CSS โปรเจกต์ใหญ่ถึงยุ่งเหยิง
- BEM Methodology — วิธีตั้งชื่อ class ที่เป็นระบบ
- SMACSS — การแบ่ง CSS เป็น 5 หมวด
- OOCSS — แยก structure จาก skin
- File organization สำหรับโปรเจกต์จริง

---

## ปัญหาของ CSS ไม่มีโครงสร้าง

โปรเจกต์ที่ไม่มีโครงสร้าง CSS มักมีปัญหา:
- **Specificity wars** — ใช้ !important เยอะขึ้นเรื่อยๆ
- **สไตล์ขัดกัน** — แก้ที่หนึ่งพัง อีกที่หนึ่ง
- **Dead code** — CSS เก่าที่ไม่รู้ว่าลบได้ไหม
- **ชื่อ class ซ้ำ** — .title, .text, .box หมายความว่าอะไร?

---

## BEM — Block Element Modifier

BEM เป็น naming convention ที่ทำให้รู้ทันทีว่า class นั้นทำหน้าที่อะไร

### Block — Component อิสระ
\`\`\`css
.card { }       /* block ชื่อ card */
.navbar { }     /* block ชื่อ navbar */
.btn { }        /* block ชื่อ btn */
\`\`\`

### Element — ส่วนประกอบของ Block
ใช้ \`__\` (double underscore) คั่น

\`\`\`css
.card__thumbnail { }     /* thumbnail ที่อยู่ใน card */
.card__body { }          /* body ที่อยู่ใน card */
.card__title { }         /* title ที่อยู่ใน card */
.card__description { }
.card__footer { }

.navbar__logo { }
.navbar__links { }
.navbar__cta { }
\`\`\`

### Modifier — Variation ของ Block หรือ Element
ใช้ \`--\` (double dash) คั่น

\`\`\`css
.card--featured { }      /* card แบบ featured */
.card--horizontal { }    /* card แบบ horizontal */
.card--dark { }          /* card theme มืด */

.btn--primary { }
.btn--secondary { }
.btn--sm { }             /* ขนาดเล็ก */
.btn--lg { }             /* ขนาดใหญ่ */
.btn--disabled { }
\`\`\`

### HTML ที่ดีด้วย BEM
\`\`\`html
<div class="card card--featured">
  <img class="card__thumbnail" src="..." alt="...">
  <div class="card__body">
    <h3 class="card__title">ชื่อคอร์ส</h3>
    <p class="card__description">รายละเอียด...</p>
  </div>
  <div class="card__footer">
    <span class="card__price">฿999</span>
    <a class="btn btn--primary" href="#">ซื้อเลย</a>
  </div>
</div>
\`\`\`

---

## SMACSS — Scalable and Modular Architecture

แบ่ง CSS เป็น 5 หมวด:

### 1. Base — Default styles
\`\`\`css
/* styles/base.css */
*, *::before, *::after { box-sizing: border-box; }
body { font-family: var(--font-sans); color: var(--text-primary); }
h1, h2, h3 { font-weight: 700; line-height: 1.2; }
a { color: var(--color-primary); }
img { max-width: 100%; }
\`\`\`

### 2. Layout — โครงสร้างหน้า
\`\`\`css
/* styles/layout.css */
.l-container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
.l-sidebar-layout { display: grid; grid-template-columns: 260px 1fr; gap: 24px; }
.l-grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
\`\`\`

### 3. Module — Reusable Components
\`\`\`css
/* styles/modules/card.css */
/* styles/modules/btn.css */
/* styles/modules/navbar.css */
\`\`\`

### 4. State — สถานะของ element
\`\`\`css
/* styles/state.css */
.is-active { }
.is-hidden { display: none; }
.is-loading { opacity: 0.6; pointer-events: none; }
.is-error { border-color: #ef4444; }
\`\`\`

### 5. Theme — สีสัน
\`\`\`css
/* styles/themes/dark.css */
[data-theme="dark"] { --bg: #0f172a; }
\`\`\`

---

## OOCSS — Object Oriented CSS

แยก **structure** จาก **skin**:

\`\`\`css
/* Structure — โครงสร้าง */
.btn {
  display: inline-flex;
  align-items: center;
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s ease;
}

/* Skin — รูปลักษณ์ */
.btn-primary { background: var(--color-primary); color: white; }
.btn-secondary { background: transparent; border: 2px solid var(--color-primary); color: var(--color-primary); }
.btn-danger { background: #ef4444; color: white; }

/* Size variations */
.btn-sm { padding: 6px 14px; font-size: 0.875rem; }
.btn-lg { padding: 14px 28px; font-size: 1.125rem; }
\`\`\`

---

## File Organization แนะนำ

\`\`\`
styles/
├── base/
│   ├── reset.css
│   ├── typography.css
│   └── variables.css
├── layout/
│   ├── container.css
│   └── grid.css
├── components/
│   ├── btn.css
│   ├── card.css
│   ├── navbar.css
│   └── modal.css
├── pages/
│   ├── home.css
│   └── course.css
└── main.css        ← import ทุกอย่าง
\`\`\`

---

## สรุป

CSS Architecture ที่ดีทำให้ทีมทำงานร่วมกันได้ง่าย, debug ได้เร็ว, และ scale ได้โดยไม่เกิดปัญหา BEM เป็น naming convention ที่แนะนำมากที่สุดสำหรับโปรเจกต์ขนาดกลางถึงใหญ่`,
          codeExamples: [
            {
              title: "BEM Naming Convention",
              language: "css",
              code: `/* BEM: Card Component */
.card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

/* Elements */
.card__thumbnail { width: 100%; aspect-ratio: 16/9; object-fit: cover; }
.card__body { padding: 20px; }
.card__title { font-size: 1.1rem; font-weight: 700; margin-bottom: 8px; }
.card__description { color: #6b7280; font-size: 0.9rem; line-height: 1.6; }
.card__footer { padding: 12px 20px; border-top: 1px solid #f3f4f6; display: flex; justify-content: space-between; }
.card__price { font-weight: 700; color: #3b82f6; }
.card__badge { font-size: 0.75rem; padding: 2px 8px; border-radius: 9999px; }

/* Modifiers */
.card--featured { border: 2px solid #3b82f6; }
.card--horizontal { display: flex; }
.card--horizontal .card__thumbnail { width: 200px; height: auto; }

/* State */
.card.is-loading { opacity: 0.6; pointer-events: none; }`,
              explanation: "BEM methodology: block .card, elements .card__*, modifiers .card--*, state .is-*",
            },
          ],
        },
        {
          slug: "css-modern",
          title: "Modern CSS",
          isFree: false,
          duration: 18,
          content: `# Modern CSS — ฟีเจอร์ใหม่ปี 2022-2024

## สิ่งที่คุณจะเรียนรู้
- clamp() สำหรับ fluid values
- calc() สำหรับการคำนวณ
- Container Queries — style ตาม container
- CSS Native Nesting
- @layer — Cascade Layers
- :has() selector — "parent selector"

---

## ภาพรวม: CSS กำลังเปลี่ยนโลก

ในช่วงปี 2022-2024 CSS ได้รับฟีเจอร์ใหม่มากมายที่เคยต้องใช้ Sass หรือ JavaScript ทำแทน เบราว์เซอร์สมัยใหม่รองรับเกือบทั้งหมด

---

## clamp() — Fluid Values ไร้ Media Query

\`\`\`css
/* clamp(ขั้นต่ำ, preferred, สูงสุด) */
h1 { font-size: clamp(1.5rem, 5vw, 3.5rem); }
/* - มือถือแคบ: 1.5rem */
/* - Desktop กว้าง: 3.5rem */
/* - ระหว่างนั้น: 5vw (5% ของ viewport width) */

.hero { padding: clamp(40px, 10vh, 120px) clamp(16px, 5vw, 80px); }
.card { gap: clamp(12px, 2vw, 24px); }
\`\`\`

**ทำไม clamp() ยอดเยี่ยม?** ไม่ต้องเขียน media query สำหรับ typography เลย font size ปรับตาม viewport โดยอัตโนมัติ

---

## calc() — คำนวณใน CSS

\`\`\`css
/* ผสม units ต่างกัน */
.content {
  width: calc(100% - 260px - 32px);
}

/* กับ CSS Variables */
.sticky-section {
  top: calc(var(--navbar-height, 64px) + 16px);
}

/* Complex calculations */
.grid-item {
  width: calc(33.333% - (2 * 16px / 3));
}

/* ใน color */
.fade { opacity: calc(1 - var(--scroll-progress)); }
\`\`\`

---

## Container Queries — ขั้นต่อไปของ Responsive Design

Media queries ตอบสนองต่อ viewport แต่ Container Queries ตอบสนองต่อ **ขนาดของ container**

\`\`\`css
/* กำหนด container */
.card-grid {
  container-type: inline-size;
  container-name: card-grid;
}

/* Style ตาม container ไม่ใช่ viewport */
@container card-grid (min-width: 500px) {
  .card {
    display: grid;
    grid-template-columns: 200px 1fr;
  }
}
\`\`\`

**ทำไม Container Queries ดีกว่า Media Queries สำหรับ components?**

Component เดียวกัน (เช่น card) อาจอยู่ใน sidebar (แคบ) หรือ main content (กว้าง) Container Query ทำให้ card ปรับตาม container ของมัน ไม่ใช่ viewport ทั้งหน้า

---

## CSS Native Nesting

\`\`\`css
/* ก่อนหน้า: ต้องเขียนซ้ำ selector */
.card { background: white; }
.card:hover { box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
.card .title { font-size: 1.2rem; }
.card .title:hover { color: #3b82f6; }

/* ด้วย CSS Nesting (2023+) */
.card {
  background: white;

  &:hover {
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }

  & .title {
    font-size: 1.2rem;

    &:hover { color: #3b82f6; }
  }

  &--featured {
    border: 2px solid #3b82f6;
  }
}
\`\`\`

---

## @layer — Cascade Layers

แก้ปัญหา specificity wars โดยการจัดกลุ่ม CSS เป็น layers

\`\`\`css
/* กำหนดลำดับ layers (ล่างชนะ) */
@layer base, components, utilities;

@layer base {
  *, *::before, *::after { box-sizing: border-box; }
  body { margin: 0; }
}

@layer components {
  .btn { padding: 10px 20px; background: #3b82f6; }
}

@layer utilities {
  .text-center { text-align: center; }
  .hidden { display: none; }
}

/* utilities layer ชนะเสมอแม้ specificity จะต่ำกว่า */
\`\`\`

---

## :has() — Parent Selector

\`\`\`css
/* form ที่มี input ที่ invalid */
form:has(input:invalid) {
  border-color: #ef4444;
}

/* card ที่มีรูปภาพ */
.card:has(img) {
  padding-top: 0;
}

/* nav ที่ไม่มี logo */
nav:not(:has(.logo)) {
  justify-content: center;
}

/* tr ที่มี checkbox ที่ checked */
tr:has(input[type="checkbox"]:checked) {
  background: #eff6ff;
}
\`\`\`

:has() คือ "parent selector" ที่นักพัฒนาร้องขอมานานหลายสิบปี!

---

## @property — Typed Custom Properties

\`\`\`css
@property --gradient-angle {
  syntax: '<angle>';
  initial-value: 0deg;
  inherits: false;
}

/* ตอนนี้ animate gradient ได้! */
.animated-gradient {
  background: conic-gradient(from var(--gradient-angle), #3b82f6, #8b5cf6, #3b82f6);
  animation: rotate 4s linear infinite;
}

@keyframes rotate {
  to { --gradient-angle: 360deg; }
}
\`\`\`

---

## Browser Support

ฟีเจอร์เหล่านี้รองรับใน Chrome, Firefox, Safari, Edge เวอร์ชันล่าสุดทั้งหมด (2023+) สามารถใช้ใน production ได้แล้ว

---

## สรุป

Modern CSS 2022-2024 ทำให้ไม่ต้องพึ่งพา Sass หรือ JavaScript สำหรับหลายๆ อย่างที่เคยต้องทำ clamp() สำหรับ responsive typography, Container Queries สำหรับ component-based responsive, :has() สำหรับ parent selection และ CSS Nesting สำหรับ code organization`,
          codeExamples: [
            {
              title: "Modern CSS Features",
              language: "css",
              code: `/* clamp() — Fluid values */
h1 { font-size: clamp(1.5rem, 5vw, 3.5rem); }
.hero { padding: clamp(40px, 10vw, 120px) clamp(16px, 5vw, 80px); }

/* calc() */
.sidebar-layout {
  display: grid;
  grid-template-columns: 260px calc(100% - 260px - 32px);
  gap: 32px;
}
.scroll-margin { scroll-margin-top: calc(var(--navbar-height, 64px) + 16px); }

/* Container Queries */
.card-wrapper { container-type: inline-size; }

@container (min-width: 500px) {
  .card {
    display: grid;
    grid-template-columns: 200px 1fr;
  }
}

/* CSS Nesting */
.btn {
  background: #3b82f6;
  color: white;
  padding: 10px 20px;

  &:hover { background: #1d4ed8; }
  &:active { transform: scale(0.97); }
  &.btn--sm { padding: 6px 14px; font-size: 0.875rem; }
  &.btn--lg { padding: 14px 28px; font-size: 1.125rem; }
}

/* @layer */
@layer base {
  *, *::before, *::after { box-sizing: border-box; }
  body { margin: 0; font-family: system-ui, sans-serif; }
}
@layer components {
  .card { background: white; border-radius: 12px; }
}
@layer utilities {
  .text-center { text-align: center; }
  .hidden { display: none; }
}`,
              explanation: "Modern CSS: clamp(), calc(), container queries, native nesting, @layer",
            },
          ],
        },
      ],
    },
  ];

  for (const sec of sections) {
    const section = await prisma.section.create({
      data: { courseId, title: sec.title, order: sec.order },
    });
    for (let li = 0; li < sec.lessons.length; li++) {
      const l = sec.lessons[li];
      const lesson = await prisma.lesson.create({
        data: {
          sectionId: section.id,
          slug: l.slug,
          title: l.title,
          content: l.content,
          isFree: l.isFree,
          duration: l.duration,
          order: li + 1,
          type: "TEXT",
          isPublished: true,
        },
      });
      for (let ci = 0; ci < l.codeExamples.length; ci++) {
        const ex = l.codeExamples[ci];
        await prisma.codeExample.create({
          data: {
            lessonId: lesson.id,
            title: ex.title,
            code: ex.code,
            language: ex.language,
            explanation: ex.explanation,
            order: ci + 1,
          },
        });
      }
    }
    await prisma.course.update({
      where: { id: courseId },
      data: { totalLessons: { increment: sec.lessons.length } },
    });
  }
  console.log("  ✅ Seeded: HTML & CSS Mastery (36 lessons)");
}

async function seedJSMastery(courseId: string) {
  console.log("  📗 Seeding: JavaScript Mastery...");
  await prisma.section.deleteMany({ where: { courseId } });
  await prisma.course.update({ where: { id: courseId }, data: { totalLessons: 0 } });

  const sections = [
    {
      title: "JavaScript Fundamentals",
      order: 1,
      lessons: [
        {
          slug: "js-fundamentals",
          title: "JavaScript Fundamentals",
          isFree: true,
          duration: 15,
          content: `# JavaScript Fundamentals — รากฐานที่ต้องรู้ก่อนทุกอย่าง

## สิ่งที่คุณจะเรียนรู้
- JavaScript คืออะไรและทำงานอย่างไรในเว็บ
- วิธีใส่ JavaScript ใน HTML ทั้ง 3 แบบ
- ความแตกต่างของ var, let, const พร้อมตารางเปรียบเทียบ
- ประเภทข้อมูล (Data Types) แบบ Primitive และ Reference
- Type Coercion เบื้องต้นที่ผู้เริ่มต้นต้องรู้
- Template Literals สำหรับสร้าง string แบบสมัยใหม่

---

## JavaScript คืออะไร?

**JavaScript** คือภาษาโปรแกรมที่ทำให้เว็บเพจ **มีชีวิต** — หมายความว่าเว็บสามารถตอบสนองต่อการกระทำของผู้ใช้ได้ เช่น เมื่อกดปุ่มแล้วเนื้อหาเปลี่ยน, แบบฟอร์มส่งข้อมูลโดยไม่โหลดหน้าใหม่, หรือดึงข้อมูลจาก API มาแสดงผลแบบ real-time

ลองนึกภาพว่าเว็บเพจเหมือนร่างกายมนุษย์ — **HTML** คือโครงกระดูก, **CSS** คือเสื้อผ้าและรูปลักษณ์, และ **JavaScript** คือกล้ามเนื้อที่ทำให้ร่างกายเคลื่อนไหวได้ โดยไม่มี JavaScript เว็บก็จะเป็นแค่เอกสารนิ่งๆ ที่ทำอะไรไม่ได้เลย

JavaScript ทำงานบน **browser** (เช่น Chrome, Firefox, Safari) โดยตรง แต่ปัจจุบันยังสามารถรันบน server ได้ด้วย **Node.js** อีกด้วย ทำให้ JavaScript เป็นภาษาเดียวที่ใช้ได้ทั้ง frontend และ backend

> 💡 **Tip:** JavaScript ไม่ใช่ Java! ทั้งสองเป็นภาษาที่แตกต่างกันโดยสิ้นเชิง ชื่อคล้ายกันเพราะตลาดตอนนั้น Java กำลังดัง ผู้สร้าง JavaScript จึงตั้งชื่อตามให้ฟังดูคุ้นเคย

---

## วิธีใส่ JavaScript ใน HTML

มี 3 วิธีในการเชื่อม JavaScript กับ HTML และแต่ละวิธีมีข้อดีข้อเสียต่างกัน

### 1. Inline JavaScript (ไม่แนะนำ)

เขียน JavaScript โดยตรงในแท็ก HTML เช่น attribute \`onclick\` วิธีนี้ทำให้ HTML และ JavaScript ปนกัน อ่านและดูแลยาก ควรหลีกเลี่ยง

\`\`\`html
<!-- ❌ ไม่แนะนำ — ปน HTML กับ JS -->
<button onclick="alert('สวัสดี!')">คลิกฉัน</button>
<button onmouseover="this.style.color='red'">Hover ฉัน</button>
\`\`\`

### 2. Internal JavaScript

เขียน JavaScript ในแท็ก \`<script>\` ภายใน HTML file เดียวกัน เหมาะสำหรับโปรเจกต์เล็กๆ หรือทดสอบ

\`\`\`html
<!-- ใส่ก่อน </body> เพื่อให้ HTML โหลดก่อน -->
<script>
  // JavaScript ตรงนี้จะทำงานหลัง HTML โหลดเสร็จ
  console.log("สวัสดีโลก!");
  const btn = document.querySelector("#myBtn");
  btn.addEventListener("click", () => alert("คลิกแล้ว!"));
</script>
</body>
\`\`\`

### 3. External JavaScript (แนะนำที่สุด)

แยก JavaScript ออกเป็นไฟล์ \`.js\` ต่างหาก วิธีนี้ดีที่สุดเพราะ แยก concerns ได้ชัด, ใช้ซ้ำได้, และ browser สามารถ cache ไฟล์ได้

\`\`\`html
<!-- ✅ แนะนำ — แยกไฟล์ JS ออกมา -->
<!-- defer = โหลด JS แต่รอ HTML parse เสร็จก่อนค่อยรัน -->
<script src="app.js" defer></script>

<!-- async = โหลดและรัน JS ทันทีโดยไม่รอ HTML -->
<!-- ใช้กับ script ที่ไม่ต้องการ DOM -->
<script src="analytics.js" async></script>
\`\`\`

> 💡 **Tip:** ใช้ \`defer\` เกือบทุกครั้ง มันทำให้ HTML โหลดพร้อมกับ JS แต่รัน JS หลัง HTML parse เสร็จ ทำให้หน้าเว็บโหลดเร็วขึ้น

---

## Variables — ตัวแปรเก็บข้อมูล

ตัวแปร (Variable) เหมือนกล่องที่ใส่ข้อมูล ใน JavaScript มี 3 keyword สำหรับประกาศตัวแปร:

| Keyword | Scope | Reassign ได้ | Redeclare ได้ | Hoisted |
|---|---|---|---|---|
| \`var\` | function | ✅ | ✅ | ✅ (as undefined) |
| \`let\` | block | ✅ | ❌ | ❌ (TDZ) |
| \`const\` | block | ❌ | ❌ | ❌ (TDZ) |

\`\`\`javascript
// const — ใช้เมื่อค่าไม่เปลี่ยน (แนะนำใช้เป็นหลัก)
const PI = 3.14159;
const siteName = "TeachCode";
// PI = 3; // ❌ Error: Assignment to constant variable

// let — ใช้เมื่อต้องการเปลี่ยนค่า
let score = 0;
score = 100;  // ✅ ทำได้
score += 10;  // ✅ ทำได้

// var — หลีกเลี่ยงในโค้ดสมัยใหม่
var oldStyle = "ไม่แนะนำ";
// var มีปัญหาเรื่อง hoisting และ function scope ที่ทำให้ bug หาตายาก
\`\`\`

**กฎง่ายๆ**: ใช้ \`const\` ก่อนเสมอ ถ้าต้องเปลี่ยนค่าค่อยเปลี่ยนเป็น \`let\` ไม่ต้องใช้ \`var\` เลย

---

## Data Types — ประเภทข้อมูล

JavaScript มีข้อมูล 2 กลุ่มหลัก:

### Primitive Types (ค่าพื้นฐาน)
เก็บค่าโดยตรง เมื่อ copy จะได้ค่าใหม่ไม่เกี่ยวกับตัวเดิม

\`\`\`javascript
// 7 Primitive Types
const name = "สมชาย";        // string — ข้อความ
const age = 25;               // number — ตัวเลข (ทั้ง int และ float)
const isStudent = true;       // boolean — true/false
const nothing = null;         // null — ไม่มีค่า (จงใจ)
let notSet;                   // undefined — ยังไม่ได้กำหนดค่า
const id = Symbol("userId");  // symbol — ค่าที่ unique เสมอ
const bigNum = 9007199254740991n; // bigint — เลขใหญ่มาก

// ตรวจสอบประเภท
console.log(typeof name);       // "string"
console.log(typeof age);        // "number"
console.log(typeof isStudent);  // "boolean"
console.log(typeof nothing);    // "object" ⚠️ นี่คือ bug ดั้งเดิมของ JS!
console.log(typeof notSet);     // "undefined"
\`\`\`

### Reference Types (ค่าอ้างอิง)
เก็บ reference (ที่อยู่ในหน่วยความจำ) เมื่อ copy จะชี้ไปที่เดียวกัน

\`\`\`javascript
// Object, Array, Function คือ Reference Types
const user = { name: "สมชาย", age: 25 };
const copy = user;  // ไม่ได้ copy! แค่ชี้ที่เดียวกัน
copy.name = "สมหญิง";
console.log(user.name);  // "สมหญิง" ← user เปลี่ยนด้วย!

// วิธี copy จริงๆ ต้องใช้ spread
const realCopy = { ...user };
realCopy.name = "สมศักดิ์";
console.log(user.name);  // "สมหญิง" ← user ไม่เปลี่ยน ✅
\`\`\`

> ⚠️ **ข้อควรระวัง:** \`typeof null\` คืนค่า \`"object"\` ซึ่งเป็น bug เก่าแก่ของ JavaScript ที่ไม่สามารถแก้ได้แล้วเพราะจะทำให้โค้ดเก่าพัง ถ้าต้องเช็ค null ให้ใช้ \`value === null\` แทน

---

## Type Coercion — JavaScript แปลงประเภทอัตโนมัติ

JavaScript บางครั้งแปลงประเภทข้อมูลให้อัตโนมัติ ซึ่งอาจทำให้เกิดผลลัพธ์แปลกๆ

\`\`\`javascript
// Type Coercion อัตโนมัติ
console.log("5" + 3);    // "53" ← แปลง 3 เป็น string แล้วต่อ
console.log("5" - 3);    // 2   ← แปลง "5" เป็น number แล้วลบ
console.log(true + 1);   // 2   ← true แปลงเป็น 1
console.log(false + 1);  // 1   ← false แปลงเป็น 0
console.log("" == false); // true ← อันตราย!

// ใช้ === เพื่อเปรียบเทียบแบบ strict (ไม่แปลงประเภท)
console.log("5" === 5);  // false ✅ ถูกต้อง
console.log(0 === false); // false ✅ ถูกต้อง
\`\`\`

---

## Template Literals — สร้าง String แบบสมัยใหม่

Template Literals ใช้ backtick (\`) แทน quotes ธรรมดา ทำให้ใส่ตัวแปรใน string ได้ง่ายขึ้น

\`\`\`javascript
const firstName = "สมชาย";
const age = 25;
const job = "นักพัฒนา";

// แบบเก่า (ยุ่งยาก)
const oldWay = "สวัสดี ฉันชื่อ " + firstName + " อายุ " + age + " ปี เป็น" + job;

// Template Literal (สวยงาม)
const newWay = \`สวัสดี ฉันชื่อ \${firstName} อายุ \${age} ปี เป็น\${job}\`;

// ใส่ expression ได้ด้วย
const total = \`ผลรวม: \${10 + 20 * 3}\`;  // "ผลรวม: 70"

// Multiline string (หลายบรรทัด)
const html = \`
  <div class="card">
    <h2>\${firstName}</h2>
    <p>อายุ \${age} ปี</p>
  </div>
\`;
\`\`\`

> 💡 **Tip:** Template Literals ยังรองรับ Tagged Templates ซึ่งเป็น advanced feature ที่ใช้ใน library เช่น styled-components และ GraphQL

---

## สรุป

JavaScript คือภาษาโปรแกรมที่ขาดไม่ได้สำหรับการพัฒนาเว็บ การเข้าใจ var/let/const, ประเภทข้อมูล, และ type coercion คือรากฐานสำคัญที่จะช่วยให้คุณเขียนโค้ดที่ถูกต้องและหลีกเลี่ยง bug ที่พบบ่อย ในบทต่อไปเราจะเรียนรู้เรื่อง Operators ที่ใช้คำนวณและเปรียบเทียบข้อมูล`,
          codeExamples: [
            {
              title: "Variables และ Data Types",
              language: "javascript",
              code: `// const และ let
const name = "สมชาย";     // string
const age = 25;            // number
const isStudent = true;    // boolean
let score = 100;           // let ใช้เมื่อต้องเปลี่ยนค่า

// ตรวจสอบ type
console.log(typeof name);       // "string"
console.log(typeof age);        // "number"
console.log(typeof isStudent);  // "boolean"
console.log(typeof null);       // "object" (quirk ของ JS)

// Template literals
const greeting = \`สวัสดี \${name}! คุณอายุ \${age} ปี\`;
console.log(greeting);

// Destructuring
const { x, y } = { x: 10, y: 20 };
const [first, second] = [1, 2, 3];

score = 95;  // reassign ด้วย let ได้
// age = 26; // Error! const ไม่สามารถ reassign`,
              explanation: "Variables: const, let, var, data types, template literals, destructuring",
            },
          ],
        },
        {
          slug: "js-operators",
          title: "Operators",
          isFree: true,
          duration: 12,
          content: `# Operators — เครื่องมือคำนวณและเปรียบเทียบใน JavaScript

## สิ่งที่คุณจะเรียนรู้
- Arithmetic Operators สำหรับคำนวณตัวเลข
- Comparison Operators และความแตกต่างของ == กับ ===
- Logical Operators (&&, ||, !) และ Short-circuit evaluation
- Nullish Coalescing (??) และ Optional Chaining (?.)
- Ternary Operator สำหรับ if/else แบบสั้น
- Assignment Operators (+=, -=, *=, ฯลฯ)

---

## Arithmetic Operators — การคำนวณตัวเลข

Arithmetic Operators ใช้สำหรับการคำนวณทางคณิตศาสตร์ ใช้บ่อยมากในการพัฒนา JavaScript ทั้งหมด

\`\`\`javascript
// การคำนวณพื้นฐาน
console.log(5 + 3);   // 8   — บวก
console.log(10 - 4);  // 6   — ลบ
console.log(3 * 4);   // 12  — คูณ
console.log(15 / 4);  // 3.75 — หาร (ได้ทศนิยม)
console.log(15 % 4);  // 3   — เศษจากการหาร (modulo)
console.log(2 ** 8);  // 256 — ยกกำลัง (ES2016+)

// ตัวอย่างการใช้ Modulo (%) จริงๆ
const hour = 14;
const isPM = hour % 12 === 2;  // false (14 % 12 = 2, ไม่ใช่ 2pm)
const isEven = (n) => n % 2 === 0;  // เช็คเลขคู่
console.log(isEven(4));  // true
console.log(isEven(7));  // false

// Increment / Decrement
let count = 5;
count++;  // post-increment: ใช้ค่าก่อน แล้วค่อยเพิ่ม
++count;  // pre-increment: เพิ่มก่อน แล้วค่อยใช้ค่า
count--;  // post-decrement
--count;  // pre-decrement
\`\`\`

> 💡 **Tip:** \`%\` (modulo) มีประโยชน์มาก เช่น เช็คเลขคู่/คี่, วนลูปแบบ circular, หรือแบ่ง array เป็นหน้าๆ (pagination)

---

## Comparison Operators — การเปรียบเทียบ

Comparison Operators ใช้เปรียบเทียบค่าและ return ค่า \`true\` หรือ \`false\` เสมอ

\`\`\`javascript
// Loose equality (==) — แปลงประเภทก่อนเปรียบเทียบ (อันตราย!)
console.log("5" == 5);     // true  ← แปลง "5" เป็น 5 ก่อน
console.log(null == undefined); // true ← exception พิเศษ
console.log(0 == false);   // true  ← false แปลงเป็น 0

// Strict equality (===) — ไม่แปลงประเภท (แนะนำ!)
console.log("5" === 5);    // false ← string ≠ number
console.log(null === undefined); // false ← ไม่แปลงประเภท
console.log(0 === false);  // false ← number ≠ boolean

// Relational operators
console.log(5 > 3);    // true
console.log(5 >= 5);   // true
console.log(3 < 5);    // true
console.log(3 <= 2);   // false
console.log(5 !== 3);  // true  (strict not equal)
console.log(5 != "5"); // false (loose not equal, อันตราย!)
\`\`\`

**กฎสำคัญ**: ใช้ \`===\` และ \`!==\` เสมอ ยกเว้นกรณีพิเศษที่ต้องการเช็ค \`null == undefined\` พร้อมกัน

---

## Logical Operators — ตรรกะ AND, OR, NOT

Logical Operators ใช้รวมเงื่อนไขหลายอย่างเข้าด้วยกัน มีคุณสมบัติพิเศษที่เรียกว่า **Short-circuit evaluation**

\`\`\`javascript
// AND (&&) — ต้องทั้งคู่เป็น true
console.log(true && true);   // true
console.log(true && false);  // false
console.log(false && true);  // false

// OR (||) — อย่างน้อยหนึ่งอย่างเป็น true
console.log(true || false);  // true
console.log(false || false); // false

// NOT (!) — กลับค่า
console.log(!true);   // false
console.log(!false);  // true
console.log(!!0);     // false (double NOT แปลงเป็น boolean)
console.log(!!1);     // true

// Short-circuit evaluation — สำคัญมาก!
const age = 20;
const hasId = true;

// && หยุดเมื่อเจอ false
const canEnter = age >= 18 && hasId;  // true

// || หยุดเมื่อเจอ truthy value แรก
const user = null;
const username = user || "Guest";  // "Guest" (เพราะ user เป็น null = falsy)

// ใช้ && เพื่อ conditional rendering
const isLoggedIn = true;
const greeting = isLoggedIn && "ยินดีต้อนรับ!";  // "ยินดีต้อนรับ!"
\`\`\`

---

## Nullish Coalescing (??) และ Optional Chaining (?.)

ทั้งสองเป็น modern operators ที่แก้ปัญหาการจัดการ null/undefined ได้ดีมาก

\`\`\`javascript
// Nullish Coalescing (??) — ใช้ค่า default เมื่อเป็น null หรือ undefined เท่านั้น
const name = null ?? "Guest";      // "Guest"
const title = undefined ?? "ไม่ระบุ"; // "ไม่ระบุ"
const zero = 0 ?? "Default";       // 0  ← 0 ไม่ใช่ null/undefined
const empty = "" ?? "Default";     // "" ← "" ไม่ใช่ null/undefined

// เปรียบกับ || ที่ใช้กับ falsy ทุกตัว
const zero2 = 0 || "Default";      // "Default" ← 0 เป็น falsy!
const count = 0 ?? "ไม่มี";        // 0 ← ถูกต้อง (ต้องการ 0)

// Optional Chaining (?.) — เข้าถึง property โดยไม่ crash ถ้า null/undefined
const user = { profile: { name: "สมชาย", address: null } };
console.log(user?.profile?.name);      // "สมชาย"
console.log(user?.profile?.address?.city); // undefined (ไม่ error!)
console.log(user?.settings?.theme);    // undefined (ไม่ error!)

// รวมกับ ?? ได้
const city = user?.profile?.address?.city ?? "กรุงเทพ";  // "กรุงเทพ"

// ?. กับ method calls
const arr = null;
arr?.forEach(item => console.log(item));  // ไม่ error, ไม่ทำอะไร
\`\`\`

> ⚠️ **ข้อควรระวัง:** อย่าสับสน \`||\` กับ \`??\` — \`||\` ใช้ค่า default เมื่อ falsy (รวม 0, "") แต่ \`??\` ใช้ค่า default เมื่อ null/undefined เท่านั้น

---

## Ternary Operator — if/else แบบสั้น

Ternary Operator เป็น shorthand ของ if/else เหมาะกับเงื่อนไขง่ายๆ

\`\`\`javascript
// รูปแบบ: condition ? ถ้าจริง : ถ้าเท็จ
const score = 75;
const grade = score >= 60 ? "ผ่าน" : "ไม่ผ่าน";  // "ผ่าน"

// ใช้ใน JSX / template strings
const isLoggedIn = true;
const buttonText = isLoggedIn ? "ออกจากระบบ" : "เข้าสู่ระบบ";

// ซ้อน ternary ได้ (แต่ไม่แนะนำถ้าซับซ้อนเกินไป)
const age = 20;
const access = age >= 18 ? "ผู้ใหญ่" : age >= 13 ? "วัยรุ่น" : "เด็ก";
\`\`\`

---

## Assignment Operators — การกำหนดค่าแบบย่อ

\`\`\`javascript
let x = 10;
x += 5;   // เทียบเท่า x = x + 5  → 15
x -= 3;   // เทียบเท่า x = x - 3  → 12
x *= 2;   // เทียบเท่า x = x * 2  → 24
x /= 4;   // เทียบเท่า x = x / 4  → 6
x %= 4;   // เทียบเท่า x = x % 4  → 2
x **= 3;  // เทียบเท่า x = x ** 3 → 8

// Logical assignment (ES2021)
let a = null;
a ??= "default";  // กำหนดค่าถ้าเป็น null/undefined
console.log(a);   // "default"

let b = 0;
b ||= "fallback"; // กำหนดค่าถ้าเป็น falsy
console.log(b);   // "fallback"
\`\`\`

> 💡 **Tip:** Assignment operators ช่วยให้โค้ดกระชับและอ่านง่ายขึ้น \`count += 1\` อ่านง่ายกว่า \`count = count + 1\` มาก

---

## สรุป

Operators เป็นเครื่องมือพื้นฐานที่ใช้ในทุกบรรทัดของโค้ด JavaScript จุดสำคัญที่ต้องจำคือ ใช้ \`===\` เสมอแทน \`==\`, ใช้ \`??\` แทน \`||\` เมื่อต้องการจัดการเฉพาะ null/undefined, และ Optional Chaining (\`?.\`) ช่วยป้องกัน runtime error จากการเข้าถึง property ของ null ได้อย่างสวยงาม`,
          codeExamples: [
            {
              title: "Operators ในทางปฏิบัติ",
              language: "javascript",
              code: `// Arithmetic
console.log(10 + 3);   // 13
console.log(10 % 3);   // 1 (remainder)
console.log(2 ** 10);  // 1024

// === vs ==
console.log("5" == 5);   // true  (ไม่ดี)
console.log("5" === 5);  // false (ดีกว่า)
console.log(null == undefined);   // true
console.log(null === undefined);  // false

// Logical
const age = 20;
const hasId = true;
console.log(age >= 18 && hasId);  // true

// Short-circuit
const user = null;
const displayName = user?.name || "Guest";  // "Guest"

// Nullish coalescing
const count = 0;
console.log(count || "ไม่มีข้อมูล");  // "ไม่มีข้อมูล" (ไม่ต้องการ!)
console.log(count ?? "ไม่มีข้อมูล");  // 0 (ถูกต้อง)

// Optional chaining
const profile = { user: { name: "สมชาย" } };
console.log(profile?.user?.name);     // "สมชาย"
console.log(profile?.address?.city);  // undefined (ไม่ error)`,
              explanation: "Operators: arithmetic, ===, logical, ??, optional chaining",
            },
          ],
        },
        {
          slug: "js-control-flow",
          title: "Control Flow",
          isFree: true,
          duration: 15,
          content: `# Control Flow — ควบคุมทิศทางการทำงานของโปรแกรม

## สิ่งที่คุณจะเรียนรู้
- if / else if / else สำหรับเงื่อนไขพื้นฐาน
- Ternary Operator สำหรับเงื่อนไขแบบสั้น
- switch/case และทำไมต้องมี break ทุก case
- Truthy และ Falsy values — รายการทั้งหมดที่ต้องรู้
- Guard Clause Pattern สำหรับโค้ดที่อ่านง่ายขึ้น

---

## if / else if / else — เงื่อนไขพื้นฐาน

**if/else** คือโครงสร้างที่บอกให้โปรแกรมทำอะไรบางอย่าง "ถ้า" เงื่อนไขเป็น true ลองนึกภาพเป็นสัญญาณไฟจราจร — ถ้าไฟแดงหยุด, ถ้าไฟเหลืองระวัง, ถ้าไฟเขียวไปได้

\`\`\`javascript
// โครงสร้างพื้นฐาน
const score = 75;
let grade;

if (score >= 80) {
  grade = "A";            // เกรด A
} else if (score >= 70) {
  grade = "B";            // เกรด B
} else if (score >= 60) {
  grade = "C";            // เกรด C
} else if (score >= 50) {
  grade = "D";            // เกรด D
} else {
  grade = "F";            // ตก
}
console.log(grade);  // "B"

// ตัวอย่างจริง: ตรวจสอบ form
function validateAge(age) {
  if (typeof age !== "number") {
    return "กรุณาใส่ตัวเลข";
  }
  if (age < 0) {
    return "อายุต้องไม่ติดลบ";
  }
  if (age < 18) {
    return "อายุน้อยกว่า 18 ปี";
  }
  if (age > 120) {
    return "อายุดูไม่สมเหตุสมผล";
  }
  return "อายุถูกต้อง";
}
\`\`\`

> 💡 **Tip:** ไม่จำเป็นต้องมี \`else\` เสมอ ถ้าเงื่อนไขแรก return แล้ว ส่วนที่เหลือจะไม่ทำงาน

---

## Ternary Operator — if/else แบบสั้นใน 1 บรรทัด

Ternary Operator เหมาะสำหรับเงื่อนไขง่ายๆ ที่ต้องการกำหนดค่าเพียงอย่างเดียว รูปแบบคือ \`เงื่อนไข ? ถ้าจริง : ถ้าเท็จ\`

\`\`\`javascript
// แบบ if/else ธรรมดา
let label;
if (isLoggedIn) {
  label = "ออกจากระบบ";
} else {
  label = "เข้าสู่ระบบ";
}

// แบบ Ternary (อ่านง่ายกว่า)
const label2 = isLoggedIn ? "ออกจากระบบ" : "เข้าสู่ระบบ";

// ใช้กับ template literal
const age = 20;
const msg = \`คุณ\${age >= 18 ? "เป็นผู้ใหญ่" : "ยังเป็นเยาวชน"}\`;

// ⚠️ อย่าซ้อน ternary เกิน 2 ชั้น — อ่านยาก
// ❌ ไม่ดี
const x = a ? b ? "bb" : "b" : "a";

// ✅ ดีกว่า — ใช้ if/else ปกติ
let result;
if (a) {
  result = b ? "bb" : "b";
} else {
  result = "a";
}
\`\`\`

---

## switch / case — เลือกจากหลายตัวเลือก

\`switch\` เหมาะกว่า \`if/else\` เมื่อต้องเปรียบเทียบตัวแปรเดิมกับหลายค่า เช่น เลือก action ตาม command หรือแสดง UI ตาม role

\`\`\`javascript
const day = "Mon";

switch (day) {
  case "Mon":
  case "Tue":
  case "Wed":
  case "Thu":
  case "Fri":
    console.log("วันทำงาน");
    break;  // ← สำคัญมาก! ถ้าไม่มี break จะ "fall through" ไป case ถัดไป
  case "Sat":
  case "Sun":
    console.log("วันหยุด");
    break;
  default:
    console.log("ไม่ใช่วันในสัปดาห์");
}

// ตัวอย่างจริง: router อย่างง่าย
function handleAction(action) {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1 };
    case "DECREMENT":
      return { count: state.count - 1 };
    case "RESET":
      return { count: 0 };
    default:
      return state;  // คืนค่าเดิม
  }
}
\`\`\`

> ⚠️ **ข้อควรระวัง:** ต้องมี \`break\` ทุก case! ถ้าลืม \`break\` JavaScript จะ "fall through" ไปรัน case ถัดไปด้วย ซึ่งมักทำให้เกิด bug ที่หาตายาก

---

## Truthy และ Falsy — ค่าที่ถือเป็น true/false

ใน JavaScript ทุกค่ามีความเป็น "truthy" หรือ "falsy" เมื่อใช้ในเงื่อนไข ไม่ต้องเปรียบเทียบกับ true/false โดยตรง

### Falsy Values (มีแค่ 8 ค่านี้เท่านั้น!)

\`\`\`javascript
// ค่าทั้งหมดที่เป็น falsy ใน JavaScript
if (false)     console.log("false");      // ไม่รัน
if (0)         console.log("0");          // ไม่รัน
if (-0)        console.log("-0");         // ไม่รัน
if (0n)        console.log("0n");         // ไม่รัน (BigInt zero)
if ("")        console.log('""');         // ไม่รัน (string ว่าง)
if (null)      console.log("null");       // ไม่รัน
if (undefined) console.log("undefined"); // ไม่รัน
if (NaN)       console.log("NaN");       // ไม่รัน

// ทุกอย่างนอกจากนี้เป็น TRUTHY
if (1)        console.log("1");          // รัน
if ("0")      console.log('"0"');        // รัน! string "0" เป็น truthy
if ([])       console.log("[]");         // รัน! array ว่างเป็น truthy
if ({})       console.log("{}");         // รัน! object ว่างเป็น truthy
if (" ")      console.log('" "');        // รัน! space เป็น truthy
\`\`\`

\`\`\`javascript
// การใช้งาน truthy/falsy จริงๆ
function showWelcome(username) {
  if (!username) {  // เช็ค null, undefined, "" ทั้งหมดพร้อมกัน
    return "กรุณาใส่ชื่อผู้ใช้";
  }
  return \`ยินดีต้อนรับ \${username}\`;
}

// เช็ค array ว่ามีข้อมูลไหม
const items = [];
if (items.length) {  // 0 เป็น falsy
  console.log("มีข้อมูล");
} else {
  console.log("ไม่มีข้อมูล");  // แสดงอันนี้
}
\`\`\`

---

## Guard Clause Pattern — โค้ดที่อ่านง่ายขึ้น

Guard Clause คือการ return ก่อนเมื่อเงื่อนไขไม่ผ่าน แทนที่จะซ้อน if/else หลายชั้น ทำให้โค้ดเป็น "happy path" ที่ชัดเจน

\`\`\`javascript
// ❌ แบบเก่า — if ซ้อนกันลึก (ยากอ่าน)
function processPayment(user, amount, card) {
  if (user) {
    if (amount > 0) {
      if (card) {
        if (card.isValid) {
          // โค้ดหลักอยู่ลึกมาก!
          return chargeCard(card, amount);
        } else {
          return "บัตรไม่ถูกต้อง";
        }
      } else {
        return "ไม่มีบัตร";
      }
    } else {
      return "จำนวนเงินต้องมากกว่า 0";
    }
  } else {
    return "ไม่มีผู้ใช้";
  }
}

// ✅ แบบ Guard Clause — อ่านง่ายกว่ามาก
function processPayment(user, amount, card) {
  if (!user) return "ไม่มีผู้ใช้";
  if (amount <= 0) return "จำนวนเงินต้องมากกว่า 0";
  if (!card) return "ไม่มีบัตร";
  if (!card.isValid) return "บัตรไม่ถูกต้อง";

  // โค้ดหลักอยู่ระดับเดียว ชัดเจน!
  return chargeCard(card, amount);
}
\`\`\`

> 💡 **Tip:** Guard Clause ไม่ใช่แค่เรื่อง style — มันทำให้ Logic ชัดเจนขึ้น, test ง่ายขึ้น, และลด bug ได้จริงๆ ลองใช้ในทุกฟังก์ชันที่มีเงื่อนไข

---

## สรุป

Control Flow คือหัวใจของการเขียนโปรแกรม การเลือกใช้ \`if/else\`, \`switch\`, หรือ ternary ที่ถูกต้องทำให้โค้ดอ่านง่ายและดูแลง่าย จุดสำคัญที่ต้องจำคือ Falsy values ทั้ง 8 ค่า, ใส่ \`break\` ทุก case ใน switch, และใช้ Guard Clause Pattern เพื่อลด nesting`,
          codeExamples: [
            {
              title: "Control Flow ตัวอย่างจริง",
              language: "javascript",
              code: `// if / else
const score = 75;
let grade;

if (score >= 80) {
  grade = "A";
} else if (score >= 70) {
  grade = "B";
} else if (score >= 60) {
  grade = "C";
} else {
  grade = "F";
}
console.log(grade);  // "B"

// Ternary
const isLoggedIn = true;
const message = isLoggedIn ? "ยินดีต้อนรับ!" : "กรุณา login";
console.log(message);

// Switch
const day = "Mon";
switch (day) {
  case "Mon":
  case "Tue":
  case "Wed":
  case "Thu":
  case "Fri":
    console.log("วันทำงาน");
    break;
  case "Sat":
  case "Sun":
    console.log("วันหยุด");
    break;
  default:
    console.log("ไม่รู้จักวัน");
}

// Truthy/Falsy
const username = "";
if (!username) {
  console.log("กรุณากรอกชื่อผู้ใช้");  // แสดงเพราะ "" เป็น falsy
}`,
              explanation: "if/else, ternary, switch, truthy/falsy",
            },
          ],
        },
        {
          slug: "js-loops",
          title: "Loops",
          isFree: false,
          duration: 15,
          content: `# Loops — วนซ้ำอย่างมีประสิทธิภาพ

## สิ่งที่คุณจะเรียนรู้
- for loop และ anatomy: init; condition; increment
- while และ do...while
- for...of สำหรับ iterate values ของ array/string/iterable
- for...in สำหรับ iterate keys ของ object
- break และ continue
- เมื่อไหร่ควรใช้ loop แบบไหน

---

## for Loop — วนซ้ำที่รู้จำนวนรอบล่วงหน้า

\`for\` loop เหมาะที่สุดเมื่อรู้ว่าจะวนกี่รอบ โครงสร้างมี 3 ส่วน: **init** (เริ่มต้น), **condition** (เงื่อนไขวน), **increment** (อัปเดตตัวนับ)

\`\`\`javascript
// โครงสร้าง: for (init; condition; increment)
//   init      — รันครั้งเดียวตอนเริ่ม
//   condition — เช็คก่อนทุกรอบ ถ้า false หยุด
//   increment — รันหลังทุกรอบ

for (let i = 0; i < 5; i++) {
  console.log(i);  // 0, 1, 2, 3, 4
}

// นับถอยหลัง
for (let i = 5; i >= 1; i--) {
  console.log(\`นับถอยหลัง: \${i}\`);  // 5, 4, 3, 2, 1
}

// วน array ด้วย index
const fruits = ["แอปเปิ้ล", "กล้วย", "มะม่วง"];
for (let i = 0; i < fruits.length; i++) {
  console.log(\`\${i + 1}. \${fruits[i]}\`);
  // 1. แอปเปิ้ล
  // 2. กล้วย
  // 3. มะม่วง
}

// ข้าม index ทีละ 2
for (let i = 0; i < 10; i += 2) {
  console.log(i);  // 0, 2, 4, 6, 8
}
\`\`\`

> 💡 **Tip:** ตัวแปรใน for loop มักตั้งชื่อ \`i\`, \`j\`, \`k\` ตามธรรมเนียม แต่ถ้า loop มีความหมายชัดเจน ควรตั้งชื่อที่อธิบายได้ดีกว่า เช่น \`for (let row = 0; row < grid.length; row++)\`

---

## while Loop — วนเมื่อยังไม่รู้จำนวนรอบ

\`while\` loop เหมาะเมื่อไม่รู้ล่วงหน้าว่าจะวนกี่รอบ วนไปเรื่อยๆ จนเงื่อนไขเป็น false

\`\`\`javascript
// while loop — เช็คเงื่อนไขก่อนรัน
let attempts = 0;
const maxAttempts = 3;

while (attempts < maxAttempts) {
  console.log(\`ความพยายามที่ \${attempts + 1}\`);
  attempts++;
}
// ความพยายามที่ 1
// ความพยายามที่ 2
// ความพยายามที่ 3

// ตัวอย่างจริง: รอจนกว่าจะได้ค่า
let data = null;
let retries = 0;

while (!data && retries < 5) {
  data = tryFetchData();  // สมมติฟังก์ชันนี้อาจ return null
  retries++;
}
\`\`\`

## do...while — รันก่อน แล้วค่อยเช็ค

\`do...while\` รันโค้ดก่อนอย่างน้อย 1 ครั้ง แล้วค่อยเช็คเงื่อนไข เหมาะกับสถานการณ์ที่ต้องทำก่อนแล้วค่อยถาม

\`\`\`javascript
// do...while — รันก่อน แล้วค่อยเช็ค
let number;
do {
  number = getRandomNumber();  // สุ่มตัวเลข
} while (number < 5);  // วนถ้าตัวเลขน้อยกว่า 5
console.log(\`ได้ตัวเลข: \${number}\`);  // จะได้ >= 5

// ตัวอย่าง: แสดง menu แล้วรับ input
let choice;
do {
  showMenu();
  choice = getUserInput();
} while (choice !== "quit");
\`\`\`

---

## for...of — iterate values ของ iterable

\`for...of\` ใช้กับ **iterable objects** เช่น array, string, Set, Map วนดูค่า (value) แต่ละตัว

\`\`\`javascript
// วน Array
const courses = ["HTML", "CSS", "JavaScript", "React"];
for (const course of courses) {
  console.log(\`📚 \${course}\`);
}

// วน String (ทีละตัวอักษร)
for (const char of "Hello") {
  console.log(char);  // H, e, l, l, o
}

// วน Set
const uniqueIds = new Set([1, 2, 2, 3, 3, 3]);
for (const id of uniqueIds) {
  console.log(id);  // 1, 2, 3 (ไม่ซ้ำ)
}

// ดึง index ด้วย entries()
for (const [index, course] of courses.entries()) {
  console.log(\`\${index + 1}. \${course}\`);
}
\`\`\`

---

## for...in — iterate keys ของ object

\`for...in\` ใช้กับ **objects** วนดู keys (property names) ทั้งหมด

\`\`\`javascript
const student = {
  name: "สมชาย",
  age: 25,
  grade: "A",
  score: 95,
};

for (const key in student) {
  console.log(\`\${key}: \${student[key]}\`);
}
// name: สมชาย
// age: 25
// grade: A
// score: 95

// ระวัง: for...in วน inherited properties ด้วย
// ใช้ hasOwnProperty เพื่อกรองเฉพาะ own properties
for (const key in student) {
  if (Object.hasOwn(student, key)) {  // Modern version
    console.log(key, student[key]);
  }
}
\`\`\`

> ⚠️ **ข้อควรระวัง:** อย่าใช้ \`for...in\` กับ array! ลำดับไม่รับประกัน และยังวน inherited properties ด้วย ใช้ \`for...of\` หรือ \`.forEach()\` แทน

---

## break และ continue — ควบคุมการวน

\`\`\`javascript
// break — หยุด loop ทันที
const numbers = [1, 3, 7, 2, 9, 4, 6];
let found = -1;

for (let i = 0; i < numbers.length; i++) {
  if (numbers[i] === 7) {
    found = i;
    break;  // หยุดทันที ไม่วนต่อ
  }
}
console.log(\`พบ 7 ที่ index \${found}\`);  // "พบ 7 ที่ index 2"

// continue — ข้ามรอบนี้ วนต่อรอบหน้า
for (let i = 1; i <= 10; i++) {
  if (i % 2 === 0) continue;  // ข้ามเลขคู่
  console.log(i);  // 1, 3, 5, 7, 9
}

// break ใน nested loop ต้องใช้ label
outer: for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    if (i === 1 && j === 1) break outer;  // ออกจาก loop นอกด้วย
    console.log(i, j);
  }
}
\`\`\`

---

## เมื่อไหร่ใช้ Loop แบบไหน?

| สถานการณ์ | Loop ที่แนะนำ |
|---|---|
| รู้จำนวนรอบล่วงหน้า | \`for\` |
| วน array แบบง่าย | \`for...of\` หรือ \`.forEach()\` |
| วน object keys | \`for...in\` |
| ไม่รู้จำนวนรอบ | \`while\` |
| ต้องรันก่อน 1 ครั้ง | \`do...while\` |
| แปลงข้อมูล array | \`.map()\` |
| กรองข้อมูล | \`.filter()\` |
| รวมค่าเป็นค่าเดียว | \`.reduce()\` |

> 💡 **Tip:** ในโค้ด modern JavaScript จริงๆ เราไม่ค่อยใช้ \`for\` loop แบบดั้งเดิมกับ array มากนัก เพราะ \`.map()\`, \`.filter()\`, \`.reduce()\` อ่านง่ายกว่าและ functional มากกว่า

---

## สรุป

Loops ช่วยให้เราทำงานซ้ำๆ โดยไม่ต้องเขียนโค้ดซ้ำ เลือกใช้ให้ถูกประเภท: \`for\` เมื่อรู้จำนวน, \`while\` เมื่อไม่รู้, \`for...of\` สำหรับ array/iterable, \`for...in\` สำหรับ object keys และอย่าลืมว่า \`break\` และ \`continue\` ช่วยควบคุม flow ใน loop ได้อย่างมีประสิทธิภาพ`,
          codeExamples: [
            {
              title: "Loops ทุกประเภท",
              language: "javascript",
              code: `// for loop
for (let i = 1; i <= 5; i++) {
  console.log(\`รอบที่ \${i}\`);
}

// for...of (arrays, strings)
const courses = ["HTML", "CSS", "JavaScript"];
for (const course of courses) {
  console.log(\`📚 \${course}\`);
}

// for...in (objects)
const student = { name: "สมหญิง", score: 95, grade: "A" };
for (const key in student) {
  console.log(\`\${key}: \${student[key]}\`);
}

// while
let attempts = 0;
while (attempts < 3) {
  console.log(\`ความพยายามที่ \${attempts + 1}\`);
  attempts++;
}

// break และ continue
for (let i = 0; i < 10; i++) {
  if (i === 7) break;        // หยุดที่ 7
  if (i % 2 === 0) continue; // ข้ามเลขคู่
  console.log(i);  // 1, 3, 5
}`,
              explanation: "for, for...of, for...in, while, break, continue",
            },
          ],
        },
        {
          slug: "js-functions",
          title: "Functions",
          isFree: false,
          duration: 18,
          content: `# Functions — หัวใจของ JavaScript

## สิ่งที่คุณจะเรียนรู้
- Function Declaration vs Expression — ต่างกันอย่างไร
- Arrow Functions (=>) และ syntax แบบต่างๆ
- Parameters vs Arguments
- Default Parameters และ Rest Parameters (...args)
- Return values และ implicit return
- Pure Functions — concept สำคัญใน modern JS
- Callback Functions — ส่ง function เป็น argument

---

## Function Declaration vs Expression

Function Declaration เป็นวิธีดั้งเดิมในการประกาศฟังก์ชัน มีคุณสมบัติพิเศษที่เรียกว่า **hoisting** — หมายความว่าสามารถเรียกใช้ก่อนที่จะประกาศได้

\`\`\`javascript
// Function Declaration — hoisted (เรียกก่อนประกาศได้)
greet("สมชาย");  // ✅ ทำงานได้แม้ประกาศทีหลัง

function greet(name) {
  return \`สวัสดี \${name}!\`;
}

// Function Expression — NOT hoisted
// sayHello("สมหญิง");  // ❌ Error: Cannot access 'sayHello' before initialization

const sayHello = function(name) {
  return \`สวัสดี \${name}!\`;
};
sayHello("สมหญิง");  // ✅ ทำงานได้หลังประกาศ
\`\`\`

> 💡 **Tip:** ในโปรเจกต์จริงส่วนใหญ่ใช้ Function Expression หรือ Arrow Function เพราะ hoisting บางครั้งทำให้โค้ดอ่านยาก

---

## Arrow Functions (=>) — ไวยากรณ์แบบสมัยใหม่

Arrow Functions เป็น syntax ที่กระชับกว่า และมีพฤติกรรม \`this\` ที่แตกต่าง ใช้มากใน modern JavaScript

\`\`\`javascript
// ตัวอย่าง Arrow Function หลายรูปแบบ

// มี parameters และมี body block
const add = (a, b) => {
  const sum = a + b;
  return sum;
};

// Implicit return — ถ้า body มีแค่ expression เดียว ไม่ต้อง return และ {}
const multiply = (a, b) => a * b;
const square = n => n * n;         // parameter เดียวไม่ต้อง ()
const sayHi = () => "สวัสดี!";    // ไม่มี parameter

// Return object ต้องใส่ () ครอบ
const makeUser = (name, age) => ({ name, age });
console.log(makeUser("สมชาย", 25));  // { name: "สมชาย", age: 25 }

// เปรียบเทียบ this: Arrow ไม่มี this ของตัวเอง
const obj = {
  name: "สมชาย",
  // Regular function: this คือ obj
  greetNormal: function() {
    return \`สวัสดี \${this.name}\`;
  },
  // Arrow function: this คือ this ของ outer scope (ไม่ใช่ obj!)
  greetArrow: () => {
    return \`สวัสดี \${this?.name}\`;  // this ไม่ใช่ obj
  },
};
console.log(obj.greetNormal());  // "สวัสดี สมชาย"
console.log(obj.greetArrow());   // "สวัสดี undefined"
\`\`\`

> ⚠️ **ข้อควรระวัง:** อย่าใช้ Arrow Function เป็น method ของ object ถ้าต้องใช้ \`this\` — ใช้ regular function แทน

---

## Parameters vs Arguments

**Parameters** คือชื่อตัวแปรที่ประกาศในฟังก์ชัน, **Arguments** คือค่าจริงที่ส่งเข้าไปเมื่อเรียก

\`\`\`javascript
// name และ age คือ Parameters
function introduce(name, age) {
  return \`ฉันชื่อ \${name} อายุ \${age} ปี\`;
}

// "สมชาย" และ 25 คือ Arguments
introduce("สมชาย", 25);

// ส่ง arguments น้อยกว่า parameters
introduce("สมหญิง");  // age จะเป็น undefined
// "ฉันชื่อ สมหญิง อายุ undefined ปี"
\`\`\`

---

## Default Parameters — ค่าเริ่มต้น

Default Parameters ช่วยให้ฟังก์ชันทำงานได้แม้ไม่ได้ส่ง argument บางตัว

\`\`\`javascript
// ก่อน Default Parameters (แบบเก่า)
function createUser(name, role) {
  role = role || "student";  // ปัญหา: ถ้า role = "" จะได้ "student"
  return { name, role };
}

// ด้วย Default Parameters (แนะนำ)
function createUser(name, role = "student", active = true) {
  return { name, role, active };
}

console.log(createUser("สมชาย"));
// { name: "สมชาย", role: "student", active: true }

console.log(createUser("สมหญิง", "instructor"));
// { name: "สมหญิง", role: "instructor", active: true }

// Default parameter สามารถใช้ค่าจาก parameter ก่อนหน้า
function makeFullName(first, last, full = \`\${first} \${last}\`) {
  return full;
}
\`\`\`

---

## Rest Parameters (...args) — รับ arguments หลายตัว

Rest Parameters ใช้ ... เพื่อเก็บ arguments ที่เหลือทั้งหมดเป็น array

\`\`\`javascript
// รับ arguments ไม่จำกัดจำนวน
function sum(...numbers) {
  return numbers.reduce((total, n) => total + n, 0);
}
console.log(sum(1, 2, 3));        // 6
console.log(sum(1, 2, 3, 4, 5)); // 15

// ผสมกับ parameters ปกติ
function log(level, ...messages) {
  const prefix = level === "error" ? "❌" : "✅";
  messages.forEach(msg => console.log(\`\${prefix} \${msg}\`));
}
log("info", "เริ่มต้น", "โหลดข้อมูล", "เสร็จสิ้น");
log("error", "เกิดข้อผิดพลาด");
\`\`\`

---

## Pure Functions — concept สำคัญ

Pure Function คือฟังก์ชันที่: 1) ผลลัพธ์ขึ้นอยู่กับ input เท่านั้น, 2) ไม่มี side effects (ไม่เปลี่ยนแปลงอะไรนอก function)

\`\`\`javascript
// Pure Function ✅
const add = (a, b) => a + b;
const getFullName = (first, last) => \`\${first} \${last}\`;

// Impure Function ❌ — มี side effect
let total = 0;
function addToTotal(n) {
  total += n;  // เปลี่ยนแปลง variable ข้างนอก
  return total;
}

// Impure Function ❌ — ผลลัพธ์ไม่แน่นอน
function getRandomGreeting(name) {
  const greetings = ["สวัสดี", "หวัดดี", "ดีจ้า"];
  return \`\${greetings[Math.floor(Math.random() * 3)]} \${name}\`;
}

// ทำไม Pure Functions ดี?
// - test ง่าย (input เดิม → output เดิมเสมอ)
// - debug ง่าย (ไม่มี hidden state)
// - reuse ได้ง่าย
\`\`\`

---

## Callback Functions — ส่ง function เป็น argument

Callback คือฟังก์ชันที่ส่งเป็น argument ให้ฟังก์ชันอื่น แล้วฟังก์ชันนั้นจะเรียก callback ในภายหลัง

\`\`\`javascript
// Callback พื้นฐาน
function doTask(task, callback) {
  console.log(\`กำลัง: \${task}\`);
  const result = task.toUpperCase();
  callback(result);  // เรียก callback เมื่อทำเสร็จ
}

doTask("เรียน JavaScript", (result) => {
  console.log(\`เสร็จแล้ว: \${result}\`);
});

// Array methods ใช้ callbacks
const numbers = [1, 2, 3, 4, 5];

const doubled = numbers.map(n => n * 2);       // [2, 4, 6, 8, 10]
const evens = numbers.filter(n => n % 2 === 0); // [2, 4]
const total = numbers.reduce((acc, n) => acc + n, 0); // 15

numbers.forEach(n => console.log(n));  // วนและพิมพ์ทุกตัว
\`\`\`

> 💡 **Tip:** Callbacks เป็นรากฐานของ async programming ใน JavaScript เมื่อเข้าใจ callbacks แล้วจะเข้าใจ Promises และ async/await ง่ายขึ้น

---

## สรุป

Functions คือ building blocks สำคัญที่สุดใน JavaScript การเข้าใจความแตกต่างระหว่าง Declaration กับ Expression, รู้จัก Arrow Function และ this binding, ใช้ Default/Rest Parameters, และเข้าใจ Pure Functions จะทำให้เขียนโค้ดที่มีคุณภาพสูงขึ้นอย่างมาก`,
          codeExamples: [
            {
              title: "Functions ทุกรูปแบบ",
              language: "javascript",
              code: `// Function declaration
function calculateArea(width, height) {
  return width * height;
}

// Arrow function
const square = n => n * n;
const add = (a, b) => a + b;

// Default parameters
function createUser(name, role = "student", active = true) {
  return { name, role, active };
}
console.log(createUser("สมชาย"));
// { name: "สมชาย", role: "student", active: true }

// Rest parameters
function sum(...numbers) {
  return numbers.reduce((total, n) => total + n, 0);
}
console.log(sum(1, 2, 3, 4, 5));  // 15

// Callback
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
const evens = numbers.filter(n => n % 2 === 0);
const total = numbers.reduce((sum, n) => sum + n, 0);

console.log(doubled);  // [2, 4, 6, 8, 10]
console.log(evens);    // [2, 4]
console.log(total);    // 15`,
              explanation: "Functions: declaration, arrow, default params, rest, callbacks",
            },
          ],
        },
        {
          slug: "js-scope",
          title: "Scope",
          isFree: false,
          duration: 12,
          content: `# Scope — ขอบเขตของตัวแปรใน JavaScript

## สิ่งที่คุณจะเรียนรู้
- Global Scope, Function Scope, Block Scope
- ความแตกต่างของ var, let, const ในแง่ scope
- Hoisting — var และ function declarations ถูก "ยก" ขึ้นอย่างไร
- Temporal Dead Zone (TDZ) ของ let/const
- Lexical Scope — ฟังก์ชันเห็น scope ของที่ที่มันถูกนิยาม

---

## Scope คืออะไร?

**Scope** คือ "ขอบเขต" ที่ตัวแปรสามารถถูกเข้าถึงได้ ลองนึกภาพเปรียบเทียบกับองค์กร — พนักงานใน department หนึ่งเข้าถึงข้อมูลของ department ตัวเองได้ และเข้าถึงข้อมูล global ได้ แต่ไม่สามารถเข้าถึงข้อมูลของ department อื่นได้

ใน JavaScript มี 3 ระดับ scope หลัก:

---

## Global Scope — เข้าถึงได้จากทุกที่

ตัวแปรที่ประกาศนอก function หรือ block ทั้งหมด จะอยู่ใน Global Scope — ทุกส่วนของโปรแกรมสามารถเข้าถึงได้

\`\`\`javascript
// Global scope — อยู่นอก function/block ทั้งหมด
const APP_NAME = "TeachCode";
const API_BASE = "https://api.teachcode.dev";

function showAppName() {
  console.log(APP_NAME);  // ✅ เข้าถึง global ได้
}

if (true) {
  console.log(APP_NAME);  // ✅ เข้าถึง global ได้
}

// ⚠️ var ที่ประกาศ global จะกลายเป็น property ของ window object
var globalVar = "ฉันอยู่ใน window";
console.log(window.globalVar);  // "ฉันอยู่ใน window"

// const/let ไม่กลายเป็น window property
const notOnWindow = "ฉันไม่ใช่ window property";
console.log(window.notOnWindow);  // undefined
\`\`\`

> ⚠️ **ข้อควรระวัง:** หลีกเลี่ยงการใช้ Global Scope มากเกินไป เพราะจะทำให้โค้ดยากดูแล, เกิด naming conflicts, และ bug หาตายาก ใช้ modules แทน

---

## Function Scope — ขอบเขตภายใน Function

ตัวแปรที่ประกาศใน function จะเข้าถึงได้เฉพาะภายใน function นั้นเท่านั้น

\`\`\`javascript
function calculateScore(attempts, correct) {
  // ตัวแปรเหล่านี้อยู่ใน function scope
  const percentage = (correct / attempts) * 100;
  const grade = percentage >= 60 ? "ผ่าน" : "ไม่ผ่าน";
  const message = \`คะแนน: \${percentage.toFixed(1)}% (\${grade})\`;

  return message;
}

console.log(calculateScore(10, 8));  // "คะแนน: 80.0% (ผ่าน)"
// console.log(percentage);  // ❌ ReferenceError! ไม่อยู่ใน scope

// Function สามารถเข้าถึง outer scope ได้ (Lexical Scope)
const taxRate = 0.07;  // global

function calculatePrice(price) {
  return price + price * taxRate;  // ✅ เข้าถึง taxRate ได้
}
\`\`\`

---

## Block Scope — ขอบเขตใน {} ของ let และ const

\`let\` และ \`const\` มี Block Scope — เข้าถึงได้เฉพาะใน \`{}\` ที่ประกาศ แต่ \`var\` ไม่มี block scope!

\`\`\`javascript
// Block scope กับ let/const
if (true) {
  let blockLet = "ฉันอยู่ใน block";
  const blockConst = "ฉันก็อยู่ใน block";
  var notBlocked = "ฉันหลุดออกไป!";

  console.log(blockLet);   // ✅ "ฉันอยู่ใน block"
  console.log(blockConst); // ✅ "ฉันก็อยู่ใน block"
}

// console.log(blockLet);    // ❌ ReferenceError!
// console.log(blockConst);  // ❌ ReferenceError!
console.log(notBlocked);    // ✅ "ฉันหลุดออกไป!" — var หลุดออกจาก block

// ตัวอย่างจริงที่ var ทำให้ bug
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);  // พิมพ์ 3, 3, 3 (ไม่ใช่ 0, 1, 2!)
}

for (let j = 0; j < 3; j++) {
  setTimeout(() => console.log(j), 100);  // พิมพ์ 0, 1, 2 ✅
}
// เพราะ let สร้าง scope ใหม่ทุก iteration แต่ var ไม่สร้าง
\`\`\`

---

## Hoisting — การ "ยก" ตัวแปรขึ้นด้านบน

JavaScript "ยก" (hoist) การประกาศตัวแปรและฟังก์ชันขึ้นไปด้านบนของ scope ก่อนรัน แต่ทำต่างกันตาม keyword

\`\`\`javascript
// var ถูก hoist ขึ้นด้านบน พร้อมค่าเริ่มต้น undefined
console.log(myVar);  // undefined (ไม่ error!)
var myVar = "สวัสดี";
console.log(myVar);  // "สวัสดี"

// JavaScript อ่านโค้ดข้างบนเหมือนกับ:
// var myVar;           ← hoisted
// console.log(myVar);  → undefined
// myVar = "สวัสดี";
// console.log(myVar);  → "สวัสดี"

// Function Declaration — hoisted ทั้งหมด (รวม body)
greet("สมชาย");  // ✅ ทำงานได้!

function greet(name) {
  console.log(\`สวัสดี \${name}\`);
}

// Function Expression — ไม่ hoisted
// greetArrow("สมหญิง");  // ❌ Cannot access 'greetArrow' before initialization
const greetArrow = (name) => console.log(\`หวัดดี \${name}\`);
\`\`\`

---

## Temporal Dead Zone (TDZ) — โซนอันตรายของ let/const

\`let\` และ \`const\` ก็ถูก hoist เหมือนกัน แต่ไม่ได้รับค่า \`undefined\` ก่อน — แทนที่จะได้ \`undefined\` จะได้ error แทน ช่วงนี้เรียกว่า **Temporal Dead Zone (TDZ)**

\`\`\`javascript
// TDZ ของ let
console.log(myLet);  // ❌ ReferenceError: Cannot access 'myLet' before initialization
let myLet = "สวัสดี";

// TDZ ของ const
console.log(myConst);  // ❌ ReferenceError!
const myConst = "สวัสดี";

// TDZ เริ่มตั้งแต่ต้น scope จนถึงบรรทัดที่ประกาศ
{
  // ← TDZ เริ่มตรงนี้
  console.log(x);  // ❌ TDZ! Error
  let x = 5;       // ← TDZ สิ้นสุดตรงนี้
  console.log(x);  // ✅ 5
}

// ทำไม TDZ ดีกว่า var?
// เพราะช่วยจับ bug ได้เร็วขึ้น — ถ้าใช้ตัวแปรก่อนประกาศ จะ error ทันที
// แทนที่จะได้ undefined ที่ทำให้ debug ยาก
\`\`\`

> 💡 **Tip:** TDZ ดูน่ากลัว แต่จริงๆ ช่วยเราหา bug ได้เร็วขึ้น เพราะถ้าใช้ตัวแปรก่อนประกาศ จะ error ทันที แทนที่จะได้ \`undefined\` ที่หาสาเหตุยากกว่า

---

## สรุป

Scope คือแนวคิดพื้นฐานที่สำคัญมากใน JavaScript ใช้ \`const\` และ \`let\` แทน \`var\` เสมอเพราะ block scope ทำให้โค้ดคาดเดาได้ง่ายกว่า เข้าใจ hoisting จะช่วยหลีกเลี่ยง bug ที่เกิดจากการใช้ตัวแปรก่อนประกาศ และ TDZ ของ \`let\`/\`const\` เป็นฟีเจอร์ที่ช่วยให้เราเขียนโค้ดที่ถูกต้องได้ดีขึ้น`,
          codeExamples: [
            {
              title: "Scope ทุกระดับ",
              language: "javascript",
              code: `// Global scope
const appName = "TeachCode";

function outer() {
  // Function scope
  const outerVar = "outer";

  function inner() {
    // สามารถเข้าถึง outerVar ได้ (Closure)
    const innerVar = "inner";
    console.log(outerVar);   // "outer"
    console.log(appName);    // "TeachCode" (global)
  }

  inner();
  // console.log(innerVar);  // Error! innerVar ไม่อยู่ใน scope นี้
}

// Block scope
if (true) {
  let blockVar = "block";
  const alsoBlock = "also block";
  var notBlock = "not block";  // var ไม่มี block scope
}
// console.log(blockVar);  // Error!
console.log(notBlock);     // "not block" — var หลุดออกมา

// Loop scope
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);  // 0, 1, 2
}
// ถ้าใช้ var จะได้ 3, 3, 3`,
              explanation: "Global, function, block scope, var vs let/const, loop scope",
            },
          ],
        },
        {
          slug: "js-closures",
          title: "Closures",
          isFree: false,
          duration: 15,
          content: `# Closures — ฟังก์ชันที่จำ Scope ได้

## สิ่งที่คุณจะเรียนรู้
- Closure คืออะไรและทำงานอย่างไร
- Factory Functions ด้วย Closure
- Data Privacy / Private Variables
- Memoization ด้วย Closure
- Closure Pitfalls ใน Loops (var vs let)
- ทำไม Closure ถึงสำคัญในสัมภาษณ์งาน

---

## Closure คืออะไร?

**Closure** คือฟังก์ชันที่ "จดจำ" และสามารถเข้าถึง scope ของฟังก์ชันที่ครอบมันได้ แม้ว่าฟังก์ชันนั้นจะทำงานเสร็จและออกไปแล้ว

ลองนึกภาพเปรียบเทียบ: เหมือนกับสมุดบันทึกที่พนักงานเอาติดตัวไปเมื่อออกจากบริษัท พนักงานคนนั้น (inner function) สามารถอ่านสมุดบันทึก (outer scope) ได้ตลอด แม้จะออกจากบริษัท (outer function จบแล้ว) ไปแล้ว

\`\`\`javascript
// ตัวอย่าง Closure พื้นฐาน
function makeCounter() {
  let count = 0;  // ตัวแปรใน outer function

  return function() {
    count++;          // inner function เข้าถึง count ได้
    return count;
  };
}

const counter = makeCounter();  // makeCounter() ทำงานเสร็จแล้ว
console.log(counter());  // 1  — แต่ count ยังอยู่ใน closure!
console.log(counter());  // 2
console.log(counter());  // 3

// สร้าง counter ใหม่ได้ ไม่แชร์ state กัน
const counter2 = makeCounter();
console.log(counter2());  // 1  — เริ่มใหม่ อิสระจาก counter
console.log(counter());   // 4  — counter เดิมวนต่อ
\`\`\`

> 💡 **Tip:** Closure เกิดขึ้นทุกครั้งที่ฟังก์ชันถูกสร้างขึ้นภายในฟังก์ชันอื่น เราใช้ closure ตลอดเวลาโดยไม่รู้ตัว เช่น ทุกครั้งที่ใช้ callback ใน event listener

---

## Factory Functions — สร้างฟังก์ชันที่ปรับแต่งได้

Factory Function คือฟังก์ชันที่ return ฟังก์ชันอื่นที่มีพฤติกรรมเฉพาะ โดยใช้ closure จำค่าที่ส่งเข้ามา

\`\`\`javascript
// Factory Function สำหรับสร้าง multiplier
function createMultiplier(factor) {
  // factor อยู่ใน closure
  return function(number) {
    return number * factor;
  };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);
const byFive = createMultiplier(5);

console.log(double(10));  // 20
console.log(triple(10));  // 30
console.log(byFive(10));  // 50

// ตัวอย่างจริง: สร้าง validator factory
function createRangeValidator(min, max) {
  return function(value) {
    if (value < min) return \`ค่าต้องมากกว่าหรือเท่ากับ \${min}\`;
    if (value > max) return \`ค่าต้องน้อยกว่าหรือเท่ากับ \${max}\`;
    return null;  // ผ่าน!
  };
}

const validateAge = createRangeValidator(0, 120);
const validateScore = createRangeValidator(0, 100);
const validateYear = createRangeValidator(1900, 2100);

console.log(validateAge(25));     // null (ผ่าน)
console.log(validateAge(-5));     // "ค่าต้องมากกว่าหรือเท่ากับ 0"
console.log(validateScore(150));  // "ค่าต้องน้อยกว่าหรือเท่ากับ 100"
\`\`\`

---

## Data Privacy — ซ่อนข้อมูลด้วย Closure

Closure ช่วยสร้าง "private variables" — ตัวแปรที่เข้าถึงได้เฉพาะผ่านฟังก์ชันที่กำหนด ไม่ใช่เข้าตรงๆ

\`\`\`javascript
// ตัวอย่าง: Bank Account ที่มี private balance
function createBankAccount(initialBalance) {
  let balance = initialBalance;  // private!
  const transactions = [];       // private!

  return {
    deposit(amount) {
      if (amount <= 0) throw new Error("จำนวนเงินต้องมากกว่า 0");
      balance += amount;
      transactions.push({ type: "deposit", amount, date: new Date() });
      return balance;
    },

    withdraw(amount) {
      if (amount > balance) throw new Error("ยอดเงินไม่เพียงพอ");
      balance -= amount;
      transactions.push({ type: "withdraw", amount, date: new Date() });
      return balance;
    },

    getBalance() {
      return balance;  // อ่านได้แต่แก้ไขตรงๆ ไม่ได้
    },

    getStatement() {
      return [...transactions];  // copy ออกมา ป้องกันแก้ไขตรงๆ
    },
  };
}

const account = createBankAccount(1000);
account.deposit(500);    // 1500
account.withdraw(200);   // 1300
console.log(account.getBalance());  // 1300

// ไม่สามารถเข้าถึง balance โดยตรง
console.log(account.balance);  // undefined ✅ ซ่อนสำเร็จ!
// account.balance = 1000000;  // ไม่มีผล! balance จริงไม่เปลี่ยน
\`\`\`

---

## Memoization — Cache ผลลัพธ์ด้วย Closure

Memoization คือการ cache ผลลัพธ์ของฟังก์ชันไว้ ถ้าเรียกด้วย argument เดิมจะใช้ค่า cache แทนการคำนวณใหม่

\`\`\`javascript
// Memoize function ทั่วไป
function memoize(fn) {
  const cache = new Map();  // cache อยู่ใน closure

  return function(...args) {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      console.log(\`Cache hit: \${key}\`);
      return cache.get(key);
    }

    const result = fn.apply(this, args);
    cache.set(key, result);
    console.log(\`Computed: \${key} = \${result}\`);
    return result;
  };
}

// ฟังก์ชันที่คำนวณหนัก
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

const memoFib = memoize(fibonacci);
memoFib(10);  // Computed: [10] = 55
memoFib(10);  // Cache hit: [10] = 55 (เร็วมาก!)
\`\`\`

---

## Closure Pitfalls ใน Loops

Bug ที่พบบ่อยมากเมื่อใช้ \`var\` กับ loop และ closure:

\`\`\`javascript
// ❌ Bug: ใช้ var ใน loop
for (var i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i);  // พิมพ์ 3, 3, 3 ไม่ใช่ 0, 1, 2!
  }, 100);
}
// เพราะ var ไม่มี block scope — i เดียวกันถูก share ทุก closure
// เมื่อ timeout ทำงาน i = 3 แล้ว

// ✅ แก้ด้วย let (แนะนำ)
for (let j = 0; j < 3; j++) {
  setTimeout(() => {
    console.log(j);  // 0, 1, 2 ✅
  }, 100);
}
// let สร้าง binding ใหม่ทุก iteration

// ✅ แก้ด้วย IIFE (วิธีเก่า ก่อนมี let)
for (var k = 0; k < 3; k++) {
  (function(index) {
    setTimeout(() => {
      console.log(index);  // 0, 1, 2 ✅
    }, 100);
  })(k);
}
\`\`\`

> ⚠️ **ข้อควรระวัง:** Closure pitfall ใน loops เป็นหนึ่งใน bug ที่พบบ่อยที่สุดในสัมภาษณ์งาน เข้าใจว่าทำไม \`var\` ทำให้ได้ 3,3,3 และทำไม \`let\` แก้ปัญหาได้

---

## สรุป

Closure คือ concept ที่ทรงพลังที่สุดอย่างหนึ่งใน JavaScript ทำให้เราสร้าง private state, factory functions, memoization, และ module patterns ได้ การเข้าใจ closure จะทำให้เข้าใจ advanced patterns อื่นๆ ได้ง่ายขึ้นมาก และเป็นหัวข้อสัมภาษณ์งาน Junior/Mid level ที่ถามบ่อยมากด้วย!`,
          codeExamples: [
            {
              title: "Closures Use Cases",
              language: "javascript",
              code: `// Counter ด้วย Closure (private state)
function createCounter(initial = 0) {
  let count = initial;  // private variable

  return {
    increment: () => ++count,
    decrement: () => --count,
    reset: () => { count = initial; },
    getCount: () => count,
  };
}

const counter = createCounter(10);
console.log(counter.increment());  // 11
console.log(counter.increment());  // 12
console.log(counter.decrement());  // 11
console.log(counter.getCount());   // 11
// count ไม่สามารถเข้าถึงได้โดยตรง

// Factory function
function createMultiplier(factor) {
  return (n) => n * factor;  // closure จำ factor
}
const double = createMultiplier(2);
const triple = createMultiplier(3);
console.log(double(5));   // 10
console.log(triple(5));   // 15

// Memoization (cache ด้วย closure)
function memoize(fn) {
  const cache = {};
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache[key]) return cache[key];
    cache[key] = fn(...args);
    return cache[key];
  };
}
const slowSquare = n => { /* slow computation */ return n * n; };
const fastSquare = memoize(slowSquare);`,
              explanation: "Closures: counter with private state, factory function, memoization",
            },
          ],
        },
        {
          slug: "js-objects",
          title: "Objects",
          isFree: false,
          duration: 18,
          content: `# Objects — เก็บข้อมูลแบบ Key-Value

## สิ่งที่คุณจะเรียนรู้
- สร้าง Object ด้วย Object Literal Syntax
- Dot Notation vs Bracket Notation
- Methods และ this keyword
- Object.keys(), Object.values(), Object.entries()
- Spread Operator {...obj} สำหรับ copy/merge
- Destructuring สำหรับดึงค่าออกจาก object
- Optional Chaining (?.) และ Nullish Coalescing (??)

---

## สร้าง Object — Object Literal Syntax

**Object** คือการเก็บข้อมูลในรูป key-value pairs ลองนึกภาพเหมือนบัตรข้อมูลบุคคล — มี field ต่างๆ (key) และค่าในแต่ละ field (value)

\`\`\`javascript
// สร้าง object ด้วย literal syntax
const student = {
  // key: value
  name: "สมชาย",            // string
  age: 25,                   // number
  isActive: true,            // boolean
  scores: [85, 92, 78],     // array
  address: {                 // nested object
    city: "กรุงเทพ",
    district: "พระนคร",
  },

  // Method (ฟังก์ชันในฺ object)
  getAverage() {
    const sum = this.scores.reduce((a, b) => a + b, 0);
    return sum / this.scores.length;
  },

  // Shorthand method ใน ES6
  introduce() {
    return \`ฉันชื่อ \${this.name} อายุ \${this.age} ปี\`;
  },
};

// Shorthand property (ถ้าชื่อตัวแปรตรงกับ key)
const name = "สมหญิง";
const age = 22;
const user = { name, age };  // เทียบเท่า { name: name, age: age }
\`\`\`

---

## Dot Notation vs Bracket Notation

มี 2 วิธีเข้าถึง property ของ object:

\`\`\`javascript
const car = {
  brand: "Toyota",
  model: "Camry",
  "year-made": 2023,       // key ที่มี special character
  color: "แดง",
};

// Dot Notation — ใช้บ่อยที่สุด ง่ายและอ่านชัด
console.log(car.brand);    // "Toyota"
console.log(car.model);    // "Camry"
car.color = "น้ำเงิน";    // กำหนดค่าใหม่

// Bracket Notation — ใช้เมื่อ key เป็น dynamic หรือมี special characters
console.log(car["brand"]);      // "Toyota"
console.log(car["year-made"]);  // 2023 (key มี -)

// Bracket Notation กับ dynamic key
const property = "model";
console.log(car[property]);  // "Camry" ← ใช้ตัวแปรเป็น key

// เพิ่ม/ลบ properties
car.owner = "สมชาย";        // เพิ่ม property ใหม่
delete car.color;           // ลบ property
console.log(car);
\`\`\`

> 💡 **Tip:** ใช้ Dot Notation เป็นหลัก เปลี่ยนเป็น Bracket Notation เมื่อ key เป็น dynamic (มาจากตัวแปร) หรือมี special characters

---

## this Keyword ใน Methods

\`this\` ใน method ของ object ชี้ไปที่ object นั้นๆ แต่พฤติกรรมของ \`this\` ขึ้นอยู่กับวิธีการเรียก

\`\`\`javascript
const person = {
  name: "สมชาย",
  age: 25,

  // Regular function method — this = person
  greet() {
    return \`สวัสดี ฉันชื่อ \${this.name}\`;
  },

  // Arrow function — this = outer scope (ไม่ใช่ person!)
  greetArrow: () => {
    return \`สวัสดี ฉันชื่อ \${this?.name}\`;  // this ไม่ใช่ person
  },

  // Method ที่ใช้ this ถูกต้อง
  getBirthYear() {
    return new Date().getFullYear() - this.age;
  },
};

console.log(person.greet());       // "สวัสดี ฉันชื่อ สมชาย" ✅
console.log(person.greetArrow());  // "สวัสดี ฉันชื่อ undefined" ❌

// ระวัง: this เปลี่ยนเมื่อ method ถูก detach
const greetFn = person.greet;
// greetFn();  // ❌ this จะเป็น undefined (strict mode) หรือ window
\`\`\`

---

## Object Methods ที่ใช้บ่อย

\`\`\`javascript
const student = {
  name: "สมชาย",
  score: 85,
  grade: "B",
  active: true,
};

// Object.keys() — array ของ keys
console.log(Object.keys(student));    // ["name", "score", "grade", "active"]

// Object.values() — array ของ values
console.log(Object.values(student));  // ["สมชาย", 85, "B", true]

// Object.entries() — array ของ [key, value] pairs
console.log(Object.entries(student));
// [["name", "สมชาย"], ["score", 85], ["grade", "B"], ["active", true]]

// วนดูทุก entry
for (const [key, value] of Object.entries(student)) {
  console.log(\`\${key}: \${value}\`);
}

// Object.fromEntries() — แปลง entries กลับเป็น object
const entries = [["name", "สมหญิง"], ["score", 92]];
const newObj = Object.fromEntries(entries);
// { name: "สมหญิง", score: 92 }

// Object.freeze() — ป้องกันการแก้ไข
const config = Object.freeze({ apiKey: "abc123", version: "1.0" });
config.apiKey = "newkey";  // ไม่มีผล (silently fails)
\`\`\`

---

## Spread Operator และ Destructuring

\`\`\`javascript
const original = { name: "สมชาย", age: 25, city: "กรุงเทพ" };

// Spread — copy และ merge objects
const copy = { ...original };                          // shallow copy
const updated = { ...original, age: 26 };             // override age
const merged = { ...original, job: "นักพัฒนา" };    // เพิ่ม property ใหม่
const merged2 = { ...original, ...{ city: "เชียงใหม่", job: "ครู" } };

// Destructuring — ดึงค่าออกมาเป็นตัวแปร
const { name, age } = original;
console.log(name, age);  // "สมชาย" 25

// ตั้งชื่อใหม่ (rename)
const { name: fullName, age: years } = original;
console.log(fullName, years);  // "สมชาย" 25

// ค่า default ในกรณีที่ undefined
const { name: n, nickname = "ไม่ระบุ" } = original;
console.log(nickname);  // "ไม่ระบุ" (original ไม่มี nickname)

// Nested destructuring
const user = { profile: { firstName: "สม", lastName: "ชาย" } };
const { profile: { firstName, lastName } } = user;
console.log(firstName, lastName);  // "สม" "ชาย"

// Destructuring ใน function parameters
function displayUser({ name, age, city = "ไม่ระบุ" }) {
  return \`\${name} อายุ \${age} ปี อยู่ที่ \${city}\`;
}
console.log(displayUser(original));
\`\`\`

> ⚠️ **ข้อควรระวัง:** Spread operator ทำ shallow copy เท่านั้น ถ้า object มี nested objects, nested object จะยังชี้ไปที่เดิม ต้องใช้ deep copy ถ้าต้องการ copy nested objects ด้วย

---

## สรุป

Objects เป็นโครงสร้างข้อมูลที่ใช้บ่อยที่สุดใน JavaScript การเข้าใจ dot/bracket notation, this keyword, Object methods, spread, และ destructuring จะช่วยให้เขียนโค้ดที่กระชับและอ่านง่ายขึ้นอย่างมาก ใช้ destructuring เมื่อรับ object เป็น parameter และใช้ spread เมื่อต้องการ copy หรือ merge objects`,
          codeExamples: [
            {
              title: "Objects ในทางปฏิบัติ",
              language: "javascript",
              code: `// Object basics
const student = {
  name: "สมหญิง",
  age: 20,
  scores: [85, 92, 78],
  address: { city: "กรุงเทพ", district: "พระนคร" },

  // Method
  getAverage() {
    const sum = this.scores.reduce((a, b) => a + b, 0);
    return sum / this.scores.length;
  },

  // Getter
  get fullInfo() {
    return \`\${this.name} (\${this.age} ปี) - \${this.address.city}\`;
  },
};

console.log(student.getAverage());  // 85
console.log(student.fullInfo);      // "สมหญิง (20 ปี) - กรุงเทพ"

// Object methods
console.log(Object.keys(student));     // ["name", "age", "scores", ...]
console.log(Object.values(student));   // ["สมหญิง", 20, ...]
Object.entries(student).forEach(([key, val]) => console.log(key, val));

// Spread (shallow copy)
const updated = { ...student, age: 21, city: "เชียงใหม่" };

// Destructuring
const { name, age, address: { city } } = student;
console.log(name, age, city);  // "สมหญิง" 20 "กรุงเทพ"`,
              explanation: "Objects: methods, this, Object.keys/values/entries, spread, destructuring",
            },
          ],
        },
        {
          slug: "js-arrays",
          title: "Arrays",
          isFree: false,
          duration: 20,
          content: `# Arrays — เก็บข้อมูลเรียงลำดับอย่างมีประสิทธิภาพ

## สิ่งที่คุณจะเรียนรู้
- สร้าง Array และเข้าถึงข้อมูล
- Mutating methods: push/pop/shift/unshift/splice
- Non-mutating methods: map/filter/reduce/find/some/every/includes
- Spread operator และ destructuring กับ array
- Array.from() สำหรับสร้าง array จาก iterable

---

## สร้าง Array และการเข้าถึงข้อมูล

**Array** คือการเก็บข้อมูลหลายอย่างในรูปแบบเรียงลำดับ เหมือนรายชื่อที่มีหมายเลขกำกับ (เริ่มจาก 0)

\`\`\`javascript
// สร้าง array
const fruits = ["แอปเปิ้ล", "กล้วย", "มะม่วง", "ส้ม"];
const numbers = [1, 2, 3, 4, 5];
const mixed = ["สวัสดี", 42, true, null, { name: "สมชาย" }];
const empty = [];

// เข้าถึงด้วย index (เริ่มจาก 0)
console.log(fruits[0]);   // "แอปเปิ้ล"
console.log(fruits[2]);   // "มะม่วง"
console.log(fruits[-1]);  // undefined (JS ไม่รองรับ negative index)

// ใช้ at() สำหรับ negative index (ES2022)
console.log(fruits.at(-1));  // "ส้ม" (ตัวสุดท้าย)
console.log(fruits.at(-2));  // "มะม่วง"

// ความยาว
console.log(fruits.length);  // 4

// Array.from() — สร้าง array จาก iterable
const chars = Array.from("Hello");     // ["H", "e", "l", "l", "o"]
const range = Array.from({ length: 5 }, (_, i) => i + 1);  // [1, 2, 3, 4, 5]
const zeros = Array.from({ length: 3 }, () => 0);           // [0, 0, 0]
\`\`\`

---

## Mutating Methods — แก้ไข Array ต้นฉบับ

Methods เหล่านี้ **แก้ไข array เดิม** ต้องระวังเมื่อใช้กับ state

\`\`\`javascript
const arr = ["a", "b", "c"];

// push() — เพิ่มท้าย array
arr.push("d");           // arr = ["a", "b", "c", "d"]
arr.push("e", "f");     // เพิ่มหลายตัว

// pop() — ลบและ return ตัวท้าย
const last = arr.pop();  // last = "f", arr = ["a", "b", "c", "d", "e"]

// unshift() — เพิ่มหน้า array
arr.unshift("z");        // arr = ["z", "a", "b", "c", "d", "e"]

// shift() — ลบและ return ตัวแรก
const first = arr.shift(); // first = "z", arr = ["a", "b", "c", "d", "e"]

// splice(start, deleteCount, ...items) — ทรงพลังที่สุด
const removed = arr.splice(1, 2);      // ลบ index 1-2
// removed = ["b", "c"], arr = ["a", "d", "e"]

arr.splice(1, 0, "x", "y");           // แทรกที่ index 1
// arr = ["a", "x", "y", "d", "e"]

arr.splice(2, 1, "REPLACED");         // แทนที่ index 2
// arr = ["a", "x", "REPLACED", "d", "e"]

// sort() — เรียงลำดับ (แก้ต้นฉบับ!)
const nums = [10, 2, 30, 4, 20];
nums.sort((a, b) => a - b);  // [2, 4, 10, 20, 30] ascending
nums.sort((a, b) => b - a);  // [30, 20, 10, 4, 2] descending

// reverse() — กลับลำดับ (แก้ต้นฉบับ!)
const words = ["c", "a", "b"];
words.reverse();  // ["b", "a", "c"]
\`\`\`

> ⚠️ **ข้อควรระวัง:** \`sort()\` โดย default เรียงเป็น string! ต้องใส่ comparator function เสมอเมื่อเรียงตัวเลข \`[10, 2, 30].sort()\` ได้ \`[10, 2, 30]\` ไม่ใช่ \`[2, 10, 30]\`

---

## Non-Mutating Methods — คืน Array ใหม่

Methods เหล่านี้ **ไม่แก้ไข array เดิม** แต่ return ค่าใหม่ เหมาะสำหรับ functional programming

\`\`\`javascript
const students = [
  { name: "สมชาย", score: 85, active: true },
  { name: "สมหญิง", score: 92, active: true },
  { name: "สมศักดิ์", score: 45, active: false },
  { name: "สมใจ", score: 70, active: true },
];

// map() — แปลงทุกตัว → array ใหม่
const names = students.map(s => s.name);
// ["สมชาย", "สมหญิง", "สมศักดิ์", "สมใจ"]

const withGrade = students.map(s => ({
  ...s,
  grade: s.score >= 80 ? "A" : s.score >= 70 ? "B" : "C",
}));

// filter() — กรองตาม condition
const active = students.filter(s => s.active);
// นักเรียน 3 คนที่ active = true

const highScorers = students.filter(s => s.score >= 80);
// [สมชาย(85), สมหญิง(92)]

// reduce() — รวมเป็นค่าเดียว
const totalScore = students.reduce((sum, s) => sum + s.score, 0);  // 292
const average = totalScore / students.length;  // 73

// สร้าง object จาก array
const scoreMap = students.reduce((map, s) => {
  map[s.name] = s.score;
  return map;
}, {});
// { สมชาย: 85, สมหญิง: 92, สมศักดิ์: 45, สมใจ: 70 }

// find() และ findIndex()
const top = students.find(s => s.score >= 90);  // { name: "สมหญิง", ... }
const idx = students.findIndex(s => s.name === "สมศักดิ์");  // 2

// some() และ every()
const anyFailed = students.some(s => s.score < 50);    // true (สมศักดิ์ 45)
const allActive = students.every(s => s.active);        // false (สมศักดิ์ false)

// includes() — เช็คว่ามีค่านี้ไหม (สำหรับ primitive)
const fruits = ["แอปเปิ้ล", "กล้วย", "มะม่วง"];
console.log(fruits.includes("กล้วย"));  // true
console.log(fruits.includes("ทุเรียน")); // false

// slice() — ตัดส่วน (ไม่แก้ต้นฉบับ)
const first2 = students.slice(0, 2);   // 2 คนแรก
const last2 = students.slice(-2);      // 2 คนสุดท้าย
\`\`\`

---

## Spread และ Destructuring กับ Array

\`\`\`javascript
const a = [1, 2, 3];
const b = [4, 5, 6];

// Spread — copy และ merge
const copy = [...a];          // [1, 2, 3] (shallow copy)
const combined = [...a, ...b]; // [1, 2, 3, 4, 5, 6]
const withExtra = [...a, 10, 20, ...b]; // [1, 2, 3, 10, 20, 4, 5, 6]

// Destructuring
const [first, second, third] = a;
console.log(first, second, third);  // 1 2 3

// Skip elements
const [, , thirdOnly] = a;
console.log(thirdOnly);  // 3

// Rest in destructuring
const [head, ...tail] = [1, 2, 3, 4, 5];
console.log(head);  // 1
console.log(tail);  // [2, 3, 4, 5]

// Swap variables ด้วย destructuring
let x = 1, y = 2;
[x, y] = [y, x];
console.log(x, y);  // 2 1
\`\`\`

> 💡 **Tip:** \`[...arr].sort()\` เพื่อ sort โดยไม่แก้ไข original array เป็น pattern ที่ใช้บ่อยมาก เพราะ sort() แก้ไข array เดิม

---

## สรุป

Arrays เป็นโครงสร้างข้อมูลที่ใช้บ่อยที่สุดใน JavaScript ต้องรู้ว่า methods ไหน mutate (แก้ต้นฉบับ) และ methods ไหนไม่ mutate ในโค้ด modern ควรใช้ \`map\`, \`filter\`, \`reduce\` แทน \`for\` loop เมื่อทำงานกับ array เพราะอ่านง่ายกว่าและ functional มากกว่า`,
          codeExamples: [
            {
              title: "Array Methods ครบชุด",
              language: "javascript",
              code: `const students = [
  { name: "สมชาย", score: 85, passed: true },
  { name: "สมหญิง", score: 92, passed: true },
  { name: "สมศักดิ์", score: 45, passed: false },
  { name: "สมใจ", score: 70, passed: true },
];

// map — แปลงข้อมูล
const names = students.map(s => s.name);
console.log(names);  // ["สมชาย", "สมหญิง", "สมศักดิ์", "สมใจ"]

// filter — กรอง
const passed = students.filter(s => s.passed);
console.log(passed.length);  // 3

// reduce — รวม
const totalScore = students.reduce((sum, s) => sum + s.score, 0);
const average = totalScore / students.length;
console.log(average);  // 73

// find / findIndex
const topStudent = students.find(s => s.score >= 90);
console.log(topStudent.name);  // "สมหญิง"

// some / every
console.log(students.some(s => s.score === 100));   // false
console.log(students.every(s => s.score > 0));       // true

// sort (ระวัง: แก้ต้นฉบับ)
const sorted = [...students].sort((a, b) => b.score - a.score);
console.log(sorted[0].name);  // "สมหญิง" (คะแนนสูงสุด)

// flat และ flatMap
const nested = [[1, 2], [3, 4], [5]];
console.log(nested.flat());  // [1, 2, 3, 4, 5]`,
              explanation: "Array methods: map, filter, reduce, find, some, every, sort, flat",
            },
          ],
        },
        {
          slug: "js-dom",
          title: "DOM Manipulation",
          isFree: false,
          duration: 20,
          content: `# DOM Manipulation — ควบคุมหน้าเว็บด้วย JavaScript

## สิ่งที่คุณจะเรียนรู้
- DOM คือ tree และทำงานอย่างไร
- querySelector vs getElementById — เมื่อไหร่ใช้อะไร
- textContent vs innerHTML — XSS Warning ที่สำคัญมาก
- style และ classList สำหรับควบคุม CSS
- createElement/appendChild/removeChild/remove
- querySelectorAll + forEach สำหรับจัดการหลาย elements

---

## DOM คืออะไร?

**DOM (Document Object Model)** คือการแสดง HTML document ในรูปแบบ tree structure ที่ JavaScript สามารถเข้าถึงและแก้ไขได้ ลองนึกภาพ DOM เป็นแผนผังองค์กร — \`<html>\` คือ CEO, \`<head>\` และ \`<body>\` คือ VP, และ element ต่างๆ คือพนักงานในสายงาน

\`\`\`
Document
└── html
    ├── head
    │   ├── title
    │   └── meta
    └── body
        ├── header
        │   └── h1
        ├── main
        │   ├── div.card
        │   └── div.card
        └── footer
\`\`\`

---

## Select Elements — เลือก Element

\`\`\`javascript
// querySelector — CSS selector (เลือกตัวแรกที่เจอ)
const btn = document.querySelector(".submit-btn");      // class
const form = document.querySelector("#loginForm");      // ID
const input = document.querySelector('input[type="email"]');  // attribute
const firstP = document.querySelector("p");            // tag name

// getElementById — เฉพาะ ID (เร็วกว่า querySelector นิดหน่อย)
const header = document.getElementById("main-header");

// querySelectorAll — ได้ NodeList (ทุกตัวที่ match)
const cards = document.querySelectorAll(".card");
const inputs = document.querySelectorAll("form input");

// วนดู NodeList
cards.forEach((card, index) => {
  card.dataset.index = index;
});

// แปลง NodeList เป็น Array (เพื่อใช้ Array methods)
const cardsArray = Array.from(cards);
const cardsArray2 = [...cards];
const filtered = cardsArray.filter(card => card.classList.contains("active"));

// เลือกใน scope ของ element เฉพาะ
const container = document.querySelector(".container");
const innerBtns = container.querySelectorAll("button");  // เฉพาะใน .container
\`\`\`

> 💡 **Tip:** ใช้ \`querySelector\` เป็นหลักเพราะใช้ CSS selector ได้ทุกรูปแบบ ใช้ \`getElementById\` เมื่อต้องการความเร็วสูงสุดหรือ select ด้วย ID เยอะๆ

---

## Modify Content — แก้ไขเนื้อหา

\`\`\`javascript
const titleEl = document.querySelector("h1");
const descEl = document.querySelector(".description");

// textContent — เซ็ตข้อความ (ปลอดภัย!)
titleEl.textContent = "หัวข้อใหม่";
titleEl.textContent = "<strong>ข้อความนี้จะแสดงเป็น string ตรงๆ</strong>";
// ตัวอักษร <strong> จะแสดงเป็น text ไม่ใช่ HTML

// innerHTML — เซ็ต HTML (อันตรายถ้าใช้กับ user input!)
descEl.innerHTML = "<strong>ข้อความหนา</strong> และ <em>ตัวเอน</em>";
// แสดงเป็น HTML จริงๆ

// ⚠️ XSS Attack ผ่าน innerHTML
const userInput = '<img src="x" onerror="alert(\'hacked!\')">';
// ❌ อันตรายมาก!
descEl.innerHTML = userInput;
// ✅ ปลอดภัย
descEl.textContent = userInput;  // แสดงเป็น text ไม่รัน script

// innerText vs textContent
// textContent — ได้ text ทั้งหมดรวม hidden elements
// innerText — ได้แค่ text ที่มองเห็นได้ (ช้ากว่า)

// input value
const emailInput = document.querySelector('input[type="email"]');
console.log(emailInput.value);  // อ่านค่า
emailInput.value = "new@email.com";  // กำหนดค่า
\`\`\`

> ⚠️ **ข้อควรระวัง:** อย่าใช้ \`innerHTML\` กับ user input เด็ดขาด! เพราะจะทำให้เกิดช่องโหว่ XSS (Cross-Site Scripting) ให้ใช้ \`textContent\` แทนเมื่อต้องแสดง user input

---

## Modify Style และ classList

\`\`\`javascript
const box = document.querySelector(".box");

// Style ตรงๆ (ไม่แนะนำ — ยากดูแล)
box.style.color = "red";
box.style.backgroundColor = "blue";  // camelCase!
box.style.fontSize = "18px";
box.style.display = "none";  // ซ่อน

// classList — แนะนำกว่า
box.classList.add("active");            // เพิ่ม class
box.classList.remove("hidden");         // ลบ class
box.classList.toggle("dark-mode");      // สลับ on/off
box.classList.replace("old", "new");   // แทนที่ class

// เช็ค class
console.log(box.classList.contains("active"));  // true/false

// Attributes
const link = document.querySelector("a");
link.setAttribute("href", "https://example.com");
link.setAttribute("target", "_blank");
link.getAttribute("href");          // อ่านค่า
link.removeAttribute("target");    // ลบ attribute

// Data attributes
const card = document.querySelector(".card");
card.dataset.userId = "123";           // ตั้งค่า data-user-id
console.log(card.dataset.userId);     // อ่านค่า
\`\`\`

---

## Create และ Remove Elements

\`\`\`javascript
// createElement + appendChild
function createProductCard(product) {
  const card = document.createElement("div");
  card.className = "product-card";
  card.dataset.id = product.id;

  // ใช้ textContent สำหรับ user data
  const title = document.createElement("h3");
  title.textContent = product.name;  // ✅ ปลอดภัย

  const price = document.createElement("p");
  price.className = "price";
  price.textContent = \`฿\${product.price.toLocaleString()}\`;

  const btn = document.createElement("button");
  btn.textContent = "เพิ่มลงตะกร้า";
  btn.className = "add-to-cart-btn";

  card.appendChild(title);
  card.appendChild(price);
  card.appendChild(btn);

  return card;
}

const container = document.querySelector(".product-grid");
const products = [
  { id: 1, name: "สินค้า A", price: 299 },
  { id: 2, name: "สินค้า B", price: 599 },
];

products.forEach(product => {
  container.appendChild(createProductCard(product));
});

// Remove elements
const oldCard = document.querySelector(".product-card");
oldCard.remove();  // วิธีใหม่ (ง่ายกว่า)
// oldCard.parentNode.removeChild(oldCard);  // วิธีเก่า

// Clear ทั้งหมด
container.innerHTML = "";  // หรือ
while (container.firstChild) {
  container.removeChild(container.firstChild);
}
\`\`\`

> 💡 **Tip:** เมื่อต้องสร้าง element หลายตัว ใช้ \`DocumentFragment\` เพื่อลดการ reflow: สร้างทุกอย่างใน fragment ก่อน แล้ว append ทีเดียว ทำให้เร็วขึ้นมาก

---

## สรุป

DOM Manipulation คือสิ่งที่ทำให้ JavaScript มีพลัง จุดสำคัญที่ต้องจำคือ ใช้ \`querySelector\` เป็นหลัก, ใช้ \`textContent\` แทน \`innerHTML\` เมื่อแสดง user data เพื่อป้องกัน XSS, และใช้ \`classList\` แทนการแก้ \`style\` โดยตรง เพื่อให้ CSS อยู่ใน CSS ไม่ใช่ใน JavaScript`,
          codeExamples: [
            {
              title: "DOM Manipulation ตัวอย่างจริง",
              language: "javascript",
              code: `// Select elements
const form = document.querySelector("#loginForm");
const input = document.querySelector('input[name="username"]');
const btn = document.querySelector(".submit-btn");
const cards = document.querySelectorAll(".card");

// Read/write content
console.log(input.value);     // อ่านค่า input
input.value = "สมชาย";         // ตั้งค่า
input.focus();                 // focus

// Classes
btn.classList.add("loading");
btn.classList.remove("disabled");
btn.classList.toggle("active");  // สลับ on/off
console.log(btn.classList.contains("loading"));  // true

// Attributes
const img = document.querySelector("img");
img.setAttribute("alt", "รูปโปรไฟล์");
img.src = "/new-image.jpg";  // shortcut

// Create element
function createCard(title, desc) {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = \`
    <h3>\${title}</h3>
    <p>\${desc}</p>
  \`;
  return card;
}

const container = document.querySelector(".container");
container.appendChild(createCard("HTML", "เรียนรู้ HTML ฟรี"));

// Loop NodeList
cards.forEach((card, i) => {
  card.style.animationDelay = \`\${i * 0.1}s\`;
  card.classList.add("animate-in");
});`,
              explanation: "DOM: querySelector, classList, innerHTML, createElement, forEach on NodeList",
            },
          ],
        },
        {
          slug: "js-events",
          title: "Events",
          isFree: false,
          duration: 18,
          content: `# Events — ทำให้หน้าเว็บโต้ตอบกับผู้ใช้

## สิ่งที่คุณจะเรียนรู้
- addEventListener vs onclick — ต่างกันอย่างไร
- Common events: click, keydown, submit, input, change
- Event Object (e.target, e.preventDefault())
- Event Bubbling และ Capturing
- removeEventListener — หยุดฟัง event
- Event Delegation Pattern — pattern ที่ใช้บ่อยมาก

---

## addEventListener vs onclick

มี 2 วิธีหลักในการผูก event handler กับ element:

\`\`\`javascript
const btn = document.querySelector("#myBtn");

// onclick — assign ตรงๆ
btn.onclick = () => console.log("คลิก 1");
btn.onclick = () => console.log("คลิก 2");
// ปัญหา: handler ที่ 2 ทับ handler ที่ 1

// addEventListener — แนะนำ
btn.addEventListener("click", () => console.log("คลิก 1"));
btn.addEventListener("click", () => console.log("คลิก 2"));
// ✅ ทั้งสองทำงาน — ไม่ทับกัน

// ผูก inline ใน HTML (ไม่แนะนำ)
// <button onclick="handleClick()">คลิก</button>
// ปัญหา: ปนกัน HTML กับ JS และต้องเป็น global function
\`\`\`

> 💡 **Tip:** ใช้ \`addEventListener\` เสมอ เพราะ: สามารถผูกหลาย handler, ลบได้ด้วย \`removeEventListener\`, และรองรับ options เช่น \`once\`, \`capture\`, \`passive\`

---

## Event Types ที่ใช้บ่อย

\`\`\`javascript
const btn = document.querySelector("#btn");
const input = document.querySelector("#search");
const form = document.querySelector("#loginForm");

// Mouse Events
btn.addEventListener("click", (e) => { /* คลิก */ });
btn.addEventListener("dblclick", (e) => { /* ดับเบิ้ลคลิก */ });
btn.addEventListener("mouseenter", (e) => { /* เมาส์เข้า (ไม่ bubble) */ });
btn.addEventListener("mouseleave", (e) => { /* เมาส์ออก (ไม่ bubble) */ });
btn.addEventListener("contextmenu", (e) => {
  e.preventDefault();  // ป้องกัน right-click menu
});

// Keyboard Events
document.addEventListener("keydown", (e) => {
  console.log(e.key);      // ชื่อปุ่ม เช่น "Enter", "ArrowUp", "a"
  console.log(e.code);     // ตำแหน่งปุ่ม เช่น "KeyA", "ArrowUp"
  console.log(e.ctrlKey);  // true ถ้ากด Ctrl
  console.log(e.shiftKey); // true ถ้ากด Shift
  console.log(e.altKey);   // true ถ้ากด Alt

  if (e.key === "Escape") closeModal();
  if (e.ctrlKey && e.key === "s") {
    e.preventDefault();
    saveDocument();
  }
});

// Form Events
input.addEventListener("input", (e) => {
  // ทำงานทุกครั้งที่ value เปลี่ยน (real-time)
  console.log("ค้นหา:", e.target.value);
});

input.addEventListener("change", (e) => {
  // ทำงานเมื่อ focus ออกและค่าเปลี่ยน
  console.log("เปลี่ยนเป็น:", e.target.value);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();  // ป้องกัน page reload
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData);
  console.log(data);
});

// Focus Events
input.addEventListener("focus", () => { /* ได้ focus */ });
input.addEventListener("blur", () => { /* เสีย focus */ });
\`\`\`

---

## Event Object — ข้อมูลเกี่ยวกับ Event

Event Object (\`e\`) มี properties สำคัญมากมาย:

\`\`\`javascript
document.addEventListener("click", (e) => {
  console.log(e.target);          // element ที่ถูก click โดยตรง
  console.log(e.currentTarget);   // element ที่ผูก event listener
  console.log(e.type);            // ชนิด event: "click"
  console.log(e.clientX, e.clientY);  // ตำแหน่งเมาส์ใน viewport
  console.log(e.pageX, e.pageY);      // ตำแหน่งใน page
  console.log(e.timeStamp);       // เวลาที่เกิด event

  e.preventDefault();    // ป้องกัน default action (เช่น link ไม่ navigate)
  e.stopPropagation();  // หยุด event ไม่ให้ bubble ขึ้นไป parent
});

// ตัวอย่าง: drag and drop
document.addEventListener("dragstart", (e) => {
  e.dataTransfer.setData("text/plain", e.target.id);
});

document.addEventListener("drop", (e) => {
  e.preventDefault();
  const id = e.dataTransfer.getData("text/plain");
  // จัดการ drop...
});
\`\`\`

---

## Event Bubbling และ Capturing

Event Bubbling คือการที่ event "ฟอง" ขึ้นจาก target ไปยัง parent จนถึง Document

\`\`\`javascript
// HTML: <div id="outer"> <div id="inner"> <button id="btn"> </div> </div>

document.getElementById("btn").addEventListener("click", () => {
  console.log("1. Button clicked");
});

document.getElementById("inner").addEventListener("click", () => {
  console.log("2. Inner div clicked");  // bubble ขึ้นมา
});

document.getElementById("outer").addEventListener("click", () => {
  console.log("3. Outer div clicked");  // bubble ขึ้นมา
});

// เมื่อคลิก button จะได้:
// "1. Button clicked"
// "2. Inner div clicked"
// "3. Outer div clicked"

// หยุด bubble ด้วย stopPropagation()
document.getElementById("btn").addEventListener("click", (e) => {
  e.stopPropagation();  // หยุดที่ button ไม่ขึ้นไป parent
  console.log("Button only");
});

// Capturing — ลำดับกลับกัน (จาก parent ลงมา)
document.getElementById("outer").addEventListener("click", () => {
  console.log("Outer (capture)");
}, true);  // ← useCapture = true
\`\`\`

---

## removeEventListener — หยุดฟัง Event

\`\`\`javascript
// ต้องใช้ named function ถึงจะ remove ได้
function handleClick(e) {
  console.log("คลิก!");
}

const btn = document.querySelector("#btn");
btn.addEventListener("click", handleClick);

// ลบ listener
btn.removeEventListener("click", handleClick);

// ใช้ { once: true } เพื่อ remove อัตโนมัติหลัง fire ครั้งแรก
btn.addEventListener("click", handleClick, { once: true });

// ใช้ AbortController (วิธีสมัยใหม่)
const controller = new AbortController();
btn.addEventListener("click", handleClick, { signal: controller.signal });

// ลบทั้งหมดที่ผูกด้วย signal นี้
controller.abort();
\`\`\`

---

## Event Delegation Pattern

แทนที่จะผูก event ที่ทุก child element (ไม่ efficient), ผูกที่ parent แทน แล้วเช็คว่า event มาจาก child ไหน

\`\`\`javascript
// ❌ ไม่ดี — ผูก listener กับทุก item
const items = document.querySelectorAll(".list-item");
items.forEach(item => {
  item.addEventListener("click", handleItemClick);
  // ถ้ามี 1000 items = 1000 listeners!
  // และ dynamic items ที่เพิ่มทีหลังจะไม่มี listener
});

// ✅ Event Delegation — ผูกที่ parent เดียว
const list = document.querySelector(".item-list");
list.addEventListener("click", (e) => {
  // หา ancestor ที่เป็น .list-item
  const item = e.target.closest(".list-item");
  if (!item) return;  // คลิกที่อื่น ไม่ใช่ item

  const itemId = item.dataset.id;
  console.log("คลิก item:", itemId);

  // เช็คว่าคลิกปุ่ม delete
  if (e.target.closest(".delete-btn")) {
    deleteItem(itemId);
  }
  // เช็คว่าคลิกปุ่ม edit
  if (e.target.closest(".edit-btn")) {
    editItem(itemId);
  }
});
\`\`\`

> 💡 **Tip:** Event Delegation มีข้อดีสำคัญคือ: (1) ประหยัด memory, (2) ทำงานกับ dynamic elements ที่เพิ่มทีหลัง, (3) โค้ดน้อยกว่า ใช้บ่อยมากใน real-world applications

---

## สรุป

Events คือวิธีที่ JavaScript ตอบสนองต่อการกระทำของผู้ใช้ ใช้ \`addEventListener\` เสมอแทน \`onclick\`, เข้าใจ Event Bubbling เพื่อรู้ว่า event จะไปถึงไหน, และใช้ Event Delegation Pattern เมื่อมี child elements จำนวนมากหรือ dynamic elements`,
          codeExamples: [
            {
              title: "Events ในทางปฏิบัติ",
              language: "javascript",
              code: `// Click event
document.querySelector("#btn").addEventListener("click", () => {
  console.log("คลิกแล้ว!");
});

// Form submit
document.querySelector("#loginForm").addEventListener("submit", (e) => {
  e.preventDefault();  // ป้องกัน reload
  const username = e.target.username.value;
  const password = e.target.password.value;
  console.log("Login:", username);
  // ส่ง API request...
});

// Input realtime
document.querySelector("#search").addEventListener("input", (e) => {
  const query = e.target.value;
  console.log("ค้นหา:", query);
  // filter results...
});

// Keyboard
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
  if (e.ctrlKey && e.key === "s") {
    e.preventDefault();
    saveDocument();
  }
});

// Event delegation (efficient!)
document.querySelector(".card-list").addEventListener("click", (e) => {
  const card = e.target.closest(".card");
  if (!card) return;
  const id = card.dataset.id;
  console.log("เลือก card:", id);
});

// Window scroll
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  navbar.classList.toggle("scrolled", window.scrollY > 60);
});`,
              explanation: "Events: click, submit, input, keyboard, delegation, window scroll",
            },
          ],
        },
        {
          slug: "js-browser-apis",
          title: "Browser APIs",
          isFree: false,
          duration: 15,
          content: `# Browser APIs — พลังของ Browser ที่รอคุณใช้

## สิ่งที่คุณจะเรียนรู้
- localStorage vs sessionStorage — เก็บข้อมูลใน browser
- setTimeout และ setInterval — จัดการ timing
- Geolocation API — รับตำแหน่งผู้ใช้
- URL และ URLSearchParams — จัดการ URL
- navigator.clipboard — copy/paste

---

## localStorage และ sessionStorage

ทั้งสองช่วยให้เก็บข้อมูลใน browser ได้โดยไม่ต้องมี server แต่มีความแตกต่างกัน:

| คุณสมบัติ | localStorage | sessionStorage |
|---|---|---|
| อายุ | ถาวร (จนกว่าจะลบ) | แค่ session เดียว (ปิด tab = หาย) |
| ขนาด | ~5-10MB | ~5MB |
| แชร์ระหว่าง tab | ✅ แชร์ได้ | ❌ ไม่แชร์ |
| เข้าถึงได้จาก | domain เดิม | tab เดิม |

\`\`\`javascript
// localStorage — เก็บข้อมูลถาวร
// getItem, setItem, removeItem, clear

// เก็บ string ปกติ
localStorage.setItem("theme", "dark");
const theme = localStorage.getItem("theme");  // "dark"

// เก็บ object ต้อง JSON.stringify/parse
const user = { name: "สมชาย", role: "student" };
localStorage.setItem("user", JSON.stringify(user));

const savedUser = localStorage.getItem("user");
const userObj = savedUser ? JSON.parse(savedUser) : null;

// ลบ
localStorage.removeItem("user");   // ลบ key เดียว
localStorage.clear();              // ลบทั้งหมด

// Helper functions
function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error("Storage error:", e);
  }
}

function loadFromStorage(key, defaultValue = null) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (e) {
    return defaultValue;
  }
}

// sessionStorage — ใช้แบบเดียวกัน
sessionStorage.setItem("cart", JSON.stringify([]));
\`\`\`

> ⚠️ **ข้อควรระวัง:** อย่าเก็บข้อมูลสำคัญเช่น passwords, credit card numbers, หรือ sensitive data ใน localStorage เพราะ JavaScript ทุกสคริปต์บน page เดียวกันสามารถอ่านได้

---

## setTimeout และ setInterval

\`\`\`javascript
// setTimeout — ทำงานครั้งเดียวหลังจาก delay
const timerId = setTimeout(() => {
  console.log("ทำงานหลัง 2 วินาที");
  showToast("บันทึกสำเร็จ!");
}, 2000);

// ยกเลิกก่อนทำงาน
clearTimeout(timerId);

// setInterval — ทำงานซ้ำทุก interval
let count = 0;
const intervalId = setInterval(() => {
  count++;
  console.log(\`รอบที่ \${count}\`);

  if (count >= 5) {
    clearInterval(intervalId);  // หยุดหลัง 5 รอบ
    console.log("หยุดแล้ว");
  }
}, 1000);

// Debounce — รอจนกว่าจะหยุดพิมพ์
function debounce(fn, delay) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

const searchInput = document.querySelector("#search");
const debouncedSearch = debounce((value) => {
  console.log("ค้นหา:", value);
  // fetch API...
}, 300);

searchInput.addEventListener("input", (e) => {
  debouncedSearch(e.target.value);
});
\`\`\`

> 💡 **Tip:** Debounce เป็น pattern ที่ใช้บ่อยมาก ช่วยลด API calls เมื่อผู้ใช้พิมพ์ค้นหา — รอจนพิมพ์เสร็จ 300ms แล้วค่อยเรียก API แทนที่จะเรียกทุกตัวอักษร

---

## Geolocation API — รับตำแหน่งผู้ใช้

\`\`\`javascript
// เช็คว่า browser รองรับไหม
if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(
    // Success callback
    (position) => {
      const { latitude, longitude, accuracy } = position.coords;
      console.log(\`ละติจูด: \${latitude}\`);
      console.log(\`ลองจิจูด: \${longitude}\`);
      console.log(\`ความแม่นยำ: \${accuracy} เมตร\`);

      // เปิด Google Maps
      const mapsUrl = \`https://maps.google.com/?q=\${latitude},\${longitude}\`;
      window.open(mapsUrl, "_blank");
    },
    // Error callback
    (error) => {
      switch (error.code) {
        case 1:
          console.error("ผู้ใช้ปฏิเสธการเข้าถึงตำแหน่ง");
          break;
        case 2:
          console.error("ไม่สามารถรับตำแหน่งได้");
          break;
        case 3:
          console.error("หมดเวลา");
          break;
      }
    },
    // Options
    { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
  );
} else {
  console.log("Browser ไม่รองรับ Geolocation");
}
\`\`\`

---

## URL และ URLSearchParams

\`\`\`javascript
// สร้าง URL object
const url = new URL("https://teachcode.dev/courses?category=js&page=2");
console.log(url.hostname);   // "teachcode.dev"
console.log(url.pathname);   // "/courses"
console.log(url.search);     // "?category=js&page=2"

// URLSearchParams — จัดการ query string
const params = new URLSearchParams(url.search);
console.log(params.get("category"));  // "js"
console.log(params.get("page"));      // "2"
console.log(params.has("sort"));      // false

// แก้ไข params
params.set("page", "3");
params.append("sort", "newest");
params.delete("category");
console.log(params.toString());  // "page=3&sort=newest"

// อ่าน query string จาก URL ปัจจุบัน
const currentParams = new URLSearchParams(window.location.search);
const pageNum = parseInt(currentParams.get("page") || "1");
\`\`\`

---

## navigator.clipboard — Copy/Paste

\`\`\`javascript
// Copy ข้อความ
async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    showToast("คัดลอกแล้ว! ✅");
  } catch (err) {
    console.error("คัดลอกไม่ได้:", err);
    // fallback
    fallbackCopy(text);
  }
}

// Paste ข้อความ (ต้องขอ permission)
async function pasteFromClipboard() {
  try {
    const text = await navigator.clipboard.readText();
    console.log("paste:", text);
    return text;
  } catch (err) {
    console.error("อ่าน clipboard ไม่ได้:", err);
    return null;
  }
}

// Fallback สำหรับ browser เก่า
function fallbackCopy(text) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
}
\`\`\`

> 💡 **Tip:** \`navigator.clipboard\` ต้องใช้ HTTPS และต้องได้รับ permission จากผู้ใช้ ควรมี fallback ด้วย \`execCommand\` สำหรับ browser เก่า

---

## สรุป

Browser APIs ช่วยให้เว็บแอปทำสิ่งต่างๆ ได้โดยไม่ต้องพึ่ง server: เก็บข้อมูลด้วย localStorage, จัดการ timing ด้วย setTimeout/setInterval, รับตำแหน่งด้วย Geolocation, และจัดการ copy/paste ด้วย Clipboard API การรู้ APIs เหล่านี้จะช่วยให้สร้าง web application ที่มีฟีเจอร์ครบครันได้`,
          codeExamples: [
            {
              title: "Browser APIs ที่ใช้บ่อย",
              language: "javascript",
              code: `// localStorage — เก็บ preferences
function saveTheme(theme) {
  localStorage.setItem("theme", theme);
}
function loadTheme() {
  return localStorage.getItem("theme") || "light";
}

// เก็บ object ต้อง JSON.stringify/parse
function saveUser(user) {
  localStorage.setItem("user", JSON.stringify(user));
}
function getUser() {
  const raw = localStorage.getItem("user");
  return raw ? JSON.parse(raw) : null;
}

// Clipboard API
async function copyCode(code) {
  try {
    await navigator.clipboard.writeText(code);
    showToast("คัดลอกแล้ว!");
  } catch (err) {
    console.error("คัดลอกไม่ได้:", err);
  }
}

// navigator.onLine
window.addEventListener("online", () => {
  showNotification("กลับมาออนไลน์แล้ว ✅");
});
window.addEventListener("offline", () => {
  showNotification("ออฟไลน์อยู่ ⚠️");
});

// Geolocation
navigator.geolocation.getCurrentPosition(
  (pos) => {
    const { latitude, longitude } = pos.coords;
    console.log(\`ตำแหน่ง: \${latitude}, \${longitude}\`);
  },
  (err) => console.error("ไม่สามารถรับตำแหน่ง:", err.message)
);`,
              explanation: "localStorage, Clipboard API, navigator.onLine, Geolocation",
            },
          ],
        },
        {
          slug: "js-json",
          title: "JSON",
          isFree: false,
          duration: 10,
          content: `# JSON — ภาษากลางในการแลกเปลี่ยนข้อมูล

## สิ่งที่คุณจะเรียนรู้
- JSON คืออะไรและทำไมถึงสำคัญ
- JSON.stringify — แปลง JS Object เป็น String
- JSON.parse — แปลง String เป็น JS Object
- กฎของ JSON ที่ต้องรู้ (no undefined, functions, comments)
- Pattern การใช้ fetch + JSON
- JSON.stringify options สำหรับ formatting

---

## JSON คืออะไร?

**JSON (JavaScript Object Notation)** คือรูปแบบข้อมูลที่ใช้แลกเปลี่ยนระหว่าง client (browser) และ server ลองนึกภาพ JSON เหมือนกับ "แบบฟอร์มมาตรฐาน" ที่ทุกฝ่ายเข้าใจตรงกัน ไม่ว่าจะเป็น JavaScript, Python, Java, หรือภาษาอื่นๆ

JSON ดูคล้าย JavaScript Object แต่มีกฎที่เข้มงวดกว่า:

\`\`\`json
{
  "name": "สมชาย",
  "age": 25,
  "isActive": true,
  "scores": [85, 92, 78],
  "address": {
    "city": "กรุงเทพ",
    "district": "พระนคร"
  },
  "nickname": null
}
\`\`\`

---

## กฎของ JSON — ต่างจาก JavaScript Object

| คุณสมบัติ | JSON | JavaScript Object |
|---|---|---|
| Keys | ต้องใส่ \`""\` เสมอ | ใส่หรือไม่ใส่ก็ได้ |
| String quotes | ใช้ \`"\` เท่านั้น | ใช้ \`'\`, \`"\`, หรือ \`\` ได้ |
| Comments | ❌ ไม่รองรับ | ✅ รองรับ |
| Functions | ❌ ไม่รองรับ | ✅ รองรับ |
| undefined | ❌ ไม่รองรับ | ✅ รองรับ |
| Trailing commas | ❌ ไม่รองรับ | ✅ รองรับ |

\`\`\`javascript
// ❌ JSON ไม่ถูกต้อง
{
  name: "สมชาย",          // key ต้องมี ""
  'email': "test@test",   // ใช้ ' ไม่ได้
  age: undefined,         // undefined ไม่รองรับ
  greet: function() {},   // function ไม่รองรับ
  // comment นี้ไม่ได้   // comment ไม่รองรับ
}

// ✅ JSON ถูกต้อง
{
  "name": "สมชาย",
  "email": "test@test.com",
  "age": 25,
  "active": true,
  "nickname": null
}
\`\`\`

---

## JSON.stringify — แปลง JS Object → String

ใช้เมื่อต้องการส่งข้อมูลไป server หรือ save ใน localStorage

\`\`\`javascript
const user = {
  name: "สมชาย",
  age: 25,
  active: true,
  address: { city: "กรุงเทพ" },
  greet: function() {},   // จะถูกตัดออก!
  nothing: undefined,     // จะถูกตัดออก!
};

// Basic stringify
const jsonString = JSON.stringify(user);
console.log(jsonString);
// '{"name":"สมชาย","age":25,"active":true,"address":{"city":"กรุงเทพ"}}'
// ⚠️ greet และ nothing หายไป!

// Pretty print — ใช้ debug
const prettyJson = JSON.stringify(user, null, 2);
console.log(prettyJson);
// {
//   "name": "สมชาย",
//   "age": 25,
//   ...
// }

// JSON.stringify กับ localStorage
localStorage.setItem("user", JSON.stringify(user));

// Replacer function — กรอง keys
const filtered = JSON.stringify(user, ["name", "age"]);
// '{"name":"สมชาย","age":25}'

// Replacer function แบบ function
const censored = JSON.stringify(user, (key, value) => {
  if (key === "password") return "***";  // ซ่อน password
  return value;
});
\`\`\`

---

## JSON.parse — แปลง String → JS Object

ใช้เมื่อรับข้อมูลจาก API หรือโหลดจาก localStorage

\`\`\`javascript
// Basic parse
const jsonStr = '{"name":"สมชาย","age":25,"scores":[85,92,78]}';
const obj = JSON.parse(jsonStr);
console.log(obj.name);      // "สมชาย"
console.log(obj.scores[1]); // 92

// โหลดจาก localStorage
const savedUser = localStorage.getItem("user");
const user = savedUser ? JSON.parse(savedUser) : null;

// ⚠️ JSON.parse จะ throw error ถ้า string ไม่ใช่ valid JSON
try {
  JSON.parse("invalid json");  // ❌ SyntaxError
} catch (e) {
  console.error("Parse error:", e.message);
}

// Safe parse helper
function safeJsonParse(str, fallback = null) {
  try {
    return JSON.parse(str);
  } catch {
    return fallback;
  }
}

const result = safeJsonParse(localStorage.getItem("cart"), []);
// ถ้า parse ไม่ได้จะได้ [] แทน

// Reviver function — แปลงค่าระหว่าง parse
const dateStr = '{"name":"งาน A","createdAt":"2024-01-15T10:00:00.000Z"}';
const task = JSON.parse(dateStr, (key, value) => {
  if (key === "createdAt") return new Date(value);  // แปลงเป็น Date object
  return value;
});
console.log(task.createdAt instanceof Date);  // true
\`\`\`

---

## Pattern: Fetch + JSON

นี่คือ pattern ที่ใช้บ่อยที่สุด — ดึงข้อมูลจาก API และแปลงเป็น JS Object

\`\`\`javascript
// Pattern พื้นฐาน
async function fetchUsers() {
  const response = await fetch("https://api.example.com/users");

  // response.json() = response.text() แล้ว JSON.parse() อัตโนมัติ
  const data = await response.json();
  return data;
}

// ส่งข้อมูลด้วย POST
async function createUser(userData) {
  const response = await fetch("/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",  // บอก server ว่าส่ง JSON
    },
    body: JSON.stringify(userData),  // แปลงเป็น string ก่อนส่ง
  });

  const newUser = await response.json();  // แปลง response กลับเป็น object
  return newUser;
}

// ตัวอย่างใช้งาน
const user = await createUser({
  name: "สมชาย",
  email: "somchai@email.com",
  role: "student",
});
console.log(user.id);  // ID ที่ server สร้างให้
\`\`\`

> 💡 **Tip:** \`JSON.parse(JSON.stringify(obj))\` ใช้เพื่อ deep clone object ง่ายๆ แต่มีข้อจำกัด: ไม่รองรับ Date, undefined, functions, circular references

---

## สรุป

JSON คือรูปแบบข้อมูลมาตรฐานในการสื่อสารระหว่าง frontend กับ backend จุดสำคัญคือ ใช้ \`JSON.stringify\` เพื่อส่งข้อมูล (Object → String) และ \`JSON.parse\` เพื่อรับข้อมูล (String → Object), ใส่ try/catch เมื่อ parse เพราะอาจ throw error, และระวังว่า \`undefined\`, functions, และ special values จะหายไปเมื่อ stringify`,
          codeExamples: [
            {
              title: "JSON.parse และ JSON.stringify",
              language: "javascript",
              code: `// API response → JSON → Object
const apiResponse = \`{
  "users": [
    { "id": 1, "name": "สมชาย", "email": "somchai@email.com" },
    { "id": 2, "name": "สมหญิง", "email": "somying@email.com" }
  ],
  "total": 2
}\`;

const data = JSON.parse(apiResponse);
console.log(data.users[0].name);  // "สมชาย"
console.log(data.total);           // 2

// Object → String (ส่งไป API)
const newUser = {
  name: "สมศักดิ์",
  email: "somsak@email.com",
  role: "student"
};
const payload = JSON.stringify(newUser);
console.log(payload);
// '{"name":"สมศักดิ์","email":"somsak@email.com","role":"student"}'

// Pretty print (เพื่อ debug)
console.log(JSON.stringify(newUser, null, 2));

// Deep clone ด้วย JSON (simple objects เท่านั้น)
const copy = JSON.parse(JSON.stringify(newUser));
copy.name = "อื่น";
console.log(newUser.name);  // ยังเป็น "สมศักดิ์"`,
              explanation: "JSON.parse, JSON.stringify, pretty print, deep clone",
            },
          ],
        },
        {
          slug: "js-async",
          title: "Async JavaScript",
          isFree: false,
          duration: 20,
          content: `# Async JavaScript — จัดการงานที่ใช้เวลา

## สิ่งที่คุณจะเรียนรู้
- ทำไม Async สำคัญ และ Event Loop คืออะไร
- Callbacks และปัญหา Callback Hell
- Promises: resolve/reject/then/catch/finally
- Promise.all vs Promise.race vs Promise.allSettled
- async/await syntax ที่อ่านง่ายที่สุด

---

## ทำไม Async ถึงสำคัญ?

JavaScript ทำงานเป็น **single-thread** — หมายความว่าทำได้ทีละอย่าง ถ้าต้องรอ API response (ซึ่งอาจใช้เวลา 1-2 วินาที) เบราว์เซอร์จะ "แช่แข็ง" จนกว่าจะเสร็จ ผู้ใช้จะกดปุ่มอะไรไม่ได้เลย

Async programming แก้ปัญหานี้โดยการ "เริ่มงาน แล้วไปทำงานอื่นก่อน รอให้งานเสร็จแล้วค่อยกลับมา"

ลองนึกภาพร้านอาหาร — พ่อครัว (JavaScript) ไม่ได้รอให้เนื้อย่างเสร็จก่อนถึงจะทำสลัด แต่สั่งให้ย่างเนื้อ แล้วไปทำสลัดไปก่อน พอเนื้อย่างเสร็จค่อยกลับมาจัดจาน

---

## 1. Callbacks — วิธีดั้งเดิม

Callback คือฟังก์ชันที่ส่งเป็น argument และถูกเรียกเมื่องานเสร็จ

\`\`\`javascript
// Callback พื้นฐาน
function loadData(url, onSuccess, onError) {
  // สมมติว่า fetch ข้อมูล...
  setTimeout(() => {
    const success = Math.random() > 0.3;
    if (success) {
      onSuccess({ data: "ข้อมูลจาก " + url });
    } else {
      onError(new Error("โหลดไม่ได้"));
    }
  }, 1000);
}

loadData("/api/users",
  (data) => console.log("สำเร็จ:", data),
  (err) => console.error("ผิดพลาด:", err)
);

// ❌ Callback Hell — ซ้อนกันหลายชั้น อ่านยาก
loadUser(userId, (user) => {
  loadCourses(user.id, (courses) => {
    loadProgress(courses[0].id, (progress) => {
      loadCertificate(progress.id, (cert) => {
        // โค้ดหลักอยู่ลึกมาก!
        console.log(cert);
      }, handleError);
    }, handleError);
  }, handleError);
}, handleError);
\`\`\`

---

## 2. Promises — จัดการ Async แบบ Chainable

Promise คือ object ที่แทน "ค่าที่จะมีในอนาคต" มี 3 สถานะ: **pending** (รออยู่), **fulfilled** (สำเร็จ), **rejected** (ล้มเหลว)

\`\`\`javascript
// สร้าง Promise
const myPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    const success = true;
    if (success) {
      resolve("ข้อมูลมาแล้ว!");  // สำเร็จ
    } else {
      reject(new Error("เกิดข้อผิดพลาด"));  // ล้มเหลว
    }
  }, 1000);
});

// ใช้ Promise
myPromise
  .then(data => {
    console.log("สำเร็จ:", data);
    return data.toUpperCase();  // return เพื่อส่งต่อ
  })
  .then(upperData => {
    console.log("ข้อมูล uppercase:", upperData);
  })
  .catch(error => {
    console.error("ผิดพลาด:", error.message);
  })
  .finally(() => {
    console.log("ทำเสมอ ไม่ว่าสำเร็จหรือล้มเหลว");
    setLoading(false);
  });
\`\`\`

---

## 3. async/await — อ่านง่ายที่สุด (แนะนำ!)

async/await ทำให้โค้ด async อ่านเหมือน synchronous code ธรรมดา

\`\`\`javascript
// async function คืน Promise เสมอ
async function loadUserData(userId) {
  try {
    // await หยุดรอจนกว่า Promise จะ resolve
    const user = await fetchUser(userId);    // รอ 500ms
    const courses = await fetchCourses(user.id);  // รอ 300ms

    return { user, courses };
  } catch (error) {
    console.error("โหลดข้อมูลไม่ได้:", error.message);
    throw error;  // re-throw ให้ caller จัดการ
  } finally {
    setLoading(false);  // ทำเสมอ
  }
}

// เรียกใช้
async function main() {
  const data = await loadUserData(123);
  console.log(data.user.name);
}

// Arrow function async
const getScore = async (studentId) => {
  const response = await fetch(\`/api/scores/\${studentId}\`);
  return response.json();
};
\`\`\`

---

## Promise Combinators — จัดการหลาย Promises พร้อมกัน

\`\`\`javascript
async function loadDashboard(userId) {
  // Promise.all — รอทั้งหมด ถ้าตัวใดตัวหนึ่ง fail จะ fail ทันที
  const [user, courses, notifications] = await Promise.all([
    fetchUser(userId),
    fetchUserCourses(userId),
    fetchNotifications(userId),
  ]);
  // เร็วกว่าทำ await ทีละตัว เพราะทำงานพร้อมกัน!

  // Promise.allSettled — รอทั้งหมด ไม่ fail แม้บางตัวจะ reject
  const results = await Promise.allSettled([
    fetchPrimary(),
    fetchSecondary(),
    fetchOptional(),
  ]);

  results.forEach((result, i) => {
    if (result.status === "fulfilled") {
      console.log(\`ตัวที่ \${i} สำเร็จ:\`, result.value);
    } else {
      console.warn(\`ตัวที่ \${i} ล้มเหลว:\`, result.reason);
    }
  });

  // Promise.race — ใช้ผลของตัวที่เสร็จก่อน
  const fastest = await Promise.race([
    fetchFromServerA(),
    fetchFromServerB(),
    fetchFromServerC(),
  ]);
  console.log("เสร็จก่อน:", fastest);

  // Promise.any — ใช้ผลของตัวที่ fulfill ก่อน (ไม่สน reject)
  const firstSuccess = await Promise.any([
    fetchUnreliable1(),
    fetchUnreliable2(),
    fetchUnreliable3(),
  ]);
}
\`\`\`

> 💡 **Tip:** ใช้ \`Promise.all\` เมื่อต้องการทุกผลลัพธ์และยอมรับไม่ได้ถ้าตัวใดตัวหนึ่ง fail ใช้ \`Promise.allSettled\` เมื่อต้องการผลทั้งหมดแต่ยอมรับได้ถ้าบางตัว fail

> ⚠️ **ข้อควรระวัง:** อย่า await ใน loop! \`for (const id of ids) { await fetch(id) }\` จะทำงานทีละตัว (ช้า) ใช้ \`Promise.all(ids.map(id => fetch(id)))\` แทนเพื่อทำงานพร้อมกัน

---

## สรุป

Async programming คือทักษะสำคัญที่ต้องมีสำหรับนักพัฒนา JavaScript สมัยใหม่ ใช้ async/await เป็นหลักเพราะอ่านง่ายและ debug ง่าย เข้าใจ Promise combinators เพื่อจัดการ parallel requests อย่างมีประสิทธิภาพ และอย่าลืม try/catch ทุกครั้งที่ใช้ await`,
          codeExamples: [
            {
              title: "async/await ตัวอย่างจริง",
              language: "javascript",
              code: `// Simulate async operations
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// async/await
async function loadUserData(userId) {
  try {
    // ดึงข้อมูล user
    const user = await fetchUser(userId);

    // ดึงข้อมูลที่ต้องใช้ user id พร้อมกัน
    const [courses, achievements] = await Promise.all([
      fetchUserCourses(user.id),
      fetchUserAchievements(user.id),
    ]);

    return { user, courses, achievements };
  } catch (error) {
    if (error.status === 404) {
      throw new Error("ไม่พบผู้ใช้");
    }
    throw error;
  } finally {
    setLoading(false);  // ทำเสมอ ไม่ว่าสำเร็จหรือไม่
  }
}

// Promise methods
async function example() {
  // Promise.all — รอทั้งหมด (fail fast)
  const results = await Promise.all([api1(), api2(), api3()]);

  // Promise.allSettled — รอทั้งหมด ไม่ throw
  const settled = await Promise.allSettled([api1(), api2()]);
  settled.forEach(result => {
    if (result.status === "fulfilled") console.log(result.value);
    else console.error(result.reason);
  });

  // Promise.race — อันไหนเสร็จก่อน
  const fastest = await Promise.race([api1(), api2()]);
}`,
              explanation: "async/await, try/catch/finally, Promise.all, Promise.allSettled",
            },
          ],
        },
        {
          slug: "js-fetch-api",
          title: "Fetch API",
          isFree: false,
          duration: 18,
          content: `# Fetch API — เรียก HTTP Requests จาก Browser

## สิ่งที่คุณจะเรียนรู้
- GET Request และอ่าน JSON จาก response
- POST Request พร้อม headers และ body
- Error Handling — ทำไม response.ok สำคัญมาก
- async/await กับ fetch
- Common patterns ที่ใช้ในโปรเจกต์จริง

---

## Fetch API คืออะไร?

**Fetch API** คือ browser built-in API สำหรับทำ HTTP requests ไปยัง server หรือ API ใดๆ แทนที่ \`XMLHttpRequest\` แบบเก่า Fetch ทำงานแบบ async และ return Promise เสมอ

ลองนึกภาพ Fetch เหมือนการ "ส่งจดหมาย" ไปยัง server — เราส่งคำขอไป (request) แล้วรอรับจดหมายตอบกลับ (response)

---

## GET Request — ดึงข้อมูล

\`\`\`javascript
// GET request พื้นฐาน
async function getUsers() {
  const response = await fetch("https://api.example.com/users");

  // ⚠️ Fetch ไม่ throw error เมื่อ HTTP status error!
  // response.ok = true เมื่อ status 200-299
  if (!response.ok) {
    throw new Error(\`HTTP Error: \${response.status} \${response.statusText}\`);
  }

  // แปลง response body เป็น JSON
  const users = await response.json();
  return users;
}

// ใช้งาน
try {
  const users = await getUsers();
  console.log(users);
} catch (error) {
  console.error("โหลด users ไม่ได้:", error.message);
}

// GET กับ query parameters
async function searchUsers(query, page = 1, limit = 10) {
  const params = new URLSearchParams({ query, page, limit });
  const response = await fetch(\`/api/users?\${params}\`);

  if (!response.ok) throw new Error(\`HTTP \${response.status}\`);
  return response.json();
}

const results = await searchUsers("สมชาย", 1, 20);
\`\`\`

> ⚠️ **ข้อควรระวัง:** Fetch ไม่ throw error เมื่อ server ตอบกลับด้วย status 404, 500 หรือ error อื่นๆ — มันจะ throw เฉพาะ network error จริงๆ (เช่น ไม่มี internet) ต้องเช็ค \`response.ok\` หรือ \`response.status\` เองเสมอ

---

## POST Request — ส่งข้อมูลไป Server

\`\`\`javascript
// POST request — สร้างข้อมูลใหม่
async function createUser(userData) {
  const response = await fetch("/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",   // บอก server ว่าส่ง JSON
      "Authorization": \`Bearer \${getToken()}\`, // auth token
    },
    body: JSON.stringify(userData),  // แปลง object → string
  });

  if (!response.ok) {
    const errorData = await response.json();  // อ่าน error message จาก server
    throw new Error(errorData.message || \`HTTP \${response.status}\`);
  }

  return response.json();  // แปลง response body → object
}

// ใช้งาน
const newUser = await createUser({
  name: "สมชาย",
  email: "somchai@email.com",
  password: "securePassword123",
});
console.log("สร้าง user แล้ว:", newUser.id);
\`\`\`

---

## PUT, PATCH, DELETE

\`\`\`javascript
// PUT — แทนที่ข้อมูลทั้งหมด
async function replaceUser(id, userData) {
  const response = await fetch(\`/api/users/\${id}\`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  if (!response.ok) throw new Error(\`HTTP \${response.status}\`);
  return response.json();
}

// PATCH — อัปเดตบางส่วน
async function updateUserName(id, name) {
  const response = await fetch(\`/api/users/\${id}\`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),  // ส่งแค่ field ที่ต้องการเปลี่ยน
  });
  if (!response.ok) throw new Error(\`HTTP \${response.status}\`);
  return response.json();
}

// DELETE — ลบข้อมูล
async function deleteUser(id) {
  const response = await fetch(\`/api/users/\${id}\`, {
    method: "DELETE",
    headers: { "Authorization": \`Bearer \${getToken()}\` },
  });

  if (!response.ok) throw new Error(\`HTTP \${response.status}\`);

  // DELETE อาจไม่ return body
  if (response.status === 204) return;  // No Content
  return response.json();
}
\`\`\`

---

## Error Handling Pattern ที่ดี

\`\`\`javascript
// Wrapper function สำหรับ fetch ที่จัดการ error ได้ดี
async function apiFetch(url, options = {}) {
  const defaultHeaders = {
    "Content-Type": "application/json",
    "Authorization": \`Bearer \${getToken()}\`,
  };

  const response = await fetch(url, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,  // ให้ override ได้
    },
  });

  // Parse body ก่อน เพื่อให้ได้ error message จาก server
  let body;
  const contentType = response.headers.get("content-type");
  if (contentType?.includes("application/json")) {
    body = await response.json();
  } else {
    body = await response.text();
  }

  if (!response.ok) {
    const message = typeof body === "object" ? body.message : body;
    const error = new Error(message || \`HTTP \${response.status}\`);
    error.status = response.status;
    error.body = body;
    throw error;
  }

  return body;
}

// ใช้งาน
try {
  const users = await apiFetch("/api/users");
  const newPost = await apiFetch("/api/posts", {
    method: "POST",
    body: JSON.stringify({ title: "โพสต์ใหม่", content: "เนื้อหา" }),
  });
} catch (error) {
  if (error.status === 401) {
    redirectToLogin();
  } else if (error.status === 404) {
    showNotFound();
  } else {
    showErrorToast(error.message);
  }
}
\`\`\`

> 💡 **Tip:** สร้าง wrapper function รอบ fetch เพื่อจัดการ error handling, authentication headers, และ JSON parsing ในที่เดียว ทำให้โค้ดที่เรียก API กระชับขึ้นมาก

---

## สรุป

Fetch API เป็นวิธีมาตรฐานในการเรียก HTTP requests จาก browser จุดสำคัญที่ต้องจำคือ Fetch ไม่ throw error เมื่อ HTTP error ต้องเช็ค \`response.ok\` เอง, ต้องใส่ \`Content-Type: application/json\` header เมื่อส่ง JSON body, และ \`response.json()\` คืน Promise ต้อง await ด้วย`,
          codeExamples: [
            {
              title: "Fetch API CRUD",
              language: "javascript",
              code: `const BASE_URL = "https://api.teachcode.dev";

// GET — ดึงข้อมูล
async function getCourses() {
  const response = await fetch(\`\${BASE_URL}/courses\`);
  if (!response.ok) throw new Error(\`HTTP \${response.status}\`);
  return response.json();
}

// POST — สร้างใหม่
async function enrollCourse(courseId) {
  const response = await fetch(\`\${BASE_URL}/enrollments\`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": \`Bearer \${getToken()}\`,
    },
    body: JSON.stringify({ courseId }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }
  return response.json();
}

// PATCH — อัปเดต
async function updateProgress(lessonId, completed) {
  const response = await fetch(\`\${BASE_URL}/progress/\${lessonId}\`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ completed }),
  });
  return response.json();
}

// DELETE
async function unenroll(enrollmentId) {
  await fetch(\`\${BASE_URL}/enrollments/\${enrollmentId}\`, {
    method: "DELETE",
  });
}

// ใช้งาน
async function main() {
  try {
    const courses = await getCourses();
    console.log(courses);
  } catch (err) {
    console.error("โหลดคอร์สไม่ได้:", err.message);
  }
}`,
              explanation: "Fetch API: GET, POST, PATCH, DELETE พร้อม error handling และ auth header",
            },
          ],
        },
        {
          slug: "js-error-handling",
          title: "Error Handling",
          isFree: false,
          duration: 12,
          content: `# Error Handling — จัดการข้อผิดพลาดอย่างมืออาชีพ

## สิ่งที่คุณจะเรียนรู้
- try/catch/finally — โครงสร้างพื้นฐาน
- Error types: TypeError, ReferenceError, SyntaxError, RangeError
- throw custom errors
- Async error handling
- Error handling patterns ที่ใช้ในโปรเจกต์จริง

---

## try / catch / finally

\`try/catch/finally\` คือโครงสร้างหลักในการจัดการข้อผิดพลาด ลองนึกภาพเหมือนการ "ลอง" ทำอะไรบางอย่าง ถ้าพลาดก็ "จับ" ปัญหาแล้วจัดการ และ "สุดท้าย" ทำความสะอาดเสมอ

\`\`\`javascript
function divideNumbers(a, b) {
  try {
    // โค้ดที่อาจเกิด error
    if (b === 0) throw new Error("ไม่สามารถหารด้วย 0 ได้");
    if (typeof a !== "number" || typeof b !== "number") {
      throw new TypeError("ต้องใช้ตัวเลขเท่านั้น");
    }
    return a / b;
  } catch (error) {
    // จัดการ error
    console.error("เกิดข้อผิดพลาด:", error.message);
    return null;
  } finally {
    // ทำเสมอ ไม่ว่าสำเร็จหรือล้มเหลว
    console.log("divideNumbers เสร็จแล้ว");
  }
}

console.log(divideNumbers(10, 2));   // 5
console.log(divideNumbers(10, 0));   // null (error ถูก catch)
console.log(divideNumbers("a", 2));  // null (TypeError)
\`\`\`

---

## Error Types ที่ Built-in

JavaScript มี Error types หลายชนิด การรู้จัก type จะช่วย debug ได้เร็วขึ้น:

\`\`\`javascript
// TypeError — ใช้ค่าผิดประเภท
try {
  null.name;  // Cannot read property 'name' of null
} catch (e) {
  console.log(e instanceof TypeError);  // true
  console.log(e.name);    // "TypeError"
  console.log(e.message); // "Cannot read properties of null..."
}

// ReferenceError — ใช้ตัวแปรที่ไม่ประกาศ
try {
  console.log(undeclaredVariable);
} catch (e) {
  console.log(e instanceof ReferenceError);  // true
}

// SyntaxError — syntax ผิด (มักเกิดตอน parse ไม่ใช่ runtime)
try {
  JSON.parse("invalid json{");
} catch (e) {
  console.log(e instanceof SyntaxError);  // true
}

// RangeError — ค่าอยู่นอกขอบเขต
try {
  new Array(-1);  // Invalid array length
} catch (e) {
  console.log(e instanceof RangeError);  // true
}

// เช็ค type ด้วย instanceof
function handleError(error) {
  if (error instanceof TypeError) {
    console.log("ประเภทข้อมูลผิด");
  } else if (error instanceof RangeError) {
    console.log("ค่าอยู่นอกขอบเขต");
  } else {
    console.log("เกิดข้อผิดพลาดทั่วไป");
  }
}
\`\`\`

---

## Custom Error Classes — Error ที่ปรับแต่งได้

สร้าง Custom Error เพื่อ categorize errors และใส่ข้อมูลเพิ่มเติม

\`\`\`javascript
// Base custom error
class AppError extends Error {
  constructor(message, code) {
    super(message);
    this.name = "AppError";
    this.code = code;
    // Fix stack trace ใน V8
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AppError);
    }
  }
}

// Specific error types
class ValidationError extends AppError {
  constructor(field, message) {
    super(message, "VALIDATION_ERROR");
    this.name = "ValidationError";
    this.field = field;
  }
}

class ApiError extends AppError {
  constructor(message, statusCode) {
    super(message, "API_ERROR");
    this.name = "ApiError";
    this.statusCode = statusCode;
  }
}

class NotFoundError extends ApiError {
  constructor(resource) {
    super(\`ไม่พบ \${resource}\`, 404);
    this.name = "NotFoundError";
  }
}

// ใช้งาน
function validateUser(userData) {
  if (!userData.email) {
    throw new ValidationError("email", "กรุณาใส่ email");
  }
  if (!userData.email.includes("@")) {
    throw new ValidationError("email", "รูปแบบ email ไม่ถูกต้อง");
  }
  if (userData.password.length < 8) {
    throw new ValidationError("password", "รหัสผ่านต้องมีอย่างน้อย 8 ตัว");
  }
}

async function getUser(id) {
  const user = await db.find(id);
  if (!user) throw new NotFoundError(\`User ID \${id}\`);
  return user;
}

// จัดการ errors ตาม type
async function handleRequest(userId, userData) {
  try {
    validateUser(userData);
    const user = await getUser(userId);
    return user;
  } catch (error) {
    if (error instanceof ValidationError) {
      return { error: error.message, field: error.field };
    }
    if (error instanceof NotFoundError) {
      return { error: error.message, status: 404 };
    }
    if (error instanceof ApiError) {
      return { error: error.message, status: error.statusCode };
    }
    // Unexpected error — log และ re-throw
    console.error("Unexpected error:", error);
    throw error;
  }
}
\`\`\`

> 💡 **Tip:** สร้าง error hierarchy ที่ชัดเจน: base class → category → specific error ทำให้จัดการ error ได้ flexible — \`catch (e instanceof AppError)\` ครอบทุก custom error

---

## Async Error Handling

\`\`\`javascript
// try/catch กับ async/await
async function fetchAndProcess(id) {
  let data;
  try {
    const response = await fetch(\`/api/data/\${id}\`);

    if (!response.ok) {
      throw new ApiError(\`HTTP \${response.status}\`, response.status);
    }

    data = await response.json();
    return processData(data);

  } catch (error) {
    if (error instanceof ApiError && error.statusCode === 404) {
      return null;  // ไม่พบข้อมูล คืน null แทน throw
    }
    // error อื่นๆ re-throw
    throw error;
  } finally {
    setLoading(false);
  }
}

// Promise .catch() สำหรับ handle error ท้าย chain
fetchData()
  .then(process)
  .then(display)
  .catch((error) => {
    showErrorMessage(error.message);
  });

// ระวัง: unhandled promise rejection
// ❌ Promise ที่ไม่มี .catch() หรือ try/catch
fetch("/api/data");  // ถ้า fail จะ unhandled rejection

// ✅ เสมอมี error handling
fetch("/api/data")
  .then(r => r.json())
  .catch(console.error);
\`\`\`

> ⚠️ **ข้อควรระวัง:** ทุก Promise ต้องมี error handling ไม่ว่าจะเป็น \`.catch()\` หรือ \`try/catch\` กับ await ถ้าไม่มี จะเกิด UnhandledPromiseRejection warning และอาจ crash application

---

## สรุป

Error Handling ที่ดีทำให้แอปแข็งแกร่งและผู้ใช้ไม่เห็นหน้าขาว จุดสำคัญคือ ใช้ \`try/catch/finally\` สำหรับทุก operation ที่อาจผิดพลาด, สร้าง Custom Error classes เพื่อ categorize errors, เช็ค \`instanceof\` เพื่อจัดการแต่ละประเภท, และอย่าลืม error handling ใน async code`,
          codeExamples: [
            {
              title: "Error Handling Pattern",
              language: "javascript",
              code: `// Custom error classes
class ApiError extends Error {
  constructor(message, status, code) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
  }
}

class ValidationError extends Error {
  constructor(field, message) {
    super(message);
    this.name = "ValidationError";
    this.field = field;
  }
}

// ใช้ error handling
async function login(email, password) {
  // Validation
  if (!email.includes("@")) {
    throw new ValidationError("email", "รูปแบบอีเมลไม่ถูกต้อง");
  }
  if (password.length < 8) {
    throw new ValidationError("password", "รหัสผ่านต้องมีอย่างน้อย 8 ตัว");
  }

  try {
    const response = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    if (response.status === 401) {
      throw new ApiError("อีเมลหรือรหัสผ่านไม่ถูกต้อง", 401, "INVALID_CREDENTIALS");
    }
    if (!response.ok) {
      throw new ApiError("เกิดข้อผิดพลาด", response.status, "SERVER_ERROR");
    }

    return response.json();
  } catch (error) {
    if (error instanceof ApiError) {
      // จัดการ API error
      showAlert(error.message);
    } else if (error instanceof ValidationError) {
      // จัดการ validation error
      showFieldError(error.field, error.message);
    } else {
      // Network error หรืออื่นๆ
      console.error("Unexpected error:", error);
    }
    throw error;  // re-throw ให้ caller จัดการต่อ
  }
}`,
              explanation: "Custom error classes, try/catch, error instanceof, re-throw pattern",
            },
          ],
        },
        {
          slug: "js-modules",
          title: "Modules",
          isFree: false,
          duration: 12,
          content: `# JavaScript Modules — แบ่งโค้ดอย่างมีระเบียบ

## สิ่งที่คุณจะเรียนรู้
- Named Exports vs Default Export — ต่างกันอย่างไร
- Import ทุกรูปแบบ
- Re-exporting (Barrel exports)
- Dynamic import() สำหรับ lazy loading
- Module scope และทำไม Modules สำคัญ

---

## ทำไม Modules สำคัญ?

ก่อนมี Modules ทุกอย่างอยู่ใน global scope — ตัวแปรซ้อนทับกัน, ไฟล์ script ต้องเรียงลำดับให้ถูก, code reuse ยาก ลองนึกภาพเหมือนออฟฟิศที่พนักงานทุกคนแชร์โต๊ะเดียวกันและแฟ้มเอกสารปนกันหมด — เข้าใจยากและหาของไม่เจอ

Modules คือการให้แต่ละไฟล์มี "scope ของตัวเอง" แชร์เฉพาะสิ่งที่ต้องการ export/import

\`\`\`javascript
// ปัญหาก่อน Modules
var user = "สมชาย";  // global!

// library อื่นก็ประกาศ var user = ...
// ทับกัน!

// หลัง Modules — แต่ละไฟล์มี scope ของตัวเอง
// utils.js
const helper = "ใช้ได้แค่ใน utils.js";  // ไม่รั่วออกไป
export const publicHelper = "ใช้ได้นอกไฟล์";  // export เท่านั้น
\`\`\`

---

## Named Exports — Export หลายอย่างจากไฟล์เดียว

\`\`\`javascript
// === utils/math.js ===

// Export ตรงๆ
export function add(a, b) { return a + b; }
export function subtract(a, b) { return a - b; }
export const PI = 3.14159265;

// หรือ export รวมท้ายไฟล์
function multiply(a, b) { return a * b; }
function divide(a, b) {
  if (b === 0) throw new Error("ไม่สามารถหารด้วย 0");
  return a / b;
}
export { multiply, divide };

// Export พร้อม rename
export { multiply as times, divide as dividedBy };
\`\`\`

\`\`\`javascript
// === main.js ===

// Import เฉพาะที่ต้องการ (Tree shaking เอาส่วนที่ไม่ใช้ออก)
import { add, PI } from "./utils/math.js";
console.log(add(2, 3));  // 5
console.log(PI);         // 3.14159265

// Import ทั้งหมดเป็น namespace
import * as Math from "./utils/math.js";
console.log(Math.add(2, 3));  // 5
console.log(Math.PI);         // 3.14159265

// Import พร้อม rename (เพื่อหลีกเลี่ยง conflict)
import { add as sum } from "./utils/math.js";
\`\`\`

---

## Default Export — Export หลักของไฟล์

ใช้เมื่อไฟล์มีสิ่งหลักอยู่หนึ่งอย่าง เช่น class หรือ function หลัก แต่ละไฟล์มี default export ได้แค่ 1 อย่าง

\`\`\`javascript
// === services/api.js ===
class ApiService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async get(path) {
    const response = await fetch(\`\${this.baseUrl}\${path}\`);
    if (!response.ok) throw new Error(\`HTTP \${response.status}\`);
    return response.json();
  }

  async post(path, data) {
    const response = await fetch(\`\${this.baseUrl}\${path}\`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error(\`HTTP \${response.status}\`);
    return response.json();
  }
}

export default ApiService;

// === main.js ===
import ApiService from "./services/api.js";  // ตั้งชื่ออะไรก็ได้

const api = new ApiService("https://api.example.com");
const users = await api.get("/users");
\`\`\`

> 💡 **Tip:** ใช้ Named Exports สำหรับ utility functions, constants, และ types ใช้ Default Export สำหรับ "สิ่งหลัก" ของไฟล์ เช่น component, class, หรือ function หลัก

---

## Barrel Exports — Index ที่สะดวก

Barrel export คือการรวม exports ทั้งหมดไว้ใน index.js เพื่อให้ import ได้จากที่เดียว

\`\`\`javascript
// === utils/format.js ===
export function formatDate(date) {
  return new Intl.DateTimeFormat("th-TH").format(new Date(date));
}
export function formatCurrency(amount) {
  return new Intl.NumberFormat("th-TH", {
    style: "currency", currency: "THB",
  }).format(amount);
}

// === utils/validation.js ===
export const isEmail = (str) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str);
export const isPhone = (str) => /^0[0-9]{9}$/.test(str);
export const isRequired = (val) => val !== null && val !== undefined && val !== "";

// === utils/index.js (Barrel) ===
export * from "./format.js";        // re-export ทั้งหมด
export * from "./validation.js";

// หรือ re-export แบบเลือก
export { formatDate } from "./format.js";

// === main.js ===
// Import จาก barrel แทนที่จะ import ทีละไฟล์
import { formatDate, formatCurrency, isEmail } from "./utils/index.js";
// สั้นกว่า:
// import { formatDate } from "./utils/format.js";
// import { isEmail } from "./utils/validation.js";
\`\`\`

---

## Dynamic Import — Lazy Loading

Dynamic import โหลด module ตอน runtime เมื่อต้องการจริงๆ ช่วยให้ initial load เร็วขึ้น

\`\`\`javascript
// Static import — โหลดตอนเริ่มต้นเสมอ
import { HeavyChart } from "./heavy-chart.js";

// Dynamic import — โหลดเมื่อต้องการจริงๆ
document.querySelector("#showChart").addEventListener("click", async () => {
  // โหลด module เมื่อคลิกปุ่มครั้งแรก
  const { HeavyChart } = await import("./heavy-chart.js");
  const chart = new HeavyChart(data);
  chart.render("#chart-container");
});

// Conditional import
async function loadLocale(lang) {
  // โหลด translation ตามภาษาที่เลือก
  const translations = await import(\`./locales/\${lang}.js\`);
  return translations.default;
}

const thaiTranslations = await loadLocale("th");

// Route-based code splitting (React/Vue pattern)
const AdminPanel = lazy(() => import("./AdminPanel.js"));
\`\`\`

> ⚠️ **ข้อควรระวัง:** ต้องใช้ HTTP server เมื่อใช้ ES Modules ใน browser (ไม่ทำงานจาก file:// protocol) และต้องใส่ \`type="module"\` ใน script tag: \`<script type="module" src="app.js">\`

---

## สรุป

Modules ทำให้โค้ด JavaScript จัดระเบียบได้ดีขึ้น ไม่มีปัญหา global scope ปนกัน และ tree shakeable ใช้ Named Exports สำหรับ utilities, Default Export สำหรับสิ่งหลักของไฟล์, Barrel exports สำหรับ clean API, และ Dynamic import สำหรับ lazy loading เพื่อ performance`,
          codeExamples: [
            {
              title: "Module System ตัวอย่างจริง",
              language: "javascript",
              code: `// --- utils/format.js ---
export function formatCurrency(amount, currency = "THB") {
  return new Intl.NumberFormat("th-TH", {
    style: "currency",
    currency,
  }).format(amount);
}

export function formatDate(date) {
  return new Intl.DateTimeFormat("th-TH", {
    dateStyle: "medium",
  }).format(new Date(date));
}

export const DATE_FORMAT = "dd/MM/yyyy";

// --- utils/validation.js ---
export const isEmail = (str) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str);
export const isPhone = (str) => /^0[0-9]{9}$/.test(str);

// --- utils/index.js (barrel export) ---
export * from "./format.js";
export * from "./validation.js";

// --- main.js ---
import { formatCurrency, formatDate, isEmail } from "./utils/index.js";

console.log(formatCurrency(1500));    // ฿1,500.00
console.log(isEmail("test@test.com")); // true

// Dynamic import (code splitting)
document.querySelector("#heavy").addEventListener("click", async () => {
  const { Chart } = await import("./heavy-chart-library.js");
  new Chart(data);
});`,
              explanation: "Named exports, barrel exports, dynamic import",
            },
          ],
        },
        {
          slug: "js-oop",
          title: "OOP",
          isFree: false,
          duration: 20,
          content: `# Object-Oriented Programming — เขียนโค้ดด้วย Classes

## สิ่งที่คุณจะเรียนรู้
- Class syntax และ constructor
- Methods และ this
- Inheritance ด้วย extends
- super() เรียก parent constructor/method
- Private fields (#) สำหรับซ่อนข้อมูล
- Static methods
- เมื่อไหร่ควรใช้ OOP

---

## Class คืออะไร?

**Class** คือ "แบบพิมพ์" สำหรับสร้าง objects ที่มีโครงสร้างเดียวกัน ลองนึกภาพ class เหมือนแบบแปลนบ้าน — จากแบบแปลนเดียว สร้างบ้านได้หลายหลัง แต่ละหลังเป็น instance ที่แยกกัน

ใน JavaScript, class เป็น **syntactic sugar** เหนือ prototype-based inheritance — หมายความว่า class ทำงานโดยใช้ prototype เหมือนเดิม แค่ syntax อ่านง่ายขึ้น

\`\`\`javascript
// สร้าง class
class Person {
  // constructor — ทำงานเมื่อ new Person()
  constructor(name, age) {
    this.name = name;     // public property
    this.age = age;
    this.createdAt = new Date();
  }

  // Method
  greet() {
    return \`สวัสดี ฉันชื่อ \${this.name} อายุ \${this.age} ปี\`;
  }

  // Getter — เรียกเหมือน property
  get info() {
    return \`\${this.name} (\${this.age})\`;
  }

  // Setter
  set ageProp(value) {
    if (value < 0) throw new Error("อายุต้องไม่ติดลบ");
    this.age = value;
  }

  // toString — เรียกอัตโนมัติเมื่อแปลงเป็น string
  toString() {
    return this.greet();
  }
}

// สร้าง instance
const person1 = new Person("สมชาย", 25);
const person2 = new Person("สมหญิง", 22);

console.log(person1.greet());  // "สวัสดี ฉันชื่อ สมชาย อายุ 25 ปี"
console.log(person1.info);    // "สมชาย (25)"
console.log(person1 instanceof Person);  // true
\`\`\`

---

## Private Fields (#) — ซ่อนข้อมูล

Private fields ประกาศด้วย \`#\` — เข้าถึงได้เฉพาะภายใน class เท่านั้น

\`\`\`javascript
class BankAccount {
  #balance;        // private field
  #transactions;   // private field
  #owner;

  constructor(owner, initialBalance = 0) {
    this.#owner = owner;
    this.#balance = initialBalance;
    this.#transactions = [];
  }

  // Public methods เป็น interface สำหรับเข้าถึง private data
  deposit(amount) {
    if (amount <= 0) throw new Error("จำนวนเงินต้องมากกว่า 0");
    this.#balance += amount;
    this.#logTransaction("deposit", amount);
    return this;  // return this เพื่อ method chaining
  }

  withdraw(amount) {
    if (amount > this.#balance) throw new Error("ยอดเงินไม่เพียงพอ");
    this.#balance -= amount;
    this.#logTransaction("withdraw", amount);
    return this;
  }

  // Private method
  #logTransaction(type, amount) {
    this.#transactions.push({ type, amount, date: new Date() });
  }

  get balance() { return this.#balance; }
  get statement() { return [...this.#transactions]; }  // copy
  get owner() { return this.#owner; }
}

const account = new BankAccount("สมชาย", 1000);
account.deposit(500).withdraw(200);  // method chaining

console.log(account.balance);      // 1300
// account.#balance = 9999;        // ❌ SyntaxError: private field
// console.log(account.#balance);  // ❌ Error
\`\`\`

---

## Inheritance — สืบทอดด้วย extends

\`\`\`javascript
// Base class
class Animal {
  constructor(name, sound) {
    this.name = name;
    this.sound = sound;
  }

  speak() {
    return \`\${this.name} ร้องว่า "\${this.sound}"\`;
  }

  toString() {
    return \`Animal: \${this.name}\`;
  }
}

// Derived class
class Dog extends Animal {
  #tricks = [];  // private

  constructor(name) {
    super(name, "โฮ่ง!");  // เรียก parent constructor ก่อน!
    this.type = "dog";
  }

  // Override method (Polymorphism)
  speak() {
    return \`\${super.speak()} (และโดดกระโดด!)\`;
    // super.speak() เรียก method ของ parent
  }

  learnTrick(trick) {
    this.#tricks.push(trick);
    return this;
  }

  performTricks() {
    if (this.#tricks.length === 0) return \`\${this.name} ยังไม่รู้ท่า\`;
    return \`\${this.name} ทำ: \${this.#tricks.join(", ")}\`;
  }
}

class Cat extends Animal {
  constructor(name) {
    super(name, "เมี้ยว");
    this.type = "cat";
  }

  speak() {
    return \`\${this.name} ร้องเบาๆ ว่า "เมี้ยว..."\`;
  }
}

const dog = new Dog("บัดดี้");
dog.learnTrick("นั่ง").learnTrick("ยืน").learnTrick("กลิ้ง");

console.log(dog.speak());          // "บัดดี้ ร้องว่า "โฮ่ง!" (และโดดกระโดด!)"
console.log(dog.performTricks());  // "บัดดี้ ทำ: นั่ง, ยืน, กลิ้ง"
console.log(dog instanceof Dog);   // true
console.log(dog instanceof Animal); // true (inheritance)

const cat = new Cat("มิ้ว");
console.log(cat.speak());  // "มิ้ว ร้องเบาๆ ว่า "เมี้ยว...""

// Polymorphism
const animals = [dog, cat, new Animal("นก", "จิ้บๆ")];
animals.forEach(a => console.log(a.speak()));  // method ชื่อเดียวกัน ทำต่างกัน
\`\`\`

---

## Static Methods — ไม่ต้องสร้าง instance

\`\`\`javascript
class MathHelper {
  // Static methods — เรียกจาก class โดยตรง ไม่ต้อง new
  static add(a, b) { return a + b; }
  static multiply(a, b) { return a * b; }

  static clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  // Static factory method — สร้าง instance แบบต่างๆ
  static createRange(start, end) {
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }
}

// เรียกโดยไม่ต้อง new
console.log(MathHelper.add(2, 3));           // 5
console.log(MathHelper.clamp(150, 0, 100));  // 100
console.log(MathHelper.createRange(1, 5));   // [1, 2, 3, 4, 5]
\`\`\`

> 💡 **Tip:** ใช้ OOP เมื่อ: มีหลาย instances ที่มี state และ behavior เหมือนกัน, มี inheritance ที่ชัดเจน, หรือต้องการ encapsulation เพื่อซ่อน implementation detail ไม่ต้องใช้ class กับทุกอย่าง — functions ธรรมดาก็ใช้ได้ดีในหลายกรณี

---

## สรุป

OOP ใน JavaScript ใช้ class syntax ที่อ่านง่าย สิ่งสำคัญที่ต้องรู้คือ constructor สำหรับ initialize, private fields (#) สำหรับ encapsulation, extends และ super() สำหรับ inheritance, และ static methods สำหรับ utility functions ที่ไม่ต้องการ instance`,
          codeExamples: [
            {
              title: "OOP: Class, Inheritance, Polymorphism",
              language: "javascript",
              code: `// Base class
class User {
  #password;  // private field

  constructor(name, email, password) {
    this.name = name;
    this.email = email;
    this.#password = this.#hash(password);
    this.createdAt = new Date();
  }

  #hash(password) {
    // simplified hash
    return btoa(password);
  }

  getProfile() {
    return { name: this.name, email: this.email };
  }

  toString() {
    return \`User: \${this.name} <\${this.email}>\`;
  }
}

// Inheritance
class Student extends User {
  #enrollments = [];

  constructor(name, email, password) {
    super(name, email, password);  // เรียก parent constructor
    this.role = "student";
  }

  enroll(course) {
    this.#enrollments.push({ course, enrolledAt: new Date() });
  }

  // Override method (Polymorphism)
  getProfile() {
    return {
      ...super.getProfile(),  // เรียก parent method
      role: this.role,
      enrollmentCount: this.#enrollments.length,
    };
  }
}

class Instructor extends User {
  constructor(name, email, password, specialty) {
    super(name, email, password);
    this.role = "instructor";
    this.specialty = specialty;
  }

  getProfile() {
    return { ...super.getProfile(), role: this.role, specialty: this.specialty };
  }
}

// ใช้งาน
const student = new Student("สมชาย", "s@email.com", "pass123");
student.enroll("HTML");
student.enroll("CSS");
console.log(student.getProfile());

const instructor = new Instructor("อาจารย์ สมศักดิ์", "i@email.com", "pass456", "JavaScript");
console.log(instructor.getProfile());

// Polymorphism
const users = [student, instructor];
users.forEach(u => console.log(u.getProfile()));  // เรียก method ชื่อเดียวกัน`,
              explanation: "OOP: class, private fields, inheritance, super, method override, polymorphism",
            },
          ],
        },
        {
          slug: "js-functional",
          title: "Functional Programming",
          isFree: false,
          duration: 15,
          content: `# Functional Programming — เขียนโค้ดด้วยแนวคิด Functions

## สิ่งที่คุณจะเรียนรู้
- Pure Functions — ฟังก์ชันที่คาดเดาได้
- Immutability — ไม่เปลี่ยนแปลงข้อมูลเดิม
- Higher-Order Functions — functions ที่ทรงพลัง
- Function Composition (pipe/compose)
- map/filter/reduce แบบ functional
- หลีกเลี่ยง side effects

---

## Pure Functions — รากฐานของ FP

**Pure Function** คือฟังก์ชันที่: (1) ให้ output เดิมเสมอเมื่อได้รับ input เดิม, (2) ไม่มี side effects (ไม่เปลี่ยนแปลงอะไรนอก function)

\`\`\`javascript
// ✅ Pure Functions — ทดสอบง่าย, คาดเดาได้, debug ง่าย
const add = (a, b) => a + b;
const formatName = (first, last) => \`\${first} \${last}\`;
const calculateTax = (price, rate) => price * rate;
const isAdult = (age) => age >= 18;

// ❌ Impure Functions — มี side effects
let taxRate = 0.07;  // global state

// อ่าน global variable — ผลลัพธ์เปลี่ยนถ้า taxRate เปลี่ยน
const calculateTaxImpure = (price) => price * taxRate;

// แก้ไข argument (mutation)
const addItemImpure = (cart, item) => {
  cart.push(item);  // แก้ไข cart เดิม!
  return cart;
};

// ✅ Pure version
const addItemPure = (cart, item) => [...cart, item];  // สร้าง array ใหม่

// ทำไม pure functions ดี?
console.log(add(2, 3));  // 5 เสมอ
console.log(add(2, 3));  // 5 เสมอ
// ทดสอบง่าย: input → output ที่รู้ล่วงหน้า
\`\`\`

> 💡 **Tip:** Rule of thumb: ถ้า function ของคุณยาก unit test อาจเป็นเพราะ impure ลอง refactor ให้รับ dependencies เป็น parameter แทนที่จะเข้าถึง global

---

## Immutability — ไม่เปลี่ยนแปลงข้อมูลเดิม

Immutability คือการ "ไม่แก้ไขข้อมูลเดิม แต่สร้างข้อมูลใหม่เสมอ" ทำให้ state changes ชัดเจน ป้องกัน bugs จาก shared state

\`\`\`javascript
// ❌ Mutable — แก้ไขข้อมูลเดิม
const student = { name: "สมชาย", score: 80 };
student.score = 90;  // แก้ไข object เดิม!

const scores = [80, 90, 70];
scores.push(85);  // แก้ไข array เดิม!

// ✅ Immutable — สร้างใหม่เสมอ
const student2 = { name: "สมชาย", score: 80 };
const updatedStudent = { ...student2, score: 90 };  // สร้าง object ใหม่

const scores2 = [80, 90, 70];
const newScores = [...scores2, 85];  // สร้าง array ใหม่

// ตัวอย่างจริง: update nested object อย่าง immutable
const state = {
  user: { name: "สมชาย", address: { city: "กรุงเทพ" } },
  loading: false,
};

// ❌ แบบ mutable
state.user.address.city = "เชียงใหม่";

// ✅ แบบ immutable
const newState = {
  ...state,
  user: {
    ...state.user,
    address: { ...state.user.address, city: "เชียงใหม่" },
  },
};

// ทดสอบว่า immutable สำเร็จ
console.log(state.user.address.city);     // "กรุงเทพ" (ไม่เปลี่ยน!)
console.log(newState.user.address.city);  // "เชียงใหม่"
\`\`\`

---

## Higher-Order Functions — Functions ที่ทรงพลัง

Higher-Order Function (HOF) คือ function ที่ รับ function เป็น argument และ/หรือ return function

\`\`\`javascript
// Array HOFs ที่ใช้บ่อย
const students = [
  { name: "สมชาย", score: 85, active: true },
  { name: "สมหญิง", score: 92, active: true },
  { name: "สมศักดิ์", score: 45, active: false },
];

// map — แปลงทุกตัว
const names = students.map(s => s.name);
const withGrades = students.map(s => ({
  ...s,
  grade: s.score >= 80 ? "A" : s.score >= 70 ? "B" : "C",
}));

// filter — กรอง
const active = students.filter(s => s.active);
const passed = students.filter(s => s.score >= 60);

// reduce — รวมเป็นค่าเดียว
const total = students.reduce((sum, s) => sum + s.score, 0);
const byName = students.reduce((map, s) => ({
  ...map,
  [s.name]: s,
}), {});

// Chain methods
const result = students
  .filter(s => s.active)
  .map(s => ({ ...s, grade: s.score >= 80 ? "A" : "B" }))
  .sort((a, b) => b.score - a.score);

// สร้าง HOF เอง
function withLogging(fn) {
  return function(...args) {
    console.log(\`เรียก \${fn.name}(\${args.join(", ")})\`);
    const start = Date.now();
    const result = fn(...args);
    console.log(\`ใช้เวลา \${Date.now() - start}ms\`);
    return result;
  };
}

const timedAdd = withLogging((a, b) => a + b);
timedAdd(2, 3);  // เรียก (2, 3) → ใช้เวลา 0ms → 5
\`\`\`

---

## Function Composition — รวม Functions เข้าด้วยกัน

\`\`\`javascript
// Compose — ใช้จากขวาไปซ้าย (คณิตศาสตร์)
const compose = (...fns) => (x) => fns.reduceRight((v, f) => f(v), x);

// Pipe — ใช้จากซ้ายไปขวา (อ่านง่ายกว่า)
const pipe = (...fns) => (x) => fns.reduce((v, f) => f(v), x);

// ตัวอย่าง
const trim = (s) => s.trim();
const toLowerCase = (s) => s.toLowerCase();
const removeSpaces = (s) => s.replace(/\s+/g, "-");

// Compose ทีละ function
const createSlug = pipe(trim, toLowerCase, removeSpaces);
console.log(createSlug("  JavaScript Mastery  "));  // "javascript-mastery"

// ตัวอย่างจริง: process data pipeline
const processStudents = pipe(
  (students) => students.filter(s => s.active),       // กรองเฉพาะ active
  (students) => students.map(s => ({ ...s, score: s.score + 5 })),  // bonus
  (students) => students.sort((a, b) => b.score - a.score), // เรียง
  (students) => students.slice(0, 10),  // เอาแค่ top 10
);

const top10 = processStudents(students);
\`\`\`

---

## Currying — แบ่ง Arguments เป็นชั้นๆ

\`\`\`javascript
// Currying — แปลง f(a, b, c) เป็น f(a)(b)(c)
const multiply = (a) => (b) => a * b;
const double = multiply(2);    // return function
const triple = multiply(3);
const tenTimes = multiply(10);

console.log(double(5));    // 10
console.log(triple(5));    // 15
console.log(tenTimes(7));  // 70

// ใช้ประโยชน์จริง: reusable filter functions
const filterBy = (key) => (value) => (items) =>
  items.filter(item => item[key] === value);

const filterByActive = filterBy("active")(true);
const filterByRole = filterBy("role");

const activeStudents = filterByActive(students);
const instructors = filterByRole("instructor")(users);
\`\`\`

> ⚠️ **ข้อควรระวัง:** FP ที่ดีไม่ได้แปลว่าต้องใช้ทุก concept พร้อมกัน เริ่มจาก pure functions และ immutability ก่อน แล้วค่อยเพิ่ม HOF, composition, และ currying เมื่อเห็นว่าเหมาะสม

---

## สรุป

Functional Programming เสริมทักษะการเขียนโค้ดที่ test ง่าย, debug ง่าย, และ predictable จุดสำคัญคือ Pure Functions, Immutability, และ Higher-Order Functions (map/filter/reduce) ไม่ต้องทำทุกอย่างแบบ FP แต่การนำ concepts เหล่านี้มาผสมกับ JavaScript จะทำให้โค้ดมีคุณภาพดีขึ้นมาก`,
          codeExamples: [
            {
              title: "Functional Programming Patterns",
              language: "javascript",
              code: `// Pure functions + immutability
const students = [
  { name: "สมชาย", score: 85, active: true },
  { name: "สมหญิง", score: 92, active: true },
  { name: "สมศักดิ์", score: 45, active: false },
];

// แทน mutation ให้ใช้ map/filter/reduce
const passedStudents = students
  .filter(s => s.active && s.score >= 60)
  .map(s => ({ ...s, grade: s.score >= 80 ? "A" : "B" }))
  .sort((a, b) => b.score - a.score);

// Higher-Order Functions
const withLogging = (fn) => (...args) => {
  console.log(\`เรียก \${fn.name} ด้วย\`, args);
  const result = fn(...args);
  console.log(\`ผลลัพธ์:\`, result);
  return result;
};
const loggedAdd = withLogging((a, b) => a + b);
loggedAdd(3, 4);

// Currying
const filterBy = (key) => (value) => (arr) =>
  arr.filter(item => item[key] === value);

const filterByActive = filterBy("active")(true);
console.log(filterByActive(students));

// Compose functions
const pipe = (...fns) => (x) => fns.reduce((v, f) => f(v), x);

const processStudents = pipe(
  students => students.filter(s => s.active),
  students => students.map(s => ({ ...s, score: s.score + 5 })),  // bonus
  students => students.sort((a, b) => b.score - a.score),
);
console.log(processStudents(students));`,
              explanation: "Pure functions, immutability, HOF, currying, function composition",
            },
          ],
        },
        {
          slug: "js-event-loop",
          title: "Event Loop",
          isFree: false,
          duration: 18,
          content: `# Event Loop — หัวใจของ JavaScript Async

## สิ่งที่คุณจะเรียนรู้
- Call Stack ทำงานอย่างไร
- Web APIs คืออะไร
- Callback Queue (Macrotask Queue)
- Microtask Queue และทำไมสำคัญกว่า
- setTimeout(fn, 0) ทำงานอย่างไร
- ทำไม Promises resolve ก่อน setTimeout
- Visualizing the flow

---

## Event Loop คืออะไร?

JavaScript เป็น **single-thread** — ทำงานทีละอย่าง แต่สามารถจัดการงาน async ได้ผ่านกลไกที่เรียกว่า **Event Loop**

ลองนึกภาพ Event Loop เหมือนพนักงานออฟฟิศคนเดียว (JavaScript) ที่จัดการทุกอย่าง: มีโต๊ะทำงาน (Call Stack) สำหรับงานปัจจุบัน, มี inbox (Queues) สำหรับงานที่รอ และมีผู้ช่วย (Web APIs) ที่รับงานไปทำแทนแล้วส่งกลับเมื่อเสร็จ

---

## ส่วนประกอบของ Event Loop

### 1. Call Stack — กอง Function Calls

Call Stack ทำงานแบบ LIFO (Last In, First Out) เหมือนกองจาน — วางจากบน กินจากบน

\`\`\`javascript
function c() {
  console.log("C");  // 3. C ถูก push ใน stack → รัน → pop
}

function b() {
  c();  // 2. b เรียก c
  console.log("B");  // 4. กลับมารัน B
}

function a() {
  b();  // 1. a เรียก b
  console.log("A");  // 5. กลับมารัน A
}

a();
// Stack: [a] → [a, b] → [a, b, c] → [a, b] → [a] → []
// Output: C, B, A
\`\`\`

### 2. Web APIs — ผู้ช่วยทำงาน Background

Web APIs คือ browser ที่รับงานจาก JavaScript ไปทำแทน เช่น:
- \`setTimeout\` → timer API
- \`fetch\` → network API
- \`addEventListener\` → event API

เมื่อ Web API ทำงานเสร็จ จะส่ง callback ไปยัง Queue

### 3. Queues — คิวรอทำงาน

มี 2 queue:
- **Microtask Queue** — สำหรับ Promises (.then), queueMicrotask → **สำคัญกว่า**
- **Macrotask Queue (Callback Queue)** — สำหรับ setTimeout, setInterval, events

---

## ลำดับการทำงาน

\`\`\`javascript
// ตัวอย่างคลาสสิกสำหรับสัมภาษณ์
console.log("1");  // synchronous → รันก่อน

setTimeout(() => {
  console.log("2");  // macrotask → รันหลังสุด
}, 0);

Promise.resolve()
  .then(() => console.log("3"))  // microtask → รันก่อน macrotask
  .then(() => console.log("4")); // microtask → รันต่อ

queueMicrotask(() => console.log("5"));  // microtask

console.log("6");  // synchronous → รันก่อน

// Output: 1, 6, 3, 4, 5, 2

// อธิบาย:
// รอบที่ 1: sync code รัน: 1, 6
// รอบที่ 2: Microtask queue ว่าง call stack: 3, 4, 5
// รอบที่ 3: Macrotask queue: 2
\`\`\`

\`\`\`javascript
// async/await กับ Event Loop
async function example() {
  console.log("A");       // sync
  await Promise.resolve();
  console.log("B");       // microtask (หลัง await)
}

console.log("start");
example();
console.log("end");

// Output: start, A, end, B
// เพราะ "await" หยุดชั่วคราวและยอมให้ sync code ("end") รันก่อน
\`\`\`

> 💡 **Tip:** Microtask Queue ถูก drain ให้ว่างเสมอก่อนที่ Event Loop จะไปทำ Macrotask ถัดไป ดังนั้น Promises ทั้งหมดจะ resolve ก่อน setTimeout ทุกครั้ง

---

## setTimeout(fn, 0) — ไม่ใช่ "ทันที"!

\`\`\`javascript
// setTimeout(fn, 0) ไม่ได้รันทันที
// แค่บอกว่า "รอจนกว่า call stack ว่าง แล้วค่อยทำ"

console.log("ก่อน");

setTimeout(() => {
  console.log("setTimeout 0ms");
}, 0);

// loop นี้ block call stack นาน
for (let i = 0; i < 1000000; i++) {}

console.log("หลัง");

// Output: ก่อน, หลัง, setTimeout 0ms
// setTimeout รอจนกว่า call stack ว่างจริงๆ

// ใช้ setTimeout(0) สำหรับ defer งาน
function doAfterRender(callback) {
  setTimeout(callback, 0);  // รอให้ UI render ก่อน แล้วค่อยทำ
}
\`\`\`

---

## Visualizing the Flow

\`\`\`javascript
// ดู Event Loop ทำงานแบบ step-by-step
console.log("Step 1: Sync start");

fetch("/api/data")              // Web API รับไปทำ background
  .then(r => r.json())         // callback รอใน Microtask Queue
  .then(data => {
    console.log("Step 4: fetch data arrived:", data);
  });

setTimeout(() => {
  console.log("Step 5: setTimeout fired");
}, 100);

Promise.resolve("immediate")
  .then(val => {
    console.log("Step 3: Promise resolved:", val);
  });

console.log("Step 2: Sync end");

// Output (โดยประมาณ):
// Step 1: Sync start
// Step 2: Sync end
// Step 3: Promise resolved: immediate
// Step 4: fetch data arrived: {...}  (ถ้า fetch เสร็จก่อน 100ms)
// Step 5: setTimeout fired
\`\`\`

> ⚠️ **ข้อควรระวัง:** หลีกเลี่ยงการ block Call Stack ด้วย heavy synchronous computation (เช่น loop ใหญ่, JSON.parse ข้อมูลใหญ่) เพราะจะทำให้ UI หยุดตอบสนอง ใช้ Web Workers สำหรับงาน heavy computation

---

## สรุป

Event Loop คือกลไกที่ทำให้ JavaScript ทำงาน async ได้แม้เป็น single-thread ลำดับคือ synchronous code ก่อน → Microtask Queue (Promises) → Macrotask Queue (setTimeout) ความเข้าใจนี้ช่วยอธิบายพฤติกรรมที่ดูแปลกของ async code และเป็นหัวข้อสัมภาษณ์ระดับ Senior ที่ถามบ่อยมาก!`,
          codeExamples: [
            {
              title: "Event Loop: ลำดับการทำงาน",
              language: "javascript",
              code: `console.log("1 - Start");  // sync

setTimeout(() => console.log("2 - setTimeout 0ms"), 0);  // macrotask

Promise.resolve()
  .then(() => console.log("3 - Promise 1"))   // microtask
  .then(() => console.log("4 - Promise 2"));  // microtask

queueMicrotask(() => console.log("5 - queueMicrotask"));  // microtask

console.log("6 - End");  // sync

// Output:
// 1 - Start
// 6 - End
// 3 - Promise 1
// 4 - Promise 2
// 5 - queueMicrotask
// 2 - setTimeout 0ms

// อธิบาย:
// 1. "Start" และ "End" รันก่อน (synchronous)
// 2. Microtasks (Promise, queueMicrotask) รันก่อน macrotask
// 3. setTimeout รันหลังสุด แม้ delay = 0

// ตัวอย่างที่พบบ่อยใน interview:
async function test() {
  console.log("A");
  await Promise.resolve();
  console.log("B");
}
test();
console.log("C");
// Output: A, C, B
// เพราะ await หยุดชั่วคราวและรัน "C" ก่อน แล้วค่อยกลับมาทำ "B"`,
              explanation: "Event Loop: call stack, microtask queue, macrotask queue, execution order",
            },
          ],
        },
        {
          slug: "js-prototype",
          title: "Prototype Chain",
          isFree: false,
          duration: 15,
          content: `# Prototype Chain — รากฐาน Inheritance ของ JavaScript

## สิ่งที่คุณจะเรียนรู้
- ทุก Object มี Prototype
- Prototype Chain Lookup — JS หา property ยังไง
- Object.prototype คืออะไร
- __proto__ vs prototype property
- Prototype-based inheritance vs Class syntax
- Classes เป็น Syntactic Sugar

---

## ทุก Object มี Prototype

ใน JavaScript ทุก object มี internal link ที่ชื่อว่า \`[[Prototype]]\` ที่ชี้ไปยัง object อีกตัว เมื่อ JavaScript ต้องการ property หรือ method ที่ไม่มีใน object ปัจจุบัน มันจะ "ปีนขึ้น" ไปหาใน prototype

ลองนึกภาพ Prototype Chain เหมือนสายตระกูล — ถ้าลูกไม่มีทักษะบางอย่าง ก็ "ค้นหา" จากพ่อแม่ ปู่ย่า ไปเรื่อยๆ จนกว่าจะเจอหรือหมดสาย

\`\`\`javascript
// ทุก object มีเข้าถึง methods ของ Object.prototype
const user = { name: "สมชาย" };

// methods เหล่านี้มาจาก Object.prototype ไม่ใช่ user เอง
console.log(user.toString());         // "[object Object]"
console.log(user.hasOwnProperty("name")); // true
console.log(user.valueOf() === user); // true

// เช็ค prototype chain
console.log(Object.getPrototypeOf(user) === Object.prototype); // true
console.log(Object.getPrototypeOf(Object.prototype));          // null (จุดสิ้นสุด)
\`\`\`

---

## Prototype Chain Lookup

เมื่อ JavaScript พยายามเข้าถึง property มันจะหาตามลำดับนี้:

1. ใน object เอง (own properties)
2. ใน \`[[Prototype]]\` ของ object (ชั้น 1)
3. ใน \`[[Prototype]]\` ของ prototype (ชั้น 2)
4. ... ไปเรื่อยๆ จนถึง \`Object.prototype\`
5. ถ้าไม่เจอเลย คืน \`undefined\`

\`\`\`javascript
// สร้าง prototype chain ด้วย Object.create
const animal = {
  breathe() { return "หายใจ"; },
  eat() { return "กิน"; },
};

const dog = Object.create(animal);  // dog มี animal เป็น prototype
dog.bark = function() { return "โฮ่ง!"; };

const myDog = Object.create(dog);  // myDog มี dog เป็น prototype
myDog.name = "บัดดี้";

// Lookup chain:
console.log(myDog.name);     // "บัดดี้" (own property)
console.log(myDog.bark());   // "โฮ่ง!" (จาก dog prototype)
console.log(myDog.breathe());// "หายใจ" (จาก animal prototype)
console.log(myDog.fly);      // undefined (ไม่มีใน chain เลย)

// chain: myDog → dog → animal → Object.prototype → null
\`\`\`

---

## __proto__ vs prototype property

มักสร้างความสับสน แต่ต่างกันชัดเจน:

\`\`\`javascript
// prototype property — อยู่ใน Constructor Functions
// คือ object ที่ instances จะได้รับเป็น [[Prototype]]

function Animal(name) {
  this.name = name;  // own property
}

// เพิ่ม method ใน prototype (ทุก instance แชร์กัน ประหยัด memory)
Animal.prototype.speak = function() {
  return \`\${this.name} ร้อง\`;
};

Animal.prototype.breathe = function() {
  return "หายใจ";
};

const cat = new Animal("แมว");
const dog = new Animal("หมา");

console.log(cat.speak());  // "แมว ร้อง"
console.log(dog.speak());  // "หมา ร้อง"

// __proto__ — prototype ของ instance (ไม่แนะนำใช้โดยตรง)
console.log(cat.__proto__ === Animal.prototype);  // true
console.log(dog.__proto__ === Animal.prototype);  // true
// ทั้ง cat และ dog แชร์ Animal.prototype เดียวกัน!

// วิธีที่แนะนำกว่า
console.log(Object.getPrototypeOf(cat) === Animal.prototype);  // true

// ตรวจสอบ own vs inherited
console.log(cat.hasOwnProperty("name"));   // true (own)
console.log(cat.hasOwnProperty("speak"));  // false (prototype)
\`\`\`

---

## Class Syntax เป็น Syntactic Sugar

Class ที่เราใช้ใน ES6+ ไม่ได้เปลี่ยน prototype system เลย แค่ทำให้ syntax อ่านง่ายขึ้น

\`\`\`javascript
// Class syntax
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    return \`\${this.name} ร้อง\`;
  }
}

class Dog extends Animal {
  bark() {
    return "โฮ่ง!";
  }
}

// เบื้องหลัง: ยังเป็น prototype
const dog = new Dog("บัดดี้");
console.log(typeof Dog);                             // "function" (ยังเป็น function!)
console.log(dog.__proto__ === Dog.prototype);        // true
console.log(Dog.prototype.__proto__ === Animal.prototype);  // true
console.log(dog instanceof Dog);                     // true
console.log(dog instanceof Animal);                  // true (prototype chain)

// เทียบกับ prototype-based แบบเก่า
// ทั้งสองทำงานเหมือนกัน แค่ class อ่านง่ายกว่า
function AnimalOld(name) { this.name = name; }
AnimalOld.prototype.speak = function() { return this.name + " ร้อง"; };

function DogOld(name) { AnimalOld.call(this, name); }
DogOld.prototype = Object.create(AnimalOld.prototype);
DogOld.prototype.constructor = DogOld;
DogOld.prototype.bark = function() { return "โฮ่ง!"; };
\`\`\`

---

## hasOwnProperty และ Object.hasOwn

\`\`\`javascript
const obj = { a: 1, b: 2 };
Object.prototype.extra = "จาก prototype";

// for...in วน own + inherited
for (const key in obj) {
  console.log(key);  // a, b, extra (รวม extra จาก prototype!)
}

// กรองเฉพาะ own properties
for (const key in obj) {
  if (Object.hasOwn(obj, key)) {  // Modern (ES2022)
    console.log(key);  // a, b เท่านั้น
  }
}

// Object.keys ใช้แค่ own properties โดยอัตโนมัติ
console.log(Object.keys(obj));  // ["a", "b"]
\`\`\`

> 💡 **Tip:** ในโค้ดสมัยใหม่ใช้ class syntax ดีกว่าเพราะอ่านง่าย แต่ต้องเข้าใจ prototype เพราะมันคือ mechanism จริงๆ เบื้องหลัง เมื่อ debug หรือใช้ library เก่าจะได้เข้าใจ

> ⚠️ **ข้อควรระวัง:** อย่าแก้ไข \`Object.prototype\` โดยตรง (เช่น \`Object.prototype.myMethod = ...\`) เพราะจะส่งผลต่อทุก object ในโปรแกรม

---

## สรุป

Prototype Chain คือ mechanism พื้นฐานของ inheritance ใน JavaScript ทุก object มี prototype ที่เป็น chain ไปถึง \`Object.prototype\` Class syntax เป็นแค่ syntactic sugar เหนือ prototype system เข้าใจ prototype จะช่วย debug ได้ดีกว่าและเข้าใจ JavaScript อย่างลึกซึ้ง`,
          codeExamples: [
            {
              title: "Prototype Chain",
              language: "javascript",
              code: `// ทุก object มี prototype
const obj = { name: "สมชาย" };
console.log(obj.toString());   // inherited จาก Object.prototype

// Prototype chain
function Animal(name) {
  this.name = name;
}
Animal.prototype.speak = function() {
  return \`\${this.name} ร้อง\`;
};

const cat = new Animal("แมว");
console.log(cat.speak());          // "แมว ร้อง"
console.log(cat.hasOwnProperty("name"));   // true (own)
console.log(cat.hasOwnProperty("speak"));  // false (prototype)

// Prototype chain
console.log(cat.__proto__ === Animal.prototype);  // true
console.log(Animal.prototype.__proto__ === Object.prototype);  // true
console.log(Object.prototype.__proto__);  // null (end of chain)

// Class syntax เป็นแค่ syntactic sugar ของ prototype
class Dog {
  constructor(name) { this.name = name; }
  bark() { return \`\${this.name} หอน!\`; }
}
const d = new Dog("หมา");
console.log(d.__proto__ === Dog.prototype);  // true
console.log(typeof Dog);  // "function"`,
              explanation: "Prototype chain: __proto__, prototype property, hasOwnProperty",
            },
          ],
        },
        {
          slug: "js-memory",
          title: "Memory Management",
          isFree: false,
          duration: 15,
          content: `# Memory Management — จัดการหน่วยความจำใน JavaScript

## สิ่งที่คุณจะเรียนรู้
- Stack vs Heap Memory
- Garbage Collection (Mark and Sweep)
- Common Memory Leaks 4 ประเภทหลัก
- วิธีป้องกัน Memory Leaks
- WeakMap และ WeakRef สำหรับ weak references

---

## Stack vs Heap Memory

JavaScript ใช้หน่วยความจำ 2 ส่วนหลัก ลองนึกภาพ Stack เหมือน "โต๊ะทำงาน" ที่เล็กแต่เข้าถึงได้รวดเร็ว และ Heap เหมือน "คลังสินค้า" ที่ใหญ่แต่ต้องใช้ reference เพื่อเข้าถึง

### Stack — เร็ว, ขนาดจำกัด, LIFO
\`\`\`javascript
// Primitive values เก็บใน Stack โดยตรง
let a = 10;        // Stack: a = 10
let b = a;         // Stack: b = 10 (copy ค่า)
b = 20;
console.log(a);    // 10 (a ไม่เปลี่ยน เพราะ copy ค่า)

// Stack เก็บ References ไปยัง Heap
let obj1 = { x: 1 };  // Stack: obj1 = address_001
let obj2 = obj1;       // Stack: obj2 = address_001 (copy reference)
obj2.x = 99;
console.log(obj1.x);   // 99 (เปลี่ยนเพราะชี้ที่เดียวกัน!)
\`\`\`

### Heap — ขนาดยืดหยุ่น, ช้ากว่า
\`\`\`javascript
// Objects และ Arrays เก็บใน Heap
const user = { name: "สมชาย", scores: [85, 92, 78] };
const bigArray = new Array(1000000).fill(0);  // ใช้ Heap มาก

// Function เก็บใน Heap ด้วย
const fn = function() { return 42; };

// เข้าถึง Heap ผ่าน reference
console.log(user.name);  // reference → Heap → "สมชาย"
\`\`\`

---

## Garbage Collection — Mark and Sweep

JavaScript จัดการ memory อัตโนมัติด้วย **Garbage Collector (GC)** — ไม่ต้อง free memory เอง GC ใช้ algorithm **Mark and Sweep**:

1. **Mark** — เริ่มจาก "roots" (global, call stack) และ mark ทุก object ที่ reach ได้
2. **Sweep** — ลบทุก object ที่ไม่ถูก mark (ไม่มีใครชี้ถึง)

\`\`\`javascript
// Object จะถูก GC เมื่อไม่มีใคร reference ถึงแล้ว
function createTemp() {
  let bigData = new Array(1000000).fill("data");
  return bigData.length;  // return แค่ความยาว
}

const length = createTemp();
// หลังจาก createTemp() คืนค่า
// bigData ไม่มีใคร reference แล้ว → GC จะเก็บคืน memory

// Circular reference — GC สมัยใหม่จัดการได้
let a = {};
let b = {};
a.ref = b;
b.ref = a;
a = null;
b = null;
// ทั้ง a และ b ไม่สามารถ reach จาก root ได้ → GC เก็บคืน ✅
\`\`\`

> 💡 **Tip:** เราไม่ control GC ได้โดยตรง แต่สามารถช่วย GC ได้โดยการ null ตัวแปรเมื่อไม่ต้องการ, remove event listeners, และ clear intervals

---

## Memory Leaks ที่พบบ่อย

### 1. Global Variables

\`\`\`javascript
// ❌ Global variable สะสม memory ตลอด
function processData(data) {
  results = [];  // ลืม var/let/const — กลายเป็น global!
  for (const item of data) {
    results.push(transform(item));
  }
}

// ✅ ใช้ local variable เสมอ
function processData(data) {
  const results = [];  // local → GC เก็บคืนหลังฟังก์ชันจบ
  for (const item of data) {
    results.push(transform(item));
  }
  return results;
}
\`\`\`

### 2. Event Listeners ที่ไม่ Remove

\`\`\`javascript
// ❌ Memory Leak: เพิ่ม listener ทุกครั้งที่เรียก setupButton()
function setupButton() {
  const btn = document.querySelector("#btn");
  btn.addEventListener("click", () => {
    console.log("คลิก");
  });
  // ถ้าเรียก setupButton() 100 ครั้ง = 100 listeners!
}

// ✅ วิธีที่ 1: named function + removeEventListener
function handleClick() { console.log("คลิก"); }

function setupButton() {
  const btn = document.querySelector("#btn");
  btn.removeEventListener("click", handleClick);  // ลบก่อน
  btn.addEventListener("click", handleClick);
}

// ✅ วิธีที่ 2: AbortController
function setupButton() {
  const controller = new AbortController();
  document.querySelector("#btn").addEventListener("click", () => {
    console.log("คลิก");
  }, { signal: controller.signal });

  return () => controller.abort();  // cleanup function
}

const cleanup = setupButton();
// เมื่อไม่ต้องการ:
cleanup();
\`\`\`

### 3. Closures ที่เก็บ Reference ใหญ่

\`\`\`javascript
// ❌ Closure เก็บ reference ถึง bigData แม้ไม่ต้องการ
function createProcessor() {
  const bigData = new Array(1000000).fill("x");

  return function() {
    // ใช้แค่ความยาว แต่ closure เก็บทั้ง bigData!
    return bigData.length;
  };
}

// ✅ ดึงเฉพาะที่ต้องการ
function createProcessor() {
  const bigData = new Array(1000000).fill("x");
  const length = bigData.length;  // เก็บแค่ค่า
  // bigData จะถูก GC หลังจากนี้ (ไม่มีใน closure)

  return function() {
    return length;
  };
}
\`\`\`

### 4. setInterval ที่ไม่ Clear

\`\`\`javascript
// ❌ setInterval ที่วิ่งตลอด
function startPolling() {
  setInterval(async () => {
    const data = await fetchUpdates();
    updateUI(data);
  }, 5000);
  // ถ้าเรียก startPolling() หลายครั้ง = หลาย intervals!
}

// ✅ เก็บ ID และ clear เมื่อไม่ต้องการ
let pollInterval = null;

function startPolling() {
  if (pollInterval) clearInterval(pollInterval);  // clear ก่อน
  pollInterval = setInterval(async () => {
    const data = await fetchUpdates();
    updateUI(data);
  }, 5000);
}

function stopPolling() {
  if (pollInterval) {
    clearInterval(pollInterval);
    pollInterval = null;
  }
}
\`\`\`

---

## WeakMap และ WeakRef — Weak References

\`WeakMap\` และ \`WeakSet\` เก็บ references แบบ "อ่อน" — ถ้า object ไม่มีใคร reference แล้ว GC สามารถเก็บคืนได้แม้จะยังอยู่ใน WeakMap

\`\`\`javascript
// WeakMap — ใช้กับ private data per-instance
const privateData = new WeakMap();

class SecureUser {
  constructor(name, password) {
    privateData.set(this, { password });  // เก็บ private data
    this.name = name;
  }

  checkPassword(input) {
    return privateData.get(this).password === input;
  }
}

const user = new SecureUser("สมชาย", "secret123");
// เมื่อ user ถูก GC, privateData entry จะถูกลบด้วยอัตโนมัติ!

// WeakRef — อ้างถึง object แบบอ่อน
let target = { name: "temporary data" };
const weakRef = new WeakRef(target);

// อ่านค่า (ต้องเช็คว่ายังมีอยู่ไหม)
console.log(weakRef.deref()?.name);  // "temporary data"

target = null;  // ปล่อย strong reference
// GC อาจเก็บคืน target แล้ว
console.log(weakRef.deref());  // อาจเป็น undefined
\`\`\`

> ⚠️ **ข้อควรระวัง:** Memory leaks ใน browser มักไม่แสดงให้เห็นชัด แต่ทำให้แอปช้าลงเรื่อยๆ ใช้ Chrome DevTools Memory tab เพื่อ record heap snapshots และหา leaks

---

## สรุป

Memory Management ใน JavaScript ส่วนใหญ่ทำโดย GC อัตโนมัติ แต่นักพัฒนาต้องระวัง memory leaks โดยเฉพาะ: ลบ event listeners เมื่อไม่ต้องการ, clear intervals, หลีกเลี่ยง global variables, และระวัง closures ที่เก็บ reference ใหญ่โดยไม่จำเป็น`,
          codeExamples: [
            {
              title: "Memory Leaks และวิธีป้องกัน",
              language: "javascript",
              code: `// ❌ Memory Leak: Event listener ไม่ remove
function setupModal() {
  const btn = document.querySelector("#openModal");
  btn.addEventListener("click", openModal);  // ถ้าเรียกซ้ำ listener จะ stack
}

// ✅ ป้องกัน: ใช้ AbortController หรือ removeEventListener
function setupModal() {
  const controller = new AbortController();

  document.querySelector("#openModal").addEventListener(
    "click",
    openModal,
    { signal: controller.signal }
  );

  // cleanup
  return () => controller.abort();
}

// ❌ Memory Leak: Closure เก็บ reference ใหญ่
function processLargeData() {
  const bigData = new Array(1000000).fill("data");

  return function() {
    // bigData ถูกเก็บอยู่แม้ไม่ได้ใช้
    return bigData.length;
  };
}

// ✅ ป้องกัน: ดึงแค่ที่ต้องการ
function processLargeData() {
  const bigData = new Array(1000000).fill("data");
  const length = bigData.length;  // เก็บแค่ค่า
  // bigData จะถูก GC หลังจากนี้

  return function() {
    return length;
  };
}

// ❌ setInterval ไม่ clear
const timer = setInterval(() => { updateUI(); }, 1000);

// ✅ clear เมื่อไม่ต้องการ
const timerId = setInterval(() => { updateUI(); }, 1000);
// เมื่อ component unmount:
clearInterval(timerId);`,
              explanation: "Memory leaks: event listeners, closures, setInterval — prevention patterns",
            },
          ],
        },
      ],
    },
  ];

  for (const sec of sections) {
    const section = await prisma.section.create({
      data: { courseId, title: sec.title, order: sec.order },
    });
    for (let li = 0; li < sec.lessons.length; li++) {
      const l = sec.lessons[li];
      const lesson = await prisma.lesson.create({
        data: {
          sectionId: section.id,
          slug: l.slug,
          title: l.title,
          content: l.content,
          isFree: l.isFree,
          duration: l.duration,
          order: li + 1,
          type: "TEXT",
          isPublished: true,
        },
      });
      for (let ci = 0; ci < l.codeExamples.length; ci++) {
        const ex = l.codeExamples[ci];
        await prisma.codeExample.create({
          data: {
            lessonId: lesson.id,
            title: ex.title,
            code: ex.code,
            language: ex.language,
            explanation: ex.explanation,
            order: ci + 1,
          },
        });
      }
    }
    await prisma.course.update({
      where: { id: courseId },
      data: { totalLessons: { increment: sec.lessons.length } },
    });
  }
  console.log("  ✅ Seeded: JavaScript Mastery (22 lessons)");
}

async function seedAssignments() {
  console.log("  📝 Seeding: Assignments...");

  const assignments: {
    lessonSlug: string;
    title: string;
    description: string;
    language: string;
    starterCode: string;
    expectedOutput: string;
    hints: string;
  }[] = [
    {
      lessonSlug: "html-forms",
      title: "สร้างฟอร์มลงทะเบียน",
      description: `## โจทย์: สร้างฟอร์มลงทะเบียนบัญชีผู้ใช้

สร้าง HTML Form สำหรับลงทะเบียนบัญชีผู้ใช้ที่มีฟิลด์ต่อไปนี้:
1. ชื่อ-นามสกุล (text, required)
2. อีเมล (email, required)
3. รหัสผ่าน (password, required, min 8 ตัว)
4. เลือกอาชีพ (select: นักเรียน, นักศึกษา, โปรแกรมเมอร์, อื่นๆ)
5. ยอมรับข้อตกลง (checkbox, required)
6. ปุ่ม "สมัครสมาชิก"

### เกณฑ์การให้คะแนน:
- ใช้ semantic form elements ถูกต้อง (40 คะแนน)
- มี label สำหรับทุก input (30 คะแนน)
- มี validation attributes ครบ (30 คะแนน)`,
      language: "html",
      starterCode: `<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8">
  <title>ลงทะเบียน</title>
  <style>
    body { font-family: sans-serif; max-width: 400px; margin: 40px auto; padding: 0 20px; }
    .form-group { margin-bottom: 16px; }
    label { display: block; margin-bottom: 4px; font-weight: bold; }
    input, select { width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px; }
    button { width: 100%; padding: 12px; background: #4f46e5; color: white; border: none; border-radius: 4px; cursor: pointer; }
  </style>
</head>
<body>
  <h1>สมัครสมาชิก</h1>
  <form>
    <!-- เพิ่ม form fields ที่นี่ -->

  </form>
</body>
</html>`,
      expectedOutput: `ฟอร์มที่มีครบทุกฟิลด์: ชื่อ, อีเมล, รหัสผ่าน, select อาชีพ, checkbox ข้อตกลง, และปุ่ม submit`,
      hints: JSON.stringify([
        "ใช้ <label for='id'> และ <input id='id'> ให้ตรงกัน",
        "Email input ใช้ type='email' ให้ browser validate อัตโนมัติ",
        "Password ใช้ type='password' และ minlength='8'",
        "Checkbox ใช้ <input type='checkbox' required>",
        "Select dropdown ใช้ <select> กับ <option> หลายตัว",
      ]),
    },
    {
      lessonSlug: "css-flexbox",
      title: "สร้าง Navigation Bar ด้วย Flexbox",
      description: `## โจทย์: Navigation Bar ด้วย CSS Flexbox

สร้าง Navigation Bar ที่:
1. Logo อยู่ซ้ายสุด
2. Menu links อยู่ตรงกลาง (Home, Courses, About, Contact)
3. ปุ่ม "เข้าสู่ระบบ" อยู่ขวาสุด
4. พื้นหลังสีเข้ม ข้อความสีขาว
5. Responsive: บน mobile ซ้อนแนวตั้ง

### เกณฑ์:
- ใช้ Flexbox ถูกต้อง (40 คะแนน)
- Layout ถูกต้อง logo-center-button (40 คะแนน)
- Responsive (20 คะแนน)`,
      language: "html",
      starterCode: `<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Navbar</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }

    .navbar {
      background: #1e1b4b;
      padding: 0 24px;
      height: 64px;
      /* เพิ่ม flexbox ที่นี่ */
    }

    .logo {
      color: white;
      font-size: 1.5rem;
      font-weight: bold;
      text-decoration: none;
    }

    .nav-links {
      list-style: none;
      /* เพิ่ม flexbox ที่นี่ */
    }

    .nav-links a {
      color: rgba(255,255,255,0.8);
      text-decoration: none;
      padding: 0 12px;
    }

    .btn-login {
      background: #4f46e5;
      color: white;
      padding: 8px 20px;
      border-radius: 8px;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <nav class="navbar">
    <a href="#" class="logo">TeachCode</a>
    <ul class="nav-links">
      <li><a href="#">หน้าแรก</a></li>
      <li><a href="#">คอร์ส</a></li>
      <li><a href="#">เกี่ยวกับ</a></li>
      <li><a href="#">ติดต่อ</a></li>
    </ul>
    <a href="#" class="btn-login">เข้าสู่ระบบ</a>
  </nav>
</body>
</html>`,
      expectedOutput: "Navbar ที่มี Logo ซ้าย, Menu กลาง, Login Button ขวา โดยใช้ Flexbox",
      hints: JSON.stringify([
        "ใช้ display: flex; align-items: center; บน .navbar",
        "justify-content: space-between จะช่วยแยก logo - menu - button",
        "หรือใช้ margin-left: auto บน .btn-login",
        "สำหรับ nav-links ใช้ display: flex เพื่อให้ items อยู่ในบรรทัดเดียว",
      ]),
    },
    {
      lessonSlug: "js-functions",
      title: "เขียน Utility Functions",
      description: `## โจทย์: เขียน JavaScript Utility Functions

เขียน 4 functions ต่อไปนี้:

1. **\`capitalize(str)\`** — แปลงตัวแรกของทุกคำเป็นพิมพ์ใหญ่
   - Input: \`"hello world"\` → Output: \`"Hello World"\`

2. **\`clamp(num, min, max)\`** — จำกัดตัวเลขให้อยู่ในช่วง [min, max]
   - Input: \`clamp(150, 0, 100)\` → Output: \`100\`

3. **\`groupBy(arr, key)\`** — จัดกลุ่ม array of objects ตาม key
   - Input: \`[{type:'A',...}, {type:'B',...}]\` → Output: \`{A:[...], B:[...]}\`

4. **\`debounce(fn, delay)\`** — ชะลอการเรียก function จนกว่าจะหยุด
   - เรียกซ้ำก่อน delay หมด ให้ reset timer

### เกณฑ์:
- capitalize ทำงานถูกต้อง (25 คะแนน)
- clamp ทำงานถูกต้อง (25 คะแนน)
- groupBy ทำงานถูกต้อง (25 คะแนน)
- debounce ทำงานถูกต้อง (25 คะแนน)`,
      language: "javascript",
      starterCode: `// 1. Capitalize
function capitalize(str) {
  // เขียนโค้ดที่นี่
}

// 2. Clamp
function clamp(num, min, max) {
  // เขียนโค้ดที่นี่
}

// 3. Group By
function groupBy(arr, key) {
  // เขียนโค้ดที่นี่
}

// 4. Debounce
function debounce(fn, delay) {
  // เขียนโค้ดที่นี่
}

// ทดสอบ
console.log(capitalize("hello world"));           // "Hello World"
console.log(clamp(150, 0, 100));                  // 100
console.log(clamp(-5, 0, 100));                   // 0

const users = [
  { name: "สมชาย", role: "admin" },
  { name: "สมหญิง", role: "student" },
  { name: "สมศักดิ์", role: "admin" },
];
console.log(groupBy(users, "role"));
// { admin: [{...}, {...}], student: [{...}] }

const debouncedLog = debounce((msg) => console.log(msg), 500);
debouncedLog("a");
debouncedLog("b");
debouncedLog("c"); // แสดงแค่ "c" หลัง 500ms`,
      expectedOutput: `Hello World\n100\n0\n{ admin: [{...},{...}], student: [{...}] }`,
      hints: JSON.stringify([
        "capitalize: ใช้ str.split(' ').map(word => word[0].toUpperCase() + word.slice(1)).join(' ')",
        "clamp: ใช้ Math.max(min, Math.min(max, num))",
        "groupBy: ใช้ reduce เพื่อสร้าง object และ push items ลงใน array",
        "debounce: ใช้ let timeout; clearTimeout(timeout); timeout = setTimeout(fn, delay)",
      ]),
    },
    {
      lessonSlug: "js-arrays",
      title: "จัดการข้อมูลนักเรียนด้วย Array Methods",
      description: `## โจทย์: ประมวลผลข้อมูลนักเรียน

มีข้อมูลนักเรียน ให้เขียนโค้ดเพื่อ:

1. หาคะแนนเฉลี่ยของทั้งชั้น
2. แสดงรายชื่อนักเรียนที่ผ่าน (คะแนน >= 50)
3. จัดอันดับนักเรียน 3 อันดับแรก
4. จัดกลุ่มตามเกรด (A: >=80, B: >=70, C: >=60, F: <60)
5. หาค่า statistics: max, min, sum

**ข้อกำหนด:** ใช้ Array methods (map, filter, reduce, sort) ห้ามใช้ for loop`,
      language: "javascript",
      starterCode: `const students = [
  { name: "สมชาย",   score: 85 },
  { name: "สมหญิง",  score: 92 },
  { name: "สมศักดิ์", score: 45 },
  { name: "สมใจ",    score: 73 },
  { name: "สมพงษ์",  score: 61 },
  { name: "สมปอง",   score: 88 },
  { name: "สมนึก",   score: 55 },
  { name: "สมบูรณ์", score: 78 },
];

// 1. คะแนนเฉลี่ย
const average = // เขียนโค้ดที่นี่
console.log("เฉลี่ย:", average.toFixed(2));

// 2. นักเรียนที่ผ่าน
const passed = // เขียนโค้ดที่นี่
console.log("ผ่าน:", passed.map(s => s.name));

// 3. Top 3
const top3 = // เขียนโค้ดที่นี่
console.log("Top 3:", top3);

// 4. จัดกลุ่มตามเกรด
const graded = // เขียนโค้ดที่นี่
console.log("เกรด:", graded);

// 5. Statistics
const stats = // เขียนโค้ดที่นี่
console.log("Stats:", stats);`,
      expectedOutput: `เฉลี่ย: 72.13\nผ่าน: ['สมชาย', 'สมหญิง', ...]\nTop 3: [{สมหญิง,92},{สมปอง,88},{สมชาย,85}]`,
      hints: JSON.stringify([
        "Average: ใช้ reduce เพื่อ sum แล้วหารด้วย length",
        "Passed: ใช้ filter(s => s.score >= 50)",
        "Top 3: ใช้ sort แล้ว slice(0, 3) — sort จะ mutate array ดังนั้น spread ก่อน [...students].sort()",
        "Graded: ใช้ reduce สร้าง object แล้วแบ่ง grade ด้วย if-else",
        "Stats: ใช้ Math.max(...students.map(s=>s.score)) หรือ reduce",
      ]),
    },
    {
      lessonSlug: "python-intro",
      title: "สร้างโปรแกรม Grade Calculator",
      description: `## โจทย์: Grade Calculator

เขียนโปรแกรม Python ที่:

1. รับจำนวนนักเรียน (n) จาก input
2. วนรับชื่อและคะแนนของแต่ละคน
3. แสดงผลลัพธ์:
   - คะแนนเฉลี่ย
   - คะแนนสูงสุดและต่ำสุด
   - รายชื่อนักเรียนพร้อมเกรด (A≥80, B≥70, C≥60, D≥50, F<50)
   - จำนวนนักเรียนที่ผ่านและตก

### ตัวอย่าง Input/Output:
\`\`\`
จำนวนนักเรียน: 3
ชื่อ: สมชาย
คะแนน: 85
ชื่อ: สมหญิง
คะแนน: 45
ชื่อ: สมศักดิ์
คะแนน: 72

--- ผลลัพธ์ ---
เฉลี่ย: 67.33
สูงสุด: สมชาย (85)
ต่ำสุด: สมหญิง (45)
สมชาย: A
สมหญิง: F
สมศักดิ์: B
ผ่าน: 2 คน | ตก: 1 คน
\`\`\``,
      language: "python",
      starterCode: `def get_grade(score):
    # เขียนฟังก์ชัน grade ที่นี่
    pass

def main():
    n = int(input("จำนวนนักเรียน: "))
    students = []

    for i in range(n):
        name = input("ชื่อ: ")
        score = float(input("คะแนน: "))
        students.append({"name": name, "score": score})

    # คำนวณและแสดงผล
    # เขียนโค้ดที่นี่

main()`,
      expectedOutput: `แสดงคะแนนเฉลี่ย, สูงสุด, ต่ำสุด, เกรดแต่ละคน, และจำนวนผ่าน/ตก`,
      hints: JSON.stringify([
        "get_grade: ใช้ if score >= 80: return 'A' elif score >= 70: return 'B' ...",
        "average: sum([s['score'] for s in students]) / len(students)",
        "max/min: ใช้ max(students, key=lambda s: s['score'])",
        "ผ่านคือ score >= 50 ใช้ sum(1 for s in students if s['score'] >= 50)",
      ]),
    },
    {
      lessonSlug: "html-semantic",
      title: "สร้าง Blog Post ด้วย Semantic HTML",
      description: `## โจทย์: Blog Post Page

สร้างหน้า Blog Post โดยใช้ Semantic HTML ให้ครบถ้วน:

### โครงสร้างที่ต้องมี:
- \`<header>\` — Logo + Navigation
- \`<main>\` — เนื้อหาหลัก
  - \`<article>\` — บทความ
    - \`<header>\` — หัวข้อ + metadata (วันที่, ผู้เขียน)
    - \`<section>\` — แต่ละส่วนของบทความ (อย่างน้อย 2 sections)
    - \`<footer>\` — tags + share
  - \`<aside>\` — Sidebar (related posts)
- \`<footer>\` — Footer ของหน้า
- ใช้ \`<time datetime="...">\` สำหรับวันที่
- ใช้ \`<figure>\` และ \`<figcaption>\` สำหรับรูปภาพ

### เกณฑ์:
- Semantic structure ถูกต้อง (50 คะแนน)
- ครบทุก element ที่กำหนด (30 คะแนน)
- มี alt text ทุกรูป (20 คะแนน)`,
      language: "html",
      starterCode: `<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>บทความ: เริ่มต้น HTML</title>
  <style>
    body { font-family: sans-serif; max-width: 1200px; margin: 0 auto; padding: 0 20px; }
    .layout { display: flex; gap: 32px; }
    main { flex: 1; }
    aside { width: 280px; }
  </style>
</head>
<body>
  <!-- เขียน semantic HTML ที่นี่ -->

</body>
</html>`,
      expectedOutput: `หน้า Blog Post ที่มีโครงสร้าง semantic HTML ครบถ้วน: header, main, article, aside, footer`,
      hints: JSON.stringify([
        "ใช้ <article> สำหรับบทความ ไม่ใช่ <div>",
        "<time datetime='2025-01-01'>1 มกราคม 2568</time> สำหรับวันที่",
        "<figure><img src='...' alt='...'><figcaption>คำอธิบายรูป</figcaption></figure>",
        "<aside> เหมาะกับ sidebar ที่ complement เนื้อหาหลัก",
        "article มี header และ footer ของตัวเองได้",
      ]),
    },
  ];

  for (const a of assignments) {
    const lesson = await prisma.lesson.findUnique({ where: { slug: a.lessonSlug } });
    if (!lesson) continue;
    await prisma.assignment.deleteMany({ where: { lessonId: lesson.id } });
    await prisma.assignment.create({
      data: {
        lessonId: lesson.id,
        title: a.title,
        description: a.description,
        language: a.language,
        starterCode: a.starterCode,
        expectedOutput: a.expectedOutput,
        hints: a.hints,
        maxScore: 100,
      },
    });
    console.log(`    ✅ Assignment: ${a.lessonSlug}`);
  }
  console.log("  ✅ Seeded: Assignments");
}

async function seedCourse(courseId: string, label: string, sections: { title: string; order: number; lessons: { slug: string; title: string; isFree: boolean; duration: number; content: string; codeExamples: { title: string; language: string; code: string; explanation: string }[] }[] }[]) {
  await prisma.section.deleteMany({ where: { courseId } });
  await prisma.course.update({ where: { id: courseId }, data: { totalLessons: 0 } });
  for (const sec of sections) {
    const section = await prisma.section.create({ data: { courseId, title: sec.title, order: sec.order } });
    for (let li = 0; li < sec.lessons.length; li++) {
      const l = sec.lessons[li];
      const lesson = await prisma.lesson.create({ data: { sectionId: section.id, slug: l.slug, title: l.title, content: l.content, isFree: l.isFree, duration: l.duration, order: li + 1, type: "TEXT", isPublished: true } });
      for (let ci = 0; ci < l.codeExamples.length; ci++) {
        const ex = l.codeExamples[ci];
        await prisma.codeExample.create({ data: { lessonId: lesson.id, title: ex.title, code: ex.code, language: ex.language, explanation: ex.explanation, order: ci + 1 } });
      }
    }
    await prisma.course.update({ where: { id: courseId }, data: { totalLessons: { increment: sec.lessons.length } } });
  }
  console.log(`  ✅ Seeded: ${label}`);
}

async function seedTypeScriptCourse(courseId: string) {
  console.log("  📘 Seeding: TypeScript...");
  await seedCourse(courseId, "TypeScript", [
    {
      title: "TypeScript พื้นฐาน", order: 1, lessons: [
        {
          slug: "ts-what-is", title: "TypeScript คืออะไร?", isFree: true, duration: 12,
          content: `# TypeScript คืออะไร?

TypeScript คือ JavaScript ที่มี **Type System** เพิ่มเข้ามา พัฒนาโดย Microsoft

## ทำไมต้องใช้ TypeScript?

- **Catch errors ก่อน runtime** — type errors จะโชว์ทันทีใน editor
- **IntelliSense ดีขึ้น** — autocomplete ฉลาดขึ้น
- **โค้ดอ่านง่ายขึ้น** — รู้ทันทีว่า function รับ/คืน อะไร
- **Refactor ปลอดภัยขึ้น** — เปลี่ยนชื่อ type compiler จะหา error ให้

## TypeScript vs JavaScript

\`\`\`
JavaScript: รู้ type ตอน runtime (อาจ crash)
TypeScript: รู้ type ตอน compile (จับ error ก่อน)
\`\`\`

## ติดตั้ง
\`\`\`bash
npm install -g typescript
tsc --version
\`\`\``,
          codeExamples: [{ title: "JS vs TS", language: "typescript", code: `// JavaScript — error ตอน runtime
function add(a, b) { return a + b; }
add("5", 3); // "53" ไม่ใช่ 8!

// TypeScript — error ทันทีใน editor
function add(a: number, b: number): number {
  return a + b;
}
add("5", 3); // Error: Argument of type 'string' is not assignable to parameter of type 'number'
add(5, 3);   // ✅ 8`, explanation: "TypeScript จับ type error ก่อน runtime" }]
        },
        {
          slug: "ts-types", title: "Types & Interfaces", isFree: true, duration: 18,
          content: `# Types & Interfaces

## Primitive Types
\`\`\`ts
let name: string = "สมชาย";
let age: number = 25;
let active: boolean = true;
let nothing: null = null;
let notDefined: undefined = undefined;
\`\`\`

## Arrays & Tuples
\`\`\`ts
const nums: number[] = [1, 2, 3];
const pair: [string, number] = ["อายุ", 25]; // tuple — ลำดับสำคัญ
\`\`\`

## Type Alias
\`\`\`ts
type UserRole = "admin" | "student" | "instructor";
type Point = { x: number; y: number };
\`\`\`

## Interface
\`\`\`ts
interface User {
  id: string;
  name: string;
  email: string;
  role?: UserRole; // ? = optional
  readonly createdAt: Date; // readonly = ห้ามแก้
}
\`\`\`

## Type vs Interface
- **Interface**: extend ได้ เหมาะกับ object shapes
- **Type**: ยืดหยุ่นกว่า เหมาะกับ union types`,
          codeExamples: [{ title: "Types & Interfaces ครบชุด", language: "typescript", code: `// Union type
type Status = "active" | "inactive" | "banned";

// Interface
interface Course {
  id: string;
  title: string;
  price: number;
  status: Status;
  tags?: string[];
  readonly slug: string;
}

// Extend interface
interface PaidCourse extends Course {
  price: number; // override
  paymentMethods: string[];
}

// Type utility
type CoursePreview = Pick<Course, "id" | "title" | "slug">;
type PartialCourse = Partial<Course>; // ทุก field optional
type RequiredCourse = Required<Course>; // ทุก field required`, explanation: "Type alias, interface, extends, utility types" }]
        },
        {
          slug: "ts-generics", title: "Generics", isFree: false, duration: 18,
          content: `# Generics

Generics ทำให้ function/class ทำงานกับหลาย type โดยไม่เสีย type safety

## Generic Function
\`\`\`ts
function identity<T>(value: T): T {
  return value;
}
identity<string>("hello"); // type: string
identity<number>(42);      // type: number
\`\`\`

## Generic Constraint
\`\`\`ts
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
\`\`\`

## Generic Interface
\`\`\`ts
interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}
\`\`\``,
          codeExamples: [{ title: "Generics ในทางปฏิบัติ", language: "typescript", code: `// Generic API response
interface ApiResponse<T> {
  data: T;
  success: boolean;
  error?: string;
}

interface User { id: string; name: string; }
interface Course { id: string; title: string; }

// ใช้ generic
async function fetchData<T>(url: string): Promise<ApiResponse<T>> {
  const res = await fetch(url);
  return res.json();
}

const userRes = await fetchData<User>("/api/users/1");
userRes.data.name; // TypeScript รู้ว่าเป็น string

// Generic array utilities
function first<T>(arr: T[]): T | undefined {
  return arr[0];
}
function last<T>(arr: T[]): T | undefined {
  return arr[arr.length - 1];
}

const users: User[] = [{ id: "1", name: "สมชาย" }];
const firstUser = first(users); // type: User | undefined`, explanation: "Generic ApiResponse, generic functions" }]
        },
        {
          slug: "ts-advanced", title: "Advanced Types", isFree: false, duration: 20,
          content: `# Advanced Types

## Discriminated Unions
\`\`\`ts
type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "rect"; width: number; height: number };

function area(s: Shape): number {
  switch (s.kind) {
    case "circle": return Math.PI * s.radius ** 2;
    case "rect":   return s.width * s.height;
  }
}
\`\`\`

## Mapped Types
\`\`\`ts
type Readonly<T> = { readonly [K in keyof T]: T[K] };
type Optional<T> = { [K in keyof T]?: T[K] };
\`\`\`

## Conditional Types
\`\`\`ts
type IsString<T> = T extends string ? "yes" : "no";
type R1 = IsString<string>; // "yes"
type R2 = IsString<number>; // "no"
\`\`\`

## Template Literal Types
\`\`\`ts
type EventName = "click" | "focus" | "blur";
type Handler = \`on\${Capitalize<EventName>}\`; // "onClick" | "onFocus" | "onBlur"
\`\`\``,
          codeExamples: [{ title: "Advanced Types", language: "typescript", code: `// Discriminated union
type LoadingState<T> =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; error: string };

function render<T>(state: LoadingState<T>) {
  switch (state.status) {
    case "idle":    return "รอเริ่ม";
    case "loading": return "กำลังโหลด...";
    case "success": return state.data; // TypeScript รู้ว่ามี .data
    case "error":   return state.error; // รู้ว่ามี .error
  }
}

// Utility types
interface User { id: string; name: string; email: string; }
type CreateUserDTO = Omit<User, "id">;       // ไม่มี id
type UpdateUserDTO = Partial<Omit<User, "id">>; // ทุก field optional ยกเว้น id

// Record
const rolePermissions: Record<string, string[]> = {
  admin: ["read", "write", "delete"],
  student: ["read"],
};`, explanation: "Discriminated unions, Omit, Partial, Record" }]
        },
        {
          slug: "ts-with-react", title: "TypeScript กับ React", isFree: false, duration: 15,
          content: `# TypeScript กับ React

## Props Typing
\`\`\`ts
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: "primary" | "secondary";
  disabled?: boolean;
  children?: React.ReactNode;
}

function Button({ label, onClick, variant = "primary" }: ButtonProps) {
  return <button onClick={onClick} className={variant}>{label}</button>;
}
\`\`\`

## useState
\`\`\`ts
const [count, setCount] = useState<number>(0);
const [user, setUser] = useState<User | null>(null);
\`\`\`

## useRef
\`\`\`ts
const inputRef = useRef<HTMLInputElement>(null);
\`\`\`

## Event Types
\`\`\`ts
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {};
const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {};
\`\`\``,
          codeExamples: [{ title: "React Component พร้อม TypeScript", language: "typescript", code: `import React, { useState, useRef } from "react";

interface FormData { name: string; email: string; }

interface ContactFormProps {
  onSubmit: (data: FormData) => Promise<void>;
  initialValues?: Partial<FormData>;
}

export function ContactForm({ onSubmit, initialValues = {} }: ContactFormProps) {
  const [form, setForm] = useState<FormData>({
    name: initialValues.name ?? "",
    email: initialValues.email ?? "",
  });
  const [loading, setLoading] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try { await onSubmit(form); }
    finally { setLoading(false); }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input ref={nameRef} name="name" value={form.name} onChange={handleChange} />
      <input name="email" type="email" value={form.email} onChange={handleChange} />
      <button type="submit" disabled={loading}>{loading ? "กำลังส่ง..." : "ส่ง"}</button>
    </form>
  );
}`, explanation: "React component พร้อม TypeScript: props, state, events, ref" }]
        },
      ]
    }
  ]);
}

async function seedNextJSCourse(courseId: string) {
  console.log("  📘 Seeding: Next.js...");
  await seedCourse(courseId, "Next.js Full Stack", [
    {
      title: "Next.js พื้นฐาน", order: 1, lessons: [
        {
          slug: "nextjs-intro", title: "Next.js คืออะไร?", isFree: true, duration: 12,
          content: `# Next.js คืออะไร?

Next.js คือ React Framework ที่เพิ่ม features สำคัญเหนือ React:

## ฟีเจอร์หลัก
- **SSR** (Server-Side Rendering) — render HTML บน server ก่อนส่งให้ browser
- **SSG** (Static Site Generation) — generate HTML ตอน build time
- **ISR** (Incremental Static Regeneration) — regenerate static page ทีละหน้า
- **App Router** — routing ด้วย folder structure
- **API Routes** — เขียน backend ใน project เดียวกัน
- **Image Optimization** — \`<Image />\` component อัตโนมัติ

## SSR vs SSG vs ISR

| | SSR | SSG | ISR |
|---|---|---|---|
| HTML สร้างเมื่อ | ทุก request | Build time | Build + revalidate |
| ข้อมูล | Real-time | Static | Semi-fresh |
| เหมาะกับ | Dashboard, Auth pages | Blog, Docs | Product pages |`,
          codeExamples: [{ title: "Next.js App Router structure", language: "typescript", code: `// app/page.tsx — Home page (Server Component by default)
export default function HomePage() {
  return <h1>หน้าแรก</h1>;
}

// app/courses/page.tsx — /courses
export default function CoursesPage() {
  return <h1>คอร์สทั้งหมด</h1>;
}

// app/courses/[slug]/page.tsx — /courses/html
interface Props {
  params: { slug: string };
}
export default function CourseDetailPage({ params }: Props) {
  return <h1>คอร์ส: {params.slug}</h1>;
}

// app/api/hello/route.ts — /api/hello
import { NextResponse } from "next/server";
export function GET() {
  return NextResponse.json({ message: "สวัสดี!" });
}`, explanation: "Next.js App Router: pages, dynamic routes, API routes" }]
        },
        {
          slug: "nextjs-data-fetching", title: "Data Fetching", isFree: true, duration: 18,
          content: `# Data Fetching ใน Next.js

## Server Component Fetch (แนะนำ)
\`\`\`ts
// app/courses/page.tsx
async function getCourses() {
  const res = await fetch("https://api.example.com/courses", {
    next: { revalidate: 3600 } // ISR: revalidate ทุก 1 ชั่วโมง
  });
  return res.json();
}

export default async function CoursesPage() {
  const courses = await getCourses(); // fetch โดยตรงใน component!
  return <CourseList courses={courses} />;
}
\`\`\`

## Static Generation (SSG)
\`\`\`ts
export const dynamic = "force-static"; // cache ตลอด
\`\`\`

## Dynamic (SSR)
\`\`\`ts
export const dynamic = "force-dynamic"; // fetch ทุก request
\`\`\`

## generateStaticParams
\`\`\`ts
export async function generateStaticParams() {
  const courses = await getCourses();
  return courses.map(c => ({ slug: c.slug }));
}
\`\`\``,
          codeExamples: [{ title: "Server Component + Prisma fetch", language: "typescript", code: `// app/courses/page.tsx
import { prisma } from "@/lib/db";

// ดึงข้อมูลจาก DB โดยตรง — ไม่ต้องผ่าน API!
async function getCourses() {
  return prisma.course.findMany({
    where: { isPublished: true },
    orderBy: { order: "asc" },
    include: { _count: { select: { sections: true } } },
  });
}

export default async function CoursesPage() {
  const courses = await getCourses();

  return (
    <div>
      <h1>คอร์สทั้งหมด ({courses.length})</h1>
      <div className="grid grid-cols-3 gap-4">
        {courses.map(course => (
          <div key={course.id}>
            <h2>{course.title}</h2>
            <p>{course._count.sections} sections</p>
          </div>
        ))}
      </div>
    </div>
  );
}`, explanation: "Server Component ดึงข้อมูลจาก Prisma โดยตรง" }]
        },
        {
          slug: "nextjs-routing", title: "App Router & Routing", isFree: false, duration: 15,
          content: `# App Router

## File Conventions
\`\`\`
app/
├── layout.tsx      — shared layout
├── page.tsx        — /
├── loading.tsx     — loading UI
├── error.tsx       — error UI
├── not-found.tsx   — 404
├── courses/
│   ├── page.tsx    — /courses
│   └── [slug]/
│       └── page.tsx — /courses/:slug
└── (auth)/         — route group (ไม่ affect URL)
    ├── login/page.tsx
    └── register/page.tsx
\`\`\`

## Link & Navigation
\`\`\`tsx
import Link from "next/link";
import { useRouter } from "next/navigation";

// Link
<Link href="/courses">ดูคอร์ส</Link>

// Programmatic
const router = useRouter();
router.push("/dashboard");
router.replace("/login");
router.back();
\`\`\``,
          codeExamples: [{ title: "Layout + Loading + Error", language: "typescript", code: `// app/layout.tsx — Root layout
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

// app/courses/loading.tsx — แสดงขณะ fetch
export default function Loading() {
  return <div className="animate-pulse">กำลังโหลด...</div>;
}

// app/courses/error.tsx — แสดงเมื่อ error
"use client";
export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div>
      <p>เกิดข้อผิดพลาด: {error.message}</p>
      <button onClick={reset}>ลองใหม่</button>
    </div>
  );
}

// app/courses/not-found.tsx
export default function NotFound() {
  return <h1>ไม่พบคอร์สที่ต้องการ</h1>;
}`, explanation: "Next.js file conventions: layout, loading, error, not-found" }]
        },
        {
          slug: "nextjs-api-routes", title: "API Routes", isFree: false, duration: 15,
          content: `# API Routes ใน Next.js

API Routes ทำให้เขียน backend ใน Next.js project ได้เลย

## Route Handlers
\`\`\`ts
// app/api/courses/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q");
  return NextResponse.json({ courses: [] });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  // สร้าง course ใหม่
  return NextResponse.json({ success: true }, { status: 201 });
}
\`\`\`

## Dynamic Routes
\`\`\`ts
// app/api/courses/[id]/route.ts
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const course = await getCourse(params.id);
  if (!course) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(course);
}
\`\`\``,
          codeExamples: [{ title: "CRUD API Routes", language: "typescript", code: `// app/api/courses/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const courses = await prisma.course.findMany({
      where: { isPublished: true },
      orderBy: { order: "asc" },
    });
    return NextResponse.json({ success: true, data: courses });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const course = await prisma.course.create({ data: body });
    return NextResponse.json({ success: true, data: course }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Invalid data" }, { status: 400 });
  }
}

// app/api/courses/[id]/route.ts
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  await prisma.course.delete({ where: { id: params.id } });
  return NextResponse.json({ success: true });
}`, explanation: "CRUD API routes: GET, POST, DELETE พร้อม Prisma" }]
        },
        {
          slug: "nextjs-middleware", title: "Middleware & Auth", isFree: false, duration: 15,
          content: `# Middleware & Authentication

## Middleware
รันก่อนทุก request — เหมาะสำหรับ auth check, redirect, logging

\`\`\`ts
// middleware.ts (root level)
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const isAuthPage = req.nextUrl.pathname.startsWith("/login");
  const isProtected = req.nextUrl.pathname.startsWith("/dashboard");

  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  if (isAuthPage && token) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register"],
};
\`\`\``,
          codeExamples: [{ title: "JWT Middleware", language: "typescript", code: `// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const PROTECTED = ["/dashboard", "/profile", "/settings", "/lesson"];
const AUTH_PAGES = ["/login", "/register"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("accessToken")?.value;

  const isProtected = PROTECTED.some(p => pathname.startsWith(p));
  const isAuthPage = AUTH_PAGES.some(p => pathname.startsWith(p));

  if (isProtected) {
    if (!token) {
      const url = new URL("/login", req.url);
      url.searchParams.set("redirect", pathname);
      return NextResponse.redirect(url);
    }
    try {
      await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET!));
    } catch {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  if (isAuthPage && token) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = { matcher: ["/((?!api|_next|.*\\..*).*)"] };`, explanation: "JWT middleware: protect routes, redirect unauthenticated users" }]
        },
      ]
    }
  ]);
}

async function seedNodeJSCourse(courseId: string) {
  console.log("  📘 Seeding: Node.js...");
  await seedCourse(courseId, "Node.js & Express", [
    {
      title: "Node.js & Express", order: 1, lessons: [
        {
          slug: "nodejs-intro", title: "Node.js คืออะไร?", isFree: true, duration: 12,
          content: `# Node.js คืออะไร?

Node.js คือ JavaScript runtime ที่รันนอก browser โดยใช้ V8 engine ของ Chrome

## ทำไมต้อง Node.js?
- เขียน backend ด้วย JavaScript (ภาษาเดียวกับ frontend)
- Non-blocking I/O — handle requests หลายพันต่อวินาที
- npm ecosystem ใหญ่มาก (2 ล้าน packages)

## Node.js ใช้ทำอะไร?
- REST API servers
- Real-time apps (chat, live)
- CLI tools
- Microservices

## ติดตั้ง
ดาวน์โหลดจาก nodejs.org แนะนำ LTS version`,
          codeExamples: [{ title: "Node.js HTTP Server เบื้องต้น", language: "javascript", code: `const http = require("http");
const fs = require("fs");
const path = require("path");

// HTTP Server
const server = http.createServer((req, res) => {
  console.log(\`\${req.method} \${req.url}\`);

  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end("<h1>สวัสดีจาก Node.js!</h1>");
  } else if (req.url === "/api/time") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ time: new Date().toISOString() }));
  } else {
    res.writeHead(404);
    res.end("ไม่พบ");
  }
});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});`, explanation: "HTTP server พื้นฐานด้วย Node.js built-in module" }]
        },
        {
          slug: "nodejs-express-basics", title: "Express.js พื้นฐาน", isFree: true, duration: 18,
          content: `# Express.js

Express คือ minimal web framework สำหรับ Node.js

## ติดตั้ง
\`\`\`bash
npm init -y
npm install express
npm install -D @types/express typescript ts-node
\`\`\`

## Basic Server
\`\`\`js
const express = require("express");
const app = express();

app.use(express.json()); // parse JSON body

app.get("/", (req, res) => {
  res.json({ message: "สวัสดี!" });
});

app.listen(3000, () => console.log("Running on :3000"));
\`\`\`

## Routing
\`\`\`js
app.get("/courses", getAll);
app.get("/courses/:id", getOne);
app.post("/courses", create);
app.put("/courses/:id", update);
app.delete("/courses/:id", remove);
\`\`\``,
          codeExamples: [{ title: "Express CRUD API", language: "javascript", code: `const express = require("express");
const app = express();
app.use(express.json());

// In-memory data (ใน production ใช้ database)
let courses = [
  { id: 1, title: "HTML & CSS", price: 0 },
  { id: 2, title: "JavaScript", price: 0 },
];

// GET /courses
app.get("/courses", (req, res) => {
  res.json({ success: true, data: courses });
});

// GET /courses/:id
app.get("/courses/:id", (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).json({ error: "ไม่พบ" });
  res.json({ success: true, data: course });
});

// POST /courses
app.post("/courses", (req, res) => {
  const { title, price } = req.body;
  const course = { id: Date.now(), title, price };
  courses.push(course);
  res.status(201).json({ success: true, data: course });
});

// DELETE /courses/:id
app.delete("/courses/:id", (req, res) => {
  const id = parseInt(req.params.id);
  courses = courses.filter(c => c.id !== id);
  res.json({ success: true });
});

app.listen(3000, () => console.log("API running on :3000"));`, explanation: "Express CRUD REST API" }]
        },
        {
          slug: "nodejs-middleware", title: "Middleware", isFree: false, duration: 15,
          content: `# Middleware

Middleware คือ function ที่รันระหว่าง request และ response

## รูปแบบ
\`\`\`js
function myMiddleware(req, res, next) {
  // ทำอะไรบางอย่าง
  next(); // ส่งต่อไป middleware/route ถัดไป
}
app.use(myMiddleware);
\`\`\`

## Built-in Middleware
\`\`\`js
app.use(express.json());           // parse JSON
app.use(express.urlencoded());     // parse form data
app.use(express.static("public")); // serve static files
\`\`\`

## ลำดับ Middleware สำคัญมาก
Middleware รันตามลำดับที่ app.use() — ใส่ก่อน = รันก่อน`,
          codeExamples: [{ title: "Auth + Logging Middleware", language: "javascript", code: `const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();

// Logging middleware
app.use((req, res, next) => {
  console.log(\`[\${new Date().toISOString()}] \${req.method} \${req.url}\`);
  next();
});

// Auth middleware
function requireAuth(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth?.startsWith("Bearer ")) {
    return res.status(401).json({ error: "ต้อง login ก่อน" });
  }
  try {
    const token = auth.split(" ")[1];
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: "Token ไม่ถูกต้อง" });
  }
}

// Role middleware
function requireRole(role) {
  return (req, res, next) => {
    if (req.user?.role !== role) {
      return res.status(403).json({ error: "ไม่มีสิทธิ์" });
    }
    next();
  };
}

// ใช้งาน
app.get("/api/profile", requireAuth, (req, res) => {
  res.json({ user: req.user });
});

app.delete("/api/courses/:id", requireAuth, requireRole("admin"), (req, res) => {
  res.json({ message: "ลบแล้ว" });
});`, explanation: "Auth middleware, role-based access, logging" }]
        },
        {
          slug: "nodejs-database", title: "เชื่อมต่อ Database", isFree: false, duration: 18,
          content: `# เชื่อมต่อ Database

## ตัวเลือก ORM/Query Builder
- **Prisma** — type-safe, schema-first (แนะนำ)
- **Drizzle** — lightweight, SQL-like
- **Sequelize** — feature-rich ORM
- **Knex** — query builder

## Prisma กับ Express

\`\`\`bash
npm install prisma @prisma/client
npx prisma init
\`\`\`

\`\`\`prisma
// prisma/schema.prisma
model Course {
  id        String   @id @default(cuid())
  title     String
  createdAt DateTime @default(now())
}
\`\`\``,
          codeExamples: [{ title: "Express + Prisma CRUD", language: "javascript", code: `const express = require("express");
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();
app.use(express.json());

// GET /api/courses
app.get("/api/courses", async (req, res) => {
  try {
    const courses = await prisma.course.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json({ success: true, data: courses });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST /api/courses
app.post("/api/courses", async (req, res) => {
  try {
    const course = await prisma.course.create({ data: req.body });
    res.status(201).json({ success: true, data: course });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal Server Error" });
});

app.listen(3000, () => console.log("Running"));

// Graceful shutdown
process.on("SIGTERM", async () => {
  await prisma.$disconnect();
  process.exit(0);
});`, explanation: "Express + Prisma: CRUD operations + error handler + graceful shutdown" }]
        },
      ]
    }
  ]);
}

async function seedSQLCourse(courseId: string) {
  console.log("  📘 Seeding: SQL...");
  await seedCourse(courseId, "SQL & Database", [
    {
      title: "SQL พื้นฐาน", order: 1, lessons: [
        {
          slug: "sql-intro", title: "SQL คืออะไร?", isFree: true, duration: 12,
          content: `# SQL คืออะไร?

SQL (Structured Query Language) คือภาษาสำหรับจัดการฐานข้อมูลเชิงสัมพันธ์

## ฐานข้อมูลยอดนิยม
- **MySQL** — ใช้กันทั่วไป, ฟรี
- **PostgreSQL** — feature-rich, strict
- **SQLite** — lightweight, ไม่ต้องติดตั้ง server
- **SQL Server** — Microsoft, enterprise

## SQL Commands หลัก
- **DDL** — CREATE, ALTER, DROP (โครงสร้าง)
- **DML** — SELECT, INSERT, UPDATE, DELETE (ข้อมูล)
- **DCL** — GRANT, REVOKE (สิทธิ์)`,
          codeExamples: [{ title: "CREATE TABLE และ INSERT", language: "sql", code: `-- สร้างตาราง
CREATE TABLE students (
  id       INT AUTO_INCREMENT PRIMARY KEY,
  name     VARCHAR(100) NOT NULL,
  email    VARCHAR(100) UNIQUE NOT NULL,
  score    DECIMAL(5,2) DEFAULT 0,
  created  DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- เพิ่มข้อมูล
INSERT INTO students (name, email, score) VALUES
  ('สมชาย ใจดี',   'somchai@email.com', 85.5),
  ('สมหญิง สวยงาม', 'somying@email.com', 92.0),
  ('สมศักดิ์ มั่งมี', 'somsak@email.com', 78.3);

-- ดูข้อมูล
SELECT * FROM students;`, explanation: "CREATE TABLE, INSERT, SELECT พื้นฐาน" }]
        },
        {
          slug: "sql-select", title: "SELECT & WHERE", isFree: true, duration: 15,
          content: `# SELECT & WHERE

## SELECT พื้นฐาน
\`\`\`sql
SELECT * FROM students;
SELECT name, email FROM students;
SELECT name AS ชื่อ, score AS คะแนน FROM students;
\`\`\`

## WHERE — กรองข้อมูล
\`\`\`sql
WHERE score >= 80
WHERE name LIKE 'สม%'     -- ขึ้นต้นด้วย สม
WHERE score BETWEEN 70 AND 90
WHERE email IN ('a@b.com', 'c@d.com')
WHERE score IS NULL
\`\`\`

## ORDER BY
\`\`\`sql
ORDER BY score DESC     -- มากไปน้อย
ORDER BY name ASC       -- ก-ฮ
\`\`\`

## LIMIT & OFFSET (Pagination)
\`\`\`sql
LIMIT 10 OFFSET 20  -- หน้า 3 (10 ต่อหน้า)
\`\`\``,
          codeExamples: [{ title: "SELECT ครบชุด", language: "sql", code: `-- ข้อมูลพื้นฐาน
SELECT name, score FROM students WHERE score >= 80 ORDER BY score DESC;

-- LIKE pattern matching
SELECT * FROM students WHERE name LIKE 'สม%';

-- BETWEEN
SELECT * FROM students WHERE score BETWEEN 70 AND 90;

-- Aggregate functions
SELECT
  COUNT(*) AS total,
  AVG(score) AS avg_score,
  MAX(score) AS max_score,
  MIN(score) AS min_score
FROM students;

-- GROUP BY
SELECT
  CASE
    WHEN score >= 80 THEN 'A'
    WHEN score >= 70 THEN 'B'
    ELSE 'C'
  END AS grade,
  COUNT(*) AS count
FROM students
GROUP BY grade
ORDER BY grade;

-- Pagination
SELECT * FROM students
ORDER BY created DESC
LIMIT 10 OFFSET 0; -- หน้า 1`, explanation: "SELECT, WHERE, LIKE, BETWEEN, aggregate, GROUP BY, pagination" }]
        },
        {
          slug: "sql-joins", title: "JOINs", isFree: false, duration: 18,
          content: `# JOINs — เชื่อมตาราง

JOIN ใช้เชื่อมข้อมูลจากหลายตาราง

## ประเภท JOIN

| JOIN | ดึงข้อมูล |
|---|---|
| INNER JOIN | แถวที่ match ทั้งสองตาราง |
| LEFT JOIN | ทุกแถวจากตารางซ้าย + match ขวา |
| RIGHT JOIN | ทุกแถวจากตารางขวา + match ซ้าย |

## ความสัมพันธ์
- **1:1** — user — profile
- **1:N** — course — lessons
- **M:N** — students — courses (ต้องมี junction table)`,
          codeExamples: [{ title: "JOINs ตัวอย่างจริง", language: "sql", code: `-- โครงสร้างตาราง
CREATE TABLE courses (
  id    INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(200) NOT NULL,
  price DECIMAL(10,2) DEFAULT 0
);

CREATE TABLE enrollments (
  id         INT PRIMARY KEY AUTO_INCREMENT,
  student_id INT NOT NULL,
  course_id  INT NOT NULL,
  enrolled   DATETIME DEFAULT CURRENT_TIMESTAMP,
  progress   DECIMAL(5,2) DEFAULT 0,
  FOREIGN KEY (student_id) REFERENCES students(id),
  FOREIGN KEY (course_id)  REFERENCES courses(id)
);

-- INNER JOIN: นักเรียนที่ลงทะเบียน
SELECT
  s.name AS student_name,
  c.title AS course_title,
  e.progress
FROM enrollments e
INNER JOIN students s ON e.student_id = s.id
INNER JOIN courses  c ON e.course_id  = c.id
ORDER BY e.enrolled DESC;

-- LEFT JOIN: ทุก course แม้ไม่มีนักเรียน
SELECT
  c.title,
  COUNT(e.id) AS enrollment_count
FROM courses c
LEFT JOIN enrollments e ON e.course_id = c.id
GROUP BY c.id, c.title
ORDER BY enrollment_count DESC;`, explanation: "INNER JOIN, LEFT JOIN, foreign keys" }]
        },
        {
          slug: "sql-indexes", title: "Indexes & Performance", isFree: false, duration: 15,
          content: `# Indexes & Performance

## Index คืออะไร?
Index คือโครงสร้างข้อมูลพิเศษที่ทำให้ query เร็วขึ้น เหมือนสารบัญในหนังสือ

## เมื่อไหร่ใช้ Index?
- Column ที่ใช้ใน WHERE บ่อย
- Column ที่ใช้ใน JOIN
- Column ที่ ORDER BY

## ประเภท Index
\`\`\`sql
-- Primary Key (auto index)
-- Unique Index
CREATE UNIQUE INDEX idx_email ON students(email);
-- Regular Index
CREATE INDEX idx_score ON students(score);
-- Composite Index
CREATE INDEX idx_course_status ON lessons(course_id, is_published);
\`\`\`

## EXPLAIN
ใช้ดูว่า MySQL ใช้ index ไหม:
\`\`\`sql
EXPLAIN SELECT * FROM students WHERE score > 80;
\`\`\``,
          codeExamples: [{ title: "Index ในทางปฏิบัติ", language: "sql", code: `-- ดู query ช้า
EXPLAIN SELECT * FROM enrollments WHERE student_id = 123;
-- type: ALL = full table scan (ช้า!)

-- เพิ่ม index
CREATE INDEX idx_enrollments_student ON enrollments(student_id);
CREATE INDEX idx_enrollments_course  ON enrollments(course_id);

-- Composite index สำหรับ query บ่อย
CREATE INDEX idx_lessons_published ON lessons(course_id, is_published, order);

-- EXPLAIN ใหม่
EXPLAIN SELECT * FROM enrollments WHERE student_id = 123;
-- type: ref = index scan (เร็ว!)

-- ดู indexes ทั้งหมด
SHOW INDEX FROM enrollments;

-- ลบ index ที่ไม่จำเป็น
DROP INDEX idx_old ON enrollments;

-- Analyze table
ANALYZE TABLE enrollments;`, explanation: "Index creation, EXPLAIN, composite index" }]
        },
      ]
    }
  ]);
}

async function seedDevOpsCourse(courseId: string) {
  console.log("  📘 Seeding: DevOps...");
  await seedCourse(courseId, "DevOps & Deployment", [
    {
      title: "DevOps พื้นฐาน", order: 1, lessons: [
        {
          slug: "devops-intro", title: "DevOps คืออะไร?", isFree: true, duration: 12,
          content: `# DevOps คืออะไร?

DevOps คือแนวคิดที่รวม **Development** (Dev) และ **Operations** (Ops) เข้าด้วยกัน เพื่อส่ง software ได้เร็วและมีคุณภาพขึ้น

## DevOps Lifecycle
\`\`\`
Plan → Code → Build → Test → Release → Deploy → Operate → Monitor
\`\`\`

## เครื่องมือหลัก
- **Git** — version control
- **Docker** — containerization
- **GitHub Actions / GitLab CI** — CI/CD
- **Linux** — server OS
- **Nginx** — web server / reverse proxy
- **Cloud** — AWS, GCP, Azure, DigitalOcean`,
          codeExamples: [{ title: "Git workflow พื้นฐาน", language: "bash", code: `# Git Flow สำหรับ production
git clone https://github.com/user/project.git
cd project

# สร้าง feature branch
git checkout -b feature/add-quiz

# ทำงาน...
git add .
git commit -m "feat: add quiz system"

# Push และ create PR
git push origin feature/add-quiz

# หลัง merge PR
git checkout main
git pull origin main

# Tag version
git tag -a v1.2.0 -m "Release v1.2.0"
git push origin v1.2.0

# ดู log สวยงาม
git log --oneline --graph --all`, explanation: "Git workflow: branch, commit, push, tag" }]
        },
        {
          slug: "devops-docker", title: "Docker", isFree: true, duration: 20,
          content: `# Docker

Docker ช่วย package application พร้อม dependencies ทั้งหมดใน container

## ทำไมต้อง Docker?
- **"ทำงานได้บนเครื่องฉัน"** — Docker ทำให้ทุกที่เหมือนกัน
- Deploy ง่าย
- Isolate environments
- Scale ได้ง่าย

## Dockerfile
\`\`\`dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
CMD ["node", "server.js"]
\`\`\`

## Docker Compose
จัดการหลาย services พร้อมกัน (app + database + cache)`,
          codeExamples: [{ title: "Dockerfile + docker-compose", language: "bash", code: `# Dockerfile สำหรับ Node.js
# ---- build ----
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# ---- production ----
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 3000
CMD ["node", "dist/server.js"]

# docker-compose.yml
# services:
#   app:
#     build: .
#     ports: ["3000:3000"]
#     environment:
#       DATABASE_URL: mysql://user:pass@db:3306/mydb
#     depends_on: [db]
#   db:
#     image: mysql:8.0
#     environment:
#       MYSQL_ROOT_PASSWORD: secret

# Commands
docker build -t myapp:latest .
docker run -p 3000:3000 myapp:latest
docker compose up -d
docker compose logs -f
docker compose down`, explanation: "Multi-stage Dockerfile + docker-compose" }]
        },
        {
          slug: "devops-cicd", title: "CI/CD", isFree: false, duration: 18,
          content: `# CI/CD

**CI** (Continuous Integration) — test และ build อัตโนมัติทุก push
**CD** (Continuous Deployment) — deploy อัตโนมัติเมื่อ test ผ่าน

## GitHub Actions
\`\`\`yaml
# .github/workflows/deploy.yml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: npm ci
      - run: npm test
      - run: npm run build
      - run: # deploy...
\`\`\``,
          codeExamples: [{ title: "GitHub Actions CI/CD Pipeline", language: "yaml", code: `# .github/workflows/ci-cd.yml
name: CI/CD Pipeline

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    services:
      mysql:
        image: mysql:8.0
        env:
          MYSQL_ROOT_PASSWORD: testpass
          MYSQL_DATABASE: testdb
        ports: ["3306:3306"]
        options: --health-cmd="mysqladmin ping" --health-interval=10s

    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: "20" }
      - run: npm ci
      - run: npm run db:push
        env: { DATABASE_URL: "mysql://root:testpass@localhost:3306/testdb" }
      - run: npm test

  deploy:
    needs: test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Deploy to server
        uses: appleboy/ssh-action@v1
        with:
          host: \${{ secrets.SERVER_HOST }}
          username: \${{ secrets.SERVER_USER }}
          key: \${{ secrets.SSH_PRIVATE_KEY }}
          script: |
            cd /app
            git pull
            npm ci
            npm run build
            pm2 restart app`, explanation: "GitHub Actions: test with MySQL service + SSH deploy" }]
        },
        {
          slug: "devops-nginx", title: "Linux & Nginx", isFree: false, duration: 15,
          content: `# Linux & Nginx

## Linux Commands ที่ต้องรู้

\`\`\`bash
# File operations
ls -la          # list files with details
cd /var/www     # change directory
mkdir -p app    # create directory
cp src dst      # copy
mv src dst      # move/rename
rm -rf dir      # delete

# Process
ps aux          # list processes
kill -9 PID     # force kill
htop            # interactive process viewer

# Network
curl http://localhost:3000
netstat -tulpn  # listening ports
\`\`\`

## Nginx — Reverse Proxy
รับ request บน port 80/443 แล้วส่งต่อไป app`,
          codeExamples: [{ title: "Nginx config + SSL", language: "bash", code: `# ติดตั้ง Nginx
sudo apt update && sudo apt install nginx

# /etc/nginx/sites-available/teachcode
server {
    listen 80;
    server_name teachcode.dev www.teachcode.dev;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name teachcode.dev;

    ssl_certificate     /etc/letsencrypt/live/teachcode.dev/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/teachcode.dev/privkey.pem;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_cache_bypass $http_upgrade;
    }
}

# Enable config
sudo ln -s /etc/nginx/sites-available/teachcode /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx

# SSL ด้วย Let's Encrypt
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d teachcode.dev`, explanation: "Nginx reverse proxy + SSL certificate" }]
        },
      ]
    }
  ]);
}

async function seedCppCourse(courseId: string) {
  console.log("  📘 Seeding: C++...");
  await seedCourse(courseId, "C++ Programming", [
    {
      title: "C++ พื้นฐาน", order: 1, lessons: [
        {
          slug: "cpp-intro", title: "C++ คืออะไร?", isFree: true, duration: 12,
          content: `# C++ คืออะไร?

C++ คือภาษาโปรแกรมที่พัฒนาต่อจาก C โดย Bjarne Stroustrup ในปี 1979

## ลักษณะเด่น
- **Fast** — ใกล้เคียง hardware, ไม่มี garbage collector
- **OOP** — class, inheritance, polymorphism
- **Low-level + High-level** — จัดการ memory เองได้
- **ใช้ใน** — game engines, OS, embedded systems, trading

## C vs C++ vs C#
- **C** — procedural, ง่ายที่สุด
- **C++** — เพิ่ม OOP ใน C
- **C#** — managed language (Microsoft), คล้าย Java`,
          codeExamples: [{ title: "Hello World + I/O", language: "cpp", code: `#include <iostream>
#include <string>
using namespace std;

int main() {
    // Output
    cout << "สวัสดี C++!" << endl;

    // Input
    string name;
    int age;
    cout << "ชื่อของคุณ: ";
    cin >> name;
    cout << "อายุ: ";
    cin >> age;

    cout << "สวัสดี " << name << " อายุ " << age << " ปี" << endl;

    return 0;
}`, explanation: "Hello World, cin, cout, variables" }]
        },
        {
          slug: "cpp-variables", title: "Variables & Data Types", isFree: true, duration: 15,
          content: `# Variables & Data Types

## ประเภทข้อมูลหลัก

| Type | ขนาด | ตัวอย่าง |
|---|---|---|
| \`int\` | 4 bytes | -2B ถึง 2B |
| \`long long\` | 8 bytes | ตัวเลขใหญ่มาก |
| \`float\` | 4 bytes | 3.14f |
| \`double\` | 8 bytes | 3.14159 |
| \`char\` | 1 byte | 'A' |
| \`bool\` | 1 byte | true/false |
| \`string\` | dynamic | "text" |

## const vs #define
\`\`\`cpp
const double PI = 3.14159;  // type-safe (แนะนำ)
#define MAX 100              // preprocessor macro
\`\`\`

## auto — Type Inference
\`\`\`cpp
auto x = 42;        // int
auto y = 3.14;      // double
auto s = "hello";   // const char*
\`\`\``,
          codeExamples: [{ title: "Data types และ operations", language: "cpp", code: `#include <iostream>
#include <string>
#include <climits>
using namespace std;

int main() {
    // Integer types
    int score = 95;
    long long bigNum = 9999999999LL;
    unsigned int positive = 3000000000U;

    // Floating point
    float pi_f = 3.14159f;
    double pi_d = 3.14159265358979;

    // Bool
    bool passed = score >= 60;

    // String
    string name = "TeachCode";
    string greeting = "สวัสดี " + name;

    // Type sizes
    cout << "int: " << sizeof(int) << " bytes" << endl;
    cout << "double: " << sizeof(double) << " bytes" << endl;
    cout << "INT_MAX: " << INT_MAX << endl;

    // Auto
    auto result = score * 2;  // int
    auto msg = "Hello";       // const char*

    cout << greeting << endl;
    cout << "ผ่าน: " << (passed ? "ใช่" : "ไม่") << endl;

    return 0;
}`, explanation: "Data types, sizeof, INT_MAX, auto" }]
        },
        {
          slug: "cpp-oop", title: "OOP ใน C++", isFree: false, duration: 20,
          content: `# OOP ใน C++

## Class & Object
\`\`\`cpp
class BankAccount {
private:
    double balance;  // private — เข้าถึงจากภายนอกไม่ได้

public:
    BankAccount(double initial) : balance(initial) {}

    void deposit(double amount) {
        if (amount > 0) balance += amount;
    }

    bool withdraw(double amount) {
        if (amount > balance) return false;
        balance -= amount;
        return true;
    }

    double getBalance() const { return balance; }
};
\`\`\`

## Inheritance
\`\`\`cpp
class SavingsAccount : public BankAccount {
    double interestRate;
public:
    SavingsAccount(double bal, double rate)
        : BankAccount(bal), interestRate(rate) {}

    void addInterest() {
        deposit(getBalance() * interestRate);
    }
};
\`\`\``,
          codeExamples: [{ title: "Class + Inheritance + Polymorphism", language: "cpp", code: `#include <iostream>
#include <string>
#include <vector>
using namespace std;

class Shape {
public:
    virtual double area() const = 0;  // pure virtual
    virtual string name() const = 0;
    virtual ~Shape() {}               // virtual destructor สำคัญ!
};

class Circle : public Shape {
    double radius;
public:
    Circle(double r) : radius(r) {}
    double area() const override { return 3.14159 * radius * radius; }
    string name() const override { return "Circle"; }
};

class Rectangle : public Shape {
    double width, height;
public:
    Rectangle(double w, double h) : width(w), height(h) {}
    double area() const override { return width * height; }
    string name() const override { return "Rectangle"; }
};

int main() {
    vector<Shape*> shapes = {
        new Circle(5),
        new Rectangle(4, 6),
    };

    for (const auto& s : shapes) {
        cout << s->name() << " area: " << s->area() << endl;
    }

    // Clean up
    for (auto s : shapes) delete s;
    return 0;
}`, explanation: "Abstract class, virtual functions, polymorphism, vector" }]
        },
        {
          slug: "cpp-stl", title: "STL — Standard Template Library", isFree: false, duration: 18,
          content: `# STL (Standard Template Library)

STL มี data structures และ algorithms มาให้ใช้งานพร้อม

## Containers

| Container | ลักษณะ |
|---|---|
| \`vector\` | dynamic array |
| \`list\` | doubly linked list |
| \`map\` | key-value pairs (sorted) |
| \`unordered_map\` | hash map (เร็วกว่า map) |
| \`set\` | unique values (sorted) |
| \`queue\` | FIFO |
| \`stack\` | LIFO |

## Algorithms
\`\`\`cpp
#include <algorithm>
sort(v.begin(), v.end());
find(v.begin(), v.end(), value);
count_if(v.begin(), v.end(), predicate);
\`\`\``,
          codeExamples: [{ title: "STL Containers & Algorithms", language: "cpp", code: `#include <iostream>
#include <vector>
#include <map>
#include <algorithm>
#include <numeric>
using namespace std;

int main() {
    // Vector
    vector<int> scores = {85, 92, 78, 95, 60};
    scores.push_back(88);

    sort(scores.begin(), scores.end(), greater<int>()); // มากไปน้อย

    int total = accumulate(scores.begin(), scores.end(), 0);
    double avg = (double)total / scores.size();
    cout << "Average: " << avg << endl;

    // count_if
    int passed = count_if(scores.begin(), scores.end(), [](int s){ return s >= 70; });
    cout << "ผ่าน: " << passed << "/" << scores.size() << endl;

    // Map
    map<string, int> wordCount;
    vector<string> words = {"html", "css", "html", "js", "html"};
    for (const auto& w : words) wordCount[w]++;

    for (const auto& [word, count] : wordCount) {
        cout << word << ": " << count << endl;
    }

    return 0;
}`, explanation: "vector, sort, accumulate, count_if, map, range-for" }]
        },
      ]
    }
  ]);
}

async function seedJavaCourse(courseId: string) {
  console.log("  📘 Seeding: Java...");
  await seedCourse(courseId, "Java Programming", [
    {
      title: "Java พื้นฐาน", order: 1, lessons: [
        {
          slug: "java-intro", title: "Java คืออะไร?", isFree: true, duration: 12,
          content: `# Java คืออะไร?

Java คือภาษา OOP ที่รันบน JVM (Java Virtual Machine) — **Write Once, Run Anywhere**

## ลักษณะเด่น
- **Platform independent** — รันได้บนทุก OS ที่มี JVM
- **Strongly typed** — type system เข้มงวด
- **OOP** — ทุกอย่างเป็น Object
- **Garbage Collection** — จัดการ memory อัตโนมัติ

## Java ใช้ทำอะไร?
- Enterprise applications (Spring Boot)
- Android development
- Big Data (Hadoop, Spark)
- Backend APIs`,
          codeExamples: [{ title: "Hello World Java", language: "java", code: `// HelloWorld.java
public class HelloWorld {
    public static void main(String[] args) {
        // Output
        System.out.println("สวัสดี Java!");

        // Variables
        String name = "TeachCode";
        int year = 2025;
        double price = 0.0;
        boolean isFree = true;

        System.out.printf("ยินดีต้อนรับสู่ %s ปี %d%n", name, year);
        System.out.println("ฟรีหรือไม่: " + isFree);

        // String methods
        String upper = name.toUpperCase();
        int length = name.length();
        System.out.println(upper + " (" + length + " ตัว)");
    }
}`, explanation: "Java class, main method, variables, printf, String methods" }]
        },
        {
          slug: "java-oop", title: "OOP ใน Java", isFree: true, duration: 20,
          content: `# OOP ใน Java

Java เป็นภาษา OOP 100% — ทุกอย่างต้องอยู่ใน class

## Class & Object
\`\`\`java
public class Student {
    private String name;
    private int score;

    public Student(String name, int score) {
        this.name = name;
        this.score = score;
    }

    // Getter/Setter
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getGrade() {
        if (score >= 80) return "A";
        if (score >= 70) return "B";
        return "C";
    }
}
\`\`\`

## Interface
\`\`\`java
interface Teachable {
    void learn();
    default void study() { System.out.println("กำลังเรียน"); }
}
\`\`\``,
          codeExamples: [{ title: "Class + Interface + Inheritance", language: "java", code: `// Interface
interface Drawable {
    void draw();
    default String getColor() { return "black"; }
}

// Abstract class
abstract class Shape implements Drawable {
    protected String color;

    public Shape(String color) { this.color = color; }

    public abstract double area();

    @Override
    public String getColor() { return color; }
}

// Concrete class
class Circle extends Shape {
    private double radius;

    public Circle(double radius, String color) {
        super(color);
        this.radius = radius;
    }

    @Override
    public double area() { return Math.PI * radius * radius; }

    @Override
    public void draw() {
        System.out.printf("วงกลม สี%s รัศมี %.1f พื้นที่ %.2f%n",
            color, radius, area());
    }
}

// Main
public class Main {
    public static void main(String[] args) {
        Shape[] shapes = {
            new Circle(5, "แดง"),
            new Circle(3, "น้ำเงิน"),
        };
        for (Shape s : shapes) s.draw();
    }
}`, explanation: "Interface, abstract class, extends, implements, @Override" }]
        },
        {
          slug: "java-collections", title: "Collections Framework", isFree: false, duration: 18,
          content: `# Collections Framework

## ประเภทหลัก

| Interface | Class | ลักษณะ |
|---|---|---|
| List | ArrayList, LinkedList | ordered, duplicates OK |
| Set | HashSet, TreeSet | unique values |
| Map | HashMap, TreeMap | key-value |
| Queue | LinkedList, PriorityQueue | FIFO |

## Generics
\`\`\`java
List<String> names = new ArrayList<>();
Map<String, Integer> scores = new HashMap<>();
\`\`\`

## Streams API (Java 8+)
\`\`\`java
list.stream()
    .filter(s -> s.getScore() >= 70)
    .map(Student::getName)
    .sorted()
    .collect(Collectors.toList());
\`\`\``,
          codeExamples: [{ title: "Collections + Streams", language: "java", code: `import java.util.*;
import java.util.stream.*;

public class CollectionsDemo {
    record Student(String name, int score) {} // Java 14+

    public static void main(String[] args) {
        List<Student> students = List.of(
            new Student("สมชาย", 85),
            new Student("สมหญิง", 92),
            new Student("สมศักดิ์", 55),
            new Student("สมใจ", 78)
        );

        // Stream: filter + map + collect
        List<String> passed = students.stream()
            .filter(s -> s.score() >= 70)
            .sorted(Comparator.comparingInt(Student::score).reversed())
            .map(s -> s.name() + " (" + s.score() + ")")
            .collect(Collectors.toList());
        System.out.println("ผ่าน: " + passed);

        // Statistics
        IntSummaryStatistics stats = students.stream()
            .mapToInt(Student::score)
            .summaryStatistics();
        System.out.printf("เฉลี่ย: %.1f, สูงสุด: %d%n", stats.getAverage(), stats.getMax());

        // Group by grade
        Map<String, List<Student>> grouped = students.stream()
            .collect(Collectors.groupingBy(s -> s.score() >= 70 ? "ผ่าน" : "ตก"));
        grouped.forEach((grade, list) ->
            System.out.println(grade + ": " + list.stream().map(Student::name).toList()));
    }
}`, explanation: "Record, Stream, filter, map, collect, groupingBy, statistics" }]
        },
      ]
    }
  ]);
}

async function seedVueCourse(courseId: string) {
  console.log("  📘 Seeding: Vue.js...");
  await seedCourse(courseId, "Vue.js", [
    {
      title: "Vue.js พื้นฐาน", order: 1, lessons: [
        {
          slug: "vue-intro", title: "Vue.js คืออะไร?", isFree: true, duration: 12,
          content: `# Vue.js คืออะไร?

Vue.js คือ Progressive JavaScript Framework สำหรับสร้าง UI

## ลักษณะเด่น
- **Progressive** — ใช้เพิ่มทีละส่วนได้ ไม่ต้อง rewrite ทั้งหมด
- **Reactive** — data เปลี่ยน UI อัปเดตอัตโนมัติ
- **Component-based** — แบ่ง UI เป็น components เล็กๆ
- **Composition API** — organize logic ได้ดีกว่า Options API

## Vue vs React vs Angular
| | Vue | React | Angular |
|---|---|---|---|
| Learning curve | ง่าย | ปานกลาง | ยาก |
| Size | เล็ก | เล็ก | ใหญ่ |
| Template | HTML-based | JSX | HTML |`,
          codeExamples: [{ title: "Vue SFC (Single File Component)", language: "vue", code: `<!-- CourseCard.vue -->
<template>
  <div class="card" @click="openCourse">
    <h3>{{ course.title }}</h3>
    <p>{{ course.description }}</p>
    <div class="meta">
      <span>{{ course.lessonCount }} บท</span>
      <span :class="{ free: course.price === 0 }">
        {{ course.price === 0 ? 'ฟรี' : course.price + ' บาท' }}
      </span>
    </div>
    <button :disabled="enrolling" @click.stop="enroll">
      {{ enrolling ? 'กำลังลงทะเบียน...' : 'เรียนเลย' }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface Course {
  id: string;
  title: string;
  description: string;
  lessonCount: number;
  price: number;
}

const props = defineProps<{ course: Course }>();
const emit = defineEmits<{ enroll: [id: string] }>();

const enrolling = ref(false);

function openCourse() {
  window.location.href = \`/courses/\${props.course.id}\`;
}

async function enroll() {
  enrolling.value = true;
  await new Promise(r => setTimeout(r, 1000));
  emit('enroll', props.course.id);
  enrolling.value = false;
}
</script>`, explanation: "Vue SFC: template, script setup, props, emits, ref" }]
        },
        {
          slug: "vue-reactivity", title: "Reactivity & Composition API", isFree: true, duration: 18,
          content: `# Reactivity & Composition API

## ref vs reactive
\`\`\`ts
import { ref, reactive } from 'vue';

// ref — สำหรับ primitive
const count = ref(0);
count.value++; // ต้องใช้ .value ใน script

// reactive — สำหรับ object
const user = reactive({ name: '', email: '' });
user.name = 'สมชาย'; // ไม่ต้องใช้ .value
\`\`\`

## computed
\`\`\`ts
const fullName = computed(() => user.firstName + ' ' + user.lastName);
\`\`\`

## watch / watchEffect
\`\`\`ts
watch(count, (newVal, oldVal) => {
  console.log(\`เปลี่ยนจาก \${oldVal} → \${newVal}\`);
});

watchEffect(() => {
  document.title = \`คะแนน: \${count.value}\`;
});
\`\`\``,
          codeExamples: [{ title: "Composition API ครบชุด", language: "vue", code: `<template>
  <div>
    <h1>{{ title }}</h1>
    <input v-model="searchQuery" placeholder="ค้นหา...">
    <p>พบ {{ filteredCourses.length }} คอร์ส</p>
    <ul>
      <li v-for="course in filteredCourses" :key="course.id">
        {{ course.title }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';

interface Course { id: string; title: string; }

const title = ref('คอร์สทั้งหมด');
const courses = ref<Course[]>([]);
const searchQuery = ref('');
const loading = ref(false);

// computed — filter courses
const filteredCourses = computed(() =>
  courses.value.filter(c =>
    c.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
);

// watch search query
watch(searchQuery, (query) => {
  title.value = query ? \`ผลการค้นหา: "\${query}"\` : 'คอร์สทั้งหมด';
});

// lifecycle
onMounted(async () => {
  loading.value = true;
  const res = await fetch('/api/courses');
  courses.value = await res.json();
  loading.value = false;
});
</script>`, explanation: "ref, computed, watch, onMounted, v-model, v-for" }]
        },
        {
          slug: "vue-pinia", title: "Pinia — State Management", isFree: false, duration: 15,
          content: `# Pinia — State Management

Pinia คือ official state management library ของ Vue 3

## ทำไมต้อง State Management?
เมื่อ state ต้องแชร์ระหว่าง components ที่ไม่ได้เป็น parent-child

## Store
\`\`\`ts
// stores/auth.ts
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null);
  const isLoggedIn = computed(() => !!user.value);

  async function login(email, password) {
    const res = await fetch('/api/login', { method: 'POST', body: JSON.stringify({ email, password }) });
    user.value = await res.json();
  }

  function logout() { user.value = null; }

  return { user, isLoggedIn, login, logout };
});
\`\`\``,
          codeExamples: [{ title: "Pinia Store + Component", language: "typescript", code: `// stores/courses.ts
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useCoursesStore = defineStore('courses', () => {
  const courses = ref([]);
  const loading = ref(false);
  const filter = ref('all');

  const filteredCourses = computed(() =>
    filter.value === 'all'
      ? courses.value
      : courses.value.filter(c => c.language === filter.value)
  );

  async function fetchCourses() {
    loading.value = true;
    try {
      const res = await fetch('/api/courses');
      courses.value = await res.json();
    } finally {
      loading.value = false;
    }
  }

  async function enroll(courseId: string) {
    await fetch(\`/api/courses/\${courseId}/enroll\`, { method: 'POST' });
  }

  return { courses, loading, filter, filteredCourses, fetchCourses, enroll };
});

// Component
// import { useCoursesStore } from '@/stores/courses';
// const store = useCoursesStore();
// store.fetchCourses();
// store.filter = 'javascript';`, explanation: "Pinia store: ref, computed, actions, usage in component" }]
        },
      ]
    }
  ]);
}

async function seedAngularCourse(courseId: string) {
  console.log("  📘 Seeding: Angular...");
  await seedCourse(courseId, "Angular", [
    {
      title: "Angular พื้นฐาน", order: 1, lessons: [
        {
          slug: "angular-intro", title: "Angular คืออะไร?", isFree: true, duration: 15,
          content: `# Angular คืออะไร?

Angular คือ full-featured framework สำหรับ enterprise web applications พัฒนาโดย Google

## ลักษณะเด่น
- **TypeScript first** — บังคับ TypeScript
- **Full framework** — routing, forms, HTTP, DI ครบ
- **Opinionated** — มี structure ที่ชัดเจน
- **RxJS** — reactive programming ด้วย Observables

## Angular Concepts
- **Component** — UI + logic
- **Module** — จัดกลุ่ม components
- **Service** — business logic, shared state
- **Dependency Injection** — inject services เข้า components
- **Directive** — extend HTML (ngIf, ngFor)`,
          codeExamples: [{ title: "Angular Component", language: "typescript", code: `// course.component.ts
import { Component, OnInit, Input } from '@angular/core';
import { CourseService } from './course.service';

interface Course {
  id: string;
  title: string;
  lessonCount: number;
}

@Component({
  selector: 'app-course-list',
  template: \`
    <div class="courses">
      <h2>คอร์สทั้งหมด ({{ courses.length }})</h2>

      <div *ngIf="loading">กำลังโหลด...</div>

      <div class="grid">
        <div *ngFor="let course of courses" class="card">
          <h3>{{ course.title }}</h3>
          <p>{{ course.lessonCount }} บทเรียน</p>
          <button (click)="enroll(course.id)">เรียนเลย</button>
        </div>
      </div>
    </div>
  \`,
})
export class CourseListComponent implements OnInit {
  courses: Course[] = [];
  loading = false;

  constructor(private courseService: CourseService) {}

  ngOnInit() {
    this.loading = true;
    this.courseService.getCourses().subscribe({
      next: (courses) => { this.courses = courses; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  enroll(courseId: string) {
    this.courseService.enroll(courseId).subscribe();
  }
}`, explanation: "Angular component: @Component, *ngFor, *ngIf, (click), dependency injection" }]
        },
        {
          slug: "angular-services", title: "Services & DI", isFree: false, duration: 18,
          content: `# Services & Dependency Injection

## Service
\`\`\`ts
@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUser = new BehaviorSubject<User | null>(null);
  user$ = this.currentUser.asObservable();

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post<{ user: User; token: string }>('/api/auth/login', { email, password })
      .pipe(tap(res => this.currentUser.next(res.user)));
  }
}
\`\`\`

## HttpClient
\`\`\`ts
constructor(private http: HttpClient) {}

getCourses() {
  return this.http.get<Course[]>('/api/courses');
}
\`\`\``,
          codeExamples: [{ title: "Service + HttpClient + Observable", language: "typescript", code: `// course.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

interface Course { id: string; title: string; }

@Injectable({ providedIn: 'root' })
export class CourseService {
  private apiUrl = '/api/courses';
  private coursesSubject = new BehaviorSubject<Course[]>([]);
  courses$ = this.coursesSubject.asObservable();

  constructor(private http: HttpClient) {}

  getCourses(search?: string): Observable<Course[]> {
    let params = new HttpParams();
    if (search) params = params.set('q', search);

    return this.http.get<Course[]>(this.apiUrl, { params }).pipe(
      tap(courses => this.coursesSubject.next(courses))
    );
  }

  getCourse(id: string): Observable<Course> {
    return this.http.get<Course>(\`\${this.apiUrl}/\${id}\`);
  }

  enroll(courseId: string): Observable<void> {
    return this.http.post<void>(\`\${this.apiUrl}/\${courseId}/enroll\`, {});
  }
}`, explanation: "Angular Service: HttpClient, Observable, BehaviorSubject, tap" }]
        },
      ]
    }
  ]);
}

async function seedRESTAPICourse(courseId: string) {
  console.log("  📘 Seeding: REST API...");
  await seedCourse(courseId, "REST API Design", [
    {
      title: "REST API Design", order: 1, lessons: [
        {
          slug: "rest-intro", title: "REST API คืออะไร?", isFree: true, duration: 12,
          content: `# REST API คืออะไร?

REST (Representational State Transfer) คือ architectural style สำหรับ web services

## 6 REST Constraints
1. **Client-Server** — แยก frontend/backend
2. **Stateless** — ทุก request self-contained
3. **Cacheable** — response ระบุ cache ได้
4. **Uniform Interface** — resource-based URLs
5. **Layered System** — middleware OK
6. **Code on Demand** — (optional)

## HTTP Methods
| Method | ใช้กับ | Idempotent |
|---|---|---|
| GET | ดึงข้อมูล | ✅ |
| POST | สร้างใหม่ | ❌ |
| PUT | แทนที่ทั้งหมด | ✅ |
| PATCH | อัปเดตบางส่วน | ✅ |
| DELETE | ลบ | ✅ |`,
          codeExamples: [{ title: "RESTful URL Design", language: "bash", code: `# Resource: courses
GET    /api/courses           # ดูทั้งหมด
POST   /api/courses           # สร้างใหม่
GET    /api/courses/:id       # ดู 1 อัน
PUT    /api/courses/:id       # แทนที่ทั้งหมด
PATCH  /api/courses/:id       # อัปเดตบางส่วน
DELETE /api/courses/:id       # ลบ

# Nested resources
GET    /api/courses/:id/lessons        # บทเรียนในคอร์ส
POST   /api/courses/:id/lessons        # เพิ่มบทเรียน
GET    /api/courses/:id/lessons/:lid   # บทเรียนที่ระบุ

# Filtering, Sorting, Pagination
GET /api/courses?language=javascript
GET /api/courses?sort=price&order=asc
GET /api/courses?page=2&limit=10
GET /api/courses?q=html&language=web

# Actions (ไม่ใช่ CRUD)
POST /api/courses/:id/enroll
POST /api/auth/login
POST /api/auth/logout`, explanation: "RESTful URL conventions: resources, nesting, query params" }]
        },
        {
          slug: "rest-response-design", title: "Response Design", isFree: true, duration: 15,
          content: `# Response Design

## HTTP Status Codes

| Code | ความหมาย |
|---|---|
| 200 OK | สำเร็จ |
| 201 Created | สร้างสำเร็จ |
| 204 No Content | สำเร็จ ไม่มีข้อมูลส่งกลับ |
| 400 Bad Request | ข้อมูลผิด |
| 401 Unauthorized | ยังไม่ได้ login |
| 403 Forbidden | ไม่มีสิทธิ์ |
| 404 Not Found | ไม่พบ |
| 409 Conflict | ข้อมูลซ้ำ |
| 422 Unprocessable | validation ไม่ผ่าน |
| 500 Internal Server Error | server error |

## Response Format
\`\`\`json
{
  "success": true,
  "data": { ... },
  "message": "optional"
}
\`\`\``,
          codeExamples: [{ title: "Consistent API Responses", language: "typescript", code: `// lib/api-response.ts
import { NextResponse } from "next/server";

export function apiSuccess<T>(data: T, status = 200) {
  return NextResponse.json({ success: true, data }, { status });
}

export function apiError(message: string, status = 400) {
  return NextResponse.json({ success: false, error: message }, { status });
}

export function apiPaginated<T>(data: T[], total: number, page: number, limit: number) {
  return NextResponse.json({
    success: true,
    data,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      hasNext: page * limit < total,
      hasPrev: page > 1,
    },
  });
}

// ใช้งาน
// GET /api/courses
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") ?? "1");
  const limit = parseInt(searchParams.get("limit") ?? "10");
  const skip = (page - 1) * limit;

  const [courses, total] = await Promise.all([
    prisma.course.findMany({ skip, take: limit }),
    prisma.course.count(),
  ]);

  return apiPaginated(courses, total, page, limit);
}`, explanation: "Consistent response format: success, error, pagination" }]
        },
        {
          slug: "rest-auth", title: "Authentication & Security", isFree: false, duration: 18,
          content: `# API Authentication & Security

## Authentication Methods
- **JWT** — stateless, ใช้กันทั่วไป
- **Session** — server-side state
- **API Key** — สำหรับ machine-to-machine
- **OAuth 2.0** — third-party auth

## JWT Flow
\`\`\`
1. POST /api/auth/login { email, password }
2. Server verify → return { accessToken, refreshToken }
3. Client store tokens
4. Client send: Authorization: Bearer <accessToken>
5. Server verify token → handle request
\`\`\`

## Security Best Practices
- ✅ HTTPS เสมอ
- ✅ Rate limiting
- ✅ Input validation
- ✅ JWT expiry สั้น (15 นาที)
- ✅ Refresh token rotation
- ❌ อย่าเก็บ password เป็น plain text`,
          codeExamples: [{ title: "JWT + Rate Limiting + Validation", language: "typescript", code: `import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import jwt from "jsonwebtoken";

// Rate limiting (simple in-memory)
const requestCounts = new Map<string, { count: number; reset: number }>();

function rateLimit(ip: string, limit = 10, windowMs = 60000) {
  const now = Date.now();
  const entry = requestCounts.get(ip);

  if (!entry || now > entry.reset) {
    requestCounts.set(ip, { count: 1, reset: now + windowMs });
    return true;
  }
  if (entry.count >= limit) return false;
  entry.count++;
  return true;
}

// Validation schema
const loginSchema = z.object({
  email: z.string().email("อีเมลไม่ถูกต้อง"),
  password: z.string().min(8, "รหัสผ่านต้องมีอย่างน้อย 8 ตัว"),
});

// POST /api/auth/login
export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? "unknown";

  if (!rateLimit(ip, 5)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const body = await req.json();
  const result = loginSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json({ error: result.error.errors[0].message }, { status: 422 });
  }

  const { email, password } = result.data;
  // verify user...

  const accessToken = jwt.sign({ userId: "...", role: "student" }, process.env.JWT_SECRET!, { expiresIn: "15m" });
  const refreshToken = jwt.sign({ userId: "..." }, process.env.JWT_REFRESH_SECRET!, { expiresIn: "7d" });

  const res = NextResponse.json({ success: true });
  res.cookies.set("accessToken", accessToken, { httpOnly: true, secure: true, sameSite: "lax", maxAge: 900 });
  res.cookies.set("refreshToken", refreshToken, { httpOnly: true, secure: true, sameSite: "lax", maxAge: 604800 });
  return res;
}`, explanation: "Rate limiting, Zod validation, JWT, httpOnly cookies" }]
        },
        {
          slug: "rest-versioning", title: "Versioning & Documentation", isFree: false, duration: 12,
          content: `# API Versioning & Documentation

## Versioning Strategies
\`\`\`
# URL versioning (ชัดเจน, แนะนำ)
/api/v1/courses
/api/v2/courses

# Header versioning
Accept: application/vnd.api+json;version=2

# Query param
/api/courses?v=2
\`\`\`

## OpenAPI / Swagger
\`\`\`yaml
openapi: 3.0.0
info:
  title: TeachCode API
  version: 1.0.0
paths:
  /api/courses:
    get:
      summary: Get all courses
      parameters:
        - name: language
          in: query
          schema: { type: string }
      responses:
        200:
          description: Success
\`\`\``,
          codeExamples: [{ title: "API Documentation", language: "typescript", code: `// Types ที่เป็นทั้ง implementation และ documentation
/**
 * GET /api/v1/courses
 * ดึงรายการคอร์สทั้งหมด
 *
 * Query params:
 * - q?: string — คำค้นหา
 * - language?: string — กรองตามภาษา
 * - page?: number — หน้า (default: 1)
 * - limit?: number — จำนวนต่อหน้า (default: 10, max: 50)
 *
 * Response: 200 OK
 * {
 *   success: true,
 *   data: Course[],
 *   pagination: { total, page, limit, totalPages, hasNext, hasPrev }
 * }
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  // Validate & parse params
  const page = Math.max(1, parseInt(searchParams.get("page") ?? "1"));
  const limit = Math.min(50, Math.max(1, parseInt(searchParams.get("limit") ?? "10")));
  const q = searchParams.get("q") ?? undefined;
  const language = searchParams.get("language") ?? undefined;

  const where = {
    isPublished: true,
    ...(q && { title: { contains: q } }),
    ...(language && { language: language.toUpperCase() }),
  };

  const [data, total] = await Promise.all([
    prisma.course.findMany({ where, skip: (page-1)*limit, take: limit }),
    prisma.course.count({ where }),
  ]);

  return apiPaginated(data, total, page, limit);
}`, explanation: "JSDoc API documentation + validated query params + pagination" }]
        },
      ]
    }
  ]);
}

async function seedFlutterCourse(courseId: string) {
  console.log("  📘 Seeding: Flutter...");
  await seedCourse(courseId, "Flutter Mobile", [
    {
      title: "Flutter พื้นฐาน", order: 1, lessons: [
        {
          slug: "flutter-intro", title: "Flutter คืออะไร?", isFree: true, duration: 12,
          content: `# Flutter คืออะไร?

Flutter คือ UI toolkit จาก Google สำหรับสร้าง app ที่รันได้ทั้ง iOS, Android, Web, Desktop จาก codebase เดียว

## ลักษณะเด่น
- **Cross-platform** — iOS, Android, Web, Desktop จากโค้ดเดียว
- **Dart language** — ง่ายคล้าย JavaScript/Java
- **Fast** — compiled to native ARM code
- **Rich widgets** — UI components ครบ

## Flutter vs React Native
| | Flutter | React Native |
|---|---|---|
| Language | Dart | JavaScript |
| Performance | ดีกว่า | ดี |
| UI | Custom widgets | Native components |
| Community | ใหญ่ | ใหญ่มาก |`,
          codeExamples: [{ title: "Flutter Hello World", language: "dart", code: `import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'TeachCode',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.blue),
        useMaterial3: true,
      ),
      home: const HomeScreen(),
    );
  }
}

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('TeachCode'),
        backgroundColor: Colors.blue,
      ),
      body: const Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text('สวัสดี Flutter!', style: TextStyle(fontSize: 24)),
            SizedBox(height: 16),
            Text('เรียนโปรแกรมมิ่งออนไลน์ฟรี'),
          ],
        ),
      ),
    );
  }
}`, explanation: "Flutter app structure: main, MaterialApp, Scaffold, widgets" }]
        },
        {
          slug: "flutter-widgets", title: "Widgets พื้นฐาน", isFree: true, duration: 18,
          content: `# Widgets พื้นฐาน

ทุกอย่างใน Flutter คือ Widget!

## Layout Widgets
- \`Column\` — เรียงแนวตั้ง
- \`Row\` — เรียงแนวนอน
- \`Stack\` — ซ้อนทับ
- \`Container\` — กล่องปรับแต่งได้
- \`Expanded\` — กินพื้นที่ที่เหลือ
- \`Padding\` — ช่องว่าง

## UI Widgets
- \`Text\` — ข้อความ
- \`Image\` — รูปภาพ
- \`Icon\` — ไอคอน
- \`ElevatedButton\` — ปุ่ม
- \`TextField\` — input
- \`ListView\` — scrollable list`,
          codeExamples: [{ title: "Layout + UI Widgets", language: "dart", code: `class CourseCard extends StatelessWidget {
  final String title;
  final String instructor;
  final int lessonCount;
  final bool isFree;

  const CourseCard({
    super.key,
    required this.title,
    required this.instructor,
    required this.lessonCount,
    this.isFree = false,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 2,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Expanded(
                  child: Text(title,
                    style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
                    maxLines: 2,
                    overflow: TextOverflow.ellipsis,
                  ),
                ),
                if (isFree)
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                    decoration: BoxDecoration(
                      color: Colors.green.shade100,
                      borderRadius: BorderRadius.circular(9999),
                    ),
                    child: const Text('ฟรี', style: TextStyle(color: Colors.green, fontSize: 12)),
                  ),
              ],
            ),
            const SizedBox(height: 8),
            Text(instructor, style: TextStyle(color: Colors.grey.shade600)),
            const SizedBox(height: 4),
            Row(
              children: [
                const Icon(Icons.book, size: 14, color: Colors.grey),
                const SizedBox(width: 4),
                Text('\$lessonCount บทเรียน', style: const TextStyle(fontSize: 12)),
              ],
            ),
          ],
        ),
      ),
    );
  }
}`, explanation: "Flutter card widget: Column, Row, Expanded, Container, Text, Icon" }]
        },
        {
          slug: "flutter-state", title: "State Management", isFree: false, duration: 18,
          content: `# State Management

## StatefulWidget
\`\`\`dart
class CounterScreen extends StatefulWidget {
  const CounterScreen({super.key});

  @override
  State<CounterScreen> createState() => _CounterScreenState();
}

class _CounterScreenState extends State<CounterScreen> {
  int _count = 0;

  void _increment() {
    setState(() { _count++; });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(child: Text('\$_count')),
      floatingActionButton: FloatingActionButton(
        onPressed: _increment,
        child: const Icon(Icons.add),
      ),
    );
  }
}
\`\`\`

## Provider (Recommended)
\`\`\`dart
ChangeNotifierProvider<AuthProvider>(
  create: (_) => AuthProvider(),
  child: MyApp(),
)
\`\`\``,
          codeExamples: [{ title: "Provider State Management", language: "dart", code: `import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

// State class
class CoursesProvider extends ChangeNotifier {
  List<Map<String, dynamic>> _courses = [];
  bool _loading = false;

  List<Map<String, dynamic>> get courses => _courses;
  bool get loading => _loading;

  Future<void> fetchCourses() async {
    _loading = true;
    notifyListeners();

    await Future.delayed(const Duration(seconds: 1)); // simulate API
    _courses = [
      {'id': '1', 'title': 'HTML & CSS', 'free': true},
      {'id': '2', 'title': 'JavaScript', 'free': true},
      {'id': '3', 'title': 'React.js', 'free': false},
    ];

    _loading = false;
    notifyListeners();
  }
}

// Screen
class CoursesScreen extends StatefulWidget {
  const CoursesScreen({super.key});

  @override
  State<CoursesScreen> createState() => _CoursesScreenState();
}

class _CoursesScreenState extends State<CoursesScreen> {
  @override
  void initState() {
    super.initState();
    context.read<CoursesProvider>().fetchCourses();
  }

  @override
  Widget build(BuildContext context) {
    return Consumer<CoursesProvider>(
      builder: (context, provider, child) {
        if (provider.loading) return const CircularProgressIndicator();
        return ListView.builder(
          itemCount: provider.courses.length,
          itemBuilder: (ctx, i) => ListTile(title: Text(provider.courses[i]['title'])),
        );
      },
    );
  }
}`, explanation: "Flutter Provider: ChangeNotifier, notifyListeners, Consumer, context.read" }]
        },
      ]
    }
  ]);
}

// ─────────────────────────────────────────────────────────────────────────────
// DOCKER MASTERY
// ─────────────────────────────────────────────────────────────────────────────
async function seedDockerCourse(courseId: string) {
  const sections = [
    {
      title: "บทที่ 1: Docker พื้นฐาน",
      order: 1,
      lessons: [
        {
          slug: "docker-what-is-container",
          title: "Container คืออะไร? ทำไมต้องใช้ Docker",
          isFree: true,
          duration: 15,
          content: `# Container คืออะไร?

Container คือหน่วยของ software ที่รวม **โค้ด + dependencies + config** ทั้งหมดไว้ด้วยกัน ทำให้รันได้เหมือนกันทุกเครื่อง

## ปัญหาที่ Docker แก้ได้
- "ในเครื่องผมรันได้นะ" (It works on my machine)
- ตั้งค่า environment ซ้ำทุกครั้ง
- Version conflict ระหว่างโปรเจกต์

## VM vs Container
| VM | Container |
|----|-----------|
| OS เต็มๆ ทุก VM | แชร์ OS kernel |
| หนัก (GBs) | เบา (MBs) |
| บู๊ตช้า (นาที) | เริ่มเร็ว (วินาที) |

## Docker Architecture
\`\`\`
Docker Client → Docker Daemon → Images / Containers / Networks / Volumes
\`\`\`

Docker Hub = registry สำหรับเก็บ images สาธารณะ`,
          codeExamples: [
            {
              title: "ติดตั้ง Docker และทดสอบ",
              language: "bash",
              code: `# ตรวจสอบ Docker version
docker --version
docker info

# รัน Hello World container
docker run hello-world

# ดู containers ที่รันอยู่
docker ps

# ดู containers ทั้งหมด (รวม stopped)
docker ps -a`,
              explanation: "คำสั่งพื้นฐานหลังติดตั้ง Docker"
            }
          ]
        },
        {
          slug: "docker-images-basics",
          title: "Docker Images คืออะไร และการใช้งาน",
          isFree: true,
          duration: 20,
          content: `# Docker Images

Image คือ **blueprint** ที่ใช้สร้าง Container เปรียบเหมือน class ที่ container เป็น instance

## Image Layers
Docker image ประกอบด้วย **layers** ซ้อนกัน แต่ละ instruction ใน Dockerfile สร้าง layer ใหม่
ทำให้ประหยัด disk เพราะ layers ซ้ำกันแชร์กันได้

## Image Naming
\`\`\`
registry/username/image:tag
docker.io/library/nginx:latest
ghcr.io/myuser/myapp:v1.2.0
\`\`\`

## Pull และ Run Image
\`\`\`bash
docker pull nginx:latest
docker run -d -p 8080:80 nginx
\`\`\`

## Image Management
\`\`\`bash
docker images          # ดู images ทั้งหมด
docker rmi nginx       # ลบ image
docker image prune     # ลบ unused images
\`\`\``,
          codeExamples: [
            {
              title: "จัดการ Docker Images",
              language: "bash",
              code: `# Pull image จาก Docker Hub
docker pull ubuntu:22.04
docker pull node:20-alpine
docker pull postgres:15

# ดู images ที่มีอยู่
docker images
docker images --format "table {{.Repository}}\\t{{.Tag}}\\t{{.Size}}"

# ดูข้อมูล image
docker inspect ubuntu:22.04

# ลบ images
docker rmi ubuntu:22.04
docker image prune -a  # ลบ images ที่ไม่ใช้`,
              explanation: "คำสั่งจัดการ Docker Images"
            }
          ]
        },
        {
          slug: "docker-containers-basics",
          title: "Docker Containers: รัน จัดการ และหยุดใช้งาน",
          isFree: false,
          duration: 25,
          content: `# Docker Containers

Container คือ **running instance** ของ Image

## Container Lifecycle
\`\`\`
Created → Running → Paused → Stopped → Removed
\`\`\`

## คำสั่งสำคัญ
| คำสั่ง | หน้าที่ |
|--------|---------|
| \`docker run\` | สร้างและเริ่ม container |
| \`docker start\` | เริ่ม container ที่หยุดไว้ |
| \`docker stop\` | หยุด container อย่างนุ่มนวล |
| \`docker kill\` | หยุด container ทันที |
| \`docker rm\` | ลบ container |
| \`docker exec\` | รันคำสั่งใน container |
| \`docker logs\` | ดู logs |

## Flags สำคัญของ \`docker run\`
- \`-d\` = detached mode (รันเบื้องหลัง)
- \`-p host:container\` = port mapping
- \`-v\` = volume mount
- \`--name\` = ตั้งชื่อ container
- \`--rm\` = ลบ container หลัง stop
- \`-e\` = environment variable
- \`-it\` = interactive + TTY`,
          codeExamples: [
            {
              title: "รันและจัดการ Containers",
              language: "bash",
              code: `# รัน Nginx web server
docker run -d --name my-nginx -p 8080:80 nginx

# ดู containers ที่รันอยู่
docker ps

# เข้าไปใน container
docker exec -it my-nginx bash

# ดู logs
docker logs my-nginx
docker logs -f my-nginx  # follow logs

# หยุดและลบ container
docker stop my-nginx
docker rm my-nginx

# รันแบบ interactive
docker run -it --rm ubuntu:22.04 bash

# รัน container พร้อม environment variables
docker run -d \\
  --name my-db \\
  -e POSTGRES_PASSWORD=secret \\
  -e POSTGRES_DB=mydb \\
  -p 5432:5432 \\
  postgres:15`,
              explanation: "การรัน จัดการ และหยุด containers พื้นฐาน"
            }
          ]
        }
      ]
    },
    {
      title: "บทที่ 2: Dockerfile",
      order: 2,
      lessons: [
        {
          slug: "dockerfile-basics",
          title: "เขียน Dockerfile พื้นฐาน",
          isFree: false,
          duration: 30,
          content: `# Dockerfile

Dockerfile คือ text file ที่มี **instructions** สำหรับสร้าง Docker Image

## Instructions หลัก
| Instruction | หน้าที่ |
|-------------|---------|
| \`FROM\` | base image |
| \`WORKDIR\` | กำหนด working directory |
| \`COPY\` | copy files จาก host |
| \`ADD\` | เหมือน COPY แต่รองรับ URL และ tar |
| \`RUN\` | รันคำสั่งตอน build |
| \`CMD\` | คำสั่งเริ่มต้นเมื่อ container เริ่ม |
| \`ENTRYPOINT\` | คำสั่งหลักของ container |
| \`EXPOSE\` | บอก port ที่ใช้ |
| \`ENV\` | กำหนด environment variable |
| \`ARG\` | build argument |

## Best Practices
1. ใช้ alpine images เพื่อลด size
2. รวม RUN instructions ด้วย \`&&\`
3. ลบ cache หลัง install
4. ใช้ .dockerignore`,
          codeExamples: [
            {
              title: "Dockerfile สำหรับ Node.js App",
              language: "dockerfile",
              code: `# Dockerfile
FROM node:20-alpine

# กำหนด working directory
WORKDIR /app

# Copy package files ก่อน (cache layer)
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Expose port
EXPOSE 3000

# Start command
CMD ["node", "server.js"]`,
              explanation: "Dockerfile พื้นฐานสำหรับ Node.js"
            },
            {
              title: "Build และ Run Image",
              language: "bash",
              code: `# Build image
docker build -t my-node-app:1.0 .

# Build พร้อม build args
docker build --build-arg NODE_ENV=production -t my-app .

# ดูขั้นตอน build
docker build --progress=plain -t my-app .

# Run container จาก image ที่สร้าง
docker run -d -p 3000:3000 --name my-app my-node-app:1.0

# ดู image size
docker images my-node-app`,
              explanation: "Build image จาก Dockerfile"
            }
          ]
        },
        {
          slug: "dockerfile-multi-stage",
          title: "Multi-stage Builds: ลด Image Size",
          isFree: false,
          duration: 25,
          content: `# Multi-stage Builds

เทคนิคที่ทำให้ production image **เล็กลงมาก** โดยแยก build stage กับ runtime stage

## ทำไมต้องใช้?
- Build tools (compiler, npm) ไม่จำเป็นใน production
- ลด attack surface
- Image เล็กลงได้ 10x+

## ตัวอย่าง: Go App
\`\`\`
Builder stage: golang:1.21 (1.2GB) → binary
Final stage:   alpine (5MB) + binary = 10MB total
\`\`\`

## .dockerignore
ช่วยลด build context ส่งไปยัง daemon:
\`\`\`
node_modules
.git
*.log
.env
dist
\`\`\``,
          codeExamples: [
            {
              title: "Multi-stage สำหรับ Next.js",
              language: "dockerfile",
              code: `# Stage 1: Dependencies
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Stage 2: Builder
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Stage 3: Production runner
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]`,
              explanation: "Multi-stage build ลด image size สำหรับ Next.js"
            }
          ]
        }
      ]
    },
    {
      title: "บทที่ 3: Docker Volumes และ Networking",
      order: 3,
      lessons: [
        {
          slug: "docker-volumes",
          title: "Docker Volumes: จัดการ Data ใน Container",
          isFree: false,
          duration: 25,
          content: `# Docker Volumes

Container เป็น **stateless** — ข้อมูลหายเมื่อลบ container
Volume แก้ปัญหานี้โดยเก็บข้อมูลไว้นอก container

## ประเภท Storage ใน Docker
1. **Volumes** — Docker จัดการ (\`/var/lib/docker/volumes/\`)
2. **Bind Mounts** — map directory จาก host
3. **tmpfs Mounts** — เก็บใน memory (Linux เท่านั้น)

## เมื่อไหร่ใช้อะไร?
- **Volume**: database, persistent data (แนะนำสุด)
- **Bind Mount**: development, hot reload
- **tmpfs**: sensitive data ที่ไม่ต้องการ persist`,
          codeExamples: [
            {
              title: "ใช้งาน Volumes",
              language: "bash",
              code: `# สร้าง named volume
docker volume create my-data

# ดู volumes
docker volume ls
docker volume inspect my-data

# Mount volume เข้า container
docker run -d \\
  --name postgres-db \\
  -v my-data:/var/lib/postgresql/data \\
  -e POSTGRES_PASSWORD=secret \\
  postgres:15

# Bind mount สำหรับ development
docker run -d \\
  --name dev-app \\
  -v $(pwd):/app \\
  -p 3000:3000 \\
  node:20-alpine \\
  npm run dev

# ลบ volume
docker volume rm my-data
docker volume prune  # ลบ unused volumes`,
              explanation: "การใช้ Volumes และ Bind Mounts"
            }
          ]
        },
        {
          slug: "docker-networking",
          title: "Docker Networking: เชื่อมต่อ Containers",
          isFree: false,
          duration: 25,
          content: `# Docker Networking

Containers สื่อสารกันผ่าน **Docker Networks**

## Network Drivers
| Driver | ใช้เมื่อ |
|--------|---------|
| \`bridge\` | default, containers บน host เดียว |
| \`host\` | ไม่ isolate network (Linux) |
| \`none\` | ไม่มี network |
| \`overlay\` | Docker Swarm หลาย hosts |

## Default Bridge vs Custom Bridge
- Default bridge: communicate ด้วย IP เท่านั้น
- Custom bridge: communicate ด้วย **container name** ได้ (DNS)

## Port Mapping
\`\`\`
-p host_port:container_port
-p 8080:80        # host:8080 → container:80
-p 127.0.0.1:80:80  # bind เฉพาะ localhost
\`\`\``,
          codeExamples: [
            {
              title: "Custom Networks",
              language: "bash",
              code: `# สร้าง custom network
docker network create my-network

# รัน containers ใน network เดียวกัน
docker run -d \\
  --name backend \\
  --network my-network \\
  my-backend-image

docker run -d \\
  --name frontend \\
  --network my-network \\
  -p 3000:3000 \\
  my-frontend-image

# frontend เชื่อมต่อ backend ด้วย hostname "backend"
# http://backend:5000/api

# ดู networks
docker network ls
docker network inspect my-network

# เชื่อม container เข้า network หลังสร้าง
docker network connect my-network existing-container`,
              explanation: "สร้าง network และเชื่อมต่อ containers"
            }
          ]
        }
      ]
    },
    {
      title: "บทที่ 4: Docker Compose",
      order: 4,
      lessons: [
        {
          slug: "docker-compose-intro",
          title: "Docker Compose: รัน Multi-Container App",
          isFree: false,
          duration: 30,
          content: `# Docker Compose

Tool สำหรับ **define และ run multi-container** applications ด้วยไฟล์ YAML เดียว

## ทำไมต้องใช้?
แทนที่จะรันคำสั่ง docker run ยาวๆ หลายตัว ใช้ \`docker-compose.yml\` ไฟล์เดียว

## Structure ของ docker-compose.yml
\`\`\`yaml
version: "3.9"

services:        # containers ที่จะรัน
  web:
    image: nginx
    ports:
      - "80:80"

networks:        # custom networks
volumes:         # named volumes
\`\`\`

## คำสั่งสำคัญ
| คำสั่ง | หน้าที่ |
|--------|---------|
| \`docker compose up\` | สร้างและเริ่ม services |
| \`docker compose up -d\` | รันเบื้องหลัง |
| \`docker compose down\` | หยุดและลบ containers |
| \`docker compose logs\` | ดู logs |
| \`docker compose ps\` | ดู status |
| \`docker compose exec\` | รันคำสั่งใน service |
| \`docker compose build\` | build images |`,
          codeExamples: [
            {
              title: "docker-compose.yml สำหรับ Full-Stack App",
              language: "yaml",
              code: `version: "3.9"

services:
  # PostgreSQL Database
  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: secret
      POSTGRES_DB: myapp
    volumes:
      - postgres-data:/var/lib/postgresql/data
    networks:
      - backend-net

  # Node.js Backend API
  api:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      DATABASE_URL: postgresql://admin:secret@db:5432/myapp
      NODE_ENV: development
    depends_on:
      - db
    volumes:
      - ./backend:/app
      - /app/node_modules
    networks:
      - backend-net
      - frontend-net

  # Next.js Frontend
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    environment:
      NEXT_PUBLIC_API_URL: http://localhost:5000
    depends_on:
      - api
    volumes:
      - ./frontend:/app
      - /app/node_modules
    networks:
      - frontend-net

networks:
  backend-net:
  frontend-net:

volumes:
  postgres-data:`,
              explanation: "docker-compose.yml สำหรับ Full-Stack application"
            },
            {
              title: "รัน Docker Compose",
              language: "bash",
              code: `# รัน services ทั้งหมด
docker compose up -d

# ดู logs ทุก services
docker compose logs -f

# ดู logs เฉพาะ service
docker compose logs -f api

# ดู status
docker compose ps

# หยุดทั้งหมด
docker compose down

# หยุดและลบ volumes ด้วย
docker compose down -v

# Build ใหม่ทั้งหมด
docker compose up -d --build`,
              explanation: "คำสั่ง Docker Compose พื้นฐาน"
            }
          ]
        },
        {
          slug: "docker-compose-advanced",
          title: "Docker Compose Advanced: Health Checks, Secrets, Profiles",
          isFree: false,
          duration: 25,
          content: `# Docker Compose Advanced

## Health Checks
ตรวจสอบว่า service พร้อมรับ traffic หรือยัง

\`\`\`yaml
healthcheck:
  test: ["CMD", "curl", "-f", "http://localhost/health"]
  interval: 30s
  timeout: 10s
  retries: 3
  start_period: 40s
\`\`\`

## depends_on + condition
\`\`\`yaml
api:
  depends_on:
    db:
      condition: service_healthy
\`\`\`

## Profiles
แยก services ตาม environment:
\`\`\`yaml
services:
  dev-tools:
    profiles: ["dev"]
  monitoring:
    profiles: ["monitoring"]
\`\`\`

\`\`\`bash
docker compose --profile dev up
\`\`\`

## Secrets
เก็บ sensitive data ไม่ให้อยู่ใน environment:
\`\`\`yaml
secrets:
  db_password:
    file: ./secrets/db_password.txt
\`\`\``,
          codeExamples: [
            {
              title: "Production-ready docker-compose.yml",
              language: "yaml",
              code: `version: "3.9"

services:
  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_PASSWORD_FILE: /run/secrets/db_password
      POSTGRES_DB: myapp
    secrets:
      - db_password
    volumes:
      - postgres-data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 10s
      timeout: 5s
      retries: 5

  api:
    build:
      context: ./api
      dockerfile: Dockerfile
      target: production
    restart: unless-stopped
    depends_on:
      db:
        condition: service_healthy
    environment:
      NODE_ENV: production
    secrets:
      - db_password

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
      - certbot-etc:/etc/letsencrypt
    depends_on:
      - api

secrets:
  db_password:
    file: ./secrets/db_password.txt

volumes:
  postgres-data:
  certbot-etc:`,
              explanation: "Production docker-compose.yml พร้อม health checks และ secrets"
            }
          ]
        }
      ]
    },
    {
      title: "บทที่ 5: Docker Registry และ Production",
      order: 5,
      lessons: [
        {
          slug: "docker-registry",
          title: "Docker Registry: Push และ Pull Images",
          isFree: false,
          duration: 20,
          content: `# Docker Registry

Registry คือ **ที่เก็บ Docker images** ให้ทีมและ CI/CD ใช้ร่วมกัน

## Registry ยอดนิยม
| Registry | ลักษณะ |
|----------|--------|
| Docker Hub | Public, ฟรีสำหรับ public images |
| GitHub Container Registry (GHCR) | ฟรีสำหรับ public repos |
| AWS ECR | สำหรับ AWS ECS/EKS |
| Google Artifact Registry | สำหรับ GCP |
| Self-hosted Registry | ควบคุมเองทั้งหมด |

## Tagging Convention
\`\`\`
image:latest          # อันล่าสุด (ไม่แนะนำใน production)
image:v1.2.3          # semantic version
image:git-abc1234     # git commit hash
image:2024-01-15      # date
\`\`\``,
          codeExamples: [
            {
              title: "Push Image ไปยัง Docker Hub",
              language: "bash",
              code: `# Login ไปยัง Docker Hub
docker login

# Tag image ก่อน push
docker tag my-app:local username/my-app:v1.0.0
docker tag my-app:local username/my-app:latest

# Push
docker push username/my-app:v1.0.0
docker push username/my-app:latest

# Pull image
docker pull username/my-app:v1.0.0

# Login ไปยัง GitHub Container Registry
echo $GITHUB_TOKEN | docker login ghcr.io -u USERNAME --password-stdin
docker tag my-app ghcr.io/USERNAME/my-app:latest
docker push ghcr.io/USERNAME/my-app:latest`,
              explanation: "Push และ Pull images จาก registries"
            },
            {
              title: "Self-hosted Registry",
              language: "bash",
              code: `# รัน private registry ด้วย Docker
docker run -d \\
  --name registry \\
  -p 5000:5000 \\
  -v registry-data:/var/lib/registry \\
  registry:2

# Push image ไปยัง local registry
docker tag my-app localhost:5000/my-app:v1.0
docker push localhost:5000/my-app:v1.0

# Pull จาก local registry
docker pull localhost:5000/my-app:v1.0`,
              explanation: "รัน private Docker registry"
            }
          ]
        },
        {
          slug: "docker-production-tips",
          title: "Docker ใน Production: Security และ Best Practices",
          isFree: false,
          duration: 30,
          content: `# Docker ใน Production

## Security Best Practices
1. **อย่ารัน container เป็น root** — ใช้ USER instruction
2. **ใช้ specific tags** — ไม่ใช้ :latest ใน production
3. **Scan images** — ใช้ \`docker scout\` หรือ Trivy
4. **Read-only filesystem** — \`--read-only\` flag
5. **Limit resources** — CPU และ memory limits
6. **Secrets management** — Docker secrets หรือ Vault

## Resource Limits
\`\`\`bash
docker run -d \\
  --memory="512m" \\
  --cpus="0.5" \\
  my-app
\`\`\`

## Logging
\`\`\`bash
docker run -d \\
  --log-driver=json-file \\
  --log-opt max-size=10m \\
  --log-opt max-file=3 \\
  my-app
\`\`\`

## Container Security Scanning
\`\`\`bash
# Trivy scan
trivy image my-app:latest

# Docker Scout
docker scout cves my-app:latest
\`\`\`

## Image Optimization Checklist
- [ ] ใช้ alpine/slim base images
- [ ] Multi-stage builds
- [ ] .dockerignore ครบ
- [ ] ลบ package manager cache
- [ ] Non-root user
- [ ] Specific version tags`,
          codeExamples: [
            {
              title: "Production-ready Dockerfile",
              language: "dockerfile",
              code: `FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app

# Security: ไม่ใช้ root user
RUN addgroup -g 1001 -S nodejs && \\
    adduser -S nextjs -u 1001

# Copy built files
COPY --from=builder --chown=nextjs:nodejs /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY package.json ./

# Switch to non-root user
USER nextjs

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s \\
  CMD node -e "require('http').get('http://localhost:3000/health', r => r.statusCode === 200 ? process.exit(0) : process.exit(1))"

EXPOSE 3000
CMD ["node", "dist/server.js"]`,
              explanation: "Production Dockerfile พร้อม security best practices"
            }
          ]
        }
      ]
    }
  ];

  await seedCourse(courseId, "Docker Mastery", sections);
}

// ─────────────────────────────────────────────────────────────────────────────
// KUBERNETES MASTERY
// ─────────────────────────────────────────────────────────────────────────────
async function seedKubernetesCourse(courseId: string) {
  const sections = [
    {
      title: "บทที่ 1: Kubernetes พื้นฐาน",
      order: 1,
      lessons: [
        {
          slug: "k8s-what-is-kubernetes",
          title: "Kubernetes คืออะไร? ทำไมถึงจำเป็น",
          isFree: true,
          duration: 15,
          content: `# Kubernetes (K8s) คืออะไร?

Kubernetes คือ **Container Orchestration** platform ที่ Google สร้างขึ้น (open source 2014)
ช่วยจัดการ containers จำนวนมากใน production อย่างอัตโนมัติ

## ปัญหาที่ Kubernetes แก้
- รัน containers หลายพัน instances
- Auto-healing เมื่อ container crash
- Auto-scaling ตาม load
- Zero-downtime deployment (rolling update)
- Load balancing อัตโนมัติ
- Service discovery
- Config และ Secrets management

## Kubernetes Architecture

### Control Plane (Master)
- **API Server**: จุดศูนย์กลาง ทุก request ผ่านที่นี่
- **etcd**: database เก็บ cluster state
- **Scheduler**: เลือก Node ให้ Pod
- **Controller Manager**: loop ดูแล desired state

### Worker Nodes
- **kubelet**: agent บน node ดูแล pods
- **kube-proxy**: network rules
- **Container Runtime**: Docker, containerd, CRI-O`,
          codeExamples: [
            {
              title: "ติดตั้ง kubectl และ minikube",
              language: "bash",
              code: `# ติดตั้ง kubectl (Linux)
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
chmod +x kubectl && sudo mv kubectl /usr/local/bin/

# ติดตั้ง minikube (local development)
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
sudo install minikube-linux-amd64 /usr/local/bin/minikube

# เริ่ม cluster
minikube start

# ตรวจสอบ cluster
kubectl cluster-info
kubectl get nodes
kubectl get all --all-namespaces`,
              explanation: "ติดตั้ง tools สำหรับ Kubernetes development"
            }
          ]
        },
        {
          slug: "k8s-pods",
          title: "Pods: หน่วยเล็กที่สุดของ Kubernetes",
          isFree: true,
          duration: 25,
          content: `# Kubernetes Pods

Pod คือ **smallest deployable unit** ใน Kubernetes
Pod = group ของ containers ที่รันด้วยกัน แชร์ network และ storage

## Pod ≠ Container
- Pod อาจมีหลาย containers (sidecar pattern)
- Containers ใน Pod เดียวกัน communicate ผ่าน localhost
- Pod มี IP เดียว shared กันทุก containers

## Pod Lifecycle
\`\`\`
Pending → Running → Succeeded/Failed
\`\`\`

## Restart Policy
- \`Always\` (default): restart เสมอ
- \`OnFailure\`: restart เฉพาะเมื่อ fail
- \`Never\`: ไม่ restart

## Pod YAML Structure
\`\`\`yaml
apiVersion: v1
kind: Pod
metadata:
  name: my-pod
  labels:
    app: my-app
spec:
  containers:
  - name: main
    image: nginx:alpine
    ports:
    - containerPort: 80
\`\`\``,
          codeExamples: [
            {
              title: "สร้างและจัดการ Pods",
              language: "bash",
              code: `# สร้าง Pod จาก YAML
kubectl apply -f pod.yaml

# ดู pods
kubectl get pods
kubectl get pods -o wide  # ดู IP และ Node

# ดูรายละเอียด Pod
kubectl describe pod my-pod

# ดู logs
kubectl logs my-pod
kubectl logs -f my-pod  # follow

# exec เข้าไปใน pod
kubectl exec -it my-pod -- bash

# ลบ pod
kubectl delete pod my-pod
kubectl delete -f pod.yaml

# Port forward (สำหรับ test)
kubectl port-forward pod/my-pod 8080:80`,
              explanation: "kubectl คำสั่งสำหรับจัดการ Pods"
            }
          ]
        },
        {
          slug: "k8s-deployments",
          title: "Deployments: จัดการ Pods อย่างมีระบบ",
          isFree: false,
          duration: 30,
          content: `# Kubernetes Deployments

Deployment คือ higher-level object ที่จัดการ **ReplicaSet** และ **Pods**

## ทำไมใช้ Deployment แทน Pod ตรงๆ?
- **Self-healing**: Pod crash → สร้างใหม่อัตโนมัติ
- **Scaling**: เพิ่ม/ลด replicas ได้ง่าย
- **Rolling Update**: update โดยไม่ downtime
- **Rollback**: ย้อนกลับ version ได้

## Deployment → ReplicaSet → Pods
\`\`\`
Deployment
  └── ReplicaSet (v1)
        ├── Pod
        ├── Pod
        └── Pod
\`\`\`

## Update Strategies
- **RollingUpdate** (default): ค่อยๆ เปลี่ยน pod ทีละชุด
- **Recreate**: หยุดทั้งหมดก่อน แล้วสร้างใหม่ (มี downtime)`,
          codeExamples: [
            {
              title: "Deployment YAML",
              language: "yaml",
              code: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
  labels:
    app: my-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: my-app
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0
  template:
    metadata:
      labels:
        app: my-app
    spec:
      containers:
      - name: my-app
        image: my-app:v1.0
        ports:
        - containerPort: 3000
        resources:
          requests:
            memory: "64Mi"
            cpu: "250m"
          limits:
            memory: "128Mi"
            cpu: "500m"
        readinessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 5
          periodSeconds: 10
        livenessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 15
          periodSeconds: 20`,
              explanation: "Production-ready Deployment YAML"
            },
            {
              title: "จัดการ Deployments",
              language: "bash",
              code: `# Apply deployment
kubectl apply -f deployment.yaml

# ดู deployments
kubectl get deployments
kubectl rollout status deployment/my-app

# Scale
kubectl scale deployment my-app --replicas=5

# Update image
kubectl set image deployment/my-app my-app=my-app:v2.0

# ดู rollout history
kubectl rollout history deployment/my-app

# Rollback
kubectl rollout undo deployment/my-app
kubectl rollout undo deployment/my-app --to-revision=2`,
              explanation: "คำสั่งจัดการ Deployments"
            }
          ]
        }
      ]
    },
    {
      title: "บทที่ 2: Services และ Ingress",
      order: 2,
      lessons: [
        {
          slug: "k8s-services",
          title: "Services: Expose Pods ให้เข้าถึงได้",
          isFree: false,
          duration: 25,
          content: `# Kubernetes Services

Service คือ **stable endpoint** สำหรับเข้าถึง Pods
Pods มี IP เปลี่ยนได้ตลอด แต่ Service IP คงที่

## Service Types
| Type | ใช้เมื่อ |
|------|---------|
| **ClusterIP** | internal เท่านั้น (default) |
| **NodePort** | เข้าถึงจากภายนอกผ่าน node IP:port |
| **LoadBalancer** | สร้าง cloud load balancer |
| **ExternalName** | map ไปยัง DNS name ภายนอก |

## DNS ใน Kubernetes
\`\`\`
<service-name>.<namespace>.svc.cluster.local
my-api.default.svc.cluster.local
\`\`\`

Service ทำหน้าที่ **load balance** ระหว่าง pods ที่ match labels`,
          codeExamples: [
            {
              title: "Service YAML",
              language: "yaml",
              code: `# ClusterIP Service (internal)
apiVersion: v1
kind: Service
metadata:
  name: my-api
spec:
  type: ClusterIP
  selector:
    app: my-app
  ports:
  - port: 80
    targetPort: 3000

---
# NodePort Service (external access)
apiVersion: v1
kind: Service
metadata:
  name: my-api-external
spec:
  type: NodePort
  selector:
    app: my-app
  ports:
  - port: 80
    targetPort: 3000
    nodePort: 30080  # 30000-32767

---
# LoadBalancer (cloud)
apiVersion: v1
kind: Service
metadata:
  name: my-api-lb
spec:
  type: LoadBalancer
  selector:
    app: my-app
  ports:
  - port: 80
    targetPort: 3000`,
              explanation: "Service Types ต่างๆ ใน Kubernetes"
            }
          ]
        },
        {
          slug: "k8s-ingress",
          title: "Ingress: HTTP Routing และ SSL",
          isFree: false,
          duration: 25,
          content: `# Kubernetes Ingress

Ingress จัดการ **HTTP/HTTPS traffic** เข้า cluster
- URL-based routing
- SSL termination
- Name-based virtual hosting

## ต้องมี Ingress Controller ก่อน
- **nginx-ingress** (ยอดนิยม)
- **traefik**
- **AWS ALB Ingress Controller**

## Ingress vs Service LoadBalancer
- LoadBalancer: 1 IP = 1 Service (แพง)
- Ingress: 1 IP = หลาย Services ตาม path/host

## Path Types
- \`Prefix\`: /api → /api, /api/users
- \`Exact\`: /api → /api เท่านั้น`,
          codeExamples: [
            {
              title: "Ingress YAML พร้อม TLS",
              language: "yaml",
              code: `apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: my-ingress
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
    cert-manager.io/cluster-issuer: "letsencrypt-prod"
spec:
  ingressClassName: nginx
  tls:
  - hosts:
    - myapp.example.com
    secretName: myapp-tls
  rules:
  - host: myapp.example.com
    http:
      paths:
      - path: /api
        pathType: Prefix
        backend:
          service:
            name: api-service
            port:
              number: 80
      - path: /
        pathType: Prefix
        backend:
          service:
            name: frontend-service
            port:
              number: 80`,
              explanation: "Ingress routing พร้อม TLS certificate"
            }
          ]
        }
      ]
    },
    {
      title: "บทที่ 3: ConfigMaps, Secrets และ Storage",
      order: 3,
      lessons: [
        {
          slug: "k8s-configmaps-secrets",
          title: "ConfigMaps และ Secrets: จัดการ Configuration",
          isFree: false,
          duration: 25,
          content: `# ConfigMaps และ Secrets

## ConfigMap
เก็บ **non-sensitive config** เช่น URLs, feature flags

\`\`\`yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
data:
  APP_URL: "https://myapp.com"
  LOG_LEVEL: "info"
  config.json: |
    {
      "timeout": 30,
      "retries": 3
    }
\`\`\`

## Secret
เก็บ **sensitive data** (base64 encoded)

\`\`\`yaml
apiVersion: v1
kind: Secret
metadata:
  name: app-secrets
type: Opaque
data:
  DB_PASSWORD: c2VjcmV0  # base64("secret")
  API_KEY: bXlhcGlrZXk=
\`\`\`

## Inject ใน Pod
1. **Environment Variables**
2. **Volume Mounts** (เหมาะกับ config files)`,
          codeExamples: [
            {
              title: "ใช้ ConfigMap และ Secret ใน Pod",
              language: "yaml",
              code: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
spec:
  template:
    spec:
      containers:
      - name: my-app
        image: my-app:v1.0
        # จาก ConfigMap เป็น env vars
        envFrom:
        - configMapRef:
            name: app-config
        # จาก Secret เป็น env vars
        - secretRef:
            name: app-secrets
        # หรือ inject ทีละตัว
        env:
        - name: DB_HOST
          valueFrom:
            configMapKeyRef:
              name: app-config
              key: DB_HOST
        # Mount config file
        volumeMounts:
        - name: config-volume
          mountPath: /etc/config
      volumes:
      - name: config-volume
        configMap:
          name: app-config`,
              explanation: "Inject ConfigMap และ Secret เข้า Pod"
            },
            {
              title: "จัดการ ConfigMaps และ Secrets",
              language: "bash",
              code: `# สร้าง ConfigMap
kubectl create configmap app-config \\
  --from-literal=APP_URL=https://myapp.com \\
  --from-file=config.json

# สร้าง Secret
kubectl create secret generic app-secrets \\
  --from-literal=DB_PASSWORD=mysecretpassword

# ดู secrets (base64)
kubectl get secret app-secrets -o yaml

# Decode secret
kubectl get secret app-secrets -o jsonpath='{.data.DB_PASSWORD}' | base64 -d`,
              explanation: "คำสั่งจัดการ ConfigMaps และ Secrets"
            }
          ]
        },
        {
          slug: "k8s-persistent-storage",
          title: "Persistent Storage: PV, PVC, StorageClass",
          isFree: false,
          duration: 25,
          content: `# Kubernetes Persistent Storage

## Concepts
- **PersistentVolume (PV)**: storage ที่ provisioned แล้ว
- **PersistentVolumeClaim (PVC)**: request storage จาก pod
- **StorageClass**: dynamic provisioning

## Static vs Dynamic Provisioning
- **Static**: admin สร้าง PV → pod claim ผ่าน PVC
- **Dynamic**: StorageClass สร้าง PV อัตโนมัติเมื่อมี PVC

## Access Modes
| Mode | ความหมาย |
|------|---------|
| ReadWriteOnce (RWO) | node เดียว read/write |
| ReadOnlyMany (ROX) | หลาย nodes read-only |
| ReadWriteMany (RWX) | หลาย nodes read/write |

## Reclaim Policies
- **Retain**: ข้อมูลยังอยู่หลัง PVC ถูกลบ
- **Delete**: ลบ storage พร้อม PVC
- **Recycle**: ล้างข้อมูลแล้ว reuse`,
          codeExamples: [
            {
              title: "PVC สำหรับ Database",
              language: "yaml",
              code: `# PersistentVolumeClaim
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: postgres-pvc
spec:
  accessModes:
    - ReadWriteOnce
  storageClassName: standard
  resources:
    requests:
      storage: 10Gi

---
# Deployment ใช้ PVC
apiVersion: apps/v1
kind: Deployment
metadata:
  name: postgres
spec:
  replicas: 1
  selector:
    matchLabels:
      app: postgres
  template:
    metadata:
      labels:
        app: postgres
    spec:
      containers:
      - name: postgres
        image: postgres:15-alpine
        env:
        - name: POSTGRES_PASSWORD
          valueFrom:
            secretKeyRef:
              name: postgres-secret
              key: password
        ports:
        - containerPort: 5432
        volumeMounts:
        - name: postgres-storage
          mountPath: /var/lib/postgresql/data
      volumes:
      - name: postgres-storage
        persistentVolumeClaim:
          claimName: postgres-pvc`,
              explanation: "PVC สำหรับ PostgreSQL database"
            }
          ]
        }
      ]
    },
    {
      title: "บทที่ 4: Advanced Kubernetes",
      order: 4,
      lessons: [
        {
          slug: "k8s-namespaces-rbac",
          title: "Namespaces และ RBAC: Multi-tenancy",
          isFree: false,
          duration: 25,
          content: `# Namespaces และ RBAC

## Namespaces
แบ่ง cluster ออกเป็น **virtual clusters**

Default namespaces:
- \`default\` — สำหรับ resources ที่ไม่ระบุ namespace
- \`kube-system\` — Kubernetes system components
- \`kube-public\` — public resources
- \`kube-node-lease\` — node heartbeats

## RBAC (Role-Based Access Control)

4 objects หลัก:
1. **Role** — permissions ใน namespace เดียว
2. **ClusterRole** — permissions ทั้ง cluster
3. **RoleBinding** — bind Role ให้ user/group/serviceaccount
4. **ClusterRoleBinding** — bind ClusterRole

## Principle of Least Privilege
ให้ access เท่าที่จำเป็นเท่านั้น`,
          codeExamples: [
            {
              title: "RBAC สำหรับ Developer",
              language: "yaml",
              code: `# สร้าง namespace สำหรับทีม
apiVersion: v1
kind: Namespace
metadata:
  name: team-backend

---
# Role: developer สามารถ read/write pods, deployments
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  namespace: team-backend
  name: developer
rules:
- apiGroups: ["", "apps"]
  resources: ["pods", "deployments", "services", "configmaps"]
  verbs: ["get", "list", "watch", "create", "update", "patch"]
- apiGroups: [""]
  resources: ["pods/log"]
  verbs: ["get", "list"]

---
# RoleBinding: bind developer role ให้ user john
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: developer-binding
  namespace: team-backend
subjects:
- kind: User
  name: john
  apiGroup: rbac.authorization.k8s.io
roleRef:
  kind: Role
  name: developer
  apiGroup: rbac.authorization.k8s.io`,
              explanation: "RBAC สำหรับ developer access control"
            }
          ]
        },
        {
          slug: "k8s-helm",
          title: "Helm: Package Manager สำหรับ Kubernetes",
          isFree: false,
          duration: 30,
          content: `# Helm

Helm คือ **package manager** สำหรับ Kubernetes เหมือน npm สำหรับ Node.js
ช่วยจัดการ Kubernetes manifests ที่ซับซ้อนได้ง่ายขึ้น

## Concepts
- **Chart**: package ของ Kubernetes resources
- **Repository**: ที่เก็บ charts
- **Release**: instance ของ chart ที่ installed
- **values.yaml**: configuration สำหรับ chart

## Helm 3 (ไม่มี Tiller แล้ว)
Helm 3 ปลอดภัยกว่า ไม่ต้อง server-side component

## ทำไมใช้ Helm?
- ไม่ต้อง copy-paste YAML หลายสิบไฟล์
- Version control สำหรับ deployments
- Rollback ง่าย
- Template engine สำหรับ reuse`,
          codeExamples: [
            {
              title: "Helm Commands",
              language: "bash",
              code: `# ติดตั้ง Helm
curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash

# เพิ่ม repository
helm repo add stable https://charts.helm.sh/stable
helm repo add bitnami https://charts.bitnami.com/bitnami
helm repo update

# ค้นหา chart
helm search repo nginx
helm search hub wordpress

# Install chart
helm install my-nginx bitnami/nginx
helm install my-postgres bitnami/postgresql \\
  --set auth.postgresPassword=mypassword \\
  --set primary.persistence.size=20Gi

# ดู releases
helm list
helm status my-nginx

# Upgrade
helm upgrade my-nginx bitnami/nginx --set replicaCount=3

# Rollback
helm rollback my-nginx 1

# Uninstall
helm uninstall my-nginx`,
              explanation: "Helm commands พื้นฐาน"
            },
            {
              title: "สร้าง Helm Chart ของตัวเอง",
              language: "bash",
              code: `# สร้าง chart ใหม่
helm create my-app

# โครงสร้าง:
# my-app/
#   Chart.yaml          # metadata
#   values.yaml         # default values
#   templates/
#     deployment.yaml   # template
#     service.yaml
#     ingress.yaml
#     _helpers.tpl      # template helpers

# values.yaml
cat my-app/values.yaml

# Render templates (ไม่ deploy)
helm template my-app ./my-app

# Install จาก local chart
helm install my-release ./my-app

# Install พร้อม custom values
helm install my-release ./my-app \\
  --values custom-values.yaml \\
  --set image.tag=v2.0`,
              explanation: "สร้างและใช้ custom Helm chart"
            }
          ]
        },
        {
          slug: "k8s-hpa-monitoring",
          title: "HPA, Resource Management และ Monitoring",
          isFree: false,
          duration: 30,
          content: `# Auto-scaling และ Monitoring

## Horizontal Pod Autoscaler (HPA)
Scale pods อัตโนมัติตาม CPU/memory หรือ custom metrics

\`\`\`yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: my-app-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: my-app
  minReplicas: 2
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
\`\`\`

## Vertical Pod Autoscaler (VPA)
ปรับ resources requests/limits อัตโนมัติ

## Monitoring Stack
- **Prometheus**: metrics collection
- **Grafana**: visualization
- **Alertmanager**: alerts

## kubectl top
\`\`\`bash
kubectl top nodes
kubectl top pods
\`\`\``,
          codeExamples: [
            {
              title: "ติดตั้ง Prometheus + Grafana",
              language: "bash",
              code: `# เพิ่ม helm repo
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts

# ติดตั้ง kube-prometheus-stack
helm install monitoring prometheus-community/kube-prometheus-stack \\
  --namespace monitoring \\
  --create-namespace \\
  --set grafana.adminPassword=admin123

# ดู pods ที่ monitoring namespace
kubectl get pods -n monitoring

# Port-forward เข้า Grafana
kubectl port-forward -n monitoring svc/monitoring-grafana 3000:80

# Port-forward เข้า Prometheus
kubectl port-forward -n monitoring svc/monitoring-kube-prometheus-prometheus 9090:9090`,
              explanation: "ติดตั้ง monitoring stack ด้วย Helm"
            }
          ]
        }
      ]
    }
  ];

  await seedCourse(courseId, "Kubernetes Mastery", sections);
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPUTER NETWORKING
// ─────────────────────────────────────────────────────────────────────────────
async function seedNetworkCourse(courseId: string) {
  const sections = [
    {
      title: "บทที่ 1: พื้นฐานระบบเครือข่าย",
      order: 1,
      lessons: [
        {
          slug: "network-what-is-network",
          title: "ระบบเครือข่ายคืออะไร? LAN, WAN, Internet",
          isFree: true,
          duration: 15,
          content: `# ระบบเครือข่ายคอมพิวเตอร์

Network คือการเชื่อมต่อ **devices หลายชิ้น** เพื่อแลกเปลี่ยนข้อมูลกัน

## ประเภทของเครือข่าย
| ประเภท | ย่อมาจาก | ขนาด |
|--------|---------|------|
| **PAN** | Personal Area Network | รอบตัวเรา (Bluetooth) |
| **LAN** | Local Area Network | บ้าน/ออฟฟิศ |
| **MAN** | Metropolitan Area Network | เมือง |
| **WAN** | Wide Area Network | ประเทศ/โลก |
| **Internet** | Interconnected Networks | ทั่วโลก |

## Network Topology (รูปแบบการเชื่อมต่อ)
- **Star**: ทุก device เชื่อมกับ central switch
- **Bus**: devices เชื่อมกับสายเดียว
- **Ring**: devices เชื่อมเป็นวงกลม
- **Mesh**: devices เชื่อมกันทุกคู่
- **Hybrid**: ผสมหลายแบบ

## Network Devices
- **Hub**: ส่งต่อทุก packet ไปทุก port (เก่าแล้ว)
- **Switch**: ส่งต่อ packet ตาม MAC address
- **Router**: เชื่อม networks ต่างกัน routing ตาม IP
- **Firewall**: กรอง traffic ตาม rules
- **AP (Access Point)**: WiFi`,
          codeExamples: [
            {
              title: "ตรวจสอบ Network ด้วย Command Line",
              language: "bash",
              code: `# ดู network interfaces
ip addr show         # Linux
ipconfig             # Windows

# ดู routing table
ip route show        # Linux
route print          # Windows

# Ping test
ping google.com
ping -c 4 8.8.8.8   # Linux (4 packets)

# Traceroute
traceroute google.com    # Linux
tracert google.com       # Windows

# DNS lookup
nslookup google.com
dig google.com

# ดู active connections
ss -tuln             # Linux
netstat -an          # Windows`,
              explanation: "ตรวจสอบ network configuration และ connectivity"
            }
          ]
        },
        {
          slug: "network-osi-model",
          title: "OSI Model: 7 Layers ของระบบเครือข่าย",
          isFree: true,
          duration: 25,
          content: `# OSI Model (Open Systems Interconnection)

OSI Model แบ่งการสื่อสาร network ออกเป็น **7 ชั้น** เพื่อให้ทำความเข้าใจและแก้ปัญหาได้ง่าย

## 7 Layers (จากบนลงล่าง)

| Layer | ชื่อ | หน้าที่ | โปรโตคอล |
|-------|------|---------|---------|
| 7 | Application | User interface | HTTP, HTTPS, FTP, SMTP |
| 6 | Presentation | Encoding, Encryption | SSL/TLS, JPEG |
| 5 | Session | Connection management | NetBIOS |
| 4 | Transport | End-to-end delivery | TCP, UDP |
| 3 | Network | Routing, IP addressing | IP, ICMP, OSPF |
| 2 | Data Link | Frame delivery, MAC | Ethernet, WiFi |
| 1 | Physical | Bits on wire | Cable, Fiber, WiFi signal |

## จำง่ายๆ
**"All People Seem To Need Data Processing"**
(Application, Presentation, Session, Transport, Network, Data Link, Physical)

## Data Encapsulation
เมื่อส่งข้อมูล แต่ละชั้นเพิ่ม header:
\`\`\`
Data → Segment (L4) → Packet (L3) → Frame (L2) → Bits (L1)
\`\`\``,
          codeExamples: [
            {
              title: "OSI Layer ในทางปฏิบัติ",
              language: "bash",
              code: `# Layer 7 (Application): HTTP request
curl -v https://example.com

# Layer 4 (Transport): ดู TCP connections
ss -tn  # established TCP connections
ss -un  # UDP connections

# Layer 3 (Network): ดู IP และ routing
ip addr                    # IP addresses
ip route show              # routing table
traceroute 8.8.8.8        # path ไปยัง Google DNS

# Layer 2 (Data Link): ดู MAC addresses
arp -a                     # ARP table (IP→MAC mapping)
ip neigh show              # neighbor cache

# Capture packets (ต้องการ root)
tcpdump -i eth0 -n
tcpdump -i eth0 port 80 -A  # HTTP traffic`,
              explanation: "เครื่องมือตรวจสอบแต่ละ OSI Layer"
            }
          ]
        },
        {
          slug: "network-tcpip",
          title: "TCP/IP Protocol Suite",
          isFree: false,
          duration: 25,
          content: `# TCP/IP Protocol Suite

TCP/IP เป็น **model จริงที่ใช้งานบน Internet** (ต่างจาก OSI ที่เป็น theoretical)

## TCP/IP 4 Layers
| Layer | OSI เทียบเท่า | โปรโตคอล |
|-------|---------|---------|
| Application | 5-7 | HTTP, DNS, SMTP, FTP |
| Transport | 4 | TCP, UDP |
| Internet | 3 | IP, ICMP, ARP |
| Network Access | 1-2 | Ethernet, WiFi |

## TCP vs UDP

### TCP (Transmission Control Protocol)
- **Connection-oriented**: handshake ก่อนส่ง
- **Reliable**: รับประกันว่าถึง, ส่งซ้ำถ้า lost
- **Ordered**: ข้อมูลถึงตามลำดับ
- **Slower**: overhead สูง
- ใช้กับ: HTTP, email, file transfer

### UDP (User Datagram Protocol)
- **Connectionless**: ส่งทันที ไม่ handshake
- **Unreliable**: ไม่รับประกัน
- **Faster**: overhead น้อย
- ใช้กับ: Video streaming, gaming, DNS, VoIP

## TCP Three-Way Handshake
\`\`\`
Client → SYN → Server
Client ← SYN-ACK ← Server
Client → ACK → Server
[Connection Established]
\`\`\``,
          codeExamples: [
            {
              title: "TCP vs UDP ในทางปฏิบัติ",
              language: "bash",
              code: `# ดู TCP connections ที่ established
ss -tn state established

# ดู listening ports
ss -tlnp   # TCP listening
ss -ulnp   # UDP listening

# Test TCP connection
nc -zv google.com 443    # test HTTPS port
nc -zv google.com 80     # test HTTP port

# netcat server (TCP)
nc -l 8080               # เปิด TCP listener port 8080

# netcat client
nc localhost 8080        # connect

# ดู TCP handshake ด้วย tcpdump
tcpdump -i any 'tcp[tcpflags] & (tcp-syn|tcp-fin) != 0'`,
              explanation: "ตรวจสอบ TCP/UDP connections"
            }
          ]
        }
      ]
    },
    {
      title: "บทที่ 2: IP Addressing และ Subnetting",
      order: 2,
      lessons: [
        {
          slug: "network-ip-addressing",
          title: "IP Address: IPv4 และ IPv6",
          isFree: false,
          duration: 25,
          content: `# IP Addresses

IP Address คือ **ที่อยู่** ของ device บน network

## IPv4
- 32-bit number แสดงเป็น 4 octets: \`192.168.1.100\`
- ทั้งหมด ~4.3 พันล้าน addresses
- หมดแล้วตั้งแต่ปี 2011

### IPv4 Classes (เก่า ไม่ค่อยใช้แล้ว)
| Class | Range | ใช้กับ |
|-------|-------|-------|
| A | 1.0.0.0 - 126.255.255.255 | ใหญ่มาก |
| B | 128.0.0.0 - 191.255.255.255 | กลาง |
| C | 192.0.0.0 - 223.255.255.255 | เล็ก |

### Private IP Ranges (RFC 1918)
- \`10.0.0.0/8\` — Class A private
- \`172.16.0.0/12\` — Class B private
- \`192.168.0.0/16\` — Class C private

## IPv6
- 128-bit แสดงเป็น hex: \`2001:0db8:85a3::8a2e:0370:7334\`
- 340 undecillion addresses
- ไม่ต้องใช้ NAT
- Built-in security (IPsec)`,
          codeExamples: [
            {
              title: "ตรวจสอบ IP Addresses",
              language: "bash",
              code: `# ดู IP addresses ทั้งหมด
ip addr show
ip -4 addr   # IPv4 เท่านั้น
ip -6 addr   # IPv6 เท่านั้น

# ดู public IP
curl ifconfig.me
curl api.ipify.org

# ดู IP info
curl ipinfo.io/8.8.8.8

# Set static IP (Linux, temporary)
sudo ip addr add 192.168.1.100/24 dev eth0

# ดู interface details
ip link show
ethtool eth0`,
              explanation: "ตรวจสอบ IP addressing ด้วย Linux commands"
            }
          ]
        },
        {
          slug: "network-subnetting",
          title: "Subnetting: แบ่ง Network ย่อย",
          isFree: false,
          duration: 30,
          content: `# Subnetting

Subnetting คือการแบ่ง **network ใหญ่** เป็น networks ย่อยๆ

## Subnet Mask
บอกว่า bits ไหนเป็น Network portion และ Host portion

\`\`\`
IP:      192.168.1.100  = 11000000.10101000.00000001.01100100
Mask:    255.255.255.0  = 11111111.11111111.11111111.00000000
Network: 192.168.1.0
Host:    .100
\`\`\`

## CIDR Notation
\`192.168.1.0/24\` = subnet mask มี 24 bits เป็น 1

| CIDR | Subnet Mask | Hosts |
|------|-------------|-------|
| /24 | 255.255.255.0 | 254 |
| /25 | 255.255.255.128 | 126 |
| /26 | 255.255.255.192 | 62 |
| /27 | 255.255.255.224 | 30 |
| /28 | 255.255.255.240 | 14 |
| /30 | 255.255.255.252 | 2 |

## VLSM (Variable Length Subnet Masking)
ใช้ subnet ขนาดต่างกันให้เหมาะกับแต่ละ network

## Special Addresses
- **Network address**: host bits = 0 (192.168.1.**0**)
- **Broadcast**: host bits = 1 (192.168.1.**255**)
- **Usable hosts**: 2^n - 2`,
          codeExamples: [
            {
              title: "Subnet Calculation",
              language: "bash",
              code: `# ipcalc - คำนวณ subnet (ต้องติดตั้งก่อน)
ipcalc 192.168.1.0/24
ipcalc 10.0.0.0/8

# Python subnet calculator
python3 - <<'EOF'
import ipaddress

# วิเคราะห์ network
network = ipaddress.ip_network('192.168.1.0/24')
print(f"Network: {network.network_address}")
print(f"Broadcast: {network.broadcast_address}")
print(f"Netmask: {network.netmask}")
print(f"Hosts: {network.num_addresses - 2}")
print(f"First host: {list(network.hosts())[0]}")
print(f"Last host: {list(network.hosts())[-1]}")

# แบ่ง subnet
for subnet in network.subnets(prefixlen_diff=2):
    print(subnet)
EOF`,
              explanation: "คำนวณ subnets ด้วย ipcalc และ Python"
            }
          ]
        }
      ]
    },
    {
      title: "บทที่ 3: DNS, HTTP และ Application Layer",
      order: 3,
      lessons: [
        {
          slug: "network-dns",
          title: "DNS: ระบบแปลงชื่อ Domain เป็น IP",
          isFree: false,
          duration: 25,
          content: `# DNS (Domain Name System)

DNS คือ **"สมุดโทรศัพท์" ของ Internet** แปลง domain names เป็น IP addresses

## DNS Resolution Process
\`\`\`
Browser → DNS Cache → OS Cache → Recursive Resolver
       → Root Nameserver → TLD Nameserver (.com)
       → Authoritative Nameserver → IP Address
\`\`\`

## DNS Record Types
| Record | หน้าที่ | ตัวอย่าง |
|--------|---------|---------|
| **A** | domain → IPv4 | example.com → 93.184.216.34 |
| **AAAA** | domain → IPv6 | example.com → 2606:28... |
| **CNAME** | alias | www → example.com |
| **MX** | mail server | example.com → mail.example.com |
| **TXT** | text info | SPF, DKIM, verification |
| **NS** | nameservers | example.com NS ns1.example.com |
| **PTR** | reverse DNS | IP → domain |
| **SOA** | zone authority | zone settings |

## TTL (Time To Live)
บอกว่า DNS cache ได้นานแค่ไหน (วินาที)
- ค่าน้อย = update เร็ว แต่ query มาก
- ค่ามาก = cache นาน แต่ update ช้า`,
          codeExamples: [
            {
              title: "DNS Tools",
              language: "bash",
              code: `# nslookup
nslookup google.com
nslookup google.com 8.8.8.8   # ใช้ Google DNS

# dig (ละเอียดกว่า)
dig google.com
dig google.com A               # A record เท่านั้น
dig google.com MX              # mail records
dig google.com +short          # แสดงแค่ IP
dig @8.8.8.8 google.com       # ใช้ specific nameserver

# Reverse DNS lookup
dig -x 8.8.8.8

# ดู DNS cache
# Linux systemd-resolved:
resolvectl statistics
resolvectl query google.com

# flush DNS cache
# Linux: sudo systemd-resolve --flush-caches
# Windows: ipconfig /flushdns
# macOS: sudo dscacheutil -flushcache

# ดู local DNS config
cat /etc/resolv.conf`,
              explanation: "เครื่องมือตรวจสอบ DNS"
            }
          ]
        },
        {
          slug: "network-http-https",
          title: "HTTP/HTTPS: โปรโตคอลหลักของ Web",
          isFree: false,
          duration: 30,
          content: `# HTTP และ HTTPS

HTTP (HyperText Transfer Protocol) คือโปรโตคอลที่ browser และ web server ใช้สื่อสาร

## HTTP Methods
| Method | หน้าที่ | มี Body? |
|--------|---------|---------|
| GET | ดึงข้อมูล | ไม่มี |
| POST | ส่งข้อมูล/สร้าง | มี |
| PUT | แทนที่ทั้งหมด | มี |
| PATCH | แก้ไขบางส่วน | มี |
| DELETE | ลบ | ไม่มี |
| HEAD | เหมือน GET แต่ไม่มี body | ไม่มี |
| OPTIONS | ถามว่า methods ไหนรองรับ | ไม่มี |

## HTTP Status Codes
| Range | ความหมาย |
|-------|---------|
| 1xx | Informational |
| 2xx | Success (200 OK, 201 Created) |
| 3xx | Redirect (301 Moved, 302 Found) |
| 4xx | Client Error (400 Bad Request, 401 Unauthorized, 404 Not Found) |
| 5xx | Server Error (500 Internal Server Error, 503 Service Unavailable) |

## HTTP vs HTTPS
- HTTP: plain text, port 80
- HTTPS: encrypted (TLS/SSL), port 443

## HTTP/1.1 vs HTTP/2 vs HTTP/3
- **HTTP/1.1**: 1 request per connection, text-based
- **HTTP/2**: multiplexing, header compression, binary
- **HTTP/3**: UDP-based (QUIC), faster handshake`,
          codeExamples: [
            {
              title: "HTTP ด้วย curl",
              language: "bash",
              code: `# GET request
curl https://api.github.com/users/octocat

# POST request พร้อม JSON
curl -X POST https://api.example.com/users \\
  -H "Content-Type: application/json" \\
  -d '{"name":"John","email":"john@example.com"}'

# ดู response headers
curl -I https://google.com

# ดูทั้ง request และ response headers
curl -v https://google.com

# follow redirects
curl -L http://google.com

# ส่ง auth token
curl -H "Authorization: Bearer mytoken" \\
  https://api.example.com/profile

# ดู HTTP version
curl --http2 -v https://example.com 2>&1 | grep "< HTTP"
curl --http3 https://example.com`,
              explanation: "ทดสอบ HTTP requests ด้วย curl"
            }
          ]
        },
        {
          slug: "network-tls-ssl",
          title: "TLS/SSL: การเข้ารหัส HTTPS",
          isFree: false,
          duration: 25,
          content: `# TLS/SSL

TLS (Transport Layer Security) คือโปรโตคอลที่ทำให้ HTTP กลายเป็น **HTTPS**

## TLS Handshake (TLS 1.3)
\`\`\`
1. Client Hello (supported cipher suites, random)
2. Server Hello (chosen cipher, certificate, random)
3. Certificate verification (client ตรวจ cert)
4. Key exchange → shared secret
5. Encrypted communication
\`\`\`

## SSL/TLS Certificates
- **DV (Domain Validation)**: ตรวจแค่ว่า control domain
- **OV (Organization Validation)**: ตรวจ organization ด้วย
- **EV (Extended Validation)**: ตรวจละเอียดที่สุด

## Certificate Authority (CA)
- Let's Encrypt (ฟรี, automated)
- DigiCert, Comodo (เสียเงิน)

## Self-signed Certificate
สำหรับ development/internal เท่านั้น

## Perfect Forward Secrecy (PFS)
แม้ private key ถูก compromise session keys เก่าก็ยังปลอดภัย`,
          codeExamples: [
            {
              title: "ตรวจสอบ TLS Certificates",
              language: "bash",
              code: `# ดู certificate ของ website
openssl s_client -connect google.com:443 </dev/null

# ดูรายละเอียด certificate
echo | openssl s_client -connect google.com:443 2>/dev/null \\
  | openssl x509 -noout -text

# ดูวันหมดอายุ
echo | openssl s_client -connect google.com:443 2>/dev/null \\
  | openssl x509 -noout -dates

# สร้าง self-signed certificate (development)
openssl req -x509 -newkey rsa:4096 \\
  -keyout key.pem -out cert.pem \\
  -days 365 -nodes \\
  -subj "/CN=localhost"

# Let's Encrypt ด้วย certbot
sudo certbot --nginx -d example.com -d www.example.com

# ดู cipher suites ที่รองรับ
nmap --script ssl-enum-ciphers -p 443 google.com`,
              explanation: "ตรวจสอบและจัดการ TLS certificates"
            }
          ]
        }
      ]
    },
    {
      title: "บทที่ 4: Network Security",
      order: 4,
      lessons: [
        {
          slug: "network-firewall",
          title: "Firewall: ปกป้อง Network",
          isFree: false,
          duration: 25,
          content: `# Firewall

Firewall คือ **ระบบกรอง network traffic** ตาม rules ที่กำหนด

## ประเภท Firewall
1. **Packet Filter**: ตรวจ IP, port, protocol (Layer 3-4)
2. **Stateful Inspection**: track connections state
3. **Application Firewall (WAF)**: ตรวจ HTTP content (Layer 7)
4. **Next-Gen Firewall (NGFW)**: รวมทุกอย่าง + DPI, IPS

## Firewall Rules
\`\`\`
Direction: INBOUND / OUTBOUND
Protocol: TCP / UDP / ICMP / ANY
Source IP: specific IP / range / ANY
Destination Port: 80, 443, 22 / range
Action: ALLOW / DENY / DROP
\`\`\`

## iptables (Linux)
\`\`\`
Tables: filter, nat, mangle
Chains: INPUT, OUTPUT, FORWARD
\`\`\`

## ufw (Uncomplicated Firewall)
Frontend สำหรับ iptables ที่ใช้ง่ายกว่า`,
          codeExamples: [
            {
              title: "ตั้งค่า Firewall ด้วย ufw",
              language: "bash",
              code: `# ดู status
sudo ufw status verbose

# เปิดใช้งาน
sudo ufw enable

# Default policies
sudo ufw default deny incoming
sudo ufw default allow outgoing

# Allow specific ports
sudo ufw allow 22/tcp      # SSH
sudo ufw allow 80/tcp      # HTTP
sudo ufw allow 443/tcp     # HTTPS
sudo ufw allow 5432/tcp    # PostgreSQL

# Allow from specific IP
sudo ufw allow from 192.168.1.0/24

# Allow range
sudo ufw allow 8000:9000/tcp

# ลบ rule
sudo ufw delete allow 8080

# ดู numbered rules
sudo ufw status numbered
sudo ufw delete 3

# iptables ขั้นสูง
sudo iptables -L -n -v        # ดู rules
sudo iptables -A INPUT -p tcp --dport 80 -j ACCEPT
sudo iptables -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT`,
              explanation: "ตั้งค่า firewall ด้วย ufw และ iptables"
            }
          ]
        },
        {
          slug: "network-vpn-security",
          title: "VPN และ Network Security Advanced",
          isFree: false,
          duration: 30,
          content: `# VPN และ Network Security

## VPN (Virtual Private Network)

VPN สร้าง **encrypted tunnel** ผ่าน internet ราวกับว่าอยู่ใน private network เดียวกัน

### ประเภท VPN
- **Site-to-Site**: เชื่อม 2 offices
- **Remote Access**: user เข้า corporate network
- **SSL VPN**: ผ่าน browser (HTTPS)

### VPN Protocols
| Protocol | ความปลอดภัย | Speed | ใช้กับ |
|----------|------------|-------|-------|
| OpenVPN | สูง | กลาง | ทั่วไป |
| WireGuard | สูงมาก | เร็ว | Modern |
| IPSec/IKEv2 | สูง | เร็ว | Mobile |
| L2TP/IPSec | กลาง | ปานกลาง | Legacy |

## Common Network Attacks
- **DDoS**: flood traffic ทำให้ service ล่ม
- **Man-in-the-Middle**: แทรกกลางการสื่อสาร
- **ARP Spoofing**: แอบอ้าง MAC address
- **DNS Poisoning**: ส่ง DNS response ปลอม
- **Port Scanning**: สแกนหา open ports
- **Packet Sniffing**: ดักจับ traffic

## Defense in Depth
ป้องกันหลายชั้น:
1. Perimeter firewall
2. Network segmentation (VLANs)
3. Intrusion Detection System (IDS)
4. Endpoint security
5. Encryption
6. Monitoring และ Logging`,
          codeExamples: [
            {
              title: "ติดตั้ง WireGuard VPN",
              language: "bash",
              code: `# ติดตั้ง WireGuard (Ubuntu)
sudo apt install wireguard

# สร้าง key pair บน server
wg genkey | tee server_private.key | wg pubkey > server_public.key

# สร้าง key pair บน client
wg genkey | tee client_private.key | wg pubkey > client_public.key

# Server config /etc/wireguard/wg0.conf
cat > /etc/wireguard/wg0.conf << EOF
[Interface]
Address = 10.0.0.1/24
ListenPort = 51820
PrivateKey = $(cat server_private.key)
PostUp = iptables -A FORWARD -i %i -j ACCEPT; iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE
PostDown = iptables -D FORWARD -i %i -j ACCEPT; iptables -t nat -D POSTROUTING -o eth0 -j MASQUERADE

[Peer]
PublicKey = $(cat client_public.key)
AllowedIPs = 10.0.0.2/32
EOF

# เริ่ม WireGuard
sudo systemctl enable wg-quick@wg0
sudo systemctl start wg-quick@wg0

# ดู status
sudo wg show`,
              explanation: "ติดตั้งและตั้งค่า WireGuard VPN server"
            },
            {
              title: "Network Security Tools",
              language: "bash",
              code: `# nmap - port scanner
nmap -sV localhost              # scan localhost
nmap -p 80,443,22 example.com  # scan specific ports
nmap -A -T4 192.168.1.0/24    # aggressive scan ทั้ง subnet

# Wireshark / tshark - packet analyzer
tshark -i eth0 -f "port 80"   # capture HTTP
tshark -i eth0 -w capture.pcap  # บันทึก file

# ดู open ports
ss -tlnp   # TCP listening
ss -ulnp   # UDP listening

# Fail2ban - block brute force
sudo apt install fail2ban
sudo systemctl start fail2ban
sudo fail2ban-client status sshd

# ดู suspicious connections
ss -tn | grep ESTABLISHED
netstat -an | grep LISTEN`,
              explanation: "Security tools สำหรับ network monitoring"
            }
          ]
        },
        {
          slug: "network-load-balancing",
          title: "Load Balancing และ High Availability",
          isFree: false,
          duration: 25,
          content: `# Load Balancing

Load Balancer กระจาย traffic ไปยัง **หลาย servers** เพื่อ performance และ availability

## Load Balancing Algorithms
| Algorithm | ลักษณะ | เมื่อใช้ |
|-----------|--------|---------|
| **Round Robin** | เวียนทั่ว | servers เหมือนกัน |
| **Least Connections** | server ที่ว่างที่สุด | sessions ยาว |
| **IP Hash** | user เดิม → server เดิม | sticky sessions |
| **Weighted** | server แรงกว่าได้มากกว่า | hardware ต่างกัน |
| **Random** | สุ่ม | เหมือน Round Robin |

## L4 vs L7 Load Balancing
- **L4 (Transport)**: ดู IP:Port เท่านั้น เร็ว
- **L7 (Application)**: ดู HTTP headers, cookies ได้ ยืดหยุ่นกว่า

## High Availability (HA)
- **Active-Passive**: standby server คอยอยู่
- **Active-Active**: ทั้งคู่ทำงาน

## Health Checks
LB ต้อง check ว่า server ยังทำงานอยู่:
\`\`\`
TCP check: เชื่อมต่อได้ไหม
HTTP check: GET /health → 200 OK
\`\`\``,
          codeExamples: [
            {
              title: "Nginx Load Balancer",
              language: "bash",
              code: `# nginx.conf - upstream load balancing
cat > /etc/nginx/nginx.conf << 'EOF'
http {
  # กำหนด upstream servers
  upstream backend {
    least_conn;  # least connections algorithm

    server backend1.example.com:3000 weight=3;
    server backend2.example.com:3000 weight=1;
    server backend3.example.com:3000 backup;  # failover เท่านั้น

    keepalive 32;
  }

  server {
    listen 80;
    server_name example.com;

    location / {
      proxy_pass http://backend;
      proxy_set_header Host $host;
      proxy_set_header X-Real-IP $remote_addr;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

      # Health check timeout
      proxy_connect_timeout 5s;
      proxy_read_timeout 30s;
    }

    location /health {
      access_log off;
      return 200 "healthy\\n";
    }
  }
}
EOF

# reload nginx
sudo nginx -t
sudo systemctl reload nginx

# ดู nginx status
sudo nginx -s status`,
              explanation: "ตั้งค่า Nginx เป็น Load Balancer"
            }
          ]
        }
      ]
    }
  ];

  await seedCourse(courseId, "Network Fundamentals", sections);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
