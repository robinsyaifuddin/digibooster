
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface CourseProps {
  id: number;
  title: string;
  students: number;
  lessons: number;
  level: string;
}

interface CoursesGridProps {
  courses: CourseProps[];
}

const CoursesGrid = ({ courses }: CoursesGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course) => (
        <Card key={course.id} className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-base">{course.title}</CardTitle>
            <CardDescription>
              {course.students} siswa terdaftar
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between text-sm">
              <span>{course.lessons} pelajaran</span>
              <span className={`px-2 py-1 rounded-full text-xs ${
                course.level === 'Pemula' ? 'bg-green-100 text-green-800' :
                course.level === 'Menengah' ? 'bg-blue-100 text-blue-800' :
                'bg-purple-100 text-purple-800'
              }`}>
                {course.level}
              </span>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="ghost" size="sm">Lihat Detail</Button>
            <Button variant="outline" size="sm">Edit</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default CoursesGrid;
