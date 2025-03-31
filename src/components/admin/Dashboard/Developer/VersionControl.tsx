
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GitBranch, GitCommit, GitMerge, GitPullRequest, AlertCircle, Clock, Check, X, RotateCw } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useImplementationSettings } from "@/hooks/useImplementationSettings";
import { motion } from "framer-motion";

interface Commit {
  id: string;
  message: string;
  author: string;
  date: string;
  branch: string;
  status: 'deployed' | 'pending' | 'failed';
}

interface Branch {
  name: string;
  lastCommit: string;
  lastCommitDate: string;
  commits: number;
  author: string;
  isProtected: boolean;
  status: 'active' | 'stale' | 'deprecated';
}

const VersionControl = () => {
  const { toast } = useToast();
  const { isRealImplementation } = useImplementationSettings();
  const [activeTab, setActiveTab] = useState("history");
  
  // Sample data
  const sampleCommits: Commit[] = [
    {
      id: 'abcd123',
      message: 'Update homepage content and layout',
      author: 'Ahmad Fauzi',
      date: '31 Mar 2025, 14:32',
      branch: 'main',
      status: 'deployed'
    },
    {
      id: 'efgh456',
      message: 'Fix responsiveness issues on mobile devices',
      author: 'Siti Aminah',
      date: '30 Mar 2025, 16:45',
      branch: 'fix/mobile-layout',
      status: 'deployed'
    },
    {
      id: 'ijkl789',
      message: 'Add new services section to homepage',
      author: 'Budi Santoso',
      date: '29 Mar 2025, 09:12',
      branch: 'feature/new-services',
      status: 'deployed'
    },
    {
      id: 'mnop012',
      message: 'Update footer design and copyright information',
      author: 'Ahmad Fauzi',
      date: '28 Mar 2025, 11:30',
      branch: 'main',
      status: 'deployed'
    },
    {
      id: 'qrst345',
      message: 'Implement new blog post layout',
      author: 'Siti Aminah',
      date: '27 Mar 2025, 15:22',
      branch: 'feature/blog-redesign',
      status: 'deployed'
    },
    {
      id: 'uvwx678',
      message: 'Fix navigation menu dropdown issue',
      author: 'Budi Santoso',
      date: '26 Mar 2025, 10:05',
      branch: 'fix/nav-menu',
      status: 'deployed'
    },
    {
      id: 'yz12345',
      message: 'Add contact form validation',
      author: 'Ahmad Fauzi',
      date: '25 Mar 2025, 14:18',
      branch: 'feature/contact-validation',
      status: 'deployed'
    }
  ];
  
  const branches: Branch[] = [
    {
      name: 'main',
      lastCommit: 'Update homepage content and layout',
      lastCommitDate: '31 Mar 2025',
      commits: 24,
      author: 'Ahmad Fauzi',
      isProtected: true,
      status: 'active'
    },
    {
      name: 'develop',
      lastCommit: 'Merge pull request #15 from feature/blog-redesign',
      lastCommitDate: '30 Mar 2025',
      commits: 36,
      author: 'Siti Aminah',
      isProtected: true,
      status: 'active'
    },
    {
      name: 'feature/blog-redesign',
      lastCommit: 'Implement new blog post layout',
      lastCommitDate: '27 Mar 2025',
      commits: 8,
      author: 'Siti Aminah',
      isProtected: false,
      status: 'active'
    },
    {
      name: 'feature/contact-validation',
      lastCommit: 'Add contact form validation',
      lastCommitDate: '25 Mar 2025',
      commits: 4,
      author: 'Ahmad Fauzi',
      isProtected: false,
      status: 'active'
    },
    {
      name: 'fix/mobile-layout',
      lastCommit: 'Fix responsiveness issues on mobile devices',
      lastCommitDate: '30 Mar 2025',
      commits: 3,
      author: 'Siti Aminah',
      isProtected: false,
      status: 'stale'
    }
  ];
  
  const pullRequests = [
    {
      id: 'PR-23',
      title: 'Add testimonials carousel to homepage',
      author: 'Budi Santoso',
      source: 'feature/testimonials',
      target: 'develop',
      created: '31 Mar 2025',
      status: 'open',
      comments: 3,
      commits: 5
    },
    {
      id: 'PR-22',
      title: 'Optimize image loading performance',
      author: 'Ahmad Fauzi',
      source: 'fix/image-optimization',
      target: 'main',
      created: '30 Mar 2025',
      status: 'merged',
      comments: 1,
      commits: 2
    },
    {
      id: 'PR-21',
      title: 'Update about page content',
      author: 'Siti Aminah',
      source: 'feature/about-update',
      target: 'develop',
      created: '28 Mar 2025',
      status: 'merged',
      comments: 4,
      commits: 3
    }
  ];
  
  const checkoutBranch = (branchName: string) => {
    toast({
      title: `Beralih ke branch "${branchName}"`,
      description: "Branch berhasil di-checkout.",
    });
  };
  
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4 }
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Version Control</h2>
          <p className="text-muted-foreground">
            Manajemen kode dan riwayat perubahan website
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <GitBranch className="h-4 w-4" />
            <span>New Branch</span>
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <GitCommit className="h-4 w-4" />
            <span>Commit</span>
          </Button>
          <Button className="gap-2">
            <GitPullRequest className="h-4 w-4" />
            <span>New PR</span>
          </Button>
        </div>
      </div>
      
      {!isRealImplementation && (
        <div className="flex items-center gap-2 bg-blue-50 text-blue-800 p-3 rounded-md border border-blue-200">
          <AlertCircle className="h-4 w-4" />
          <span className="text-sm">
            Fitur version control adalah simulasi untuk tujuan demonstrasi. Untuk mengintegrasikan dengan Git, perlu konfigurasi lebih lanjut.
          </span>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Branch</p>
                <h2 className="text-3xl font-bold">{branches.length}</h2>
              </div>
              <div className="p-2 bg-blue-100 text-blue-700 rounded-full">
                <GitBranch className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-2 text-sm text-muted-foreground">
              <span className="text-blue-600 font-medium">2</span> branch aktif dikembangkan
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Commits</p>
                <h2 className="text-3xl font-bold">{sampleCommits.length}</h2>
              </div>
              <div className="p-2 bg-green-100 text-green-700 rounded-full">
                <GitCommit className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-2 text-sm text-muted-foreground">
              <span className="text-green-600 font-medium">3</span> commits dalam minggu ini
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pull Requests</p>
                <h2 className="text-3xl font-bold">{pullRequests.length}</h2>
              </div>
              <div className="p-2 bg-purple-100 text-purple-700 rounded-full">
                <GitPullRequest className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-2 text-sm text-muted-foreground">
              <span className="text-purple-600 font-medium">1</span> PR menunggu review
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Deployed</p>
                <h2 className="text-3xl font-bold">v1.2.3</h2>
              </div>
              <div className="p-2 bg-amber-100 text-amber-700 rounded-full">
                <RotateCw className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-2 text-sm text-muted-foreground">
              <span className="text-amber-600 font-medium">12</span> jam yang lalu
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 w-full md:w-auto">
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="branches">Branches</TabsTrigger>
          <TabsTrigger value="pullrequests">Pull Requests</TabsTrigger>
        </TabsList>
        
        <TabsContent value="history" className="pt-4">
          <motion.div 
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 gap-6"
          >
            <Card>
              <CardHeader>
                <CardTitle>Commit History</CardTitle>
                <CardDescription>
                  Riwayat perubahan kode website
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Commit</TableHead>
                      <TableHead>Author</TableHead>
                      <TableHead>Branch</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sampleCommits.map((commit, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <div className="flex flex-col">
                            <span className="font-mono text-xs text-gray-500">{commit.id}</span>
                            <span className="font-medium">{commit.message}</span>
                          </div>
                        </TableCell>
                        <TableCell>{commit.author}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <GitBranch className="h-3 w-3 text-blue-600" />
                            <span>{commit.branch}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1 text-gray-500">
                            <Clock className="h-3 w-3" />
                            <span>{commit.date}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          {commit.status === 'deployed' ? (
                            <Badge className="bg-green-100 text-green-800">Deployed</Badge>
                          ) : commit.status === 'pending' ? (
                            <Badge className="bg-amber-100 text-amber-800">Pending</Badge>
                          ) : (
                            <Badge className="bg-red-100 text-red-800">Failed</Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="ml-auto">
                  View All Commits
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </TabsContent>
        
        <TabsContent value="branches" className="pt-4">
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 gap-6"
          >
            <Card>
              <CardHeader>
                <CardTitle>Branches</CardTitle>
                <CardDescription>
                  Daftar branch aktif dan status pengembangan
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Last Commit</TableHead>
                      <TableHead>Author</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {branches.map((branch, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <GitBranch className="h-4 w-4 text-blue-600" />
                            <span className="font-medium">{branch.name}</span>
                            {branch.isProtected && (
                              <Badge variant="outline" className="ml-2 text-xs">Protected</Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span className="text-sm">{branch.lastCommit}</span>
                            <span className="text-xs text-gray-500">{branch.lastCommitDate} ({branch.commits} commits)</span>
                          </div>
                        </TableCell>
                        <TableCell>{branch.author}</TableCell>
                        <TableCell>
                          {branch.status === 'active' ? (
                            <Badge className="bg-green-100 text-green-800">Active</Badge>
                          ) : branch.status === 'stale' ? (
                            <Badge className="bg-amber-100 text-amber-800">Stale</Badge>
                          ) : (
                            <Badge className="bg-red-100 text-red-800">Deprecated</Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" onClick={() => checkoutBranch(branch.name)}>
                              Checkout
                            </Button>
                            <Button variant="outline" size="sm">
                              Merge
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
        
        <TabsContent value="pullrequests" className="pt-4">
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 gap-6"
          >
            <Card>
              <CardHeader>
                <CardTitle>Pull Requests</CardTitle>
                <CardDescription>
                  Permintaan penggabungan kode
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Author</TableHead>
                      <TableHead>Source → Target</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pullRequests.map((pr, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-mono text-sm">{pr.id}</TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span className="font-medium">{pr.title}</span>
                            <span className="text-xs text-gray-500">Created {pr.created}</span>
                          </div>
                        </TableCell>
                        <TableCell>{pr.author}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <span className="text-blue-600">{pr.source}</span>
                            <GitMerge className="h-3 w-3" />
                            <span className="text-purple-600">{pr.target}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          {pr.status === 'open' ? (
                            <Badge className="bg-green-100 text-green-800">Open</Badge>
                          ) : pr.status === 'merged' ? (
                            <Badge className="bg-purple-100 text-purple-800">Merged</Badge>
                          ) : (
                            <Badge className="bg-red-100 text-red-800">Closed</Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            {pr.status === 'open' ? (
                              <>
                                <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                                  <Check className="h-4 w-4 text-green-600" />
                                </Button>
                                <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                                  <X className="h-4 w-4 text-red-600" />
                                </Button>
                              </>
                            ) : (
                              <Button variant="outline" size="sm">
                                View
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default VersionControl;
