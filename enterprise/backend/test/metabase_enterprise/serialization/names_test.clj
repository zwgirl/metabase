(ns metabase-enterprise.serialization.names-test
  (:require [clojure.test :refer :all]
            [metabase
             [models :refer [Card Collection Dashboard Database Field Metric Segment Table]]
             [util :as u]]
            [metabase-enterprise.serialization
             [names :as names :refer :all]
             [test-util :as ts]]))

(deftest safe-name-test
  (is (= (safe-name {:name "foo"}) "foo"))
  (is (= (safe-name {:name "foo/bar baz"}) "foo%2Fbar baz")))

(deftest unescape-name-test
  (is (= (unescape-name "foo") "foo"))
  (is (= (unescape-name "foo%2Fbar baz") "foo/bar baz"))

  (let [n "foo/bar baz"]
    (is (-> {:name n} safe-name unescape-name (= n)))))

(defn- test-fully-qualified-name-roundtrip
  [entity]
  (let [context (fully-qualified-name->context (fully-qualified-name entity))]
    (is (= (u/get-id entity) ((some-fn :field :metric :segment :card :dashboard :collection :table :database) context)))))

(deftest roundtrip-test
  (ts/with-world
    (test-fully-qualified-name-roundtrip (Card card-id-root)))

  (ts/with-world
    (test-fully-qualified-name-roundtrip (Card card-id)))

  (ts/with-world
    (test-fully-qualified-name-roundtrip (Card card-id-nested)))

  (ts/with-world
    (test-fully-qualified-name-roundtrip (Table table-id)))

  (ts/with-world
    (test-fully-qualified-name-roundtrip (Field category-field-id)))

  (ts/with-world
    (test-fully-qualified-name-roundtrip (Metric metric-id)))

  (ts/with-world
    (test-fully-qualified-name-roundtrip (Segment segment-id)))

  (ts/with-world
    (test-fully-qualified-name-roundtrip (Collection collection-id)))

  (ts/with-world
    (test-fully-qualified-name-roundtrip (Collection collection-id-nested)))

  (ts/with-world
    (test-fully-qualified-name-roundtrip (Dashboard dashboard-id)))

  (ts/with-world
    (test-fully-qualified-name-roundtrip (Database db-id))))
