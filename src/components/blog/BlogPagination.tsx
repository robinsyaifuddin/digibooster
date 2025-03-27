
import React from 'react';
import { Button } from '@/components/ui/button';

const BlogPagination = () => {
  return (
    <div className="flex justify-center mt-12">
      <Button variant="outline" className="mr-2" disabled>
        Sebelumnya
      </Button>
      <Button variant="outline" className="bg-digiblue-600 text-white">
        1
      </Button>
      <Button variant="outline" className="ml-2">
        Selanjutnya
      </Button>
    </div>
  );
};

export default BlogPagination;
