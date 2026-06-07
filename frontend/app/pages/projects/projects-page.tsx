import { HugeiconsIcon } from "@hugeicons/react"
import { Add01Icon, ArrowUpRightIcon, FolderIcon, MoreHorizontalIcon, Trash } from "@hugeicons/core-free-icons"
import { Button } from "~/components/ui/button"
import { Field, FieldGroup } from "~/components/ui/field"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
} from "~/components/ui/alert-dialog"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "~/components/ui/empty"
import { useEffect, useState } from "react"
import LoadingEmpty from "~/components/loading-empty"
import { Link } from "react-router"
import { Label } from "~/components/ui/label"
import { Input } from "~/components/ui/input"

interface Project {
  id: number
  name: string
  description?: string
}

interface ProjectFormProps {
  defaultValues?: Partial<Project>
  onSubmit: (e: React.SubmitEvent<HTMLFormElement>) => void
  buttonText: string
}

function ProjectForm({ defaultValues, onSubmit, buttonText }: ProjectFormProps) {
  return (
    <form onSubmit={onSubmit}>
      <FieldGroup className="py-4">
        <Field>
          <Label htmlFor="project-name">Name</Label>
          <Input
            id="project-name"
            name="name"
            defaultValue={defaultValues?.name || ""}
            placeholder="e.g. Godot Engine"
            required
          />
        </Field>

        <Field>
          <Label htmlFor="project-description">Description</Label>
          <Input
            id="project-description"
            name="description"
            placeholder="Optional context..."
            defaultValue={defaultValues?.description || ""}
          />
        </Field>
      </FieldGroup>

      <DialogFooter>
        <DialogClose asChild>
          <Button type="button" variant="outline">Cancel</Button>
        </DialogClose>
        <Button type="submit">{buttonText}</Button>
      </DialogFooter>
    </form>
  )
}

export function ProjectsPage() {

  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [deletingProject, setDeletingProject] = useState<Project | null>(null);

  const truncateText = (text?: string, maxLength = 30) => {
    if (!text) return null;
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  }

  const handleCreateSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const description = formData.get("description") as string

    try {
      const res = await fetch("http://localhost:3000/api/v1/projects", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({ name, description }),
      });

      if (!res.ok) throw new Error("Failed to create project");

      const newProject: Project = await res.json();
      setProjects((prev) => [...prev, newProject]);
      setIsCreateOpen(false);
    } catch (error) {
      console.error("Error creating project:", error);
    }
  }

  const handleEditSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingProject) return;

    const formData = new FormData(e.currentTarget);
    const updatedName = formData.get("name") as string;
    const updatedDescription = formData.get("description") as string

    try {
      const res = await fetch(`http://localhost:3000/api/v1/projects/${editingProject.id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: updatedName,
          description: updatedDescription,
        }),
      });

      if (!res.ok) throw new Error("Failed to update project");

      setProjects((prev: Project[]) =>
        prev.map((project: Project) =>
          project.id === editingProject.id ? { ...project, name: updatedName, description: updatedDescription} : project
        )
      );

      setEditingProject(null);
    } catch (error) {
      console.error("Error updating project:", error);
    }
  }

  const handleDeleteConfirm = async () => {
    if (!deletingProject) return;

    try {
      const res = await fetch(`http://localhost:3000/api/v1/projects/${deletingProject.id}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        }
      })

      if (!res.ok) throw new Error("Failed to delete project")

      setProjects((prev) => prev.filter((p) => p.id !== deletingProject.id))
      setDeletingProject(null)
    } catch (error) {
      console.error("Error deleting project:", error)
    }
  }

  // Fetching initial projects.
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/v1/projects", {
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          }
        });

        if (!res.ok) throw new Error("Failed to fetch projects");

        const data: Project[] = await res.json();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (isLoading) {
    return <LoadingEmpty />
  }

  if (projects.length === 0) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <HugeiconsIcon icon={FolderIcon} />
          </EmptyMedia>
          <EmptyTitle>No Projects Yet</EmptyTitle>
          <EmptyDescription>
            You haven&apos;t created any projects yet. Get started by creating
            your first project.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent className="flex-row justify-center gap-2">
          <Button onClick={() => setIsCreateOpen(true)}>Create Project</Button>
          <Button variant="outline">Import Project</Button>
        </EmptyContent>
        <Button
          variant="link"
          asChild
          className="text-muted-foreground"
          size="sm"
        >
          <a href="#">
            Learn More <HugeiconsIcon icon={ArrowUpRightIcon} />
          </a>
        </Button>

        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogContent className="sm:max-w-sm">
            <DialogHeader>
              <DialogTitle>Create project</DialogTitle>
              <DialogDescription>Add a new workspace project here.</DialogDescription>
            </DialogHeader>
            <ProjectForm onSubmit={handleCreateSubmit} buttonText="Create Project" />
          </DialogContent>
        </Dialog>
      </Empty>
    )
  }

  return (
    <>
      <div className="flex flex-row justify-between items-center mb-3 max-w-xl w-full px-1.5">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-foreground">Your Projects</h1>
          <p className="text-sm text-muted-foreground">
            Manage your ongoing workspaces
          </p>
        </div>
        <Button type="button" onClick={() => setIsCreateOpen(true)}>
          <HugeiconsIcon strokeWidth={3} icon={Add01Icon} />
          Create Project
        </Button>
      </div>

      <div className="max-w-xl mx-auto w-full border rounded-md px-1">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Project</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((project) => {
              const { id, name, description } = project
              return (
                <TableRow key={id}>
                  <TableCell title={name}>
                    <Button variant="link" asChild size="lg" className="px-0! h-0!">
                      <Link to="/">{truncateText(name)}</Link>
                    </Button>
                  </TableCell>
                  <TableCell title={description}>
                    {truncateText(description) || "None"}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="size-8">
                          <HugeiconsIcon icon={MoreHorizontalIcon} />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Show</DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => setEditingProject(project)}>
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          variant="destructive" 
                          onSelect={() => setDeletingProject(project)}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>


      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Create project</DialogTitle>
            <DialogDescription>Add a new workspace project here.</DialogDescription>
          </DialogHeader>
          <ProjectForm onSubmit={handleCreateSubmit} buttonText="Create Project" />
        </DialogContent>
      </Dialog>

      <Dialog open={editingProject !== null} onOpenChange={(open) => !open && setEditingProject(null)}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Edit project</DialogTitle>
            <DialogDescription>Make changes to your project here.</DialogDescription>
          </DialogHeader>
          <ProjectForm 
            defaultValues={editingProject || {}} 
            onSubmit={handleEditSubmit} 
            buttonText="Save Changes" 
          />
        </DialogContent>
      </Dialog>

      <AlertDialog open={deletingProject !== null} onOpenChange={(open) => !open && setDeletingProject(null)}>
        <AlertDialogContent size="sm">
          <AlertDialogHeader>
            <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
              <HugeiconsIcon icon={Trash} />
            </AlertDialogMedia>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the project{" "}
              <span className="font-semibold text-foreground">“{deletingProject?.name}”</span> and 
              remove access from all related workspace resources. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
            <AlertDialogAction variant="destructive" onClick={handleDeleteConfirm}>Delete Project</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}