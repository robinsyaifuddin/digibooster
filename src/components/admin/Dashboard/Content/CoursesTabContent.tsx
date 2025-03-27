
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import CoursesGrid from "./CoursesGrid";
import { TabsContent } from "@/components/ui/tabs";

interface CourseProps {
  id: number;
  title: string;
  students: number;
  lessons: number;
  level: string;
}

interface CoursesTabContentProps {
  courses: CourseProps[];
}

const CoursesTabContent = ({ courses }: CoursesTabContentProps) => {
  return (
    <TabsContent value="courses">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4">
        <h3 className="text-lg font-semibold">Kelas</h3>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Tambah Kelas
        </Button>
      </div>
      
      <CoursesGrid courses={courses} />
    </TabsContent>
  );
};

export default CoursesTabContent;
