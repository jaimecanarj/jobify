"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  JobStatus,
  JobMode,
  createAndEditJobSchema,
  CreateAndEditJobType,
} from "@/utils/types";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { CustomFormField, CustomFormSelect } from "./FormComponents";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createJobAction } from "@/utils/actions";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

const JobStatuses = [
  { label: "pendiente", value: "pending" },
  { label: "entrevista", value: "interview" },
  { label: "rechazado", value: "declined" },
];

const CreateJobForm = () => {
  const form = useForm<CreateAndEditJobType>({
    resolver: zodResolver(createAndEditJobSchema),
    defaultValues: {
      position: "",
      company: "",
      location: "",
      status: JobStatus.Pending,
      mode: JobMode.FullTime,
    },
  });

  const queryClient = useQueryClient();
  const { toast } = useToast();
  const router = useRouter();
  const { mutate, isPending } = useMutation({
    mutationFn: (values: CreateAndEditJobType) => createJobAction(values),
    onSuccess: (data) => {
      if (!data) {
        toast({
          description: "hubo un error",
        });
        return;
      }
      toast({ description: "trabajo creado" });
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      queryClient.invalidateQueries({ queryKey: ["stats"] });
      queryClient.invalidateQueries({ queryKey: ["charts"] });

      router.push("/jobs");
    },
  });

  const onSubmit = (values: CreateAndEditJobType) => {
    mutate(values);
  };

  return (
    <Form {...form}>
      <form
        className="bg-muted p-8 rounded"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <h2 className="capitalize font-semibold text-4xl mb-6">
          añadir trabajo
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 items-start">
          {/* position */}
          <CustomFormField
            name="position"
            label="posición"
            control={form.control}
          />
          {/* company */}
          <CustomFormField
            name="company"
            label="compañía"
            control={form.control}
          />
          {/* location */}
          <CustomFormField
            name="location"
            label="localidad"
            control={form.control}
          />
          {/* job status */}
          <CustomFormSelect
            name="status"
            control={form.control}
            labelText="Estado"
            items={Object.values(JobStatus)}
          />
          {/* job  type */}
          <CustomFormSelect
            name="mode"
            control={form.control}
            labelText="Tipo"
            items={Object.values(JobMode)}
          />
          <Button
            type="submit"
            className="self-end capitalize"
            disabled={isPending}
          >
            {isPending ? "cargando..." : "crear trabajo"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateJobForm;
