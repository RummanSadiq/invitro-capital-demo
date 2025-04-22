import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FunctionComponent } from "react";
import classNames from "classnames";

type Props = {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
};

export const FeatureCard: FunctionComponent<Props> = ({
  icon,
  title,
  description,
  index,
}) => {
  const featureId = `feature-${index}`;
  const descriptionId = `feature-description-${index}`;
  return (
    <Card className={classNames("text-center")} role="listitem">
      <CardHeader>
        <div
          className={classNames(
            "w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4"
          )}
        >
          {icon}
        </div>
        <CardTitle className={classNames("text-xl")} id={featureId}>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p
          className={classNames("text-gray-600")}
          id={descriptionId}
          aria-labelledby={featureId}
        >
          {description}
        </p>
      </CardContent>
    </Card>
  );
};
