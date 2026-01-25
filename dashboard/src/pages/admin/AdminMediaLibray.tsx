import { useState } from "react";
import { Upload, Search, Grid3x3, List, Trash2, Download, Eye, ImageIcon, Film, File } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import AdminLayout from "../../components/admin/AdminLayout";

interface MediaFile {
  id: string;
  name: string;
  type: "image" | "video" | "document";
  url: string;
  size: number;
  uploadedAt: string;
  dimensions?: { width: number; height: number };
}

const AdminMediaLibrary = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedFile, setSelectedFile] = useState<MediaFile | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<Set<string>>(new Set());
  const [filterType, setFilterType] = useState<"all" | "image" | "video" | "document">("all");

  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([
    {
      id: "1",
      name: "product-blazer-01.jpg",
      type: "image",
      url: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400",
      size: 2450000,
      uploadedAt: "2024-01-25T10:30:00",
      dimensions: { width: 1920, height: 1080 },
    },
    {
      id: "2",
      name: "product-hoodie-02.jpg",
      type: "image",
      url: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400",
      size: 1850000,
      uploadedAt: "2024-01-24T14:20:00",
      dimensions: { width: 1920, height: 1280 },
    },
    {
      id: "3",
      name: "category-banner.jpg",
      type: "image",
      url: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400",
      size: 3200000,
      uploadedAt: "2024-01-23T09:15:00",
      dimensions: { width: 2560, height: 1440 },
    },
    {
      id: "4",
      name: "promo-video.mp4",
      type: "video",
      url: "/videos/promo.mp4",
      size: 15600000,
      uploadedAt: "2024-01-22T16:45:00",
    },
    {
      id: "5",
      name: "product-catalog.pdf",
      type: "document",
      url: "/docs/catalog.pdf",
      size: 4800000,
      uploadedAt: "2024-01-21T11:00:00",
    },
    {
      id: "6",
      name: "product-shirt-03.jpg",
      type: "image",
      url: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400",
      size: 2100000,
      uploadedAt: "2024-01-20T13:30:00",
      dimensions: { width: 1920, height: 1080 },
    },
  ]);

  const filteredFiles = mediaFiles.filter((file) => {
    const matchesSearch = file.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === "all" || file.type === filterType;
    return matchesSearch && matchesType;
  });

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newFile: MediaFile = {
          id: Date.now().toString() + Math.random(),
          name: file.name,
          type: file.type.startsWith("image/")
            ? "image"
            : file.type.startsWith("video/")
            ? "video"
            : "document",
          url: e.target?.result as string,
          size: file.size,
          uploadedAt: new Date().toISOString(),
        };
        setMediaFiles((prev) => [newFile, ...prev]);
      };
      reader.readAsDataURL(file);
    });

    toast({
      title: "Success",
      description: `${files.length} file(s) uploaded successfully`,
    });
  };

  const handleDelete = () => {
    if (selectedFiles.size === 0 && !selectedFile) return;

    if (selectedFiles.size > 0) {
      setMediaFiles((prev) => prev.filter((file) => !selectedFiles.has(file.id)));
      setSelectedFiles(new Set());
      toast({
        title: "Success",
        description: `${selectedFiles.size} file(s) deleted`,
      });
    } else if (selectedFile) {
      setMediaFiles((prev) => prev.filter((file) => file.id !== selectedFile.id));
      toast({
        title: "Success",
        description: "File deleted successfully",
      });
    }
    setIsDeleteDialogOpen(false);
    setSelectedFile(null);
  };

  const toggleFileSelection = (fileId: string) => {
    const newSelection = new Set(selectedFiles);
    if (newSelection.has(fileId)) {
      newSelection.delete(fileId);
    } else {
      newSelection.add(fileId);
    }
    setSelectedFiles(newSelection);
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case "image":
        return ImageIcon;
      case "video":
        return Film;
      default:
        return File;
    }
  };

  return (
   <AdminLayout>
     <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Media Library</h1>
        <p className="text-muted-foreground mt-1">Manage your images, videos, and documents</p>
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search files..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex gap-2">
            {["all", "image", "video", "document"].map((type) => (
              <Button
                key={type}
                variant={filterType === type ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterType(type as typeof filterType)}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {selectedFiles.size > 0 && (
            <Button
              variant="destructive"
              size="sm"
              onClick={() => setIsDeleteDialogOpen(true)}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete ({selectedFiles.size})
            </Button>
          )}
          <div className="flex border rounded-md">
            <Button
              variant={viewMode === "grid" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="rounded-r-none"
            >
              <Grid3x3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="rounded-l-none"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
          <label htmlFor="file-upload">
            <Button asChild>
              <span>
                <Upload className="h-4 w-4 mr-2" />
                Upload Files
              </span>
            </Button>
            <input
              id="file-upload"
              type="file"
              multiple
              accept="image/*,video/*,.pdf,.doc,.docx"
              className="hidden"
              onChange={handleFileUpload}
            />
          </label>
        </div>
      </div>

      {viewMode === "grid" ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredFiles.map((file) => {
            const Icon = getFileIcon(file.type);
            return (
              <div
                key={file.id}
                className={`border rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer ${
                  selectedFiles.has(file.id) ? "ring-2 ring-primary" : ""
                }`}
                onClick={() => toggleFileSelection(file.id)}
              >
                <div className="aspect-square bg-muted flex items-center justify-center relative">
                  {file.type === "image" ? (
                    <img src={file.url} alt={file.name} className="w-full h-full object-cover" />
                  ) : (
                    <Icon className="h-12 w-12 text-muted-foreground" />
                  )}
                  {selectedFiles.has(file.id) && (
                    <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                      <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                        <svg className="w-4 h-4 text-primary-foreground" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <p className="text-sm font-medium truncate">{file.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {formatFileSize(file.size)}
                  </p>
                  <div className="flex gap-1 mt-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 px-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedFile(file);
                        setIsPreviewOpen(true);
                      }}
                    >
                      <Eye className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 px-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        const link = document.createElement("a");
                        link.href = file.url;
                        link.download = file.name;
                        link.click();
                      }}
                    >
                      <Download className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 px-2 text-destructive"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedFile(file);
                        setIsDeleteDialogOpen(true);
                      }}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted/50 border-b">
              <tr>
                <th className="w-12 p-4">
                  <input
                    type="checkbox"
                    checked={selectedFiles.size === filteredFiles.length && filteredFiles.length > 0}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedFiles(new Set(filteredFiles.map((f) => f.id)));
                      } else {
                        setSelectedFiles(new Set());
                      }
                    }}
                  />
                </th>
                <th className="text-left p-4 font-medium">Preview</th>
                <th className="text-left p-4 font-medium">Name</th>
                <th className="text-left p-4 font-medium">Type</th>
                <th className="text-left p-4 font-medium">Size</th>
                <th className="text-left p-4 font-medium">Uploaded</th>
                <th className="w-[50px] p-4"></th>
              </tr>
            </thead>
            <tbody>
              {filteredFiles.map((file) => {
                const Icon = getFileIcon(file.type);
                return (
                  <tr key={file.id} className="border-b hover:bg-muted/50">
                    <td className="p-4">
                      <input
                        type="checkbox"
                        checked={selectedFiles.has(file.id)}
                        onChange={() => toggleFileSelection(file.id)}
                      />
                    </td>
                    <td className="p-4">
                      <div className="w-12 h-12 bg-muted rounded flex items-center justify-center overflow-hidden">
                        {file.type === "image" ? (
                          <img src={file.url} alt={file.name} className="w-full h-full object-cover" />
                        ) : (
                          <Icon className="h-6 w-6 text-muted-foreground" />
                        )}
                      </div>
                    </td>
                    <td className="p-4 font-medium">{file.name}</td>
                    <td className="p-4">
                      <span className="capitalize text-muted-foreground">{file.type}</span>
                    </td>
                    <td className="p-4 text-muted-foreground">{formatFileSize(file.size)}</td>
                    <td className="p-4 text-muted-foreground">
                      {new Date(file.uploadedAt).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                            </svg>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedFile(file);
                              setIsPreviewOpen(true);
                            }}
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            Preview
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              const link = document.createElement("a");
                              link.href = file.url;
                              link.download = file.name;
                              link.click();
                            }}
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedFile(file);
                              setIsDeleteDialogOpen(true);
                            }}
                            className="text-destructive"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{selectedFile?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {selectedFile?.type === "image" && (
              <img
                src={selectedFile.url}
                alt={selectedFile.name}
                className="w-full rounded-lg"
              />
            )}
            {selectedFile?.type === "video" && (
              <video src={selectedFile.url} controls className="w-full rounded-lg" />
            )}
            {selectedFile?.type === "document" && (
              <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                <File className="h-16 w-16 mb-4" />
                <p>Preview not available for this file type</p>
              </div>
            )}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Size</p>
                <p className="font-medium">{selectedFile && formatFileSize(selectedFile.size)}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Type</p>
                <p className="font-medium capitalize">{selectedFile?.type}</p>
              </div>
              {selectedFile?.dimensions && (
                <div>
                  <p className="text-muted-foreground">Dimensions</p>
                  <p className="font-medium">
                    {selectedFile.dimensions.width} × {selectedFile.dimensions.height}
                  </p>
                </div>
              )}
              <div>
                <p className="text-muted-foreground">Uploaded</p>
                <p className="font-medium">
                  {selectedFile && new Date(selectedFile.uploadedAt).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete File{selectedFiles.size > 1 ? "s" : ""}</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Are you sure you want to delete {selectedFiles.size > 1 ? `${selectedFiles.size} files` : `"${selectedFile?.name}"`}? This action cannot be undone.
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
   </AdminLayout>
  );
};

export default AdminMediaLibrary;