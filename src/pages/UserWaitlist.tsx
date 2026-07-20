import { useState, useMemo, useCallback, type SyntheticEvent } from "react";
import InputWithError from "../components/common/InputWithError";
import Error from "../components/common/Error";
import Layout from "../components/common/Layout";
import { API_METHODS, API_ROUTE_WAITLIST, GENERAL_ERROR, USER_DATA_KEY } from "../constants";
import { getLocal, setLocal, keepOnlyNumber, apiCall } from "../utils";
import ButtonWithLoader from "../components/common/ButtonWithLoader";
import { useMutation } from "@tanstack/react-query";

export default function UserWaitlist() {
    const userData = useMemo(() => getLocal(USER_DATA_KEY), []);

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);

    const submitWaitlistMutation = useMutation({
        mutationFn: (body: Record<string, string>) => apiCall(API_ROUTE_WAITLIST, API_METHODS.POST, body),
        onSuccess: (resp) => {
            const waitlistData = resp.data;
            if (waitlistData) {
                setLocal(USER_DATA_KEY, { ...(userData || {}), isWaitlisted: true, waitlistData });
                setHasSubmitted(true);
            } else setErrors(prev => ({ ...prev, api: GENERAL_ERROR }));
        },
        onError: (e) => setErrors(prev => ({ ...prev, api: e.message })),
    });

    const isDisabled = hasSubmitted || submitWaitlistMutation.isPending

    const handleFormSubmit = useCallback((e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isDisabled) return;
        setErrors({});

        const formData = new FormData(e.currentTarget);
        const fullName = (formData.get("fullName") as string || "").trim();
        const phoneNumber = (formData.get("phoneNumber") as string || "").trim();
        const interestReason = (formData.get("interestReason") as string || "").trim();
        const useCase = (formData.get("useCase") as string || "").trim();

        const newErrors = {
            fullName: !fullName ? "full name is required" : "",
            phoneNumber: !phoneNumber ? "mobile number is required" : phoneNumber.length < 10 ? "add a valid mobile number" : "",
            interestReason: !interestReason ? "reason of interest is required" : "",
            useCase: !useCase ? "use case is required" : ""
        };

        if (newErrors.fullName || newErrors.phoneNumber || newErrors.interestReason || newErrors.useCase) return setErrors(newErrors);

        submitWaitlistMutation.mutate({ fullName, phoneNumber, interestReason, useCase });
    }, [submitWaitlistMutation, isDisabled]);

    const handleFormChange = useCallback((e: SyntheticEvent<HTMLFormElement>) => {
        const target = e.target as HTMLInputElement;
        const name = target.name;

        if (name === "phoneNumber") {
            const val = keepOnlyNumber(target.value).slice(0, 10);
            target.value = val;
        }

        setErrors(prev => prev[name] ? { ...prev, [name]: "" } : prev);
    }, []);

    return (
        <Layout header="User Waitlist">
            {
                userData?.isWaitlisted ? (
                    <h1 className="text-lg md:text-xl font-normal text-neutral text-center">You have already added waitlist</h1>
                ) : (
                    <section className="min-h-full w-full flex flex-col items-center justify-center">
                        <form className="w-xs md:w-md flex flex-col gap-4 items-center" onSubmit={handleFormSubmit} onChange={handleFormChange}>
                            <h1 className="text-2xl md:text-3xl font-bold text-neutral">Add Waitlist</h1>

                            <InputWithError type="text" name="fullName" placeholder="full name" error={errors.fullName} disabled={isDisabled} />
                            <InputWithError type="text" name="phoneNumber" placeholder="mobile number" maxLength={10} error={errors.phoneNumber} disabled={isDisabled} />
                            <InputWithError type="text" name="email" placeholder="email" disabled={true} defaultValue={userData?.email} />
                            <InputWithError type="text" name="interestReason" placeholder="reason of interest" error={errors.interestReason} disabled={isDisabled} />
                            <InputWithError type="textarea" name="useCase" placeholder="explain your use case" error={errors.useCase} disabled={isDisabled} />

                            {
                                hasSubmitted ? (
                                    <h1 className="text-sm md:text-base font-normal text-success text-center">You have successfully added waitlist</h1>
                                ) : (
                                    <ButtonWithLoader className="btn-primary" content="submit" isLoading={isDisabled} />
                                )
                            }

                            <Error message={errors.api} className="text-center" />
                        </form>
                    </section>
                )
            }
        </Layout>
    );
}
