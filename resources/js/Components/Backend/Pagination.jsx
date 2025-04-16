import { Button } from "@/Components/ui/button"

export default function Pagination({ data, onPageChange }) {
    if (!data || !data.data || data.data.length === 0) {
        return null;
    }

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-4">
            <div className="text-sm text-muted-foreground order-2 sm:order-1">
                Showing {data.from} to {data.to} of {data.total} results
            </div>
            <div className="flex flex-wrap items-center justify-center gap-1 order-1 sm:order-2">
                {data.links.map((link, index) => {
                    // Skip the "Previous" and "Next" links
                    if (link.label === "&laquo; Previous" || link.label === "Next &raquo;") {
                        return null;
                    }

                    // Convert HTML entities to readable text
                    const pageNumber = link.label.replace(/&[^;]+;/g, '');

                    return (
                        <Button
                            key={index}
                            variant={link.active ? "default" : "outline"}
                            size="sm"
                            onClick={() => onPageChange(link.url.split('page=')[1])}
                            disabled={!link.url}
                            className={`
                                min-w-[2rem] h-8 px-2
                                ${link.active ? "bg-primary text-primary-foreground" : ""}
                                ${!link.url ? "opacity-50 cursor-not-allowed" : ""}
                            `}
                        >
                            {pageNumber}
                        </Button>
                    );
                })}
            </div>
        </div>
    );
}
