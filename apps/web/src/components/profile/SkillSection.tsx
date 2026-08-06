interface Props {
  title: string;

  skills: string[];
}

export default function SkillSection({
  title,
  skills,
}: Props) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">

      <h2 className="mb-4 text-xl font-semibold">
        {title}
      </h2>

      {skills.length === 0 ? (
        <p className="text-gray-500">
          No skills added.
        </p>
      ) : (
        <div className="flex flex-wrap gap-2">

          {skills.map((skill) => (
            <span
              key={skill}
              className="rounded-full bg-blue-100 px-4 py-2 text-sm text-blue-700"
            >
              {skill}
            </span>
          ))}

        </div>
      )}

    </div>
  );
}